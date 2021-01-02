import { connect } from "react-redux";

import Header from "../../components/Header/Header";
import { fetchInitialDetailOrders } from "../../actions/actionOrders";

import { fetchRoutes } from "../../actions/actionRoutes";

const mapStateToProps = (state) => {
  return {
    initialOrders: state.reducerFetchOrders,
    statusRouting: state.statusRouting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInitialDetailOrder: () => {
      dispatch(fetchInitialDetailOrders());
    },
    fetchRoutes: () => {
      dispatch(fetchRoutes());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
