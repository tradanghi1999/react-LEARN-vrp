import React from "react";
import "./style.css";
import Cordinating from "./component/cordinating/cordinating";
import "antd/dist/antd.css";
import "./timeline.css";
import "./antd.css";
import "./tl.css";
import API from "./lib/api";
import { Provider } from "react-redux";

import Timeline from "./component/timeline.js";

import { Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;

import { Collapse } from "antd";

const { Panel } = Collapse;

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

      console.log(data);
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
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>
          <Collapse>
            <Panel header="This is panel header 1" key="1">
              <Cordinating />
            </Panel>
          </Collapse>
        </Footer>
      </Layout>
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
