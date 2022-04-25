import React, { useState } from "react";
import { Form, Input, Button,  Tooltip } from "antd";
import { useParams } from "react-router-dom";

import { FileDoneOutlined, InfoCircleOutlined } from "@ant-design/icons";

import axios from "axios";
import "../Styles/Admin.css";

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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { resetToken } = useParams();

  const resetpasswordHandler = async (placement) => {
    // create handler for saving data to the db

    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) { //check the password matching
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setError("");
        }, 5000);
  
        return setError("Password did not match");
    }

    try {
      const { data } = await axios.put(
        `/api/guid/passwordreset/${resetToken}`,
        { password },
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
                    onFinish={() => resetpasswordHandler("top")}
                  >
                    <div className=" mb-8 ml-28 font-semibold text-3xl  border-2 p-2 w-96 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl">
                      Reset Password
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
                            <Tooltip title="Enter Password">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>
                          }
                          showCount
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                        />
                      </Form.Item>
                      <Form.Item
                        name="confirm password"
                        label="Confirm Password"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        initialValue={confirmPassword}
                      >
                        <Input
                          style={{ width: "450px" }}
                          placeholder="Enter Password"
                          prefix={
                            <FileDoneOutlined className="site-form-item-icon" />
                          }
                          suffix={
                            <Tooltip title="Enter Password">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>
                          }
                          showCount
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          type="password"
                        />
                      </Form.Item>
                    </div>
                    <Form.Item {...tailLayout}>
                      <div className="flex  px-20 mt-8">
                        <Button type="primary" htmlType="submit">
                           Confirm
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
