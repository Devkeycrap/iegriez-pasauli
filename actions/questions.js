import axios from "axios";

import { GET_QUESTIONS } from "./types";

// GET quiz questions
export const getQuestions = (item) => (dispatch) => {
  axios
    .get("http://localhost:8000/api/quiz/questions", item)
    .then((res) => {
      dispatch({
        type: GET_QUESTIONS,
        questions: res.data,
      });
    })
    .catch((err) => console.log(err));
};
