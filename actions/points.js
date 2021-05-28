import { SET_POINTS } from "./types";

// SET points
export const setPoints = (points) => (dispatch) => {
  dispatch({
    type: SET_POINTS,
    payload: points,
  });
};
