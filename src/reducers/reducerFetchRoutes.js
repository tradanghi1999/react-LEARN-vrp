import {
  GET_ALL_ROUTES,
  FETCH_ROUTES,
  GET_SUB_ROUTE_IN_ORIGINAL_ROUTES,
  FETCH_ROUTES_DRIVERS_ORDERS,
  GET_ROUTES_FROM_RANDOM_ORDERS,
} from "../constants/constantRoutes";

const reducerFetchRoutes = (state = [], action) => {
  switch (action.type) {
    case FETCH_ROUTES:
      return action.payload;
    default:
      return state;
  }
};

const reducerAllRoutes = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_ROUTES:
      return action.payload;
    default:
      return state;
  }
};

const reducerSubRoutes = (state = [], action) => {
  switch (action.type) {
    case GET_SUB_ROUTE_IN_ORIGINAL_ROUTES:
      return action.payload;
    default:
      return state;
  }
};

const reducerRoutesDriversOrders = (state = [], action) => {
  switch (action.type) {
    case FETCH_ROUTES_DRIVERS_ORDERS:
      return action.payload;
    default:
      return state;
  }
};

const reducerRoutesFromCustomerSelect = (state = [], action) => {
  switch (action.type) {
    case GET_ROUTES_FROM_RANDOM_ORDERS:
      return action.payload;
    default:
      return state;
  }
};

export {
  reducerAllRoutes,
  reducerFetchRoutes,
  reducerSubRoutes,
  reducerRoutesDriversOrders,
  reducerRoutesFromCustomerSelect,
};
