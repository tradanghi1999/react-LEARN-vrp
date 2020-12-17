import React from "react";
import PropTypes from "prop-types";

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
        <div class="timeline-display">
           <div class="timeline-header">
                <div> </div>
                <div>Timeline</div>
                <div class="ulti">
                    <div class="hide-btn">
                        <i class="fas fa-angle-double-down"></i>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}
export default CordinatingHeader;
