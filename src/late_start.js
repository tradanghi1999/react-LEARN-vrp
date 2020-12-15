import React from "react";

const LateStart = props => {
  const { style, data } = props;
  let width =
    (data.time_value <= 0 ? 0.01 : data.time_value) * style.widthRatio;
  return <div style={{ width: width + "px" }} />;
};

LateStart.defaultProps = {
  style: {
    color: "#000",
    widthRatio: 100
  },
  data: {
    time_value: 0.25
  }
};

export default LateStart;
