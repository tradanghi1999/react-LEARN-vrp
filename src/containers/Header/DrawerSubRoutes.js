import { connect } from "react-redux";

import DrawerSubRoutes from "../../components/Header/DrawerSubRoutes";
import { actionSubRoutes, actionRoutes } from "../../actions/actionRoutes";

const mapStateToProps = (state) => {
  return {
    routes: state.reducerRoutesFromCustomerSelect,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubRoute: (data) => {
      dispatch(actionSubRoutes(data));
      dispatch(actionRoutes([]));
    },
    handleRoutes: (data) => {
      dispatch(actionRoutes(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerSubRoutes);
