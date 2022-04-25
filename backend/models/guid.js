const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const GuidSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Please enter a first name"],
  },

  address: {
    type: String,
    required: [true, "Please enter a last name"],
  },

  age: {
    type: Number,
    required: [true, "Please enter age"],
  },

  contactNo: {
    type: String,
    required: [true, "Please enter contact number"],
  },

  language: {
    type: String,
    required: [true, "Please enter language"],
  },

  category: {
    type: String,
    required: [true, "Please enter category"],
  },
  username: {
    type: String,
    required: [true, "Please enter username"],
  },

  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email",
    ],
  },

  password: {
    type: String,
    required: [true, "Please enter a password"],
    select: false,
    minlength: 6, //minimum password length is 6
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,

});

//this is for register route
GuidSchema.pre("save", async function (next) {
  //password encryption goes here
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); //await is only can use in async function only

  next();
});

//this is for login route
GuidSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password); //check the entered password and password which is received from the db
};

//for register json web token (JWT)
GuidSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//for reset json web token
GuidSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
  return resetToken;
};

const Guid = mongoose.model("guid", GuidSchema);
module.exports = Guid;
