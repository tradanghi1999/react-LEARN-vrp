import React, { useEffect, useState } from "react";
import { Drawer, Spin, Table, Button } from "antd";

const columns = [
  { title: "Tuyến đường", dataIndex: "key", key: "key" },
  {
    title: "Số khách hàng",
    dataIndex: "totalCustomers",
    key: "totalCustomers",
  },
  {
    title: "Tổng cân nặng (kg)",
    dataIndex: "totalWeight",
    key: "totalWeight",
  },
];

const subColumns = [
  { title: "Tên khách hàng", dataIndex: "name", key: "name" },
  { title: "Địa chỉ", dataIndex: "place", key: "place" },
  { title: "Cân nặng (kg)", dataIndex: "weight", key: "weight" },
  {
    title: "Thời gian phục vụ (h)",
    dataIndex: "serviceTime",
    key: "serviceTime",
  },
  {
    title: "Thời gian nhận hàng (h)",
    dataIndex: "timeWindow",
    key: "timeWindow",
  },
];

const convertDataMatchFormTable = (routes) => {
  let newRoutes = [];

  for (let i = 0; i < routes.length; i++) {
    const subRoutes = routes[i];
    const detailRoutes = [];

    for (let j = 1; j < subRoutes.length - 1; j++) {
      const order = subRoutes[j];
      const { id, name, place } = order;
      const { long, lat, serviceTime, timeWindow, weight } = order.order;

      detailRoutes.push({
        key: j,
        id,
        name,
        place,
        weight,
        serviceTime,
        timeWindow: `${timeWindow[0]} - ${timeWindow[1]}`,
        long,
        lat,
      });
    }

    let totalWeight = 0;
    detailRoutes.forEach((order) => (totalWeight += order.weight));

    newRoutes.push({
      key: i + 1,
      totalCustomers: detailRoutes.length,
      totalWeight,
      routes: detailRoutes,
    });
  }

  return newRoutes;
};

function DrawerRoutes({
  routes,
  handleSubRoute,
  handleRoutes,
  processingRouting,
  onClose,
  visible,
}) {
  const [stateRoutes, setStateRoutes] = useState([]);
  const [spinning, setSpinning] = useState(true);

  useEffect(() => {
    const data = convertDataMatchFormTable(routes);
    setStateRoutes(data);
    return () => {
      setSpinning(false);
    };
  }, [routes]);

  const parentColumns = [
    ...columns,
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
            const temponaryRoutes = routes[index.key - 1];
            processingRouting(index.key);
            handleSubRoute(temponaryRoutes);
          }}
        >
          Xem chỉ đường
        </Button>
      ),
    },
  ];
  const childrenColumns = [...subColumns];

  return (
    <Drawer
      title={`Tổng số tuyến: ${stateRoutes.length}`}
      placement="left"
      key="left"
      width="70%"
      onClose={onClose}
      visible={visible}
      closable={true}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ flexGrow: 1 }}>
          <Spin
            spinning={spinning}
            tip="Đang lấy dữ liệu, xin vui lòng chờ ..."
          >
            <Table
              columns={parentColumns}
              dataSource={stateRoutes}
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
          </Spin>
        </div>
      </div>
    </Drawer>
  );
}

export default DrawerRoutes;
