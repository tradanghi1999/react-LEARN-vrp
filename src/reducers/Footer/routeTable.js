// import fConstants from "../footer_constants";


// import infor  from "../action/infor";

import fConstants from "../../constants/constantFooter";


// console.log("infor",infor);
// let initialState =data;
let initialState = {
  style: {
    colors: [
      "#1f77b4",
      "#3a649b", // da sua
      "#ff7f0e",
      "#f07700", //da sua
      "#2ca02c",
      "#157f01", //da sua
      "#d62728",
      "#ff9896",
      "#9467bd",
      "#c5b0d5",
      "#8c564b",
      "#c49c94",
      "#e377c2",
      "#f7b6d2",
      "#7f7f7f",
      "#c7c7c7",
      "#bcbd22",
      "#dbdb8d",
      "#17becf",
      "#9edae5"
    ],
    widthRatio: 100,
    scrollTo: 200
  },
  data:[    
]
  }

  // let data = state.data.sort(function (a, b) {
  //   return a.Thang - b.Thang;
  // });




const routeTable = (state =initialState, action) => {
  switch (action.type) {
    case fConstants.FETCH_CHANGE_RouteTabl:
      return action.data;
      case fConstants.SORT_TAI_XE:{
        if(action.prop === "capacity_percentage"){
          if(action.stat){
            console.log("this.state.store",state,action.prop);
              let data = state.data.sort(function (a, b) {
                return a[action.prop] - b[action.prop];
              });
              return {...state,data};
          }
          else {
            console.log("hahareduce",action.stat,action.prop)
            let data = state.data.sort(function (a, b) {
              console.log("b[action.prop] - a[action.prop]",b[action.prop] - a[action.prop])
              return  b[action.prop] - a[action.prop];
            
            });
            return {...state,data};
          }
        }
        else if(action.prop === "name"){
          if(action.stat){
            console.log("this.state.store",state,action.prop);
              let data = state.data.sort(function (a, b) {
                var nameA = a["driver"][action.prop].toUpperCase(); // bỏ qua hoa thường
                var nameB = b["driver"][action.prop].toUpperCase(); // bỏ qua hoa thường
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
              
                // name trùng nhau
                return 0;
              });
              return {...state,data};
          }
          else {
            console.log("hahareduce",action.stat,action.prop)
            let data = state.data.sort(function (a, b) {
              var nameA = a["driver"][action.prop].toUpperCase(); // bỏ qua hoa thường
              var nameB = b["driver"][action.prop].toUpperCase(); // bỏ qua hoa thường
              if (nameA < nameB) {
                return 1;
              }
              if (nameA > nameB) {
                return -1;
              }
            
              // name trùng nhau
              return 0;
            });
            return {...state,data};
          }
        }
        else {
          if(action.stat){
            console.log("this.state.store",state,action.prop);
            let data = state.data.sort(function (a, b) {
              console.log("b[action.prop] - a[action.prop]", b["driver"][action.prop] - a["driver"][action.prop])
              return  a["driver"][action.prop] - b["driver"][action.prop];
            
            });
              return {...state,data};
          }
          else {
            console.log("hahareduce",action.stat,action.prop)
            let data = state.data.sort(function (a, b) {
              console.log("b[action.prop] - a[action.prop]", b["driver"][action.prop] - a["driver"][action.prop])
              return  b["driver"][action.prop] - a["driver"][action.prop];
            
            });
            return {...state,data};
          }
        }
        // return action.data;
      }
       
    case fConstants.FETCH_INITIAL_DATA:{
      // console.log("action.data",action.data);
      return {...state,data:action.data};
    }
    
    default:
      return state;
  }
};

export default routeTable;