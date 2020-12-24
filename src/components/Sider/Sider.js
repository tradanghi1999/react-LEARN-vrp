import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import { CarOutlined } from "@ant-design/icons";

import "../../css/Sider.scss";

const { Sider } = Layout;

function SiderComponent() {
  return (
    <Sider theme="light" breakpoint="xxl">
      <Link to="/" className="logo">
        <CarOutlined style={{ fontSize: "40px" }} />
      </Link>
    </Sider>
  );
}

export default SiderComponent;
