import React from "react";
import PropTypes from "prop-types";
import RouteTable from "./route_tbl";
import Timeline from "./timeline";
import CordinatingHeader from "./cordinating_header";
class Cordinating extends React.Component {
  onMaosWheelHandler = ({ ctrlKey, wheelUpDirection }) => {
    //console.log(ctrlKey);
    const { timeline, routeTable } = this.state;
    const { data } = timeline;
    const { widthRatio } = routeTable.style;
    const { widthStandardRatio } = timeline.style;

    if (ctrlKey && wheelUpDirection == true && data.complexity >= 0.5) {
      //console.log(ctrlKey);

      let nTimeline = {
        style: timeline.style,
        data: {
          complexity: data.complexity / 2,
          start_time: data.start_time,
          end_time: data.end_time
        }
      };

      let nRouteTable = {
        style: {
          colors: routeTable.style.colors,
          widthRatio: widthRatio * 2
        },
        data: routeTable.data
      };
      //console.log(nRouteTable);
      // this.setState({
      //   timeline: nTimeline,
      //   routeTable: nRouteTable
      // });
      // console.log(this.state);
    }
  };

  constructor(props) {
    super(props);
    const { timeline, routeTable } = props;
    this.state = {
      timeline,
      routeTable
    };
  }

  render() {
    const { timeline, routeTable } = this.state;

    return (
      <div>
        <div>
          <CordinatingHeader />
        </div>
        <div className="cordinating_body">
          <RouteTable
            onMaosWheel={this.onMaosWheelHandler}
            style={routeTable.style}
            data={routeTable.data}
          />
          <div className="timeline-underlying">
            <div className="timeline-table-before" />
            <Timeline style={timeline.style} data={timeline.data} />
          </div>
        </div>
      </div>
    );
  }
}

