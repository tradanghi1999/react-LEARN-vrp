import fConstants from "./footer_constants";

const cordinating = (state, action) => {
  switch (action.type) {
    case fConstants.LOAD_CORDINATING_DATA:
      return {
        isLoading: false,
        isLoaded: true,
        data: action.data
      };
    default:
      return state;
  }
};

export default cordinating;
