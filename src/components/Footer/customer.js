import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import cordinating from "../reducers/cordinating";

class Customer extends React.Component {
  constructor(props) {
    super(props);
    // this._cus = React.createRef();
    this.state = {
      classNameCurrent: "rt-cus",
      className: "rt-cus",
      classNameMini: "rt-cus rt-cus-mini",
      classNameOnClickMini:"rt-cus rt-cus-mini rt-cus-clicked",
      classNameOnClick:"rt-cus rt-cus-clicked",
    };
  }
  onClickHandeler = (e) => {
    e.preventDefault();
    const {choseCustomer,data,choseCustomerCtrl} =this.props;
    console.log("choseCustomerCtrl",choseCustomerCtrl)
    if(e.ctrlKey)
    {
      choseCustomerCtrl(data.id)
    }
     else{
       choseCustomer(data.id);
      }
  };
  render() {
    
    // console.log(width);
   
    const { style, data,cordinating } = this.props;
    console.log("render lan n,",cordinating[0]);
    var width =
      (data.service_time <= 0 ? 0.01 : data.service_time) * style.widthRatio;
      let  classNameprops = ""
      if(data.id===cordinating[0] || data.id===cordinating[1]){
          if(width > 50)
          {
            classNameprops=this.state.classNameOnClick
          }
          else classNameprops=this.state.classNameOnClickMini
      }else{
        if(width > 50)
        {
          classNameprops=this.state.className
        }
        else classNameprops=this.state.classNameMini
      }
    return (
            <div 
            ref={this._cus}
            onClick={(e)=>this.onClickHandeler(e)}
            className={classNameprops}
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
    id: 0,
  }
};

const mapStateToProps = (state) => {
  return {
    cordinating: state.cordinating,
    // drivers: state.drivers,
  };
};


// co the them id order
export default connect(mapStateToProps, null)(Customer);
