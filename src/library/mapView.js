import { loadModules } from "esri-loader";

import {
  handleGeometry,
  handlePointAtt,
  handlePointRoute,
  handlePointSymbol,
  handlePopupTemplate,
  randomColorRgba,
} from "./utilMapView";

const serviceProxy =
  "https://utility.arcgis.com/usrsvcs/appservices/IM9l55uugiQEaBPv/rest/services/World/Route/NAServer/Route_World";
const baseMap = "streets-navigation-vector";
const centerMap = [106.775174, 10.847981];

export const handleSubRoutes = (mapRef, subRoutes) => {
  loadModules(
    [
      "esri/Map",
      "esri/views/MapView",
      "esri/Graphic",
      "esri/layers/GraphicsLayer",
      "esri/tasks/RouteTask",
      "esri/tasks/support/RouteParameters",
      "esri/tasks/support/FeatureSet",
    ],
    { css: true }
  )
    .then(
      ([
        ArcGISMap,
        MapView,
        Graphic,
        GraphicsLayer,
        RouteTask,
        RouteParameters,
        FeatureSet,
      ]) => {
        let routeTask = new RouteTask({ url: serviceProxy });
        let routeLayer = new GraphicsLayer();
        let routeParams = new RouteParameters({
          stops: new FeatureSet(),
          outSpatialReference: {
            wkid: 3857,
          },
        });
        const map = new ArcGISMap({
          basemap: baseMap,
          layers: [routeLayer],
        });
        const view = new MapView({
          container: mapRef.current,
          map: map,
          center: centerMap,
          zoom: 10,
        });

        if (subRoutes.length !== 0) {
          subRoutes.forEach((infoOrder, index) => {
            const { name } = infoOrder;
            const {
              long,
              lat,
              serviceTime,
              timeWindow,
              weight,
            } = infoOrder.order;

            let popupTemplate = {};
            let symbol = {};
            let pointAtt = {};

            if (index !== 0 && index !== subRoutes.length - 1) {
              popupTemplate = handlePopupTemplate("customer");
              symbol = handlePointSymbol("customer", index);
              pointAtt = handlePointAtt(
                "customer",
                name,
                weight,
                serviceTime,
                timeWindow
              );
            } else {
              popupTemplate = handlePopupTemplate("depot", index);
              symbol = handlePointSymbol("depot");
              pointAtt = handlePointAtt(
                "depot",
                name,
                weight,
                serviceTime,
                timeWindow
              );
            }

            const geometry = {
              type: "point",
              longitude: long,
              latitude: lat,
            };

            const stop = new Graphic({
              geometry,
              symbol,
              attributes: pointAtt,
              popupTemplate,
            });

            //Khong them trung lap depot point
            if (index !== subRoutes.length - 1) {
              routeLayer.add(stop);
            }

            routeParams.stops.features.push(stop);
          });

          const showRoute = (data) => {
            const { routeResults } = data;
            routeResults.forEach((result) => {
              result.route.symbol = handlePointRoute();
              routeLayer.add(result.route);
            });
          };

          routeTask
            .solve(routeParams)
            .then(showRoute)
            .catch((err) => console.log("Error routeTask solve", err));
        }

        return () => {
          if (view) {
            view.destroy();
          }
        };
      }
    )
    .catch((err) => console.error(`Error handle sub routes: ${err}`));
};

export const handleAllRoutes = (mapRef, routes) => {
  loadModules(
    [
      "esri/Map",
      "esri/views/MapView",
      "esri/Graphic",
      "esri/layers/GraphicsLayer",
      "esri/tasks/RouteTask",
      "esri/tasks/support/RouteParameters",
      "esri/tasks/support/FeatureSet",
    ],
    { css: true }
  )
    .then(
      ([
        ArcGISMap,
        MapView,
        Graphic,
        GraphicsLayer,
        RouteTask,
        RouteParameters,
        FeatureSet,
      ]) => {
        let routeTask = new RouteTask({ url: serviceProxy });
        let routeLayer = new GraphicsLayer();

        const map = new ArcGISMap({
          basemap: baseMap,
          layers: [routeLayer],
        });
        const view = new MapView({
          container: mapRef.current,
          map: map,
          center: centerMap,
          zoom: 10,
        });

        let routeParams = new RouteParameters({
          stops: new FeatureSet(),
          outSpatialReference: {
            wkid: 3857,
          },
        });

        if (routes.length !== 0) {
          //Add depot point
          (function addDepotPointToLayer() {
            const { name } = routes[0][0];
            const {
              long,
              lat,
              serviceTime,
              timeWindow,
              weight,
            } = routes[0][0].order;

            const popupTemplate = handlePopupTemplate("depot");

            const symbol = handlePointSymbol("depot");

            const pointAtt = handlePointAtt(
              "depot",
              name,
              weight,
              serviceTime,
              timeWindow
            );

            const geometry = handleGeometry("point", long, lat);

            const stop = new Graphic({
              geometry,
              symbol,
              attributes: pointAtt,
              popupTemplate,
            });

            routeLayer.add(stop);
          })();

          //Add customer point and routes
          (function addCustomerAndRoutesToMap() {
            routes.forEach((currentRoute, index) => {
              const colorPoint = randomColorRgba("rgb");
              currentRoute.forEach((subCurrentRoute, subIndex) => {
                const { name } = subCurrentRoute;
                const {
                  long,
                  lat,
                  serviceTime,
                  timeWindow,
                  weight,
                } = subCurrentRoute.order;

                const popupTemplate = handlePopupTemplate("customer");

                const symbol = handlePointSymbol(
                  "customer",
                  index + 1,
                  colorPoint
                );

                const pointAtt = handlePointAtt(
                  "customer",
                  name,
                  weight,
                  serviceTime,
                  timeWindow,
                  index
                );

                const geometry = handleGeometry("point", long, lat);

                const stop = new Graphic({
                  geometry,
                  symbol,
                  attributes: pointAtt,
                  popupTemplate,
                });

                if (subIndex !== 0 && subIndex !== currentRoute.length - 1) {
                  routeLayer.add(stop);
                }
                routeParams.stops.features.push(stop);
              });
            });

            const showRoute = (data) => {
              const { routeResults } = data;
              routeResults.forEach((result) => {
                result.route.symbol = handlePointRoute("rgb");
                routeLayer.add(result.route);
              });
            };

            routeTask
              .solve(routeParams)
              .then(showRoute)
              .catch((err) => console.log("Error routeTask solve", err));
          })();
        }

        return () => {
          if (view) {
            view.destroy();
          }
        };
      }
    )
    .catch((err) => console.error(`Error handle all routes: ${err}`));
};
