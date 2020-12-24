import React from "react";
import PropTypes from "prop-types";
import {
  SwapLeftOutlined,
  SwapOutlined,
  SwapRightOutlined,
  BorderLeftOutlined,
  BorderRightOutlined,
  DownSquareOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from "@ant-design/icons";
import { Button, Tooltip } from "antd";

  class CordinatingHeader extends React.Component {
    constructor(props) {
      super(props);
      // this._cus = React.createRef();
      this.state = {
        property: "capacity_percentage",
        status: true
      };
    }
    onClickHandeler = (prop)=> {
      const {status,property} = this.state;
      console.log(" this.state", this.state)
      let stat = true;
      if(prop===property){
        stat = !status;
        console.log("stat",stat);
        this.setState({ property: prop , status:stat });
      }
      else {
        this.setState({ property: prop , status:stat });
      }
      this.props.sortTaiXe(prop , stat);
      console.log("stat",stat);
    };
  render() {
    const {status,property,chuyentrai,cordinating}=this.state;
    return (
      <div className="vrp-header-container">
        <div className="dr-header-containter">
          <div className="dr-name-header">
            <div className="tt_btn" onClick = {()=>this.onClickHandeler("name")} >
              <span>Tên Tài Xế</span>&nbsp;
              {property==="name"&& status && <span >
              <ArrowUpOutlined />
              </span>}
              {property==="name"&& status===false && <span >
              <ArrowDownOutlined />
              </span>}
            </div>
            <div>
              <span  >
                <SwapOutlined />
              </span>
            </div>
          </div>
          <div className="dr-total">
            <div>Tổng chuyến</div>
            <div className="total-details">
              <div className="tt_btn" onClick = {()=>this.onClickHandeler("total_inMonth")}>
                (Tháng){" "}
                {property==="total_inMonth"&& status && <span>
              <ArrowUpOutlined />
              </span>}
              {property==="total_inMonth"&& status===false && <span >
              <ArrowDownOutlined />
              </span>}
              </div>
              <div className="tt_btn" onClick = {()=>this.onClickHandeler("total_inDay")}>
                (Ngày){" "}
                {property==="total_inDay"&& status && <span >
              <ArrowUpOutlined />
              </span>}
              {property==="total_inDay"&& status===false && <span >
              <ArrowDownOutlined />
              </span>}
              </div>
            </div>
          </div>
        </div>
        <div className="capacity-header-container tt_btn" onClick = {()=>this.onClickHandeler("capacity_percentage")}>
          Trọng tải{" "}
          {property==="capacity_percentage"&& status && <span >
              <ArrowUpOutlined />
              </span>}
              {property==="capacity_percentage"&& status===false && <span >
              <ArrowDownOutlined />
              </span>}
        </div>
        <div className="timeline-display">
          <div className="timeline-header">
            <div>Timeline</div>
          </div>
          <div className="timeline-content">
            <Tooltip placement="bottom" title="Chuyền Trái">
              <Button size="small">
                <SwapLeftOutlined onClick={chuyentrai}/>
              </Button>
            </Tooltip>

            <Tooltip placement="bottom" title="Đổi chỗ">
              <Button size="small">
                <SwapOutlined />
              </Button>
            </Tooltip>

            <Tooltip placement="bottom" title="Chuyển Phải">
              <Button size="small">
                <SwapRightOutlined />
              </Button>
            </Tooltip>

            <Tooltip placement="bottom" title="Thêm Trái">
              <Button size="small">
                <BorderLeftOutlined />
              </Button>
            </Tooltip>

            <Tooltip placement="bottom" title="Thêm Phải">
              <Button size="small">
                <BorderRightOutlined />
              </Button>
            </Tooltip>
            {/* <Button onClick = {this.props.sortTaiXe} >hahahaa</Button> */}
          </div>
        </div>
      </div>
    );
  }
}
export default CordinatingHeader;
