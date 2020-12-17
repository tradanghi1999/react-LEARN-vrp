import React from "react";
import "./style.css";
import Cordinating from "./component/cordinating";
import 'antd/dist/antd.css';
import "./timeline.css";
import "./antd.css";
import "./tl.css";
import API from "./lib/api";

import Timeline from "./component/timeline.js";

class App extends React.Component {
  state = {
    isLoading: true,
    data: null
  };
  componentDidMount() {
    API.getServerCordinatingResult().subscribe(data => {
      this.setState({
        isLoading: false,
        data: data
      });
    });
  }
  render() {
    const { isLoading, data } = this.state;
    if (isLoading)
      return (
        <div>
          <h1>Hello StackBlitz!</h1>
          <p>Start editing to see some magic happen :)</p>
        </div>
      );
    return (
      <React.Fragment>
        <Cordinating/>
      </React.Fragment>
    );
  }
}

export default App;

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
