import {
  END_GAME,
  RESTART_GAME,
  START_GAME,
  SWITCH_STAGE,
  EXIT_GAME,
} from "../actions/types";

const initialState = {
  stage: 4,
  isActive: false,
  hasFinished: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        stage: 1,
        isActive: true,
        hasFinished: false,
      };
    case END_GAME:
      return {
        ...state,
        stage: 5,
        isActive: false,
        hasFinished: true,
      };
    case EXIT_GAME:
      return {
        ...state,
        isActive: false,
        hasFinished: false,
      };
    case RESTART_GAME:
      return {
        ...state,
        stage: 1,
        isActive: true,
        hasFinished: false,
      };
    case SWITCH_STAGE:
      return {
        ...state,
        stage: action.payload,
      };
    default:
      return state;
  }
}
