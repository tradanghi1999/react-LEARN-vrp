import React, { useEffect, useRef } from "react";

import "../../css/WebMapView.scss";
import { handleSubRoutes, handleAllRoutes } from "../../library/mapView";

const WebMapView = ({ subRoutes, allRoutes }) => {
  const mapRef = useRef();

  useEffect(() => {
    handleSubRoutes(mapRef, subRoutes);
    return () => {};
  }, [subRoutes]);

  useEffect(() => {
    if (allRoutes.length !== 0) {
      handleAllRoutes(mapRef, allRoutes);
    }
    return () => {};
  }, [allRoutes]);

  return <div className="webmap" ref={mapRef} />;
};

export default WebMapView;
