import axios from "axios";
import {
  MAP_QUESTIONS_LOADING,
  MAP_QUESTIONS_LOADED,
  SET_MAP_QUESTIONS,
} from "./types";

// Get map icons with questions to display on the map
export const getQuestions = (item) => (dispatch) => {
  dispatch({
    type: MAP_QUESTIONS_LOADING,
  });
  axios
    .get(`${process.env.HOST}/api/map/questions`, { params: { item } })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: MAP_QUESTIONS_LOADED,
        payload: res.data.map((item) => ({
          ...item,
          position: [Math.random() * 20 + 40, Math.random() * 30 - 5],
        })),
      });
    });
};

// Set map questions
export const setQuestions = (questions) => (dispatch) => {
  dispatch({
    type: SET_MAP_QUESTIONS,
    payload: questions,
  });
};
