import React from "react";
import Depot from "./depot";
import End from "./end";
import Customer from "./customer";
import TimeTravel from "./timetravel";
import LateStart from "./late_start";
import PropTypes from "prop-types";
import { selectCustomer } from "./../footer_action";

class Route extends React.Component {
  onClickCustomer = data => {
    const { cusId } = data;
    const { store } = this.context;
    let action = selectCustomer(cusId);
    if (store != null) store.dispatch(action);
    else console.log("No Store");
    //console.log(action);
  };

  onMaosWheelHandler = e => {
    console.log("Wheel");
    
  };

  render() {
    const { data, style } = this.props;
    //const { store } = this.context;
    //console.log(store);
    //console.log(selectCustomer);
    let points = data.map((x, i) => {
      switch (x.type) {
        case "link":
          return <TimeTravel key={i} style={style} data={x.data} />;
        case "point":
          if (x.subtype == "depot") return <Depot key={i} />;
          else if (x.subtype == "end") return <End key={i} />;
          else
            return (
              <Customer
                key={i}
                style={style}
                data={x.data}
                onClick={this.onClickCustomer}
              />
            );
      }
    });
    return (
      <div  className="rt-container">
        <LateStart />
        {points}
      </div>
    );
  }
}

Route.defaultProps = {
  style: {
    color: "#000",
    widthRatio: 100
  },
  data: [
    {
      type: "point",
      subtype: "depot"
    },
    {
      type: "link",
      data: {
        time_text: "1'",
        time_value: 0.03,
        start_point: 0,
        end_point: 6
      }
    },
    {
      type: "point",
      subtype: "customer",
      data: {
        id: 142169,
        name: "Long",
        service_time: 2.3,
        weight: 12
      }
    },
    {
      type: "link",
      data: {
        time_text: "1'",
        time_value: 0.03,
        start_point: 6,
        end_point: 12
      }
    },
    {
      type: "point",
      subtype: "customer",
      data: {
        id: 16058,
        name: "Chi Xuyen",
        service_time: 3.8,
        weight: 14
      }
    },
    {
      type: "link",
      data: {
        time_text: "12'",
        time_value: 0.2,
        start_point: 12,
        end_point: 0
      }
    },
    {
      type: "point",
      subtype: "end"
    }
  ]
};

export default Route;
