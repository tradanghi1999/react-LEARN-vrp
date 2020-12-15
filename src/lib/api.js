import { from } from "rxjs";
import ajax from "./ajax";

const customer_url = "https://mwg-vrp.herokuapp.com/api/getCustomers";

const API = {
  getCustomers() {
    let customer$ = from(ajax.getJson(customer_url));
    return customer$;
  }
};

export default API;
