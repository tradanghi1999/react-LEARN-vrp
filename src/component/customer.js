import React from "react";
import PropTypes from "prop-types";

class Customer extends React.Component {
  constructor(props) {
    super(props);
    this._cus = React.createRef();
    this.state = {
      classNameCurrent: "rt-cus",
      className: "rt-cus",
      classNameMini: "rt-cus rt-cus-mini"
    };
  }
  onClickHandeler = e => {
    const { id } = this.props.data;
    e.preventDefault();
    const { classNameCurrent } = this.state;
    this.setState({ classNameCurrent: classNameCurrent + " rt-cus-clicked" });
    this.props.onClick({ cusId: id });
  };
  componentDidMount() {
    const { style, data } = this.props;
    const { className, classNameMini } = this.state;
    let width =
      (data.service_time <= 0 ? 0.01 : data.service_time) * style.widthRatio;
    if (width < 50) this.setState({ classNameCurrent: classNameMini });
    else this.setState({ classNameCurrent: className });
  }
  render() {
    //console.log(width);
    const { style, data } = this.props;
    let width =
      (data.service_time <= 0 ? 0.01 : data.service_time) * style.widthRatio;
    return (
      <div
        ref={this._cus}
        onClick={this.onClickHandeler}
        className={this.state.classNameCurrent}
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
