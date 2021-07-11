import { CLEAR_GAME_OBJECT, SET_GAME_OBJECT } from "../actions/types";

const initialState = {
  isLoaded: false,
  object: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_GAME_OBJECT:
      return {
        ...state,
        object: action.payload.object,
        isLoaded: action.payload.isLoaded,
      };
    case CLEAR_GAME_OBJECT:
      return {
        ...state,
        isLoaded: false,
        object: "",
      };
    default:
      return state;
  }
}
