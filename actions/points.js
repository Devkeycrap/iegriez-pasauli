import { SET_POINTS } from "./types";

// Set game points
export const setPoints = (points) => (dispatch) => {
  dispatch({
    type: SET_POINTS,
    payload: points,
  });
};
