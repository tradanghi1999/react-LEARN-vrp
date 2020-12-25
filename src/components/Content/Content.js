import React from "react";
import { Layout } from "antd";

import WebMapView from "../../containers/Content/WebMapView";

const { Content } = Layout;

function ContentComponent() {
  return (
    <Content style={{ marginTop: 64 }}>
      <WebMapView />
    </Content>
  );
}

export default ContentComponent;
