import { CLEAR_GAME_OBJECT, SET_GAME_OBJECT } from "../actions/types";

const initialState = {
  isLoaded: false,
  object: "",
  translatedName: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_GAME_OBJECT:
      return {
        ...state,
        object: action.payload.object,
        translatedName: action.payload.translatedName,
        isLoaded: action.payload.isLoaded,
      };
    case CLEAR_GAME_OBJECT:
      return {
        ...state,
        isLoaded: false,
        object: "",
        translatedName: "",
      };
    default:
      return state;
  }
}
