// General imports
import { Component } from "react";
import { connect } from "react-redux";

// Styles & animations
import styles from "../styles/words.module.scss";

import { motion } from "framer-motion";
import { fadeInUp, stagger } from "../models/animations/animations";

import { setPoints } from "../actions/points";
import { endGame, switchStage } from "../actions/game";
import { clearGameObj } from "../actions/gameObj";
import { playTransition } from "../actions/transition";

interface WordProps {
  endGame: () => void;
  clearGameObj: () => void;
  switchStage: (stage: number) => void;
  setPoints: (points: any) => void;
  playTransition: (props: any) => void;
  points: {
    quiz: number;
    map: number;
    words: number;
  };
  stage: number;
  sectors: any[];
}

export class Words extends Component<WordProps> {
  mainthread = setInterval(null);
  state = {
    inBrowser: false,
    currActors: [],
    corrActors: [],
    countdown: 3,
    points: 0,
    wordList: {
      correct: [
        "pārstrādāt",
        "šķirot",
        "salabot",
        "remontēt",
        "nekaitēt",
        "rūpēties",
        "atjaunot",
        "nepiesārņot",
        "sašūt",
        "salāpīt",
        "šķirot",
        "atdot",
        "mainīties",
        "aizņemties",
        "iznomāt",
        "iestādīt",
        "salīmēt",
        "saskrūvēt",
        "pienaglot",
        "izaudzēt",
        "skriet",
        "iet",
        "izprast",
        "zināt",
        "domāt",
        "kopt",
        "taupīt",
        "samazināt",
        "apsaimniekot",
        "izvērtēt",
        "ievērot",
        "sadarboties",
      ],
      incorrect: [
        "patērēt",
        "izmest",
        "piesārņot",
        "nekopt",
        "neremontēt",
        "nešķirot",
        "nedomāt",
        "nerūpēties",
        "pārtērēt",
        "nesaudzēt",
        "piemēslot",
        "iznīcināt",
        "saindēt",
      ],
    },
  };

  compare(pos) {
    let floor = Math.floor;
    let valid = false;

    const _ = this.state.currActors;
    if (_.length == 0) return true;
    _.map((obj) => {
      if (floor(obj.pos.x) == floor(pos.x) || floor(obj.pos.y) == floor(pos.y))
        return;

      if (obj.pos.x - obj.age / 2 > pos.x && obj.pos.x + obj.age / 2 < pos.x)
        return;
      return (valid = true);
    });
    return valid;
  }

  newObj() {
    let ran = Math.random;
    let floor = Math.floor;

    if (this.state.currActors.length < 100) {
      let pos = {
        x: floor(ran() * 96) + "%",
        y: floor(ran() * 96) + "%",
      };
      if (!this.compare(pos)) return;

      const dictionary = this.state.wordList.correct.concat(
        this.state.wordList.incorrect
      );

      const content = dictionary[floor(ran() * dictionary.length)];

      this.setState({
        currActors: [
          ...this.state.currActors,
          {
            date: Date.now(),
            age: 16,
            content,
            pos,
          },
        ],
      });
    }
  }

  newTick(elements) {
    let arr = this.state.currActors;

    arr.map((obj, i) => {
      if (obj.age > 50) arr.splice(i, 1);
      else return (obj.age = obj.age + 2);
    });

    this.setState({ currActors: arr });
  }

  removeActor(target) {
    let arr = this.state.currActors;

    arr.map((obj, i) => {
      if (target.id == obj.date) arr.splice(i, 1);
    });

    return this.setState({
      currActors: arr,
    });
  }

  clickEvent(e) {
    let correct = false;

    if (e.target.tagName == "LABEL") {
      this.state.wordList.correct.map((obj) => {
        if (obj == e.target.innerHTML) correct = true;
      });

      if (correct) {
        this.setState({
          points: this.state.points + 0.5,
        });

        this.setState({
          corrActors: [e.target.innerHTML, ...this.state.corrActors],
        });

        new Audio("/sfx/tick.wav").play();
      }
      return this.removeActor(e.target);
    }
  }

