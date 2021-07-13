// General imports
import { useEffect } from "react";
import axios from "axios";

// Styles & animations
import styles from "../styles/questions.module.scss";
import { motion } from "framer-motion";
import { fadeInUp } from "../models/animations/animations";

// Redux
import { connect } from "react-redux";
import { getQuestions, setQuestions } from "../actions/questions";
import { switchStage } from "../actions/game";
import { setPoints } from "../actions/points";
import Spinner from "./Spinner.component";
import { playTransition } from "../actions/transition";

interface IQuestion {
  id: number;
  question: string;
  answer: boolean;
  isCorrect: boolean;
  isLoading: boolean;
}

export function Questions({
  points,
  gameObj,
  switchStage,
  setPoints,
  questions,
  isLoading,
  setQuestions,
  getQuestions,
  playTransition,
}) {
  // Get questions for current item
  useEffect(() => {
    playTransition({
      title: "Viktorīna",
      description: "Vai esi spējīgs atminēt visus jautājumus?",
      length: 3000,
    });
    getQuestions(gameObj.object);
  }, []);

  const submitAnswer = (id: number, answer: boolean) => {
    const questionIndex = questions.findIndex((item) => item.id == id);
    let newQuestions = questions.slice();
    newQuestions[questionIndex] = {
      ...newQuestions[questionIndex],
      isLoading: true,
    };
    setQuestions(newQuestions);

    axios
      .get(`${process.env.HOST}/api/quiz/answers/`, {
        params: {
          id,
        },
      })
      .then((res) => {
        const questionIndex = questions.findIndex((item) => item.id == id);
        let newQuestions = questions.slice();
        newQuestions[questionIndex] = {
          ...newQuestions[questionIndex],
          answer,
          isCorrect: res.data[0].is_correct == answer,
          loading: false,
        };
        setQuestions(newQuestions);
        console.log(res.data.is_correct);
        if (res.data[0].is_correct == answer) {
          setPoints({
            ...points,
            quiz: points.quiz + 1,
          });
        }
        setTimeout(() => {
          // If all questions answered, switch to next stage
          let answeredQuestions: number = 0;
          for (let val of questions)
            if ("isCorrect" in val) answeredQuestions++;
          if (answeredQuestions >= questions.length - 1) {
            switchStage(3);
          }
        }, 3000);
      });
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial="initial"
      animate="animate"
      className={styles.questions}
    >
      <h1 style={{ WebkitUserSelect: "none" }}>Izvērtē apgalvojumus!</h1>

      {isLoading && <Spinner />}
      {questions &&
        questions.map((item: IQuestion, id: number) => (
          <div key={id} className={styles.question}>
            <motion.h2
              className={
                ("isCorrect" in item &&
                  (item.isCorrect ? styles.correct : styles.incorrect)) ||
                ""
              }
              variants={fadeInUp}
              style={{ WebkitUserSelect: "none" }}
            >
              {item.question}
              {"isCorrect" in item &&
                (!item.isCorrect != item.answer ? (
                  <span>
                    <img
                      src="icons/check-solid.svg"
                      alt="Correct"
                      className={styles.icon}
                    />
                  </span>
                ) : (
                  <span>
                    <img
                      src="icons/close.svg"
                      alt="Correct"
                      className={styles.icon}
                    />
                  </span>
                ))}
            </motion.h2>
            {("isCorrect" in item && item.isCorrect == true && (
              <div className={styles["answer-message"]}>
                {"Pareizi!".split("").map((char, i) => (
                  <span
                    className={styles.correct}
                    key={i}
                    style={{ animationDelay: i / 10 + "s" }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            )) ||
              ("isCorrect" in item && !item.isCorrect && (
                <div className={styles["answer-message"]}>
                  {"Nepareizi!".split("").map((char, i) => (
                    <span
                      className={styles.incorrect}
                      key={i}
                      style={{ animationDelay: i / 10 + "s" }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              )) ||
              (!item.isLoading && (
                <div className={styles["btn-container"]}>
                  <button
                    onClick={() => submitAnswer(item.id, true)}
                    className={`${styles.btn} ${styles["btn-orange"]}`}
                  >
                    Patiesība
                  </button>
                  <button
                    onClick={() => submitAnswer(item.id, false)}
                    className={`${styles.btn} ${styles["btn-neutral"]}`}
                  >
                    Meli
                  </button>
                </div>
              )) || (
                <div className={styles.spinner}>
                  <Spinner />
                </div>
              )}
          </div>
        ))}
    </motion.div>
  );
}

const mapStateToProps = (state) => ({
  gameObj: state.gameObj,
  questions: state.questions.questions,
  isLoading: state.questions.isLoading,
  points: state.points,
});

export default connect(mapStateToProps, {
  setQuestions,
  getQuestions,
  switchStage,
  setPoints,
  playTransition,
})(Questions);
