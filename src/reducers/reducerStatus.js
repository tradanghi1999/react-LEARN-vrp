import { ROUTE_NUMBER_PROCESSED } from "../constants/constantRoutes";

export const routeNumberProcessed = (state = 0, action) => {
  switch (action.type) {
    case ROUTE_NUMBER_PROCESSED:
      return action.payload;
    default:
      return state;
  }
};
