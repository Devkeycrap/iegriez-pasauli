import { MAP_QUESTIONS_LOADED, SET_MAP_QUESTIONS } from "../actions/types";

const initialState = {
  questions: [],
  answers: [],
  questionIndex: 0,
  errors: {},
  isCurrentQuestionCorrect: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case MAP_QUESTIONS_LOADED:
      return {
        ...state,
        questions: action.payload,
      };

    case SET_MAP_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };
    default:
      return state;
  }
}
