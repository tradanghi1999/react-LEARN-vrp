import React from "react";
import PropTypes from "prop-types";

const Customer = props => {
  const { style, data } = props;
  let width =
    (data.ServiceTime <= 0 ? 0.01 : data.ServiceTime) * style.widthRatio;
  //console.log(width);

  return (
    <div
      className={width > 50 ? "rt-cus" : "rt-cus rt-cus-mini"}
      style={{
        width: width + "px",
        borderColor: style.color,
        color: style.color
      }}
    >
      <div className="rt-cus-name noselect">{data.name}</div>
    </div>
  );
};

Customer.propTypes = {
  style: PropTypes.element.isRequired,
  data: PropTypes.element.isRequired
};

Customer.defaultProps = {
  style: {
    color: "#000",
    widthRatio: 100
  },
  data: {
    ServiceTime: 0,
    name: "Nghiay"
  }
};

export default Customer;
