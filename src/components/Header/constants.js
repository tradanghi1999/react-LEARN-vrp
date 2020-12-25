export const columnsOrders = [
  {
    title: "Số thứ tự",
    dataIndex: "key",
  },
  {
    title: "Tên khách hàng",
    dataIndex: "name",
  },
  {
    title: "Địa chỉ",
    dataIndex: "place",
  },
  {
    title: "Cân nặng (kg)",
    dataIndex: "weight",
  },
  {
    title: "Thời gian phục vụ (h)",
    dataIndex: "serviceTime",
  },
  {
    title: "Thời gian khách nhận hàng (h)",
    dataIndex: "timeWindow",
  },
];

export const columnsRoutes = [
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

export const subColumnsRoutes = [
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

export const convertDataToMatchFormTableOrders = (orders) => {
  orders.splice(0, 1);

  let resultData = orders.map((order, index) => {
    const { id, name, place } = order;
    const { weight, serviceTime, timeWindow, long, lat } = order.order;
    return {
      key: index + 1,
      id,
      name,
      place,
      weight,
      serviceTime,
      timeWindow: `${timeWindow[0]} - ${timeWindow[1]}`,
      long,
      lat,
    };
  });

  return resultData;
};

export const convertDataMatchFormTableRoutes = (routes) => {
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
