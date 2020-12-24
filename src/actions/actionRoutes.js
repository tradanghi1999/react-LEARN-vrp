import * as constantsRoutes from "../constants/constantRoutes";
import {
  serFetchRoutes,
  fetchRoutesDriversOrders,
  fetchRouteFromRandomOrder,
} from "../api/api";

export const receiveRoutes = (json) => {
  return {
    type: constantsRoutes.FETCH_ROUTES,
    payload: json,
  };
};

export function fetchRoutes() {
  return (dispatch) => {
    return serFetchRoutes()
      .then((response) => {
        dispatch(receiveRoutes(response.data.routes));
      })
      .catch((error) => console.log("FetchRoutes Axios Error", error));
  };
}

export const actionSubRoutes = (data) => {
  return {
    type: constantsRoutes.GET_SUB_ROUTE_IN_ORIGINAL_ROUTES,
    payload: data,
  };
};

export const actionRoutes = (data) => {
  return {
    type: constantsRoutes.GET_ALL_ROUTES,
    payload: data,
  };
};

export const routeNumberProcessed = (data) => {
  return {
    type: constantsRoutes.ROUTE_NUMBER_PROCESSED,
    payload: data,
  };
};

export const actionRoutesDriversOrders = (json) => {
  return {
    type: constantsRoutes.FETCH_ROUTES_DRIVERS_ORDERS,
    payload: json,
  };
};

export const receiveRoutesDriversOrders = () => {
  return (dispatch) => {
    return fetchRoutesDriversOrders()
      .then((response) => {
        dispatch(actionRoutesDriversOrders(response.data.data));
      })
      .catch((err) => {
        console.log("Fetch Routes-Drivers-Orders Axios Error", err);
      });
  };
};

export const actionRoutesFromRandomOrders = (json) => {
  return {
    type: constantsRoutes.GET_ROUTES_FROM_RANDOM_ORDERS,
    payload: json,
  };
};

export const receiveRoutesFromRandomOrders = (data) => {
  return (dispatch) => {
    return fetchRouteFromRandomOrder(data)
      .then((response) => {
        dispatch(actionRoutesFromRandomOrders(response.data.routes));
      })
      .catch((err) => console.log("Fetch routes from random orders", err));
  };
};
