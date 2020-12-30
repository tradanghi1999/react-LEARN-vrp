import * as constantOrders from "../constants/constantOrders";
import { fetchInitialDetailOrders } from "../api/api";

export const actionInitialDetailOrders = (json) => {
  return {
    type: constantOrders.FETCH_INITIAL_DETAIL_ORDERS,
    payload: json,
  };
};

export const getInitialDetailOrders = () => {
  return (dispatch) => {
    return fetchInitialDetailOrders()
      .then((response) => {
        dispatch(actionInitialDetailOrders(response.data.orders));
      })
      .catch((error) =>
        /console.log("Fetch Initial Detail Orders Axios Error", error)
      );
  };
};

export const actionGetSubOrders = (data) => {
  return {
    type: constantOrders.GET_SUB_ORDERS,
    data,
  };
};
