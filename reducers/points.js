import { SET_POINTS } from "../actions/types";

const initialState = {
  quiz: 0,
  map: 0,
  words: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_POINTS:
      return {
        ...state,
      };
    default:
      return state;
  }
}
