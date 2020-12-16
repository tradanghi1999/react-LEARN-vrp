import React from "react";
import PropTypes from "prop-types";

const Driver = props => {
  const { data } = props;
  return (
    <div className="dr-container">
      <div className="dr-name">{data.name}</div>
      <div className="dr-total-route">{data.totalInMonth}</div>
      <div className="dr-today-route">{data.totalToday}</div>
    </div>
  );
};

Driver.propTypes = {
  data: PropTypes.object
};

Driver.defaultProps = {
  data: {
    name: "Driver Unknown",
    totalInMonth: 0,
    totalToday: 0
  }
};

export default Driver;
