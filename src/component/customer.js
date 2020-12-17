import React from "react";
import PropTypes from "prop-types";

class Customer extends React.Component {
  onClickHandeler = e => {
    const { id } = this.props.data;
    e.preventDefault();
    this.props.onClick({ cusId: id });
  };
  render() {
    const { style, data } = this.props;
    let width =
      (data.service_time <= 0 ? 0.01 : data.service_time) * style.widthRatio;
    //console.log(width);

    return (
      <div onClick={this.onClickHandeler}
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
  }
}

Customer.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object
};

Customer.defaultProps = {
  style: {
    color: "#000",
    widthRatio: 100
  },
  data: {
    service_time: 0,
    name: "Nghiay",
    id: 0
  }
};
// co the them id order

export default Customer;
