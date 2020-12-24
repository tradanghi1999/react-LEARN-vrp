import React, { useState, useEffect } from "react";
import { Layout } from "antd";

import "../../css/Header.scss";
import MenuItems from "../../containers/Header/MenuItems";
import DrawerOrders from "../../containers/Header/DrawerOrders";
import DrawerRoutes from "../../containers/Header/DrawerRoutes";
import DrawerSubRoutes from "../../containers/Header/DrawerSubRoutes";

const { Header } = Layout;

function HeaderComponent({
  fetchInitialDetailOrder,
  fetchRoutes,
  subRoutes,
  allRoutes,
  routesOfCustomerSelect,
}) {
  const [visibleOrders, setVisibleOrders] = useState(false);
  const [visibleRoutes, setVisibleRoutes] = useState(false);
  const [visibleSubRoutes, setVisibleSubRoutes] = useState(false);

  useEffect(() => {
    fetchInitialDetailOrder();
    fetchRoutes();
    return () => {};
  }, [fetchInitialDetailOrder, fetchRoutes]);

  useEffect(() => {
    if (routesOfCustomerSelect.length !== 0) {
      setVisibleSubRoutes(true);
      setVisibleOrders(false);
    }
    return () => {};
  }, [routesOfCustomerSelect]);

  useEffect(() => {
    return () => {
      setVisibleRoutes(false);
      setVisibleSubRoutes(false);
    };
  }, [subRoutes, allRoutes]);

  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%", padding: 0 }}>
      <MenuItems
        handleTabOrders={() => setVisibleOrders(true)}
        handleTabRoutes={() => setVisibleRoutes(true)}
        handleTabSubRoutes={() => setVisibleSubRoutes(true)}
      />
      <DrawerOrders
        onClose={() => setVisibleOrders(false)}
        visible={visibleOrders}
      />
      <DrawerRoutes
        onClose={() => setVisibleRoutes(false)}
        visible={visibleRoutes}
      />
      <DrawerSubRoutes
        onClose={() => setVisibleSubRoutes(false)}
        visible={visibleSubRoutes}
      />
    </Header>
  );
}

export default HeaderComponent;
