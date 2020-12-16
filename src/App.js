import React from "react";
import "./style.css";
import RouteTable from "./route_tbl";
import "./timeline.css";
import "./antd.css";
import API from "./lib/api";
class App extends React.Component {
  state = {
    isLoading: true,
    data: null
  };
  componentDidMount() {
    API.getServerCordinatingResult().subscribe(data => {});
  }
  render() {
    return (
      <div>
        <h1>Hello StackBlitz!</h1>
        <p>Start editing to see some magic happen :)</p>
        <RouteTable data={data} />
      </div>
    );
  }
}

//
//<Depot />
// <Customer
//   style={{
//     color: "#000",
//     widthRatio: 100
//   }}
//   data={{
//     ServiceTime: 0.5,
//     name: "Anh Hieu"
//   }}
// />

// <TimeTravel />
// <Capacity />
// <Driver
//   data={{
//     name: "Nghia",
//     totalInMonth: "33",
//     totalToday: "1"
//   }}
// />
// <End />
