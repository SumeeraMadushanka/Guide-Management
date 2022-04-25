import React, { useState, useEffect } from "react";
import { Form, Input, Button, Spin, Tooltip, notification } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { FileDoneOutlined, InfoCircleOutlined } from "@ant-design/icons";
import GuideNavbr from "./GuideNavbar";
import Header from "./Header";

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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

const Profile = () => {
  const history = useNavigate();

  const [fullName, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [contactNo, setContactno] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [loading, setLoading] = useState(false); //additional

  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`/api/guid/get/${id}`)
        .then((res) => {
          form.setFieldsValue({
            fullName: res.data.fullName,
            address: res.data.address,
            age: res.data.age,
            contactNo: res.data.contactNo,
            language: res.data.language,
            category: res.data.category,
            email: res.data.email,
            username: res.data.username,
          });
          setFullname(res.data.fullName);
          setAddress(res.data.address);
          setAge(res.data.age);
          setContactno(res.data.contactNo);
          setLanguage(res.data.language);
          setCategory(res.data.category);
          setEmail(res.data.email);
          setUsername(res.data.username);
        })
        .catch((err) => alert(err));
    };
    getData();
  }, []);

  const updateHandler = async (placement) => {
    // create handler for saving data to the db
    setLoading(true);

    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.put(
        //use axios API
        `/api/guid/update/${id}`,
        {
          fullName,
          address,
          age,
          contactNo,
          language,
          category,
          email,
          username,
        },
        config
      );

      setTimeout(() => {
        //set a time out
        setLoading(false);
        notification.info({
          message: `Notification`,
          description: "Successfully Update details 😘",
          placement,
        });
      }, 5000); //5seconds timeout
    } catch (error) {
      notification.error({
        message: `Notification`,
        description: error.response.data.error,
        placement,
      });
      setLoading(false);
    }
  };


  const [form] = Form.useForm();

  return (
    <>
      <GuideNavbr />
      <Header/>
      <div className="container mx-auto contact-bg">
        <div className="flex justify-center mt-8 gap-28 mb-10 w-full">
          <div className=" border-2 text-center border-gray-900 px-56 admin-bg bg-cover mt-10 mb-10">
            <div className="mb-10">
              <div className="mt-20 flex">
                <div className=" -translate-x-48">
                  <div className="p-2 text-5xl translate-x-52 mb-8 mx-auto mt-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md ">
                    Update Guid Form
                  </div>
                  <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={() => updateHandler("top")}
                  >
                    <div>
                      <Form.Item
                        name="fullName"
                        label="Full Name"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          style={{ width: "450px" }}
                          placeholder="Enter Full Name"
                          prefix={
                            <FileDoneOutlined className="site-form-item-icon" />
                          }
                          suffix={[
                            <Tooltip title="Please Enter Full Name">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>,
                          ]}
                          onChange={(e) => setFullname(e.target.value)}
                          value={fullName}
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
                      >
                        <TextArea
                          style={{ width: "450px" }}
                          placeholder="Enter Address"
                          prefix={
                            <FileDoneOutlined className="site-form-item-icon" />
                          }
                          suffix={
                            <Tooltip title="Please Enter Address">
                              <InfoCircleOutlined
                                style={{ color: "rgba(0,0,0,.45)" }}
                              />
                            </Tooltip>
                          }
                          onChange={(e) => setAddress(e.target.value)}
                          value={address}
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
                          value={age}
                        />
                      </Form.Item>
                      <Form.Item
                        name="contactNo"
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
                          Value={contactNo}
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
                      >
                        <Input
                          style={{ width: "450px" }}
                          placeholder="Enter Language"
                          prefix={
                            <FileDoneOutlined className="site-form-item-icon" />
                          }                  
                          showCount
                          onChange={(e) => setLanguage(e.target.value)}
                          type="text"
                          Value={language}
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
                      >
                        <Input
                          style={{ width: "450px" }}
                          placeholder="Enter Category"
                          prefix={
                            <FileDoneOutlined className="site-form-item-icon" />
                          }                  
                          showCount
                          onChange={(e) => setCategory(e.target.value)}
                          type="text"
                          Value={category}
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
                          Value={email}
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
                          Value={username}
                        />
                      </Form.Item>
                    </div>
                    <div className="flex justify-center items-center gap-4 translate-x-52">
                      <div>
                        <Form.Item {...tailLayout}>
                          <div className="  mt-8">
                            <Button type="primary" htmlType="submit">
                              {loading ? (
                                <>
                                  <Spin /> Update...
                                </>
                              ) : (
                                "Update"
                              )}
                            </Button>{" "}
                          </div>
                        </Form.Item>
                      </div>
                      <div>
                      </div>
                    </div>
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

export default Profile;
