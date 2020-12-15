import { from, forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import ajax from "./ajax";
import routific from "./routific";
import vrp from "./vrp";

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

    let routesP = new Promise(function(resolve, reject) {});

    let result$ = forkJoin(
      this.getOrders(),
      this.getVehicles(),
      this.getCustomers()
    ).pipe(
      map(([orders, vehicles, customers]) => {
        //vrp.import(orders, vehicles);
        //let routes = vrp.run();
        //routific.import(orders, customers, routes);
        //return orders
        // let timeTravelOnRoutes = routes.map(function(x, i) {
        //   return routific.getTimeTravelsOnRoute(i);
        // });
        // let serviceTimeOnRoutes = routes.map(function(x, i) {
        //   return routific.getServiceTimesOnRoute(i);
        // });

        return orders;
      })
    );
    return result$;
  }
};

export default API;
