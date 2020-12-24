import React, { useEffect, useState } from "react";
import { Drawer, Table, Button } from "antd";

import {
  columnsRoutes,
  subColumnsRoutes,
  convertDataMatchFormTableRoutes,
} from "./constants";

function DrawerSubRoutes({
  routes,
  handleRoutes,
  handleSubRoute,
  onClose,
  visible,
}) {
  const [localRoutes, setLocalRoutes] = useState([]);

  useEffect(() => {
    const data = convertDataMatchFormTableRoutes(routes);
    setLocalRoutes(data);
    return () => {};
  }, [routes]);

  const parentColumns = [
    ...columnsRoutes,
    {
      key: "routing",
      width: 100,
      title: () => {
        return (
          <Button
            type="primary"
            block={true}
            onClick={() => {
              handleRoutes(routes);
            }}
            disabled={localRoutes.length === 0 ? true : false}
          >
            Xem tất cả
          </Button>
        );
      },
      render: (record, index) => (
        <Button
          type="primary"
          block={true}
          onClick={() => {
            const route = routes[index.key - 1];
            handleSubRoute(route);
          }}
        >
          Xem chỉ đường
        </Button>
      ),
    },
  ];
  const childrenColumns = [...subColumnsRoutes];

  return (
    <Drawer
      title={`Sub Routes - Tổng số tuyến: ${localRoutes.length}`}
      placement="left"
      key="left"
      width="70%"
      onClose={onClose}
      visible={visible}
      closable={true}
    >
      <Table
        columns={parentColumns}
        dataSource={localRoutes}
        expandable={{
          expandedRowRender: (record) => (
            <Table
              columns={childrenColumns}
              dataSource={record.routes}
              pagination={false}
            />
          ),
        }}
      />
    </Drawer>
  );
}

export default DrawerSubRoutes;
