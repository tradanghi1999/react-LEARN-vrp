import React from "react";
import _ from "lodash";

import Cordinating from "../../components/Footer/cordinating";

import fetchRoutes, {
  receiverouteTable,
  receivetimeline,
  sortTaiXe,
  choseCustomer,
  choseCustomerCtrl,
} from "../../actions/actionFooter";
import { connect } from "react-redux";

class CordinatingHigher extends React.Component {
  componentDidMount() {
    const { fetchRoutes } = this.props;

    fetchRoutes();
  }
  componentDidUpdate() {
    let container = document.getElementById("root");
    container.addEventListener(
      "wheel",
      function (e) {
        e.preventDefault();
      },
      { passive: false }
    );
  }

  onMaosWheelHandler = ({ ctrlKey, wheelUpDirection }) => {
    console.log(ctrlKey);
    const { receivetimeline, receiverouteTable } = this.props;
    const { timeline, routeTable } = this.props;
    let nTimeline = _.clone(timeline, true);
    let nRouteTable = _.clone(routeTable, true);
    if (
      ctrlKey &&
      wheelUpDirection == true &&
      nTimeline.data.complexity >= 0.5
    ) {
      nTimeline.data.complexity = nTimeline.data.complexity / 2;

      nRouteTable.style.widthRatio = nRouteTable.style.widthRatio * 2;
    }
    if (
      ctrlKey &&
      wheelUpDirection == false &&
      nTimeline.data.complexity <= 1
    ) {
      nTimeline.data.complexity = nTimeline.data.complexity * 2;

      nRouteTable.style.widthRatio = nRouteTable.style.widthRatio / 2;
      //console.log(nRouteTable);
    }
    if (ctrlKey == false && wheelUpDirection == false) {
      nTimeline.style.scrollTo += 100;
      // console.log(nTimeline.style.scrollTo);
    }
    if (ctrlKey == false && wheelUpDirection == true) {
      if (nTimeline.style.scrollTo >= 100) nTimeline.style.scrollTo -= 100;
      // console.log(nTimeline.style.scrollTo);
    }
    receivetimeline(nTimeline);
    receiverouteTable(nRouteTable);
  };

  render() {
    const {
      timeline,
      routeTable,
      sortTaiXe,
      drivers,
      choseCustomer,
      cordinating,
      chuyentrai,
      choseCustomerCtrl,
    } = this.props;
    // console.log("lan 1");
    // console.log("lan 1",drivers)

    return (
      <Cordinating
        timeline={timeline}
        drivers={drivers}
        routeTable={routeTable}
        onMaosWheel={this.onMaosWheelHandler}
        sortTaiXe={sortTaiXe}
        choseCustomer={choseCustomer}
        cordinating={cordinating}
        chuyentrai={chuyentrai}
        choseCustomerCtrl={choseCustomerCtrl}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    routeTable: state.routeTable,
    timeline: state.timeline,
    cordinating: state.cordinating,
    // drivers: state.drivers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRoutes: () => {
      dispatch(fetchRoutes());
    },
    receivetimeline: (timeline) => {
      dispatch(receivetimeline(timeline));
    },
    receiverouteTable: (routeTable) => {
      dispatch(receiverouteTable(routeTable));
    },
    sortTaiXe: (prop, stat) => {
      dispatch(sortTaiXe(prop, stat));
    },
    choseCustomer: (data) => {
      dispatch(choseCustomer(data));
    },
    choseCustomerCtrl: (data) => {
      console.log("23456789");
      dispatch(choseCustomerCtrl(data));
    },
    // chuyentrai: (a,b) => {
    //   dispatch(chuyentrai(a,b));
    // },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CordinatingHigher);
