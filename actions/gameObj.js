import { CLEAR_GAME_OBJECT, SET_GAME_OBJECT } from "./types";

// SET game object
export const setGameObj = (gameObj) => (dispatch) => {
  dispatch({
    type: SET_GAME_OBJECT,
    payload: gameObj,
  });
};

export const clearGameObj = () => (dispatch) => {
  dispatch({
    type: CLEAR_GAME_OBJECT,
  });
};
