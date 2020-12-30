import { from, forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import ajax from "./ajax";
import routific from "./routific";
import _ from "lodash";
import vrp from "./vrp";
import time from "./time";
import utils from "./utils";
import moment from "moment";

// du lieu goc
const customer_url = "https://mwg-vrp.herokuapp.com/api/getCustomers";

// du lieu random
const order_url = "https://mwg-vrp.herokuapp.com/api/getOrders";

// du lieu fix cung
const index_route_url = "https://mwg-vrp.herokuapp.com/api/getIndexRoutes";
const API_Request_Constants = {
  CHUYEN_TRAI: "CHUYEN_TRAI",
  CHUYEN_PHAI: "CHUYEN_PHAI",
  DOI_CHO: "DOI_CHO",
  GOC: "GOC"
};

const API_Request = {
  chuyenTrai(cusId) {
    return {
      type: API_Request_Constants.CHUYEN_TRAI,
      data: cusId,
      datetime: moment()
    };
  },
  chuyenPhai(cusId) {
    return {
      type: API_Request_Constants.CHUYEN_PHAI,
      data: cusId,
      datetime: moment()
    };
  },
  doiCho(cusId1, cusId2) {
    return {
      type: API_Request_Constants.DOI_CHO,
      data: [cusId1, cusId2],
      datetime: moment()
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
    let order$ = from(ajax.getDb(order_url)).pipe(
      map(data => {
        //onsole.log(data.orders);
        return data;
      })
    );
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

  getIndexRoutes() {
    let index$ = from(ajax.getJson(index_route_url)).pipe(
      map(d => {
        return d.routes;
      })
    );
    return index$;
  },
  getDrivers() {
    let drivers = [
      {
        id: 142025,
        name: "Nghĩa",
        total_inMonth: 35,
        total_inDay: 10
      },
      {
        id: 142188,
        name: "Cơ",
        total_inMonth: 35,
        total_inDay: 9
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
        total_inDay: 7
      },
      {
        id: 142186,
        name: "Nga",
        total_inMonth: 25,
        total_inDay: 5
      },
      {
        id: 142169,
        name: "Long",
        total_inMonth: 15,
        total_inDay: 0
      },
      {
        id: 142179,
        name: "Trí",
        total_inMonth: 20,
        total_inDay: 2
      },
      {
        id: 142198,
        name: "Hưng",
        total_inMonth: 35,
        total_inDay: 3
      },
      {
        id: 16901,
        name: "Anh Ruy",
        total_inMonth: 35,
        total_inDay: 1
      },
      {
        id: 142168,
        name: "Trang",
        total_inMonth: 35,
        total_inDay: 2
      }
    ];

    let driverP = new Promise(function(resolve, reject) {
      resolve(drivers);
    });
    return from(driverP).pipe(map(x => x));
  },

  getServerCordinatingResult(
    apiRequest = {
      type: API_Request_Constants.GOC
    }
  ) {
    switch (apiRequest.type) {
      case API_Request_Constants.GOC:
        let setCoord = d => {
          this.coord = d;
        };
        if (this.coord == null) {
          let coord$ = this.getRootServerCoordinatingResult();
          coord$.subscribe(d => setCoord(d));
          return coord$;
        }
        return this.getRootServerCoordinatingResult();
      default:
    }
    // sau nay co the can fix lai de phu hop hon kq tu server
  },

  getRootServerCoordinatingResult() {
    let rd = this.mapRenderData;
    let orders$ = this.getOrders();
    let indexRoutes$ = this.getIndexRoutes();
    let customer$ = this.getCustomers();
    let vehicles$ = this.getVehicles();
    let drivers$ = this.getDrivers();

    orders$.subscribe(o => {
      this.orders = o;
    });
    indexRoutes$.subscribe(r => {
      this.routes = r;
    });
    customer$.subscribe(c => {
      this.customers = c;
    });

    vehicles$.subscribe(v => {
      this.vehicles = v;
    });
    drivers$.subscribe(d => {
      this.drivers = d;
    });

    let result$ = forkJoin(
      orders$,
      indexRoutes$,
      customer$,
      vehicles$,
      drivers$
    ).pipe(
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

        //console.log('sing a song:' + pointOnRoutes);

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

        console.log(rRG);
        return rRG;
      })
    );
    //   map((orders, customers, vehicles, drivers) => {
    //     console.log(orders);
    //     //let render$ = rd(orders, routes, customers, vehicles, drivers);

    //     //return render$;
    //   })
    // );
    console.log(result$);
    return result$;
  },

  mapRenderData(orders, routes, customers, vehicles, drivers) {},

  getRoutesAcordId() {
    let result$ = forkJoin(this.getOrders(), this.getIndexRoutes()).pipe(
      map(([orders, routes]) => {
        return routes.map(r => {
          return r.map(function(nodes, i) {
            return orders[nodes].id;
          });
        });
      })
    );
    return result$;
  },

  toRoutesAccordId(orders, routes) {
    return routes.map(r => {
      return r.map(function(nodes, i) {
        return orders[nodes].id;
      });
    });
  },

  computeTransaction(routesAcordId, apiRequest) {
    let routeIndexContainCus;
    let routesClone;
    let cusIndex;
    let routesWithKey;

    switch (apiRequest.type) {
      case API_Request_Constants.CHUYEN_TRAI:
        routesWithKey = routesAcordId.map(function(r, i) {
          return {
            stt: i,
            nodes: r
          };
        });

        routeIndexContainCus = routesWithKey.filter(x =>
          x.nodes.includes(apiRequest.data)
        )[0].stt;
        routesClone = _.clone(routesAcordId, true);

        cusIndex = routesClone[routeIndexContainCus]
          .map((node, i) => {
            return {
              stt: i,
              node: node
            };
          })
          .filter(x => x.node == apiRequest.data)[0].stt;

        if (cusIndex < 2) return routesAcordId;
        routesClone[routeIndexContainCus][cusIndex] =
          routesClone[routeIndexContainCus][cusIndex - 1];
        routesClone[routeIndexContainCus][cusIndex - 1] = apiRequest.data;
        return routesClone;

      case API_Request_Constants.CHUYEN_PHAI:
        routesWithKey = routesAcordId.map(function(r, i) {
          return {
            stt: i,
            nodes: r
          };
        });

        routeIndexContainCus = routesWithKey.filter(x =>
          x.nodes.includes(apiRequest.data)
        )[0].stt;
        routesClone = _.clone(routesAcordId, true);

        cusIndex = routesClone[routeIndexContainCus]
          .map((node, i) => {
            return {
              stt: i,
              node: node
            };
          })
          .filter(x => x.node == apiRequest.data)[0].stt;
        if (cusIndex > routesClone[routeIndexContainCus].length - 2)
          return routesAcordId;
        routesClone[routeIndexContainCus][cusIndex] =
          routesClone[routeIndexContainCus][cusIndex + 1];
        routesClone[routeIndexContainCus][cusIndex + 1] = apiRequest.data;
        return routesClone;

      case API_Request_Constants.DOI_CHO: {
        let routeIndexContainCus1 = routesAcordId
          .map(function(r, i) {
            return {
              stt: i,
              nodes: r
            };
          })
          .filter(x => x.nodes.includes(apiRequest.data[0]))[0].stt;

        let routeIndexContainCus2 = routesAcordId
          .map(function(r, i) {
            return {
              stt: i,
              nodes: r
            };
          })
          .filter(x => x.nodes.includes(apiRequest.data[1]))[0].stt;

        routesClone = _.clone(routesAcordId, true);

        let cus1Index = routesClone[routeIndexContainCus1]
          .map((node, i) => {
            return {
              stt: i,
              node: node
            };
          })
          .filter(x => x.node == apiRequest.data[0])[0].stt;

        let cus2Index = routesClone[routeIndexContainCus2]
          .map((node, i) => {
            return {
              stt: i,
              node: node
            };
          })
          .filter(x => x.node == apiRequest.data[1])[0].stt;

        routesClone[routeIndexContainCus1][cus1Index] = apiRequest.data[1];

        routesClone[routeIndexContainCus2][cus2Index] = apiRequest.data[0];

        return routesClone.map(function(r, i) {
          return r.map(function(n, j) {
            if (i == routeIndexContainCus1 && j == cus1Index) {
              return apiRequest.data[1];
            }

            if (i == routeIndexContainCus2 && j == cus2Index) {
              return apiRequest.data[0];
            }

            return n;
          });
        });
      }

      default:
        return routesAcordId;
    }
  }
};

export default API;
