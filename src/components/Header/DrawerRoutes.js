import React, { useEffect, useState } from "react";
import { Drawer, Table, Button } from "antd";

import {
  columnsRoutes,
  subColumnsRoutes,
  convertDataMatchFormTableRoutes,
} from "./constants";

function DrawerRoutes({
  routes,
  handleRoutes,
  handleSubRoute,
  processingRouting,
  onClose,
  visible,
}) {
  const [stateRoutes, setStateRoutes] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);

  useEffect(() => {
    const data = convertDataMatchFormTableRoutes(routes);
    setStateRoutes(data);
    return () => {
      setLoadingTable(false);
    };
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
              processingRouting("all");
              handleRoutes(routes);
            }}
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
            processingRouting(index.key);
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
      title={`Routes - Tổng số tuyến: ${stateRoutes.length}`}
      placement="left"
      key="left"
      width="70%"
      onClose={onClose}
      visible={visible}
      closable={true}
    >
      <Table
        columns={parentColumns}
        dataSource={stateRoutes}
        loading={loadingTable}
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

export default DrawerRoutes;
