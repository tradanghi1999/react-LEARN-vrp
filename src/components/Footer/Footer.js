import React from "react";
import { Layout, Collapse } from "antd";

// import TimelineRoute from "../../containers/TimelineRoute/TimelineRoute";
import CordinatingHigher from "../../containers/Footer/CordinatingHigher"
const { Footer } = Layout;
const { Panel } = Collapse;

function FooterComponent({ routes, fetch }) {
  return (
    <Footer style={{ position: "fixed", bottom: 0, width: "95vw", padding: 0 }}>
      <Collapse expandIconPosition="right">
        <Panel header="Chi tiết routing" key="detailRouting">
          <CordinatingHigher />
        </Panel>
      </Collapse>
    </Footer>
  );
}

export default FooterComponent;
