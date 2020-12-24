import { connect } from "react-redux";

import WebMapView from "../../components/Content/WebMapView";

const mapStateToProps = (state) => {
  return {
    subRoutes: state.reducerSubRoutes,
    allRoutes: state.reducerAllRoutes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(WebMapView);
