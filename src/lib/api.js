import { from } from "rxjs";
import ajax from "./ajax";

const customer_url = "https://mwg-vrp.herokuapp.com/api/getCustomers";

const order_url = "https://mwg-vrp.herokuapp.com/api/getOrders";

const API = {
  getCustomers() {
    let customer$ = from(ajax.getJson(customer_url));
    return customer$;
  },
  getOrders() {
    let order$ = from(ajax.getJson(order_url));
    return order$;
  }
};

export default API;
