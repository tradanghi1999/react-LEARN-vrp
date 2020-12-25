import _ from "lodash";

const calHourMinutes = (time) => {
  const hour = Math.trunc(time);
  const minutes = Math.round(Number((time - hour).toFixed(2)) * 60);
  return { hour, minutes };
};

/**
 * in ra thoi gian service cua 1 tai xe tu api
 * @param {object} data
 */
const getServiceTimes = (data) => {
  let result = [];
  const { route } = data;
  for (let index = 0; index < route.length - 1; index++) {
    const { serviceTime } = route[index].order;
    result.push(serviceTime);
  }
  return result;
};

/**
 * in ra mang moi xen ke nhau tu 2 mang
 * conditions: arrayServiceTimes.length === arrayTravelTimes.length
 * @param {array} arrayServiceTimes khong lay service time cuoi cung
 * @param {array} arrayTravelTimes
 */
const mergeTwoArraysWithAlternatingValues = (
  arrayServiceTimes,
  arrayTravelTimes
) => {
  let run = 0,
    first = 0,
    second = 0;
  let newArr = [];
  while (run < arrayServiceTimes.length + arrayTravelTimes.length) {
    if (first > second) {
      newArr[run] = arrayTravelTimes[second];
      second++;
    } else {
      newArr[run] = arrayServiceTimes[first];
      first++;
    }
    run++;
  }

  return newArr;
};

/**
 * in ra thoi gian travel va service cua 1 tai xe
 * @param {number} milestoneTime moc thoi gian, vd: 8h
 * @param {array} arrayPeriod khoang thoi gian cua cac su kien (travel, service)
 */
const handleDriverTime = (milestoneTime, arrayPeriod) => {
  const temponaryArrayTime = arrayPeriod.map((item) => {
    milestoneTime += item;
    milestoneTime = Math.round(milestoneTime * 100) / 100;
    return milestoneTime;
  });

  let result = [];
  for (let index = 0; index < temponaryArrayTime.length - 1; index++) {
    const element = temponaryArrayTime[index];
    const nextElement = temponaryArrayTime[index + 1];
    result.push([element, nextElement]);
  }
  return result;
};

/**
 * in ra thoi gian travel va service cua nhieu tai xe
 * @param {array} dataRoutes
 */
const handleDriverTimes = (dataRoutes) => {
  const result = [];
  const dataDrivers = handleResourcesBryntumScheduler(dataRoutes);

  dataDrivers.forEach((item) => {
    const serviceTimes = getServiceTimes(item);
    const { timeTravels } = item;
    const arrayPeriod = mergeTwoArraysWithAlternatingValues(
      serviceTimes,
      timeTravels
    );
    const driverTime = handleDriverTime(8, arrayPeriod);
    result.push(driverTime);
  });

  return result;
};

/**
 * in ra chi tiet order cua all routes
 * @param {*} dataRoutes
 * @param {*} driverTimes
 */
const handleOrdersRoute = (dataRoutes, driverTimes) => {
  let ordersData = [],
    timesData = [];

  (function handleOrdersAndTimesData() {
    driverTimes.forEach((itemDriverTimes) => {
      let temponaryDataTimes = [];
      itemDriverTimes.forEach((subItemDriverTimes, indexItemDriverTimes) => {
        if (indexItemDriverTimes % 2 !== 0) {
          temponaryDataTimes.push(subItemDriverTimes);
        }
      });
      timesData.push(temponaryDataTimes);
    });

    dataRoutes.forEach((itemDataRoutes) => {
      const { route } = itemDataRoutes;
      let temponaryRoute = [];
      for (let index = 1; index < route.length - 1; index++) {
        temponaryRoute.push(route[index]);
      }
      ordersData.push(temponaryRoute);
    });
  })();

  const main = () => {
    const newOrdersData = ordersData.map((item, index) => {
      const newItem = item.map((subItem, subIndex) => {
        const cloneSubItem = _.cloneDeep(subItem);
        cloneSubItem.order.detailServiceTime = timesData[index][subIndex];

        return cloneSubItem;
      });

      return newItem;
    });

    return newOrdersData;
  };

  const result = main();
  return result;
};

/**
 * resources cua timeline
 * @param {array} dataRoutes
 */
export const handleResourcesBryntumScheduler = (dataRoutes) => {
  const result = dataRoutes.map((dataRoute, index) => {
    const {
      id,
      name,
      ngay,
      thang,
      capacity,
      weightOrders,
      timeTravels,
      route,
    } = dataRoute;

    return {
      id,
      name,
      ngay,
      thang,
      capacity,
      weightOrders,
      timeTravels,
      route,
    };
  });

  return result;
};

/**
 * events cua timeline
 * @param {array} dataRoutes
 */
export const handleEventsBryntumScheduler = (dataRoutes) => {
  let events = [];

  const driverTimes = handleDriverTimes(dataRoutes);
  const ordersRoutes = handleOrdersRoute(dataRoutes, driverTimes);

  dataRoutes.forEach((item, index) => {
    const { id: idDriver, ngay, thang, capacity, weightOrders } = item;
    const ordersRoute = ordersRoutes[index];
    ordersRoute.forEach((subItem, subIndex) => {
      const { id: idCustomer, name: nameCustomer } = subItem;
      const {
        detailServiceTime,
        weight,
        serviceTime,
        timeWindow,
      } = subItem.order;
      const [startDate, endDate] = detailServiceTime;

      const { hour: hourStart, minutes: minutesStart } = calHourMinutes(
        startDate
      );
      const { hour: hourEnd, minutes: minutesEnd } = calHourMinutes(endDate);
      console.log(hourStart, minutesStart);
      console.log(hourEnd, minutesEnd);

      const event = {
        id: idCustomer,
        resourceId: idDriver,
        name: nameCustomer,
        weight,
        serviceTime,
        timeWindow,
        detailServiceTime,
        // startDate: new Date(2020, 0, 21, startDate),
        // endDate: new Date(2020, 0, 21, endDate),
        startDate: new Date(2020, 11, 22, hourStart, minutesStart),
        endDate: new Date(2020, 11, 22, hourEnd, minutesEnd),
      };

      events.push(event);
      console.log(event);
    });
  });

  return events;
};
