import { from } from "rxjs";
import { map } from "rxjs/operators";
import ajax from "./ajax";

const customer_url = "https://mwg-vrp.herokuapp.com/api/getCustomers";

const order_url = "https://mwg-vrp.herokuapp.com/api/getOrders";

const API = {
  getCustomers() {
    let customer$ = from(ajax.getJson(customer_url));
    return customer$;
  },
  getOrders() {
    let order$ = from(ajax.getJson(order_url)).pipe(
      map(data => data),
      );
    return order$;
  }
};

export default API;
