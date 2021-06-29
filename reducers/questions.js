import {
  CLEAR_QUESTIONS,
  QUESTIONS_LOADED,
  QUESTIONS_LOADING,
  SET_CURRENT_QUESTION,
} from "../actions/types";

const initialState = {
  isLoading: false,
  questions: [],
  currentQuestion: {
    index: 0,
    isCorrect: null,
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case QUESTIONS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case QUESTIONS_LOADED:
      return {
        ...state,
        questions: action.payload,
        isLoading: false,
      };
    case SET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.payload,
      };
    case CLEAR_QUESTIONS:
      return {
        ...state,
        isLoading: false,
        questions: [],
        currentQuestion: {
          index: 0,
          isCorrect: null,
        },
      };
    default:
      return state;
  }
}
