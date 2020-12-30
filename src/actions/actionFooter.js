import API from "../lib/api";
import fConstants from "../constants/constantFooter";

export const choseCustomer = (data) => {
  //console.log(data)
  return {
    type: fConstants.CHOSE_CUSTOMMER,
    data,
  };
};
export const choseCustomerCtrl = (data) => {
  //console.log(data)
  return {
    type: fConstants.CHOSE_CUSTOMMER_CTRL,
    data,
  };
};
export const receiveData = (data) => {
    return {
      type: fConstants.FETCH_INITIAL_DATA,
        data,
    };
  };
  export const receivetimeline = (data) => {
    return {
      type: fConstants.FETCH_CHANGE_TIMELIME,
        data,
    };
  };

export const receiverouteTable = (data) => {
  return {
    type: fConstants.FETCH_CHANGE_RouteTabl,
      data,
  };
};
export const sortTaiXe = (prop,stat) => {
  return {
    type: fConstants.SORT_TAI_XE,
    prop,
    stat
  };
};


  
export default function fetchRoutes() {
    return (dispatch) => {
      return API.getServerCordinatingResult().toPromise()
        .then((response) => {
           console.log(response);
          dispatch(receiveData(response));
        //   console.log("hahha",response)
        })
        .catch((error) => console.log("FetchRoutes Axios Error", error));
    };
  }