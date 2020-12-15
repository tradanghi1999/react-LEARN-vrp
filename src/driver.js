import React from "react";
import PropTypes from "prop-types";

const Driver = ({ data }) => {
  return (
    <div class="dr-container">
      <div class="dr-name">{data.name}</div>
      <div class="dr-total-route">{data.totalInMonth}</div>
      <div class="dr-today-route">{data.totalToday}</div>
    </div>
  );
};

Driver.propTypes = {
  data: PropTypes.element.isRequired
};

Driver.defaultProps = {
  data: {
    name: "Driver Unknown",
    totalInMonth: 0,
    totalToday: 0
  }
};

export default Driver;
