import L from "leaflet";
import food from "../public/icons/food.svg"
import transport from "../public/icons/transport.svg"
import power from "../public/icons/power.svg"
import tourism from "../public/icons/tourism.svg"
import waste from "../public/icons/waste.svg"

export const iconFood = new L.Icon({
  iconUrl: food,
  iconAnchor: [0, 0],
  popupAnchor: [30, 20],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(50, 50),
})

export const iconTransport = new L.Icon({
  iconUrl: transport,
  iconAnchor: [0, 0],
  popupAnchor: [30, 20],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(50, 50),
})


export const iconPower = new L.Icon({
  iconUrl: power,
  iconAnchor: [0, 0],
  popupAnchor: [30, 20],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(50, 50),
})

export const iconTourism = new L.Icon({
  iconUrl: tourism,
  iconAnchor: [0, 0],
  popupAnchor: [30, 20],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(50, 50),
})

export const iconWaste = new L.Icon({
  iconUrl: waste,
  iconAnchor: [0, 0],
  popupAnchor: [30, 20],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(50, 50),
})