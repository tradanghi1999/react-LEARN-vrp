import React, { useEffect, useState } from "react";
import { Drawer, Table, Button } from "antd";
import _ from "lodash";

import { columnsOrders, convertDataToMatchFormTableOrders } from "./constants";

function DrawerOrders({
  initialOrders,
  subRoutes,
  getSubRoutes,
  fetchRoutesFromSelectOrders,
  onClose,
  visible,
}) {
  const [orders, setOrders] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);
  const [localSubRoutes, setLocalSubRoutes] = useState([]);

  useEffect(() => {
    const orders = convertDataToMatchFormTableOrders(initialOrders);
    setOrders(orders);
    if (orders.length !== 0) {
      setLoadingTable(false);
    }
    return () => {};
  }, [initialOrders]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) =>
      setLocalSubRoutes(selectedRows),
  };

  const btnSubmitSubRoutes = () => {
    if (!_.isEqual(localSubRoutes, subRoutes)) {
      getSubRoutes(localSubRoutes);
      fetchRoutesFromSelectOrders(localSubRoutes);
    }
  };

  return (
    <Drawer
      title={`Tổng số đơn hàng: ${orders.length}`}
      placement="left"
      key="left"
      width="70%"
      onClose={onClose}
      visible={visible}
      closable={true}
      footer={
        <div style={{ textAlign: "right" }}>
          <Button
            type="primary"
            onClick={btnSubmitSubRoutes}
            disabled={localSubRoutes.length === 0 ? true : false}
          >
            Submit Orders
          </Button>
        </div>
      }
    >
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columnsOrders}
        dataSource={orders}
        scroll={{ y: 450 }}
        loading={loadingTable}
      />
    </Drawer>
  );
}

export default DrawerOrders;
