import { PLAY_TRANSITION, STOP_TRANSITION } from "./types";

// Play transition
export const playTransition = (props) => (dispatch) => {
  dispatch({
    type: PLAY_TRANSITION,
    payload: props,
  });

  setTimeout(
    () =>
      dispatch({
        type: STOP_TRANSITION,
      }),
    props.length
  );
};
