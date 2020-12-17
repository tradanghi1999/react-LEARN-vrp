import React from "react";
import PropTypes from "prop-types";
import d3 from "d3";
import moment from "moment";
import $ from "jquery";
import utils from "./../lib/utils";
import time from "./../lib/time";

//import "./lib/muti_timeline";
//import "./lib/muti-timeline.scss";

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    const { style, data } = props;
    this.state = {
      style,
      data
    };
  }

  componentDidMount() {
    // $(this.tl).multiTimeline({
    //   start: "2015-02-01",
    //   end: "2015-02-02",
    //   zoom:4
    // });
    let container = document.getElementById("timeline-wrapper");
    container.addEventListener(
      "wheel",
      function(e) {
        e.preventDefault();
        if (e.ctrlKey) {
        } else {
          var containerScrollPosition = document.getElementById(
            "timeline-wrapper"
          ).scrollLeft;
          container.scrollTo({
            top: 0,
            left: containerScrollPosition + e.deltaY,
            behaviour: "smooth"
          });
        }
      },
      { passive: false }
    );
  }
  componetWillUnmount() {}
  render() {
    const { style, data } = this.state;
    let colNums = (
      (data.end_time = data.start_time) /
      data.complexity /
      0.5
    ).toFixed(0);
    //tds
    let tds = utils.createWithNum(colNums * 2, i => (
      <td key={i} className="time-period-sub" />
    ));
    // create ths
    let ths = [];
    for (let i = 0; i < colNums; i++)
      ths.push(
        <th
          colSpan={2}
          key={i}
          className="time-period"
          style={{ width: style.widthStandardRatio }}
        >
          {time.getTimeText(data.start_time + i * data.complexity)}
        </th>
      );

    //event

    return (
      <div id="timeline-wrapper" className="timeline-wrapper">
        <table className="timeline-table">
          <tbody>
            <tr>{tds}</tr>
          </tbody>
          <tfoot>
            <tr>{ths}</tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

// Timeline.defaultProps = {
//   style: {
//     widthStandardRatio: 100,
//     width: 800
//   },
//   data: {
//     complexity: 1,
//     start_time: 8,
//     end_time: 23
//   }
// };

export default Timeline;
