import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import "./App.scss";
import Test from "./containers/Test";
import Layout from "./containers/Layout";
import "./style.css";
import "./timeline.css";
import "./tl.css";


class App extends React.Component {
  // componentDidUpdate(){
  //   e.preventDefault();
  //   let container = document.document.getElementsById("timeline-wrapper");
  //   container.addEventListener("wheel", function(e){
  //     e.preventDefault();
  //   }, {passive: false})
  // }
  render(){

    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/test" component={Test} />
            <Route exact path="/" component={Layout} />
          </Switch>
        </div>
      </Router>
    );
  }
  }


export default App;
