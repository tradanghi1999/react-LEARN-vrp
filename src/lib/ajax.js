import $ from "jquery";
const ajax = {
  getXML(url) {
    return $.ajax({
      url: url,
      dataType: "xml"
    });
  }
};

export default ajax;
