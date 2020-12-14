import React from "react";
import "./timeline.css";

const Customer = ({
  style = {
    color: "#000",
    widthRatio: 100
  },
  data
}) => {
  let width =
    (data == null || data.ServiceTime <= 0 ? 0.01 : data.ServiceTime) *
    (style.widthRatio == null ? 100 : style.widthRatio);
  //console.log(width);

  return (
    <div
      className={width > 50 ? "rt-cus" : "rt-cus rt-cus-mini"}
      style={{
        width: width + "px",
        borderColor: style.color != null ? style.color : "#000",
        color: style.color != null ? style.color : "#000"
      }}
    >
      <div class="rt-cus-name">{data == null ? "" : data.name}</div>
    </div>
  );
};

export default Customer;
