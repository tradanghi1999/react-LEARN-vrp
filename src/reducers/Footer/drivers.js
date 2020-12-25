// import fetchRoutes from "../action/infor";
import fConstants from "../../constants/constantFooter";

// import fConstants from "./UI_ACTION";
var initialState =[{
    id: 142025,
    name: 'Nghĩa',
    total_inMonth: 35,
    total_inDay: 0
}, {
    id: 142188,
    name: 'Cơ',
    total_inMonth: 35,
    total_inDay: 0
}, {
    id: 142171,
    name: 'Thắng',
    total_inMonth: 35,
    total_inDay: 0
}, {
    id: 142173,
    name: 'Cường',
    total_inMonth: 35,
    total_inDay: 0
}, {
    id: 142186,
    name: 'Nga',
    total_inMonth: 35,
    total_inDay: 0
}, {
    id: 142169,
    name: 'Long',
    total_inMonth: 35,
    total_inDay: 0
}, {
    id: 142179,
    name: 'Trí',
    total_inMonth: 35,
    total_inDay: 0
}, {
    id: 142198,
    name: 'Hưng',
    total_inMonth: 35,
    total_inDay: 0
}, {
    id: 16901,
    name: "Anh Ruy",
    total_inMonth: 35,
    total_inDay: 0
}, {
    id: 142168,
    name: 'Trang',
    total_inMonth: 35,
    total_inDay: 0
}]
const drivers = (state =initialState, action) => {
  switch (action.type) {
    case fConstants.SORT_DRIVER:
    // console.log("dAsdad",action.data)
      return action.data;
    default:
      return state;
  }
};

export default drivers;