import { connect } from "react-redux";

import DrawerOrders from "../../components/Header/DrawerOrders";
import { actionGetSubOrders } from "../../actions/actionOrders";
import { receiveRoutesFromRandomOrders } from "../../actions/actionRoutes";
import { actionSubmitOrdersButton } from "../../actions/actionStatus";

const mapStateToProps = (state) => {
  return {
    initialOrders: state.reducerFetchOrders,
    subRoutes: state.reducerSubOrders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSubRoutes: (data) => {
      dispatch(actionGetSubOrders(data));
    },
    fetchRoutesFromSelectOrders: (data) => {
      dispatch(receiveRoutesFromRandomOrders(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerOrders);
