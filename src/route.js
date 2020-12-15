import React from "react";
import Depot from "./depot";
import End from "./end";
import Customer from "./customer";
import TimeTravel from "./timetravel";
import LateStart from "./late_start";
import PropTypes from "prop-types";

class Route extends React.Component {
  render() {
    return (
      <div className="rt-container">
        <LateStart />
        <Depot />
        <TimeTravel />
        <Customer />
        <TimeTravel />
        <End />
      </div>
    );
  }
}

export default Route;
