import React from "react";
import PropTypes from "prop-types";
import {
  SwapLeftOutlined,
  SwapOutlined,
  SwapRightOutlined,
  BorderLeftOutlined,
  BorderRightOutlined,
  DownSquareOutlined
} from "@ant-design/icons";
import { Button } from "antd";

class CordinatingHeader extends React.Component {
  render() {
    return (
      <div className="vrp-header-container">
        <div className="dr-header-containter">
          <div className="dr-name-header">
            <div>
              <span>Tên Tài Xế</span>&nbsp;
              <span>
                <DownSquareOutlined />
              </span>
            </div>
            <div> 
              <span>
                <SwapOutlined />
              </span>
            </div>
          </div>
          <div className="dr-total">
            <div>Tổng chuyến</div>
            <div className="total-details">
              <div>
                (Tháng){" "}
                <span>
                  <DownSquareOutlined />
                </span>
              </div>
              <div>
                (Ngày){" "}
                <span>
                  <DownSquareOutlined />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="capacity-header-container">
          Trọng tải{" "}
          <span>
            <DownSquareOutlined />
          </span>
        </div>
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
            <Button>
              <BorderLeftOutlined />
            </Button>
            <Button>
              <BorderRightOutlined />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default CordinatingHeader;
