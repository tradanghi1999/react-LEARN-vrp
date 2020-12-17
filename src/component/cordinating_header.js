import React from "react";
import PropTypes from "prop-types";
import { SwapLeftOutlined, SwapOutlined,SwapRightOutlined } from "@ant-design/icons";
import { Button } from "antd";

class CordinatingHeader extends React.Component {
  render() {
    return (
      <div className="vrp-header-container">
        <div className="dr-header-containter">
          <div className="dr-name-header">Tên Tài Xế</div>
          <div className="dr-total">
            <div>Tổng chuyến</div>
            <div className="total-details">
              <div>(Tháng)</div>
              <div>(Ngày)</div>
            </div>
          </div>
        </div>
        <div className="capacity-header-container">Trọng tải</div>
        <div className="timeline-display">
          <div className="timeline-header">
            <div>Timeline</div>
          </div>
          <div className="timeline-content">
            <Button>
              <SwapLeftOutlined />
            </Button>
            <Button>
              <SwapOutlined />
            </Button>
            <Button>
              <SwapRightOutlined />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default CordinatingHeader;
