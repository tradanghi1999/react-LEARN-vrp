import _ from "lodash";

import {
  FETCH_INITIAL_DETAIL_ORDERS,
  GET_SUB_ORDERS,
} from "../constants/constantOrders";

const reducerFetchOrders = (state = [], action) => {
  switch (action.type) {
    case FETCH_INITIAL_DETAIL_ORDERS:
      return _.cloneDeep(action.payload);
    default:
      return state;
  }
};

const reducerSubOrders = (state = [], action) => {
  switch (action.type) {
    case GET_SUB_ORDERS:
      return _.cloneDeep(action.data);
    default:
      return state;
  }
};

export { reducerFetchOrders, reducerSubOrders };
