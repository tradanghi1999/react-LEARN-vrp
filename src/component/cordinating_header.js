import React from "react";
import PropTypes from "prop-types";

class CordinatingHeader extends React.Component {
  render() {
    return(
    <div class="vrp-header-container">
      <div class="dr-header-containter">
        <div class="dr-name-header">Tên Tài Xế</div>
        <div class="dr-total">
          <div>Tổng chuyến</div>
          <div class="total-details">
            <div>(Tháng)</div>
            <div>(Ngày)</div>
          </div>
        </div>
      </div>
      <div class="capacity-header-container">Trọng tải</div>
    </div>);
  }
}
export default CordinatingHeader;
