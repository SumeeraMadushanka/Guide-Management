import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import axios from "axios";
import { Button } from "antd";
import { NavLink } from "react-router-dom";

const GuideDetaiils = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      await axios
        .get("/api/guid/")
        .then((res) => setData(res?.data))
        .catch((error) => alert(error));
    })();
  }, []);

  const filterData = data.filter(
      (el) => el.username !== "admin"
  );

  return (
    <>
      <div className=" container mx-auto">
        <div className="site-card-wrapper border-2 border-green-700 p-6">
          <Row gutter={16}>
            {filterData.map((value, index) => {
              return (
                <div className=" border-2 border-sky-700">
                  <Col span={32}>
                    <Card title="Guider Details" bordered={false}>
                      <div className=" font-semibold  text-black text-lg">
                        {" "}
                        Full Name: {value.fullName}
                      </div>
                      <div className=" font-semibold  text-black text-lg">
                        {" "}
                        Address: {value.address}
                      </div>
                      <div className=" font-semibold  text-black text-lg">
                        {" "}
                        Age: {value.age}
                      </div>
                      <div className=" font-semibold  text-black text-lg">
                        {" "}
                        Contact No: {value.contactNo}
                      </div>
                      <div className=" font-semibold  text-black text-lg">
                        {" "}
                        Language: {value.language}
                      </div>
                      <div className=" font-semibold  text-black text-lg">
                        {" "}
                        Category: {value.category}
                      </div>
                      <div className=" font-semibold  text-black text-lg">
                        {" "}
                        Email: {value.email}
                      </div>
                      <div className="mt-4">
                        {" "}
                        <NavLink to={`/contactguide/${value._id}`}>
                        <Button type="primary">Contact Guide</Button>
                        </NavLink>
                      </div>
                    </Card>
                  </Col>
                </div>
              );
            })}
          </Row>
        </div>
      </div>
      <br />
    </>
  );
};

export default GuideDetaiils;
