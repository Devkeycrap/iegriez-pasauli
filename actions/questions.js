import axios from "axios";

import { SET_QUESTIONS, QUESTIONS_LOADING, QUESTIONS_LOADED } from "./types";

// Get quiz questions
export const getQuestions = (item) => (dispatch) => {
  dispatch({
    type: QUESTIONS_LOADING,
  });
  axios
    .get(`${process.env.HOST}/api/quiz/questions/`, {
      params: { item },
    })
    .then((res) => {
      dispatch({
        type: QUESTIONS_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// Set current current quiz question state
export const setQuestions = (newQuestions) => (dispatch) => {
  console.log(newQuestions);
  dispatch({
    type: SET_QUESTIONS,
    payload: newQuestions,
  });
};
