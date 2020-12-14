import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarehouse } from "@fortawesome/free-solid-svg-icons";
import "./timeline.css";

const Depot = () => {
  return (
    <div className="rt-depot">
      <FontAwesomeIcon icon={faWarehouse} />
    </div>
  );
};

export default Depot;
