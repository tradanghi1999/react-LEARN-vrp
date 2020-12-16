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
    this.state = props;
  }
  componentDidMount() {
    // $(this.tl).multiTimeline({
    //   start: "2015-02-01",
    //   end: "2015-02-02",
    //   zoom:4
    // });
    $(document).ready(function() {
      $(document).keydown(function(event) {
        if (
          event.ctrlKey == true &&
          (event.which == "61" ||
            event.which == "107" ||
            event.which == "173" ||
            event.which == "109" ||
            event.which == "187" ||
            event.which == "189")
        ) {
          alert("disabling zooming");
          event.preventDefault();
          // 107 Num Key  +
          //109 Num Key  -
          //173 Min Key  hyphen/underscor Hey
          // 61 Plus key  +/=
        }
      });

      $(window).bind("mousewheel DOMMouseScroll", function(event) {
        if (event.ctrlKey == true) {
          alert("disabling zooming");
          event.preventDefault();
        }
      });
    });
  }
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
    const onWheelHandler = e => {
      e.preventDefault();
      if (e.ctrlKey) {
      } else {
        var container = document.getElementById("timeline-wrapper");
        var containerScrollPosition = document.getElementById(
          "timeline-wrapper"
        ).scrollLeft;
        container.scrollTo({
          top: 0,
          left: containerScrollPosition + e.deltaY,
          behaviour: "smooth"
        });
      }
    };

    return (
      <div
        onWheel={onWheelHandler}
        id="timeline-wrapper"
        className="timeline-wrapper"
        style={{ width: style.width + "px" }}
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
  }
}

Timeline.defaultProps = {
  style: {
    widthStandardRatio: 100,
    width: 800
  },
  data: {
    complexity: 1,
    start_time: 8,
    end_time: 23
  }
};

export default Timeline;
