import React from "react";
import PropTypes from "prop-types";
import Route from "./route";
import Driver from "./driver";
import Capactity from "./capacity";
import { Checkbox } from "antd";

class RouteRow extends React.Component {
  render() {
    const { style } = this.props;
    const { capacity_percentage, routeG } = this.props.data.route_data;
    return (
      <div className="routing-container">
        <div className="chk_wrapper">
          <Checkbox />
        </div>
        <Driver />
        <Capactity
          data={{
            percentage: capacity_percentage * 100
          }}
        />
        <Route style={style} data={routeG} />
      </div>
    );
  }
}

RouteRow.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object
};

RouteRow.defaultProps = {
  style: {
    color: "#000",
    widthRatio: 100
  },
  data: {
    route_data: {
      capacity_percentage: "0",
      routeG: [
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
            end_point: 3
          }
        },
        {
          type: "point",
          subtype: "customer",
          data: {
            id: 142171,
            name: "Thang",
            service_time: 3.8,
            weight: 6
          }
        },
        {
          type: "link",
          data: {
            time_text: "1'",
            time_value: 0.03,
            start_point: 3,
            end_point: 10
          }
        },
        {
          type: "point",
          subtype: "customer",
          data: {
            id: 1125,
            name: "Anh Hieu",
            service_time: 1.1,
            weight: 13
          }
        },
        {
          type: "link",
          data: {
            time_text: "11'",
            time_value: 0.19,
            start_point: 10,
            end_point: 0
          }
        },
        {
          type: "point",
          subtype: "end"
        }
      ]
    }
  }
};

export default RouteRow;
