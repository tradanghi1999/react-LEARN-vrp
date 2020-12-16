import React from "react";
import PropTypes from "prop-types";
import Route from "./route";
import Driver from "./driver";
import Capactity from "./capacity";
import { Checkbox } from "antd";

class RouteRow extends React.Component {
  render() {
    const { style } = this.props;
    return (
      <div className="routing-container">
        <div className="chk_wrapper">
          <Checkbox />
        </div>
        <Driver />
        <Capactity
          data={{
            percentage: this.props.data.route_data.capacity_percentage * 100
          }}
        />
        <Route style={style} />
      </div>
    );
  }
}

RouteRow.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object
};

RouteRow.defaultProps = {
  style: {
    color: "#000",
    widthRatio: 100
  },
  data: {
    route_data: {
      capacity_percentage: "0",
      routeG: null
    }
  }
};

export default RouteRow;
