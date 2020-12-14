import React from "react";

const Driver = ({ data }) => {
  return (
    <div class="dr-container">
      <div class="dr-name">{data.name}</div>
      <div class="dr-total-route">{data.totalInMonth}</div>
      <div class="dr-today-route">{data.totalToday}</div>
    </div>
  );
};

export default Driver;
