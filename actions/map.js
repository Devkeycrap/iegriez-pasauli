import axios from "axios";
import { MAP_ICONS_LOADING, MAP_ICONS_LOADED } from "./types";

// GET map icons
export const getIcons = (item) => (dispatch) => {
  dispatch({
    type: MAP_ICONS_LOADING,
  });
  axios
    .get("http://localhost:8000/api/map/questions", { params: { item } })
    .then((res) => {
      dispatch({
        type: MAP_ICONS_LOADED,
        payload: formatResponse(res.data),
      });
    });
};

const formatResponse = (res) => {
  let response = [];
  for (let i = 0; i < res.length; i++) {
    for (let j = 0; j < res.length; j++) {}
  }
  console.log(response);
  return response;
};
