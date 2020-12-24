
import fConstants from "../../constants/constantFooter";

// import fConstants from "./UI_ACTION";
var initialState = {
    style: {
      widthStandardRatio: 100,
      scrollTo: 100
    },
    data: {
      complexity: 1,
      start_time: 8,
      end_time: 23
    }
  };
const timeline = (state =initialState, action) => {
  switch (action.type) {
    case fConstants.FETCH_CHANGE_TIMELIME:
    // console.log("dAsdad",action.data)
      return action.data;
    default:
      return state;
  }
};

export default timeline;