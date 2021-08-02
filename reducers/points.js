import { RESET_POINTS, SET_POINTS } from "../actions/types";

const initialState = {
  quiz: 0,
  map: 0,
  words: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_POINTS:
      return action.payload;
    case RESET_POINTS:
      return initialState;
    default:
      return state;
  }
}
