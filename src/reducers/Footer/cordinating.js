import fConstants from "../../constants/constantFooter";
var initialState = [];



const cordinating = (state =initialState, action) => {
  switch (action.type) {
    case fConstants.LOAD_CORDINATING_DATA:
      return state
     case fConstants.CHOSE_CUSTOMMER:
        //console.log(action.data);
        return [action.data]
    case fConstants.CHOSE_CUSTOMMER_CTRL:
          //console.log("choseCustomerCtrl={choseCustomerCtrl}choseCustomerCtrl={choseCustomerCtrl}choseCustomerCtrl={choseCustomerCtrl}",action.data);
          return [...state,action.data]
    case fConstants.CHUYENTRAI:
        return []
    case fConstants.CHUYENPHAI:
        return []
    case fConstants.DOICHO2VITRI:
        return []
    case fConstants.DOITUYENCHO1VITRI:
        return []
    default:
      return state;
  }
};

export default cordinating;