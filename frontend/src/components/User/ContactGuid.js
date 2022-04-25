import React, { useState } from "react";
import Navbar from "../Navbar";

import { Avatar, Spin, Form, Button, Input } from "antd";
import { UserOutlined, FileDoneOutlined } from "@ant-design/icons";

import axios from "axios";
import "../Styles/Admin.css";
import TextArea from "antd/lib/input/TextArea";

const ContactGuid = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); //additional

  const emailHandler = async (placement) => {
    // create handler for saving data to the db

    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "",
        { message },
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
      <Navbar />
      <div className=" container mx-auto">
        <div className=" border-2 px-32 py-4 h-screen">
          <div className="p-2 text-center text-5xl mt-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md justify-content-center mx-auto">
            Contact Guide
          </div>
          <div className=" flex-row text-center mt-6 border-2 mx-auto p-2 h-96 w-full">
            {" "}
            <div className=" mr-10 float-left text-center translate-x-36 mt-10">
              <Avatar size={72} icon={<UserOutlined />} />
              <br />
              <div className="text-xl font-semibold ">Guider</div>
            </div>
            <Form
              form={form}
              name="control-hooks"
              onFinish={() => emailHandler("top")}
            >
              <div className="mt-10">
                <Form.Item
                  name="Message"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  initialValue={message}
                >
                  <TextArea
                    style={{ width: "450px", height: "150px" }}
                    placeholder="Enter Message"
                    prefix={
                      <FileDoneOutlined className="site-form-item-icon" />
                    }
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Form.Item>
                {error && (
                  <span className="badge bg-warning" style={{ color: "white" }}>
                    {error}
                  </span>
                )}
                {success && (
                  <span className="badge bg-success" style={{ color: "white" }}>
                    {success}
                  </span>
                )}
                <Form.Item>
                  <div className=" float-right mt-2 -translate-x-56">
                    <Button type="primary" htmlType="submit">
                      {loading ? (
                        <>
                          <Spin /> Sending..
                        </>
                      ) : (
                        "Send"
                      )}
                    </Button>{" "}
                    {error && (
                      <span className="error-message" style={{ color: "red" }}>
                        {error}
                      </span>
                    )}{" "}
                  </div>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default ContactGuid;
