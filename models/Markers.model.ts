import L from "leaflet";
// import food from "../public/icons/food.svg"
// import transport from "../public/icons/transport.svg"
// import power from "../public/icons/power.svg"
// import tourism from "../public/icons/tourism.svg"
// import waste from "../public/icons/waste.svg"
import iconCorrect from "../public/icons/dot-correct.svg";
import iconIncorrect from "../public/icons/dot-incorrect.svg";
import iconNeutral from "../public/icons/dot-neutral.svg";

export const dotCorrect = new L.Icon({
  iconUrl: iconCorrect,
  iconAnchor: [0, 0],
  popupAnchor: [30, 20],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(50, 50),
})

export const dotIncorrect = new L.Icon({
  iconUrl: iconIncorrect,
  iconAnchor: [0, 0],
  popupAnchor: [10, 10],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(50, 50),
})


export const dotNeutral = new L.Icon({
  iconUrl: iconNeutral,
  iconAnchor: [0, 0],
  popupAnchor: [15, 15],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(30, 30),
})

// export const iconTourism = new L.Icon({
//   iconUrl: tourism,
//   iconAnchor: [0, 0],
//   popupAnchor: [30, 20],
//   shadowUrl: null,
//   shadowSize: null,
//   shadowAnchor: null,
//   iconSize: new L.Point(50, 50),
// })

// export const iconWaste = new L.Icon({
//   iconUrl: waste,
//   iconAnchor: [0, 0],
//   popupAnchor: [30, 20],
//   shadowUrl: null,
//   shadowSize: null,
//   shadowAnchor: null,
//   iconSize: new L.Point(50, 50),
// })