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
          <div className="timeline-underlying">
            <div className="timeline-table-before" />
            <Timeline />
          </div>
        </div>
        <RouteTable />
      </div>
    );
  }
}
export default Cordinating;
