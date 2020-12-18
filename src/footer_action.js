import fConstants from "./footer_constants";

export const loadCordinatingData = data => {
  return {
    type: fConstants.LOAD_CORDINATING_DATA,
    data: data
  };
};

export const selectCustomer = cusId => {
  return {
    type: fConstants.SELECT_CUSTOMER,
    cusId: cusId
  };
};

export const zoomTimeline = ({
  complexity = 1,
  start_time = 8,
  end_time = 23
}) => {
  return {
    type: fConstants.ZOOM_TIMELINE,
    complexity: complexity,
    start_time: start_time,
    end_time: end_time
  };
};
