import React from "react";

const Capacity = ({ data }) => {
  return (
    <div class="capacity-container">
      <div class="capacity-percentage">
        <div
          class="present"
          style={{ width: data == null ? 0 : data.percentage + "%" }}
        />
        <div class="expected" style={{ width: 0 + "%" }} />
      </div>
      <div class="capacity-number">
        <div class="present">{(data == null ? 0 : data.percentage) + "%"}</div>
        <div class="add" />
      </div>
    </div>
  );
};

export default Capacity;
