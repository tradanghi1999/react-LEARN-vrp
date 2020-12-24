const randomColorRgba = (rgba) => {
  const r = () => (Math.random() * 256) >> 0;
  switch (rgba) {
    case "rgba":
      return [r(), r(), r(), 0.3];
    case "rgb":
      return [r(), r(), r()];
    default:
      return [5, 150, 255];
  }
};

const handlePopupTemplate = (kind) => {
  switch (kind) {
    case "customer":
      return {
        content: [
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "Name",
                label: "Tên khách hàng",
              },
              {
                fieldName: "Weight",
                label: "Cân nặng",
              },
              {
                fieldName: "ServiceTime",
                label: "Thời gian phục vụ",
              },
              {
                fieldName: "TimeWindow",
                label: "Thời gian khách nhận hàng",
              },
            ],
          },
        ],
      };
    case "depot":
      return {
        content: [
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "Name",
                label: "Tên",
              },
              {
                fieldName: "TimeWindow",
                label: "Thời gian phục vụ",
              },
            ],
          },
        ],
      };
    default:
      break;
  }
};

const handlePointSymbol = (kind, index, color) => {
  switch (kind) {
    case "depot":
      return {
        type: "text",
        color: "yellow",
        haloColor: "black",
        haloSize: "1px",
        text: "Kho",
        xoffset: 3,
        yoffset: 3,
        font: {
          size: 16,
          outline: 0,
          family: "sans-serif",
          weight: "bold",
        },
      };
    case "customer":
      return {
        type: "text",
        color: color ? color : "yellowgreen",
        haloColor: "black",
        haloSize: "1px",
        text: index,
        xoffset: 3,
        yoffset: 3,
        font: {
          size: 14,
          outline: 0,
          family: "sans-serif",
          weight: "bold",
        },
      };
    default:
      break;
  }
};

const handlePointRoute = (rgba) => {
  const color = randomColorRgba(rgba);
  return {
    type: "simple-line",
    join: "bevel",
    cap: "butt",
    color,
    width: 3,
  };
};

const handlePointAtt = (...param) => {
  const [kind, name, weight, serviceTime, timeWindow, index] = param;
  return {
    Name: kind === "depot" ? "Kho" : name,
    Weight: `${weight} kg`,
    ServiceTime: `${serviceTime}h`,
    TimeWindow: `${timeWindow[0]}h - ${timeWindow[1]}h`,
    RouteName: `${index}`,
  };
};

const handleGeometry = (type = "point", longitude, latitude) => {
  return {
    type,
    longitude,
    latitude,
  };
};

export {
  handleGeometry,
  handlePointAtt,
  handlePointRoute,
  handlePointSymbol,
  handlePopupTemplate,
  randomColorRgba,
};
