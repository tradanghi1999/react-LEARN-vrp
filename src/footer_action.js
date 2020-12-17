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
