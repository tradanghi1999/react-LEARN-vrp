import React from "react";
import PropTypes from "prop-types";

const TimeTravel = props => {
  const { style, data } = props;
  let width =
    (data.time_value <= 0 ? 0.01 : data.time_value) * style.widthRatio;
  //console.log(width);
  if ((data.start_point == 0 || data.end_point == 0) && width > 10)
    width = width - 10;
  return (
    <div
      className={width < 12 ? "rt-link rt-link-mini" : "rt-link"}
      style={{ width: width + "px" }}
    >
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
    time_value: 0.25,
    start_point: 0,
    end_point: 1
  }
};

export default TimeTravel;
