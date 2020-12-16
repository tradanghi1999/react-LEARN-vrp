import React from "react";
import "./style.css";
import RouteTable from "./component/route_tbl";
import "./style/timeline.css";
import "./style/antd.css";
import API from "./lib/api";

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
    if(isLoading)
      return(
        <div>
        <h1>Hello StackBlitz!</h1>
        <p>Start editing to see some magic happen :)</p>
      </div>
      );
    return(
      <RouteTable data={data}/>
    )
    
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
