import { useEffect, useState } from "react";
import axios from "axios";
import IQuestions from "../models/Questions.model";
import gsap from "gsap";

export default function Questions({ gameObj, setStage }) {
  const [questions, setQuestions] = useState<IQuestions>({
    questions: [],
  });
  const [currentQuestion, setCurrentQuestion] = useState({
    index: 0,
    isCorrect: null,
  });
  useEffect(() => {
    axios
      .get(`http://localhost:8000/quiz/${gameObj}/questions`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setQuestions(res.data);
      });
  }, []);

  const answer = (answer: boolean) => {
    axios
      .post(
        `http://localhost:8000/quiz/${gameObj}/answer/${currentQuestion.index}`,
        {
          body: {
            answer,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.correct == true) {
          setCurrentQuestion({
            ...currentQuestion,
            isCorrect: true,
          });
        } else {
          setCurrentQuestion({
            ...currentQuestion,
            isCorrect: false,
          });
        }

        setTimeout(() => {
          setCurrentQuestion({
            ...currentQuestion,
            index: currentQuestion.index + 1,
          });
          if (currentQuestion.index >= questions["questions"].length - 1) {
            transition();
          }
        }, 2000);
      });
  };

  const transition = () =>
    setTimeout(() => {
      setStage(3);
    }, 2000);

  // TODO: display message about the answer and then transition
  const displayCorrect = () => {};
  return (
    <div className="questions">
      <h1>Patiesība vai meli</h1>
      <h2>{questions && questions.questions[currentQuestion.index]}</h2>
      <div className="buttons">
        <button onClick={() => answer(true)} className="btn btn-green">
          Patiesība
        </button>
        <button onClick={() => answer(false)} className="btn btn-red">
          Meli
        </button>
      </div>
    </div>
  );
}
