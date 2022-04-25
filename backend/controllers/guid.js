const Guid = require("../models/guid");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//when we use asynchronous function we need try catch block
exports.register = async (req, res) => {
  //controller for register
  const {
    fullName,
    address,
    age,
    contactNo,
    language,
    email,
    category,
    username,
    password,
  } = req.body; //destructur e method

  try {
    const guid = await Guid.create({
      fullName,
      address,
      age,
      contactNo,
      language,
      email,
      category,
      username,
      password,
    });

    sendToken(guid, 200, res);
  } catch (error) {
    if (error.code === 11000) {
      const message = "Already have an account using this email ";
      return res.status(400).json({ success: false, error: message });
    }

    if (error.username === "ValidationError") {
      const message = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, error: message });
    }
  }
};

exports.login = async (req, res) => {
  //controller for login
  const { username, password } = req.body;

  if (!username || !password) {
    //backend validation
    return res
      .status(400)
      .json({ success: false, error: "Please enter username and password" });
  } //400 Bad Request

  try {
    const guid = await Guid.findOne({ username }).select("+password"); //match two passwords

    if (!guid) {
      //true
      return res.status(401).json({
        success: false,
        available: "User does not exists. Please create an account !",
      });
    }

    const isMatch = await guid.matchPasswords(password); //matching the passwords from the received from request and from the db

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid Credentials" });
    }

    sendToken(guid, 200, res);
  } catch (error) {
    res.status(500).json({
      // 500 internal server error
      success: false,
      error: error.message,
    });
  }
};

exports.forgotpassword = async (req, res) => {
  //controller for forgot password
  const { email } = req.body;

  try {
    const guid = await Guid.findOne({ email }); //check for email availability for sending emails

    if (!guid) {
      return res
        .status(404)
        .json({ success: false, error: "Email could not be sent" });
    }

    const resetToken = guid.getResetPasswordToken(); // get the password reset token

    await guid.save();

    const resetURL = `http://localhost:3000/passwordreset/${resetToken}`; //setting a URL to send to the user for emails

    const message = `
        <h1>You have requested a password reset</h1>
        <p>Please go to this URL to reset password</p>
        <a href=${resetURL} clicktracking=off>${resetURL}</a>
         `;
    try {
      await sendEmail({
        //send email
        to: guid.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, verify: "Email Sent" });
    } catch (error) {
      guid.resetPasswordToken = undefined;
      guid.resetPasswordExpire = undefined;

      await guid.save();

      return res
        .status(500)
        .json({ success: false, error: "Email could not be sent" });
    }
  } catch (error) {
    next(error);
  }
};

exports.resetpassword = async (req, res) => {
  //controller for reset password
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex"); //create a hash code using crypto

  try {
    const guid = await Guid.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }, //find and update the relavant database field
    });

    if (!guid) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid Reset Token" });
    }

    guid.password = req.body.password;
    guid.resetPasswordToken = undefined;
    guid.resetPasswordExpire = undefined;

    await guid.save();

    res.status(200).json({ success: true, verify: "Password reset success" });
  } catch (error) {
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, error: message });
    }
  }
};

const sendToken = (guid, statusCode, res) => {
  //JWT get
  const token = guid.getSignedToken();
  const fullName = guid.fullName;
  const address = guid.address;
  const age = guid.age;
  const contactNo = guid.contactNo;
  const language = guid.language;
  const category = guid.category;
  const email = guid.email;
  const username = guid.username;
  const password = guid.password;
  const id = guid._id;
  res.status(200).json({
    success: true,
    token,
    fullName,
    address,
    age,
    contactNo,
    language,
    category,
    email,
    username,
    password,
    id,
  });
};
