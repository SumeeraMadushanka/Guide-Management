import React from "react";

import { Carousel, Button } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import logo from "./assets/logo.jpg";

import { NavLink } from "react-router-dom";

import "antd/dist/antd.css";

// import "./Styles/Dashboard.css";
import bg1 from "./assets/bg1.jpg";
import bg2 from "./assets/bg2.jpg";
import bg3 from "./assets/bg3.jpg";
import bg4 from "./assets/bg4.jpg";
import bg5 from "./assets/bg5.jpg";

const Dashbord = () => {
  return (
    <>
      <div className=" container mx-auto mt-10 bg-slate-300 ">
        <div className="flex justify-between">
          <div className=" flex">
            <div className=" w-56">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div className="flex">
            {" "}
            <a
              href="/"
              className=" text-pink-700 hover:text-gray-900 dark:hover:text-sky-500 -translate-x-6 translate-y-1"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
            <div className="gap-2 flex">
              <div>
                {" "}
                <NavLink to="/register">
                  <Button type="primary">Register</Button>
                </NavLink>
              </div>
              <div>
                <NavLink to="/login">
                  <Button type="primary">Sign In</Button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 flex flex-row ml-2">
          <div>
            <Button type="danger" icon={<PoweroffOutlined />}>
              Air Ticket
            </Button>
          </div>
          <div className="ml-6">
            <Button type="danger" icon={<PoweroffOutlined />}>
              Stays
            </Button>
          </div>
          <div className="ml-6">
            <Button type="danger" icon={<PoweroffOutlined />}>
              Travel Package
            </Button>
          </div>
          <div className="ml-6">
            <NavLink to="/guidedetails">
              <Button type="danger" icon={<PoweroffOutlined />}>
                Guide
              </Button>
            </NavLink>
          </div>
          <div className="ml-6">
            <Button type="danger" icon={<PoweroffOutlined />}>
              Activity
            </Button>
          </div>
          <div className="ml-6">
            <Button type="danger" icon={<PoweroffOutlined />}>
              Insuarance
            </Button>
          </div>
        </div>
        <hr className="mt-4" />
        <Carousel autoplay>
          <div>
            <img src={bg1} />
          </div>
          <div>
            <img src={bg2} />
          </div>
          <div>
            <img src={bg3} />
          </div>
          <div>
            <img src={bg4} />
          </div>
          <div>
            <img src={bg5} />
          </div>
        </Carousel>
        <br />
      </div>
    </>
  );
};

export default Dashbord;
