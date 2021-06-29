import { CLEAR_GAME_OBJECT, SET_GAME_OBJECT } from "./types";

// Set game object
export const setGameObj = (gameObj) => (dispatch) => {
  dispatch({
    type: SET_GAME_OBJECT,
    payload: gameObj,
  });
};

// Clear game object
export const clearGameObj = () => (dispatch) => {
  dispatch({
    type: CLEAR_GAME_OBJECT,
  });
};
