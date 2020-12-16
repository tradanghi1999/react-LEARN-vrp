import { from, forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import ajax from "./ajax";
import routific from "./routific";
import vrp from "./vrp";
import time from "./time";
import utils from "./utils";

// du lieu goc
const customer_url = "https://mwg-vrp.herokuapp.com/api/getCustomers";

// du lieu random
const order_url = "https://mwg-vrp.herokuapp.com/create/random/vehicles";

// du lieu fix cung
const index_route_url = "https://mwg-vrp.herokuapp.com/api/getIndexRoutes";

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
  getServerCordinatingResult() {
    // sau nay co the can fix lai de phu hop hon kq tu server
    let result$ = forkJoin(
      this.getOrders(),
      this.getVehicles(),
      this.getCustomers()
    ).pipe(
      map(([orders, vehicles, customers]) => {
        vrp.import(orders, vehicles);
        let routes = vrp.run();
        return [orders, routes, customers, vehicles];
      }),
      map(([orders, routes, customers, vehicles]) => {
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
          let d = {
            capacity_percentage: (
              pointOnRoutes[i]
                .filter(x => x.subtype == "customer")
                .map(x => x.data.weight)
                .reduce((a, b) => a + b) / vehicles.weight_limit
            ).toFixed(2),
            routeG: x
          };
          return d;
        });
        //console.log(pointOnRoutes);
        return rRG;
      })
    );
    return result$;
  }
};

export default API;
