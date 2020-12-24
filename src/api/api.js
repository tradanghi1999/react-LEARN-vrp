import axios from "axios";
import _ from "lodash";

const arrayStringToNumber = (arr) => arr.map(Number);

export const fetchRoutesDriversOrders = async () => {
  try {
    const response = await axios.get(
      "https://mwg-vrp.herokuapp.com/api/getDriverWithOrders"
    );
    return response;
  } catch (error) {
    console.log("Error fetch drivers with orders", error);
  }
};

export const fetchInitialDetailOrders = async () => {
  try {
    const response = await axios.get(
      "https://mwg-vrp.herokuapp.com/api/getDetailOrders"
    );
    return response;
  } catch (error) {
    console.error("Error fetch initial detail orders", error);
  }
};

export const serFetchRoutes = async () => {
  try {
    const response = await axios.get(
      "https://mwg-vrp.herokuapp.com/api/getRoutes"
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const fetchRouteFromRandomOrder = async (data) => {
  try {
    const newData = data.map((item) => {
      const cloneItem = _.cloneDeep(item);
      const { timeWindow } = cloneItem;
      const newTimeWindow = timeWindow.split("-");

      cloneItem.timeWindow = arrayStringToNumber(newTimeWindow);

      delete cloneItem.key;

      return cloneItem;
    });

    const response = await axios.post(
      "https://mwg-vrp.herokuapp.com/api/postSubOrders",
      { data: newData }
    );

    return response;
  } catch (error) {
    console.error("API post subOrders error: ", error);
  }
};
