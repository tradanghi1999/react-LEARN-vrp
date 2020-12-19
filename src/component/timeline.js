import React from "react";
import PropTypes from "prop-types";
import d3 from "d3";
import moment from "moment";
import $ from "jquery";
import utils from "./../lib/utils";
import time from "./../lib/time";
import { useEffect, useState } from "react";
import _ from "lodash";

//import "./lib/muti_timeline";
//import "./lib/muti-timeline.scss";

const Timeline = props => {
  const [style, setStyle] = useState(props.style);
  const [data, setData] = useState(props.data);
  //console.log(style.scrollTo);

  const onWheelHandler = e => {
    //const { data } = this.state;

    
  };

  useEffect(() => {
    let container = document.getElementById("timeline-wrapper");
    //container.scrollLeft = style.scrollTo;
    var containerScrollPosition = document.getElementById(
      "timeline-wrapper"
    ).scrollLeft;
    container.scrollTo({
      top: 0,
      left: containerScrollPosition + props.style.scrollTo,
      behaviour: "smooth"
    });


    container.addEventListener(
      "wheel",
      function(e) {
        e.preventDefault();

        // if (e.ctrlKey) {
        //   if (e.deltaY < 0) {
        //     if (data.complexity >= 0.5) {
        //       setData({
        //         complexity: data.complexity / 2,
        //         start_time: data.start_time,
        //         end_time: data.end_time
        //       });
        //     }
        //   } else {
        //     if (data.complexity <= 1) {
        //       setData({
        //         complexity: data.complexity * 2,
        //         start_time: data.start_time,
        //         end_time: data.end_time
        //       });
        //     }
        //   }
        // } else {
        
        // }
      },
      { passive: false }
    );
  }, []);

  let colNums = (
    (data.end_time - data.start_time) /
    data.complexity /
    0.5
  ).toFixed(0);
  //tds
  let tds = utils.createWithNum(colNums, i => (
    <td key={i} className="time-period-sub" />
  ));
  // create ths
  let ths = [];
  for (let i = 0; i < colNums / 2; i++) {
    let hour = data.start_time + i * data.complexity;
    //if (hour > 24) break;
    ths.push(
      <th
        colSpan={2}
        key={i}
        className="time-period"
        style={{ width: style.widthStandardRatio }}
      >
        {time.getTimeText(hour)}
      </th>
    );
  }

  return (
    <div
      onWheel={this.onWheelHandler}
      id="timeline-wrapper"
      className="timeline-wrapper"
    >
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
};

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
