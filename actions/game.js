import {
  END_GAME,
  START_GAME,
  SWITCH_STAGE,
  RESTART_GAME,
  CLEAR_GAME_OBJECT,
  EXIT_GAME,
  CLEAR_QUESTIONS,
  RESET_POINTS,
} from "./types";

export const startGame = () => (dispatch) => {
  dispatch({
    type: CLEAR_GAME_OBJECT,
  });
  dispatch({
    type: CLEAR_QUESTIONS,
  });

  dispatch({
    type: RESET_POINTS,
  });

  dispatch({
    type: START_GAME,
  });
};

export const endGame = () => (dispatch) => {
  dispatch({
    type: END_GAME,
  });
};

export const exitGame = () => (dispatch) => {
  dispatch({
    type: EXIT_GAME,
  });
};

export const restartGame = () => (dispatch) => {
  dispatch({
    type: RESTART_GAME,
  });
};

export const switchStage = (stage) => (dispatch) => {
  dispatch({
    type: SWITCH_STAGE,
    payload: stage,
  });
};
