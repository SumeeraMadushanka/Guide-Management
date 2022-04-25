import React, { useState } from "react";
import { Form, Input, Button, Spin, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";

import { FileDoneOutlined, InfoCircleOutlined } from "@ant-design/icons";

import axios from "axios";
import "../Styles/Admin.css";

import { Link } from "react-router-dom";

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

const ForgotPasword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const history = useNavigate();

  const forgotpasswordHandler = async (placement) => {
    // create handler for saving data to the db

    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/guid/forgotpassword",
        { email},
        config
      );

      setSuccess(data.verify);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000); //5s
    }
  };

  const [form] = Form.useForm();

  return (
    <>
      {" "}
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
                    onFinish={() => forgotpasswordHandler("top")}
                  >
                    <div className=" mb-8 ml-28 font-semibold text-3xl  border-2 p-2 w-96 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl">
                      Forgot Password
                    </div>
                    <div className=" absolute -translate-y-8 ml-96 translate-x-72">
                      <p style={{ color: "red" }}>
                        Please enter the email address you register your account
                        with. We will send you reset password confirmation to
                        this email. 😍
                      </p>
                    </div>
                    {error && (
                      <span
                        className="badge bg-warning"
                        style={{ color: "white" }}
                      >
                        {error}
                      </span>
                    )}
                    {success && (
                      <span
                        className="badge bg-success"
                        style={{ color: "white" }}
                      >
                        {success}
                      </span>
                    )}
                    <div className=" -translate-x-52">
                      <Form.Item
                        name="email"
                        label="Email Address"
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
                    </div>
                    <Form.Item {...tailLayout}>
                      <div className="flex  px-20 mt-8">
                        <Button type="primary" htmlType="submit">
                          Request
                        </Button>{" "}
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

export default ForgotPasword;