Cordinating.defaultProps = {
  timeline: {
    style: {
      widthStandardRatio: 100,
      width: 800
    },
    data: {
      complexity: 1,
      start_time: 8,
      end_time: 23
    }
  },
  routeTable: {
    style: {
      colors: [
        "#1f77b4",
        "#3a649b", // da sua
        "#ff7f0e",
        "#f07700", //da sua
        "#2ca02c",
        "#157f01", //da sua
        "#d62728",
        "#ff9896",
        "#9467bd",
        "#c5b0d5",
        "#8c564b",
        "#c49c94",
        "#e377c2",
        "#f7b6d2",
        "#7f7f7f",
        "#c7c7c7",
        "#bcbd22",
        "#dbdb8d",
        "#17becf",
        "#9edae5"
      ],
      widthRatio: 100
    },
    data: [
      {
        capacity_percentage: "0.15",
        routeG: [
          {
            type: "point",
            subtype: "depot"
          },
          {
            type: "link",
            data: {
              time_text: "7'",
              time_value: 0.13,
              start_point: 0,
              end_point: 1
            }
          },
          {
            type: "point",
            subtype: "customer",
            data: {
              id: 142188,
              name: "Co",
              service_time: 1.6,
              weight: 6
            }
          },
          {
            type: "link",
            data: {
              time_text: "3'",
              time_value: 0.06,
              start_point: 1,
              end_point: 2
            }
          },
          {
            type: "point",
            subtype: "customer",
            data: {
              id: 142168,
              name: "Trang",
              service_time: 1.6,
              weight: 6
            }
          },
          {
            type: "link",
            data: {
              time_text: "1'",
              time_value: 0.03,
              start_point: 2,
              end_point: 10
            }
          },
          {
            type: "point",
            subtype: "customer",
            data: {
              id: 1125,
              name: "Anh Hieu",
              service_time: 1.2,
              weight: 15
            }
          },
          {
            type: "link",
            data: {
              time_text: "13'",
              time_value: 0.23,
              start_point: 10,
              end_point: 0
            }
          },
          {
            type: "point",
            subtype: "end"
          }
        ]
      },
      {
        capacity_percentage: "0.12",
        routeG: [
          {
            type: "point",
            subtype: "depot"
          },
          {
            type: "link",
            data: {
              time_text: "10'",
              time_value: 0.17,
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
              service_time: 2.2,
              weight: 7
            }
          },
          {
            type: "link",
            data: {
              time_text: "1'",
              time_value: 0.03,
              start_point: 3,
              end_point: 6
            }
          },
          {
            type: "point",
            subtype: "customer",
            data: {
              id: 142169,
              name: "Long",
              service_time: 1.4,
              weight: 15
            }
          },
          {
            type: "link",
            data: {
              time_text: "13'",
              time_value: 0.23,
              start_point: 6,
              end_point: 0
            }
          },
          {
            type: "point",
            subtype: "end"
          }
        ]
      },
      {
        capacity_percentage: "0.16",
        routeG: [
          {
            type: "point",
            subtype: "depot"
          },
          {
            type: "link",
            data: {
              time_text: "9'",
              time_value: 0.16,
              start_point: 0,
              end_point: 9
            }
          },
          {
            type: "point",
            subtype: "customer",
            data: {
              id: 16901,
              name: "Anh Ruy",
              service_time: 2.8,
              weight: 14
            }
          },
          {
            type: "link",
            data: {
              time_text: "1'",
              time_value: 0.03,
              start_point: 9,
              end_point: 13
            }
          },
          {
            type: "point",
            subtype: "customer",
            data: {
              id: 17113,
              name: "Chi Quyen",
              service_time: 0.4,
              weight: 8
            }
          },
          {
            type: "link",
            data: {
              time_text: "1'",
              time_value: 0.03,
              start_point: 13,
              end_point: 8
            }
          },
          {
            type: "point",
            subtype: "customer",
            data: {
              id: 142198,
              name: "Hung",
              service_time: 1.6,
              weight: 8
            }
          },
          {
            type: "link",
            data: {
              time_text: "15'",
              time_value: 0.26,
              start_point: 8,
              end_point: 0
            }
          },
          {
            type: "point",
            subtype: "end"
          }
        ]
      },
      {
        capacity_percentage: "0.23",
        routeG: [
          {
            type: "point",
            subtype: "depot"
          },
          {
            type: "link",
            data: {
              time_text: "9'",
              time_value: 0.16,
              start_point: 0,
              end_point: 11
            }
          },
          {
            type: "point",
            subtype: "customer",
            data: {
              id: 3306,
              name: "Anh Tin",
              service_time: 3.9,
              weight: 13
            }
          },
          {
            type: "link",
            data: {
              time_text: "6'",
              time_value: 0.1,
              start_point: 11,
              end_point: 7
            }
          },
          {
            type: "point",
            subtype: "customer",
            data: {
              id: 142179,
              name: "Tri",
              service_time: 2.9,
              weight: 12
            }
          },
          {
            type: "link",
            data: {
              time_text: "19'",
              time_value: 0.33,
              start_point: 7,
              end_point: 0
            }
          },
          {
            type: "point",
            subtype: "end"
          }
        ]
      },
      {
        capacity_percentage: "0.13",
        routeG: [
          {
            type: "point",
            subtype: "depot"
          },
          {
            type: "link",
            data: {
              time_text: "12'",
              time_value: 0.2,
              start_point: 0,
              end_point: 15
            }
          },
          {
            type: "point",
            subtype: "customer",
            data: {
              id: 11653,
              name: "Anh Hoan",
              service_time: 0,
              weight: 5
            }
          },
          {
            type: "link",
            data: {
              time_text: "9'",
              time_value: 0.16,
              start_point: 15,
              end_point: 14
            }
          },
          {
            type: "point",
            subtype: "customer",
            data: {
              id: 2061,
              name: "Chi Thuy",
              service_time: 1.8,
              weight: 5
            }
          },
          {
            type: "link",
            data: {
              time_text: "1'",
              time_value: 0.03,
              start_point: 14,
              end_point: 12
            }
          },
          {
            type: "point",
            subtype: "customer",
            data: {
              id: 16058,
              name: "Chi Xuyen",
              service_time: 2.2,
              weight: 10
            }
          },
          {
            type: "link",
            data: {
              time_text: "15'",
              time_value: 0.26,
              start_point: 12,
              end_point: 0
            }
          },
          {
            type: "point",
            subtype: "end"
          }
        ]
      },
      {
        capacity_percentage: "0.15",
        routeG: [
          {
            type: "point",
            subtype: "depot"
          },
          {
            type: "link",
            data: {
              time_text: "18'",
              time_value: 0.3,
              start_point: 0,
              end_point: 5
            }
          },
          {
            type: "point",
            subtype: "customer",
            data: {
              id: 142186,
              name: "Nga",
              service_time: 3.3,
              weight: 11
            }
          },
          {
            type: "link",
            data: {
              time_text: "4'",
              time_value: 0.07,
              start_point: 5,
              end_point: 4
            }
          },
          {
            type: "point",
            subtype: "customer",
            data: {
              id: 142173,
              name: "Cuong",
              service_time: 1.3,
              weight: 9
            }
          },
          {
            type: "link",
            data: {
              time_text: "19'",
              time_value: 0.32,
              start_point: 4,
              end_point: 0
            }
          },
          {
            type: "point",
            subtype: "end"
          }
        ]
      }
    ]
  }
};

export default Cordinating;
