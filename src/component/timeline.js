import React from "react";
import PropTypes from "prop-types";
import d3 from "d3";
import moment from "moment";
import $ from "jquery";
import "./../lib/multi_timeline.js";
import "./../multi-timeline.scss";

class Timeline extends React.Component {
  componentDidMount() {}
  render() {
    return <div className="editable-timeline" ref={e => (this.state.tl = e)} />;
  }
}

Timeline.defaultProps = {
  style: {
    widthRatio: 100,
    width: "800px"
  },
  data: {
    complexity: 0.5,
    start_time: 8,
    end_time: 23
  }
};
