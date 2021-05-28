import axios from "axios";

import {
  SET_CURRENT_QUESTION,
  QUESTIONS_LOADING,
  QUESTIONS_LOADED,
} from "./types";

// GET quiz questions
export const getQuestions = (item) => (dispatch) => {
  dispatch({
    type: QUESTIONS_LOADING,
  });
  axios
    .get("http://localhost:8000/api/quiz/questions/", {
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

export const setCurrentQuestion = (index, isCorrect) => (dispatch) =>
  dispatch({
    type: SET_CURRENT_QUESTION,
    payload: {
      index,
      isCorrect,
    },
  });
