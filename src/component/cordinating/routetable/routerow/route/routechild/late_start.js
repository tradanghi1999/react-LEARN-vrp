import React from "react";
import PropTypes from "prop-types";
const LateStart = props => {
  const { style, data } = props;
  let width =
    (data.time_value <= 0 ? 0.01 : data.time_value) * style.widthRatio;
  let minWidth = data.time_value_min * style.widthRatio;
  let maxWidth = data.time_value_max * style.widthRatio;
  return (
    <div
      className="late_start"
      style={{
        minWidth: minWidth > 10 ? minWidth : 10 + "px",
        maxWidth: maxWidth + "px"
      }}
    />
  );
};

LateStart.defaultProps = {
  style: {
    color: "#000",
    widthRatio: 100
  },
  data: {
    time_value: 0.25,
    time_value_min: 0,
    time_value_max: 0.5
  }
};

export default LateStart;
