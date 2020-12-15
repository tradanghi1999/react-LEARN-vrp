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
  },
  getDb(url) {
    return this.getJson(url)
      .then(async data => data.data)
      .then(async db =>
        db.map(item => {
          let x = {};
          x.id = item.id;
          x.distances = item.distances;
          x.timetravels = item.timeTravels;
          

          let order = {};
          order.weight = item.order.weight;
          order.long = item.order.long;
          order.lat = item.order.lat;
          order.ServiceTime = item.order.serviceTime;
          order.timeWindow = item.order.timeWindow;

          x.order = order;
          return x;
        })
      );
  }
};

export default ajax;
