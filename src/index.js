import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import reducer from "./reducers";

import API from "./lib/api";

API.getRoutesAcordId().subscribe(routesAcordId => {
  console.log(routesAcordId);
  console.log(
    API.computeTransaction(routesAcordId,{
      type: "CHUYEN_PHAI",
      data: 142169
    }))
});

const logger = createLogger({
  // ...options
});
const store = createStore(reducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
