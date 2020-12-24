import { from, forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import ajax from "./ajax";
import routific from "./routific";
import _ from "lodash";
import vrp from "./vrp";
import time from "./time";
import utils from "./utils";

// du lieu goc
const customer_url = "https://mwg-vrp.herokuapp.com/api/getCustomers";

// du lieu random
const order_url = "https://mwg-vrp.herokuapp.com/create/random/vehicles";

// du lieu fix cung
const index_route_url = "https://mwg-vrp.herokuapp.com/api/getIndexRoutes";

const API_Request_Constants = {
  CHUYEN_TRAI: "CHUYEN_TRAI",
  CHUYEN_PHAI: "CHUYEN_PHAI",
  DOI_CHO: "DOI_CHO"
};

const API_Request = {
  chuyenTrai(cusId) {
    return {
      type: API_Request_Constants.CHUYEN_TRAI,
      data: cusId
    };
  },
  chuyenPhai(cusId) {
    return {
      type: API_Request_Constants.CHUYEN_PHAI,
      data: cusId
    };
  },
  doiCho(cusId1, cusId2) {
    return {
      type: API_Request_Constants.DOI_CHO,
      data: [cusId1, cusId2]
    };
  }
};

const API = {
  getCustomers() {
    let customer$ = from(ajax.getJson(customer_url)).pipe(
      map(data => data.customers)
    );
    return customer$;
  },
  getOrders() {
    let order$ = from(ajax.getDb(order_url)).pipe(map(data => data));
    return order$;
  },
  getVehicles() {
    let vehicles = {
      weight_limit: 30,
      number: 8
    };
    let vehiclesP = new Promise(function(resolve, reject) {
      resolve(vehicles);
    });
    return from(vehiclesP).pipe(map(x => x));
  },
  getDrivers() {
    let drivers = [
      {
        id: 142025,
        name: "Nghĩa",
        total_inMonth: 35,
        total_inDay: 0
      },
      {
        id: 142188,
        name: "Cơ",
        total_inMonth: 35,
        total_inDay: 0
      },
      {
        id: 142171,
        name: "Thắng",
        total_inMonth: 35,
        total_inDay: 0
      },
      {
        id: 142173,
        name: "Cường",
        total_inMonth: 35,
        total_inDay: 0
      },
      {
        id: 142186,
        name: "Nga",
        total_inMonth: 35,
        total_inDay: 0
      },
      {
        id: 142169,
        name: "Long",
        total_inMonth: 35,
        total_inDay: 0
      },
      {
        id: 142179,
        name: "Trí",
        total_inMonth: 35,
        total_inDay: 0
      },
      {
        id: 142198,
        name: "Hưng",
        total_inMonth: 35,
        total_inDay: 0
      },
      {
        id: 16901,
        name: "Anh Ruy",
        total_inMonth: 35,
        total_inDay: 0
      },
      {
        id: 142168,
        name: "Trang",
        total_inMonth: 35,
        total_inDay: 0
      }
    ];

    let driverP = new Promise(function(resolve, reject) {
      resolve(drivers);
    });
    return from(driverP).pipe(map(x => x));
  },

  getServerCordinatingResult() {
    // sau nay co the can fix lai de phu hop hon kq tu server
    let result$ = forkJoin(
      this.getOrders(),
      this.getVehicles(),
      this.getCustomers(),
      this.getDrivers()
    ).pipe(
      map(([orders, vehicles, customers, drivers]) => {
        vrp.import(orders, vehicles);
        let routes = vrp.run();
        return [orders, routes, customers, vehicles, drivers];
      }),
      map(([orders, routes, customers, vehicles, drivers]) => {
        let pointOnRoutes = routes.map(function(r, i) {
          return r.map(function(n, j) {
            switch (j) {
              case 0:
                return {
                  type: "point",
                  subtype: "depot"
                };
              case r.length - 1:
                return {
                  type: "point",
                  subtype: "end"
                };
              default:
                return {
                  type: "point",
                  subtype: "customer",
                  data: {
                    id: orders[n].id,
                    name: customers.filter(x => x.id == orders[n].id)[0].name,
                    service_time: orders[n].order.ServiceTime,
                    weight: orders[n].order.weight
                  }
                };
            }
          });
        });

        let timeTravelsOnRoutes = routes.map(function(r, i) {
          return r
            .map(function(n, j) {
              switch (j) {
                case r.length - 1:
                  return {
                    type: "link",
                    data: {
                      time_text: "0",
                      time_value: -1,
                      start_point: r.length - 1,
                      end_point: -1
                    }
                  };
                default:
                  return {
                    type: "link",
                    data: {
                      time_text: time.getTimeText(
                        orders[n].timetravels[r[j + 1]]
                      ),
                      time_value: orders[n].timetravels[r[j + 1]],
                      start_point: n,
                      end_point: r[j + 1]
                    }
                  };
              }
            })
            .filter(x => x.data.time_value != -1);
        });

        let rG = routes.map(function(r, i) {
          return utils
            .interleave(pointOnRoutes[i], timeTravelsOnRoutes[i])
            .filter(function(n, j) {
              if (n == null) return false;
              return true;
            });
        });

        let rRG = rG.map((x, i) => {
          let driver;
          if (drivers[i] == null)
            driver = {
              id: 0,
              name: "Unknown",
              total_inMonth: 0,
              total_inDay: 0
            };
          else {
            driver = _.clone(drivers[i], true);
          }
          let d = {
            capacity_percentage: (
              pointOnRoutes[i]
                .filter(x => x.subtype == "customer")
                .map(x => x.data.weight)
                .reduce((a, b) => a + b) / vehicles.weight_limit
            ).toFixed(2),
            driver: driver,
            routeG: x
          };
          return d;
        });
        //console.log(pointOnRoutes);
        return rRG;
      })
    );
    return result$;
  },

  computeTransaction(routesAcordId, apiRequest) {
    let routeIndexContainCus;
    let routesClone;
    let cusIndex;
    switch (apiRequest.type) {
      case API_Request_Constants.CHUYEN_TRAI:
        routeIndexContainCus = routesAcordId.find(r =>
          r.includes(apiRequest.data)
        );

        routesClone = _.clone(routesAcordId, true);

        cusIndex = routesClone[routeIndexContainCus].find(cusId);
        if (cusIndex < 1) return routesAcordId;
        routesClone[routeIndexContainCus][cusIndex] =
          routesClone[routeIndexContainCus][cusIndex - 1];
        routesClone[routeIndexContainCus][cusIndex - 1] = cusId;
        return routesClone;

      case API_Request_Constant.CHUYEN_PHAI:
        routeIndexContainCus = routesAcordId.find(r =>
          r.includes(apiRequest.data)
        );

        routesClone = _.clone(routesAcordId, true);

        cusIndex = routesClone[routeIndexContainCus].find(cusId);
        if (cusIndex < 1) return routesAcordId;
        routesClone[routeIndexContainCus][cusIndex] =
          routesClone[routeIndexContainCus][cusIndex + 1];
        routesClone[routeIndexContainCus][cusIndex + 1] = cusId;
        return routesClone;

      case API_Request_Constants.DOI_CHO:
        let routeIndexContainCus1 = routesAcordId.find(r =>
          r.includes(apiRequest.data[0])
        );

        let routeIndexContainCus2 = routesAcordId.find(r =>
          r.includes(apiRequest.data[1])
        );

        routesClone = _.clone(routesAcordId, true);

        let cus1Index = routesClone[routeIndexContainCus1].find(
          apiRequest.data[0]
        );

        let cus2Index = routesClone[routeIndexContainCus2].find(
          apiRequest.data[1]
        );

        routesClone[routeIndexContainCus1][cus1Index] = apiRequest.data[1];
        routesClone[routeIndexContainCus2][cus2Index] = apiRequest.data[0];
        return routesClone;

      default:
        return routesAcordId;
    }
  }
};

export default API;
