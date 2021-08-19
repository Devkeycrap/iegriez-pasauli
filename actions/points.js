import { SET_POINTS } from "./types";
import EventEmitter from "events";

const emitter = new EventEmitter();

emitter.on("POINTS_UPDATE", (points) => setPoints(points));
// Set game points
export const setPoints = (points) => (dispatch) => {
  console.log(points);
  dispatch({
    type: SET_POINTS,
    payload: points,
  });
};
