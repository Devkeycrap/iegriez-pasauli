import { SET_POINTS } from "./types";
import { EventEmitter } from "stream";

const emitter = new EventEmitter();

emitter.on("POINTS_UPDATE", (points) => setPoints(points));
// Set game points
export const setPoints = (points) => (dispatch) => {
  dispatch({
    type: SET_POINTS,
    payload: points,
  });
};
