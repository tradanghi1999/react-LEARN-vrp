import React from "react";
import PropTypes from "prop-types";
import Route from "./route";
import Driver from "./driver";
import Capactity from "./capacity";
import { Checkbox } from "antd";

class RouteRow extends React.Component {
  render() {
    return (
      <div className="routing-container">
        <div className="chk_wrapper">
          <Checkbox />
        </div>
        <Driver />
        <Capactity />
        <Route />
      </div>
    );
  }
}

RouteRow.defaultProps = {
  style: {
    color: "#000",
    widthRatio: 100
  },
  
};

export default RouteRow;
