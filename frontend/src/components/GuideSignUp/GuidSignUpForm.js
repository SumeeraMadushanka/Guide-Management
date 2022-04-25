import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Form, Input, Button, Spin, Tooltip, notification } from "antd";

import { FileDoneOutlined, InfoCircleOutlined } from "@ant-design/icons";

import axios from "axios";
import "../Styles/Admin.css";
import TextArea from "antd/lib/input/TextArea";

const layout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Register = () => {
  const history = useNavigate();

  const [fullName, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [contactNo, setContactno] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); //additional

  const createHandler = async (placement) => {
    // create handler for saving data to the db
    setLoading(true);

    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        //use axios API
        "/api/guid/register",
        {
          fullName,
          address,
          age,
          contactNo,
          language,
          category,
          email,
          username,
          password
        },
        config
      );

      console.log(data)

      localStorage.setItem("authToken", data.token); //set the data to the browswer local storage
      localStorage.setItem("email", data.email);
      localStorage.setItem("username", data.username);


      setTimeout(() => {
        //set a time out
        setLoading(false);
        notification.info({
          message: `Notification`,
          description: "Create Account Successfully 😘",
          placement,
        });
        history("/login");
      }, 5000); //5seconds timeout
    } catch (error) {
      notification.error({
        message: `Notification`,
        description: error.response.data.error,
        placement,
      });
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 5000); //5s
    }
  };

  const [form] = Form.useForm();
  return (
    <>
      <div className="container mx-auto contact-bg">
        <div className="flex justify-center mt-8 gap-28 mb-10 w-full">
          <div className=" border-2 text-center border-gray-900 px-72 register-bg bg-cover mt-10 mb-10">
            <div className="mb-10">
              <div className="mt-20 flex">
                <div className=" -translate-x-44">
                  <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={() => createHandler("top")}
                  >
                    <div className=" mb-8 ml-28 font-semibold text-3xl  border-2 p-2 w-96 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl">
                      Guid Sign Up Home
                    </div>
                    <div className=" absolute translate-y-14 ml-96 mt-20 translate-x-72">
                      <div className=" text-3xl font-semibold ">
                        Welcome to Travel
                      </div>
                      <div className=" text-3xl font-semibold">Management</div>
                      <div className=" text-3xl font-semibold mb-2">System</div>
                      <div>
                        <NavLink to="/login">
                          <Button type="primary" danger>
                            Login
                          </Button>{" "}
                        </NavLink>
                      </div>
                    </div>
                    <div className=" -translate-x-52">
                      <Form.Item
                        name="full name"
                        label="Full Name"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        initialValue={fullName}
                      >
                        <Input
                          style={{ width: "450px" }}
                          placeholder="Enter Full Name"
                          prefix={
                            <FileDoneOutlined className="site-form-item-icon" />
                          }
                          suffix={
                            <Tooltip title="Please Enter Full Name">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>
                          }
                          onChange={(e) => setFullname(e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item
                        name="address"
                        label="Address"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        initialValue={address}
                      >
                        <TextArea
                          style={{ width: "450px" }}
                          placeholder="Enter Address"
                          prefix={
                            <FileDoneOutlined className="site-form-item-icon" />
                          }
                          suffix={
                            <Tooltip title="Please Enter Adress">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>
                          }
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item
                        name="age"
                        label="Age"
                        rules={[
                          {
                            required: true,
                            message: "Please input your age",
                          }
                        ]}
                        initialValue={age}
                      >
                        <Input
                          style={{ width: "450px" }}
                          placeholder="Enter Age"
                          prefix={
                            <FileDoneOutlined className="site-form-item-icon" />
                          }
                          suffix={
                            <Tooltip title="Enter your age">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>
                          }
                          showCount
                          maxLength={3}
                          onChange={(e) => setAge(e.target.value)}
                          type="number"
                        />
                      </Form.Item>
                      <Form.Item
                        name="contact no"
                        label="Contact No."
                        rules={[
                          {
                            required: true,
                            message: "Please input your Phone Number!",
                          },
                          {
                            min: 10,
                            message:
                              "Phone Number must be minimum 10 characters.",
                          },
                          { max: 10 },
                        ]}
                        initialValue={contactNo}
                      >
                        <Input
                          style={{ width: "450px" }}
                          placeholder="Enter Telephone Number"
                          prefix={
                            <FileDoneOutlined className="site-form-item-icon" />
                          }
                          suffix={
                            <Tooltip title="Enter your phone number ex: 0774258796">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>
                          }
                          showCount
                          maxLength={10}
                          onChange={(e) => setContactno(e.target.value)}
                          type="number"
                        />
                      </Form.Item>
                      <Form.Item
                        name="language"
                        label="Language"
                        rules={[
                          {
                            required: true,
                          }
                        ]}
                        initialValue={language}
                      >
                        <Input
                          style={{ width: "450px" }}
                          placeholder="Enter Language"
                          prefix={
                            <FileDoneOutlined className="site-form-item-icon" />
                          }
                          suffix={
                            <Tooltip title="Enter Language">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>
                          }                 
                          showCount
                          onChange={(e) => setLanguage(e.target.value)}
                          type="text"
                        />
                      </Form.Item>
                      <Form.Item
                        name="category"
                        label="Category"
                        rules={[
                          {
                            required: true,
                          }
                        ]}
                        initialValue={category}
                      >
                        <Input
                          style={{ width: "450px" }}
                          placeholder="Enter Category"
                          prefix={
                            <FileDoneOutlined className="site-form-item-icon" />
                          }
                          suffix={
                            <Tooltip title="Enter Category">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>
                          }                 
                          showCount
                          onChange={(e) => setCategory(e.target.value)}
                          type="text"
                        />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                          {
                            required: true,
                          },
                          { type: "email" },
                          { max: 50 },
                        ]}
                        initialValue={email}
                      >
                        <Input
                          style={{ width: "450px" }}
                          placeholder="Enter Email Address"
                          prefix={
                            <FileDoneOutlined className="site-form-item-icon" />
                          }
                          suffix={
                            <Tooltip title="Enter your email ex: admin@example.com">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>
                          }
                          showCount
                          maxLength={50}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item
                        name="username"
                        label="username"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        initialValue={username}
                      >
                        <Input
                          style={{ width: "450px" }}
                          placeholder="Enter Username"
                          prefix={
                            <FileDoneOutlined className="site-form-item-icon" />
                          }
                          suffix={
                            <Tooltip title="Please Enter Username">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>
                          }
                          onChange={(e) => setUsername(e.target.value)}
                          showCount
                          maxLength={10}
                        />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        initialValue={password}
                      >
                        <Input
                          style={{ width: "450px" }}
                          placeholder="Enter Password"
                          prefix={
                            <FileDoneOutlined className="site-form-item-icon" />
                          }
                          suffix={
                            <Tooltip title="Please Enter Password">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>
                          }
                          showCount
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          minLength={6}
                        />
                      </Form.Item>
                    </div>
                    <Form.Item {...tailLayout}>
                      <div className="flex  px-20 mt-8">
                        <Button type="primary" htmlType="submit">
                          {loading ? (
                            <>
                              <Spin /> Creating..
                            </>
                          ) : (
                            "Create Account"
                          )}
                        </Button>{" "}
                        {error && (
                          <span
                            className="error-message"
                            style={{ color: "red" }}
                          >
                            {error}
                          </span>
                        )}{" "}
                      </div>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
