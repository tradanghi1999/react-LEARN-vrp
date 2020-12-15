import $ from "jquery";
const ajax = {
  getXML(url) {
    return $.ajax({
      url: url,
      dataType: "xml"
    });
  },
  getJson(url) {
    return $.ajax({
      url: url,
      dataType: "json"
    });
  }
};

export default ajax;
