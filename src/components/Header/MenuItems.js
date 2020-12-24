import React from "react";
import { Menu, Badge } from "antd";
import { DropboxOutlined, EnterOutlined } from "@ant-design/icons";

function MenuItems({
  routeNumberProcessed,
  handleTabOrders,
  handleTabRoutes,
  handleTabSubRoutes,
}) {
  return (
    <Menu theme="light" mode="horizontal">
      <Menu.Item
        key="orders"
        title="Danh sách Order"
        icon={<DropboxOutlined />}
        onClick={handleTabOrders}
      >
        Orders
      </Menu.Item>
      <Menu.Item
        key="routes"
        title="Danh sách tuyến đường"
        icon={<EnterOutlined />}
        onClick={handleTabRoutes}
      >
        <Badge count={routeNumberProcessed}>Routes</Badge>
      </Menu.Item>
      <Menu.Item
        key="subRoutes"
        title="Danh sách tuyến đường con"
        icon={<EnterOutlined />}
        onClick={handleTabSubRoutes}
      >
        Sub Routes
      </Menu.Item>
    </Menu>
  );
}

export default MenuItems;
