import React from "react";
import "./style.css";
import RouteTable from "./route_tbl";
import "./timeline.css";
import "./antd.css";
import API from "./lib/api";
export default function App() {
  API.getServerCordinatingResult().subscribe(console.log);
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <RouteTable />
    </div>
  );
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
