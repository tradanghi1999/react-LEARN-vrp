import React from "react";
import PropTypes from "prop-types";
import RouteTable from "./route_tbl";
import Timeline from "./timeline";
import CordinatingHeader from "./cordinating_header";
class Cordinating extends React.Component {
  render() {
    return (
      <div>
        <div>
          <CordinatingHeader />
        </div>
        <div className="cordinating_body">
          <RouteTable />
          <div className="timeline-underlying">
            <div className="timeline-table-before" />
            <Timeline />
          </div>
        </div>
      </div>
    );
  }
}





export default Cordinating;
