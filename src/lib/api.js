import { from, forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import ajax from "./ajax";
import routific from "./routific";

const customer_url = "https://mwg-vrp.herokuapp.com/api/getCustomers";

const order_url = "https://mwg-vrp.herokuapp.com/api/getOrders";

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
  getIndexRoutes() {
    let index$ = from(ajax.getJson(index_route_url)).pipe(
      map(data => data.routes)
    );
    return index$;
  },
  getServerCordinatingResult() {
    let result$ = forkJoin(
      this.getOrders(),
      this.getIndexRoutes(),
      this.getCustomers()
    ).pipe(
      map(([orders, routes, customers]) => {
        routific.import(orders, customers, routes);
        let timeTravelOnRoutes = routes.map(function(x, i) {
          return routific.getTimeTravelsOnRoute(i);
        });
        let serviceTimeOnRoutes = routes.map(function(x, i) {
          return routific.getServiceTimesOnRoute(i);
        });
        return {serviceTimeOnRoutes,timeTravelOnRoutes};
      })
    );
    return result$;
  }
};

export default API;
