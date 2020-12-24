// import React, { useState, useEffect } from "react";

// import "bryntum-schedulerpro/schedulerpro.classic.css";
// import BryntumScheduler from "./BryntumScheduler";
// import {
//   handleResourcesBryntumScheduler,
//   handleEventsBryntumScheduler,
// } from "./util";

// const columnsTimeline = [
//   { text: "Ten tai xe", field: "name", width: 100 },
//   { text: "Ngay", field: "ngay", width: 50 },
//   { text: "Thang", field: "thang", width: 50 },
//   { text: "Capacity", field: "capacity", width: 80 },
//   { text: "Can nang", field: "weightOrders", width: 80 },
// ];

// /**
//  *
//  * @param {} dataRoutes reducer State
//  * @param {} fetchRoutes reducer Dispatch
//  */
// function TimelineRoute({ dataRoutes, fetchRoutes }) {
//   const [resources, setResources] = useState([]);
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     fetchRoutes();
//     return () => {};
//   }, [fetchRoutes]);

//   useEffect(() => {
//     const resources = handleResourcesBryntumScheduler(dataRoutes);
//     const events = handleEventsBryntumScheduler(dataRoutes);
//     setResources(resources);
//     setEvents(events);
//     return () => {};
//   }, [dataRoutes]);

//   return (
//     <BryntumScheduler
//       resources={resources}
//       events={events}
//       startDate={new Date(2020, 11, 22, 7)}
//       endDate={new Date(2020, 11, 22, 21)}
//       viewPreset="hourAndDay"
//       rowHeight={25}
//       barMargin={5}
//       multiEventSelect={true}
//       autoHeight={true}
//       columns={columnsTimeline}
//     />
//   );
// }

// export default TimelineRoute;
