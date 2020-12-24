import { combineReducers } from "redux";

// import reduce footer
import cordinating from './Footer/cordinating';
import timeline from './Footer/timeline';
import routeTable from './Footer/routeTable';
import drivers from './Footer/drivers'
// import reduce footer

import reducerTest from "./reducerTest";
import {
  reducerAllRoutes,
  reducerFetchRoutes,
  reducerSubRoutes,
  reducerRoutesDriversOrders,
  reducerRoutesFromCustomerSelect,
} from "./reducerFetchRoutes";
import { reducerFetchOrders, reducerSubOrders } from "./reducerFetchOrders";
import { routeNumberProcessed } from "./reducerStatus";

const rootReducer = combineReducers({
  reducerFetchRoutes,
  reducerFetchOrders,
  reducerAllRoutes,
  reducerSubRoutes,
  reducerRoutesFromCustomerSelect,
  reducerRoutesDriversOrders,
  reducerSubOrders,

  routeNumberProcessed,

  ///reducer foooter
  cordinating,routeTable,timeline,drivers


});

export default rootReducer;
