import React from "react";
import "./style.css";
import Depot from "./depot";
import End from "./end";
import Customer from "./customer";
import TimeTravel from "./timetravel";
import Capacity from "./capacity";
import Driver from "./driver";

export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <Depot />
      <Customer
        style={{
          color: "#000",
          widthRatio: 100
        }}
        data={{
          ServiceTime: 0.5,
          name: "Anh Hieu"
        }}
      />

      <TimeTravel />
      <Capacity />
      <Driver
        data={{
          name: "Nghia",
          totalInMonth: "33",
          totalToday: "1"
        }}
      />
      <End />
    </div>
  );
}
