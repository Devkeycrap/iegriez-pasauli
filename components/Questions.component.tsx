import { useEffect, useState } from "react";
import axios from "axios";

export default function Questions({ gameObj }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/quiz/${gameObj}/questions`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setQuestions(res.data);
      });
  }, []);

  const answer = async (answer: boolean) => {
    axios
      .post(`http://localhost:8000/quiz/${gameObj}/answer/${currentQuestion}`, {
        body: {
          answer,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.correct == true) {
        } else {
        }

        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1);
        }, 2000);
      });
  };

  return (
    <div className="questions">
      <h1>Patiesība vai meli</h1>
      <h2>{questions[currentQuestion]}</h2>
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
