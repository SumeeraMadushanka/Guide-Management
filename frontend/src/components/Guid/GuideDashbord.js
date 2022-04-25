import React from "react";

import { Carousel } from "antd";

import GuideNavbar from "./GuideNavbar";
import Header from "./Header";


import "antd/dist/antd.css";

// import "./Styles/Dashboard.css";
import u1 from "../assets/u1.jpg";
import u2 from "../assets/u2.jpg";
import u3 from "../assets/u3.jpg";
import u4 from "../assets/u4.jpg";
import u5 from "../assets/u5.jpg";


const UserDashbord = () => {
  return (
    <>
      <div className=" container mx-auto mt-2 ">
        <GuideNavbar />
        <Header/>
        <hr className="mt-4" />
        <Carousel autoplay>
          <div>
            <img src={u1} />
          </div>
          <div>
            <img src={u2} />
          </div>
          <div>
            <img src={u3} />
          </div>
          <div>
            <img src={u4} />
          </div>
          <div>
            <img src={u5} />
          </div>
        </Carousel>
        <br />
      </div>
    </>
  );
};

export default UserDashbord;
