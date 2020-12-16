import React from "react";
import PropTypes from "prop-types";

const Capacity = props => {
  const { data } = props;
  return (
    <div className="capacity-container">
      <div className="capacity-percentage">
        <div className="present" style={{ width: data.percentage + "%" }} />
        <div className="expected" style={{ width: 0 + "%" }} />
      </div>
      <div className="capacity-number">
        <div className="present">{data.percentage.toFixed(0) + "%"}</div>
        <div className="add" />
      </div>
    </div>
  );
};
Capacity.propTypes = {
  data: PropTypes.object
};
Capacity.defaultProps = {
  data: {
    percentage: 0
  }
};

export default Capacity;
