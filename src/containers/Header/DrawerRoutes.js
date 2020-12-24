import { connect } from "react-redux";

import DrawerRoutes from "../../components/Header/DrawerRoutes";
import {
  actionSubRoutes,
  actionRoutes,
  routeNumberProcessed,
} from "../../actions/actionRoutes";

const mapStateToProps = (state) => {
  return {
    routes: state.reducerFetchRoutes,
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
    processingRouting: (number) => {
      dispatch(routeNumberProcessed(number));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerRoutes);
