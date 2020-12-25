import React from "react";
import PropTypes from "prop-types";

const Driver = props => {
  const { driver } = props;
  // console.log("dirv",drivers)
  return (
    <div className="dr-container">
      <div className="dr-name">{driver.name}</div>
      <div className="dr-total-route">{driver.total_inMonth}</div>
      <div className="dr-today-route">{driver.total_inDay}</div>
    </div>
  );
};

// Driver.propTypes = {
//   data: PropTypes.object
// };

// Driver.defaultProps = {
//   data: {
//     name: "Driver Unknown",
//     totalInMonth: 0,
//     totalToday: 0
//   }
// };

export default Driver;
