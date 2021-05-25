import { GET_QUESTIONS } from "../actions/types";

const initialState = {
  questions: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };
    default:
      return state;
  }
}
