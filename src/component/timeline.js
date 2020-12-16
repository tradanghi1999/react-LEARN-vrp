import React from "react";
import PropTypes from "prop-types";
import d3 from "d3";
import moment from "moment";
import $ from "jquery";
import utils from './../lib/utils'
//import "./lib/muti_timeline";
//import "./lib/muti-timeline.scss";

class Timeline extends React.Component {
  componentDidMount() {
    // $(this.tl).multiTimeline({
    //   start: "2015-02-01",
    //   end: "2015-02-02",
    //   zoom:4
    // });
  }
  render() {
    const {style, data} = this.props;
    let colNums = ((data.end_time = data.start_time)/ data.complexity/ 0.5).toFixed(0);
    let tds = utils.createWithNum(colNums, () => <td></td>)
    



    return <div className="editable-timeline" ref={e => (this.tl = e)} />;
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

export default Timeline;
