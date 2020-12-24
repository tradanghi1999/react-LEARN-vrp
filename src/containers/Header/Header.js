import { connect } from "react-redux";

import Header from "../../components/Header/Header";
import { getInitialDetailOrders } from "../../actions/actionOrders";
import { fetchRoutes } from "../../actions/actionRoutes";

const mapStateToProps = (state) => {
  return {
    routesOfCustomerSelect: state.reducerRoutesFromCustomerSelect,
    subRoutes: state.reducerSubRoutes,
    allRoutes: state.reducerAllRoutes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInitialDetailOrder: () => {
      dispatch(getInitialDetailOrders());
    },
    fetchRoutes: () => {
      dispatch(fetchRoutes());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
