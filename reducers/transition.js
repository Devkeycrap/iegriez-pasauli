import { PLAY_TRANSITION, STOP_TRANSITION } from "../actions/types";

const initialState = {
  title: "",
  description: "",
  isActive: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PLAY_TRANSITION:
      return {
        ...state,
        title: action.payload.title,
        description: action.payload.description,
        isActive: true,
      };
    case STOP_TRANSITION:
      return {
        ...state,
        isActive: false,
      };
    default:
      return state;
  }
}