  engine() {
    clearInterval(this.mainthread);
    this.mainthread = setInterval(() => {
      this.newObj();
      this.newTick(document.getElementsByClassName("wordObj"));
    }, 400);

    setTimeout(() => {
      clearInterval(this.mainthread);
      this.props.clearGameObj();
      this.props.setPoints({
        ...this.props.points,
        words: this.props.points.words + this.state.points,
      });
      this.props.endGame();
    }, 15000);
  }

  componentDidMount() {
    this.setState({ inBrowser: true });

    this.props.playTransition({
      title: "Krāj vārdus!",
      description: "Cik vārdus vari sakrāt tu?",
      length: 3000,
    });

    let seconds = 3;
    /* Countdown timer logic. */
    this.mainthread = setInterval(() => {
      if (seconds < 0) {
        clearInterval(this.mainthread);
        return this.engine();
      }
      seconds--;
      this.setState({ countdown: seconds });
    }, 720);
  }

  componentWillUnmount() {
    clearInterval(this.mainthread);
  }

  render() {
    if (!this.state.inBrowser) {
      return null;
    }

    return (
      <>
        <motion.div variants={stagger} className={styles.container}>
          {/* Game canvas */}
          <div className={styles.canvas} onClick={(e) => this.clickEvent(e)}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="globe-europe"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 496 512"
            >
              <path
                fill="currentColor"
                d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm200 248c0 22.5-3.9 44.2-10.8 64.4h-20.3c-4.3 0-8.4-1.7-11.4-4.8l-32-32.6c-4.5-4.6-4.5-12.1.1-16.7l12.5-12.5v-8.7c0-3-1.2-5.9-3.3-8l-9.4-9.4c-2.1-2.1-5-3.3-8-3.3h-16c-6.2 0-11.3-5.1-11.3-11.3 0-3 1.2-5.9 3.3-8l9.4-9.4c2.1-2.1 5-3.3 8-3.3h32c6.2 0 11.3-5.1 11.3-11.3v-9.4c0-6.2-5.1-11.3-11.3-11.3h-36.7c-8.8 0-16 7.2-16 16v4.5c0 6.9-4.4 13-10.9 15.2l-31.6 10.5c-3.3 1.1-5.5 4.1-5.5 7.6v2.2c0 4.4-3.6 8-8 8h-16c-4.4 0-8-3.6-8-8s-3.6-8-8-8H247c-3 0-5.8 1.7-7.2 4.4l-9.4 18.7c-2.7 5.4-8.2 8.8-14.3 8.8H194c-8.8 0-16-7.2-16-16V199c0-4.2 1.7-8.3 4.7-11.3l20.1-20.1c4.6-4.6 7.2-10.9 7.2-17.5 0-3.4 2.2-6.5 5.5-7.6l40-13.3c1.7-.6 3.2-1.5 4.4-2.7l26.8-26.8c2.1-2.1 3.3-5 3.3-8 0-6.2-5.1-11.3-11.3-11.3H258l-16 16v8c0 4.4-3.6 8-8 8h-16c-4.4 0-8-3.6-8-8v-20c0-2.5 1.2-4.9 3.2-6.4l28.9-21.7c1.9-.1 3.8-.3 5.7-.3C358.3 56 448 145.7 448 256zM130.1 149.1c0-3 1.2-5.9 3.3-8l25.4-25.4c2.1-2.1 5-3.3 8-3.3 6.2 0 11.3 5.1 11.3 11.3v16c0 3-1.2 5.9-3.3 8l-9.4 9.4c-2.1 2.1-5 3.3-8 3.3h-16c-6.2 0-11.3-5.1-11.3-11.3zm128 306.4v-7.1c0-8.8-7.2-16-16-16h-20.2c-10.8 0-26.7-5.3-35.4-11.8l-22.2-16.7c-11.5-8.6-18.2-22.1-18.2-36.4v-23.9c0-16 8.4-30.8 22.1-39l42.9-25.7c7.1-4.2 15.2-6.5 23.4-6.5h31.2c10.9 0 21.4 3.9 29.6 10.9l43.2 37.1h18.3c8.5 0 16.6 3.4 22.6 9.4l17.3 17.3c3.4 3.4 8.1 5.3 12.9 5.3H423c-32.4 58.9-93.8 99.5-164.9 103.1z"
              ></path>
            </svg>

            {this.state.currActors.map((obj, i) => {
              return (
                <label
                  key={i}
                  id={obj.date}
                  style={{
                    left: obj.pos.x,
                    top: obj.pos.y,
                    fontSize: obj.age + "px",
                  }}
                >
                  {obj.content}
                </label>
              );
            })}
          </div>

          <div className={styles.board}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="globe-europe"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 496 512"
            >
              <path
                fill="currentColor"
                d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm200 248c0 22.5-3.9 44.2-10.8 64.4h-20.3c-4.3 0-8.4-1.7-11.4-4.8l-32-32.6c-4.5-4.6-4.5-12.1.1-16.7l12.5-12.5v-8.7c0-3-1.2-5.9-3.3-8l-9.4-9.4c-2.1-2.1-5-3.3-8-3.3h-16c-6.2 0-11.3-5.1-11.3-11.3 0-3 1.2-5.9 3.3-8l9.4-9.4c2.1-2.1 5-3.3 8-3.3h32c6.2 0 11.3-5.1 11.3-11.3v-9.4c0-6.2-5.1-11.3-11.3-11.3h-36.7c-8.8 0-16 7.2-16 16v4.5c0 6.9-4.4 13-10.9 15.2l-31.6 10.5c-3.3 1.1-5.5 4.1-5.5 7.6v2.2c0 4.4-3.6 8-8 8h-16c-4.4 0-8-3.6-8-8s-3.6-8-8-8H247c-3 0-5.8 1.7-7.2 4.4l-9.4 18.7c-2.7 5.4-8.2 8.8-14.3 8.8H194c-8.8 0-16-7.2-16-16V199c0-4.2 1.7-8.3 4.7-11.3l20.1-20.1c4.6-4.6 7.2-10.9 7.2-17.5 0-3.4 2.2-6.5 5.5-7.6l40-13.3c1.7-.6 3.2-1.5 4.4-2.7l26.8-26.8c2.1-2.1 3.3-5 3.3-8 0-6.2-5.1-11.3-11.3-11.3H258l-16 16v8c0 4.4-3.6 8-8 8h-16c-4.4 0-8-3.6-8-8v-20c0-2.5 1.2-4.9 3.2-6.4l28.9-21.7c1.9-.1 3.8-.3 5.7-.3C358.3 56 448 145.7 448 256zM130.1 149.1c0-3 1.2-5.9 3.3-8l25.4-25.4c2.1-2.1 5-3.3 8-3.3 6.2 0 11.3 5.1 11.3 11.3v16c0 3-1.2 5.9-3.3 8l-9.4 9.4c-2.1 2.1-5 3.3-8 3.3h-16c-6.2 0-11.3-5.1-11.3-11.3zm128 306.4v-7.1c0-8.8-7.2-16-16-16h-20.2c-10.8 0-26.7-5.3-35.4-11.8l-22.2-16.7c-11.5-8.6-18.2-22.1-18.2-36.4v-23.9c0-16 8.4-30.8 22.1-39l42.9-25.7c7.1-4.2 15.2-6.5 23.4-6.5h31.2c10.9 0 21.4 3.9 29.6 10.9l43.2 37.1h18.3c8.5 0 16.6 3.4 22.6 9.4l17.3 17.3c3.4 3.4 8.1 5.3 12.9 5.3H423c-32.4 58.9-93.8 99.5-164.9 103.1z"
              ></path>
            </svg>

            <div className={styles["points-backdrop"]}>
              <h2>+{this.state.points}</h2>
            </div>
            {this.state.corrActors.map((obj, i) => {
              return <h2 key={i}>{obj}</h2>;
            })}
          </div>
        </motion.div>

        {/* Visual countdown timer */}
        {/*{this.state.countdown > -1 &&
        <motion.div variants={fadeInUp} className={styles.countdown}>
          {this.state.countdown > 0 && <h1>{this.state.countdown}</h1>}
          {this.state.countdown == 0 && <h1>Go!</h1>}
        </motion.div>} */}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  stage: state.game.stage,
  points: state.points,
});

export default connect(mapStateToProps, {
  endGame,
  setPoints,
  clearGameObj,
  switchStage,
  playTransition,
})(Words);
