import { MAP_ICONS_LOADED } from "../actions/types";

const initialState = {
  localPoints: 0,
  inBrowser: false,
  questions: null,
  answers: {},
  questionIndex: 0,
  helpOpened: false,
  errors: {},
  isCurrentQuestionCorrect: null,
  icons: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case MAP_ICONS_LOADED:
      return {
        ...state,
        icons: action.payload,
      };
    default:
      return state;
  }
}
