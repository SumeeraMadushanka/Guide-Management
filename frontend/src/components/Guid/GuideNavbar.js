import React from "react";
import { Button } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import logo from "../assets/logo.jpg";

import { NavLink, useParams } from "react-router-dom";

const UserNavbar = () => {
  const { username } = useParams();

  return (
    <div className=" container mx-auto mt-10 bg-slate-300">
      <div className="flex justify-between">
        <div className=" flex">
          <div className=" w-56">
            <img src={logo} alt="logo" />
          </div>
        </div>

        <div className="flex gap-2">
          <div>
            {" "}
            <NavLink
              to={`/user-dashboard/${localStorage.getItem(
                "username"
              )}/profile/${localStorage.getItem("id")}`}
            >
              <Button type="primary">Profile</Button>
            </NavLink>
          </div>

          <NavLink to="/home">
            <Button type="primary" title={"Hello " + username}>
              {username}
            </Button>
          </NavLink>
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
          <NavLink to={`/user-dashboard/${localStorage.getItem("username")}`}>
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
          <NavLink to="/dashbord">
            <Button type="danger" icon={<PoweroffOutlined />}>
              Insuarance
            </Button>
          </NavLink>
        </div>
      </div>
      <hr className="mt-4" />
    </div>
  );
};

export default UserNavbar;
