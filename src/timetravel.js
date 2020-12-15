import React from "react";
import PropTypes from "prop-types";

const TimeTravel = props => {
  const { style, data } = props;
  let width =
    (data.time_value <= 0 ? 0.01 : data.time_value) * style.widthRatio;
  return (
    <div class="rt-link" style={{ width: width + "px" }}>
      <div className="rt-shiptime">{data.time_text}</div>
      <div className="rt-line" />
    </div>
  );
};

TimeTravel.defaultProps = {
  style: {
    color: "#000",
    widthRatio: 100
  },
  data: {
    time_text: "15'",
    time_value: 0.25
  }
};

export default TimeTravel;
