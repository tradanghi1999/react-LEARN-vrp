import fConstants from "./footer_constants";

const cordinating = (state, action) => {
  switch (action.type) {
    case fConstants.LOAD_CORDINATING_DATA:
      return {
        isLoading: false,
        isLoaded: true,
        data: action.data,
        chosen: [],
        chosenOnce: null
      };
    case fConstants.SELECT_CUSTOMER:
      return {
        isLoading: false,
        isLoaded: true,
        data: state.data,
        chosen: [],
        chosenOnce: action.cusId
      };
    default:
      return state;
  }
};

export default cordinating;
