import { useEffect, useRef, useState } from "react";
import axios from "axios";
import IQuestions from "../models/Questions.model";
import styles from "../styles/questions.module.scss";

export default function Questions({ gameObj, setStage, setPoints }) {
  const [questions, setQuestions] = useState<IQuestions>({
    questions: [],
  });
  const [currentQuestion, setCurrentQuestion] = useState({
    index: 0,
    isCorrect: null,
  });

  useEffect(() => {
    if (questions.questions.length == 0) {
      axios
        .get(
          `https://iegriez-pasauli.herokuapp.com:8000/quiz/${gameObj.object}/questions`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setQuestions(res.data);
        });
    }
  }, [currentQuestion]);

  const answer = (answer: boolean) => {
    setCurrentQuestion({ ...currentQuestion, isCorrect: null });
    axios
      .post(
        `https://iegriez-pasauli.herokuapp.com:8000/quiz/${gameObj.object}/answer/${currentQuestion.index}`,
        {
          answer,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.isCorrect) {
          setPoints((points) => ({ questions: points.questions + 5 }));
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
            index: currentQuestion.index + 1,
            isCorrect: null,
          });
          if (currentQuestion.index >= questions["questions"].length - 1) {
            setStage(3);
          }
        }, 3000);
      });
  };

  return (
    <div className={styles.questions}>
      {currentQuestion.isCorrect == null && (
        <div>
          <h1>Patiesība vai meli</h1>
          <h2>{questions && questions.questions[currentQuestion.index]}</h2>
          <div className={styles["btn-container"]}>
            <button
              onClick={() => answer(true)}
              className={`${styles.btn} ${styles["btn-orange"]}`}
            >
              Patiesība
            </button>
            <button
              onClick={() => answer(false)}
              className={`${styles.btn} ${styles["btn-neutral"]}`}
            >
              Meli
            </button>
          </div>
        </div>
      )}
      {currentQuestion.isCorrect == true && (
        <div className={styles.overlay}>
          <div>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="check"
              className={styles.icon}
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="#9aca3c"
                d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
              ></path>
            </svg>
            <h1>Pareizi</h1>
            <h2>+5</h2>
          </div>
        </div>
      )}
      {currentQuestion.isCorrect == false && (
        <div className={styles.overlay}>
          <div>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="times"
              className={styles.icon}
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 352 512"
            >
              <path
                fill="#FD6579"
                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
              ></path>
            </svg>
            <h1>Nepareizi</h1>
          </div>
        </div>
      )}
    </div>
  );
}
