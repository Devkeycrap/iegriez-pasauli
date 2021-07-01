// General imports
import { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";

// Styles & animations
import styles from "../styles/map.module.scss";

// Redux
import { connect } from "react-redux";
import { switchStage } from "../actions/game";
import { setPoints } from "../actions/points";
import { getQuestions, setQuestions } from "../actions/map";
import { playTransition } from "../actions/transition";

import IMapIcon from "../models/MapIcon.model";

import { dotCorrect, dotIncorrect, dotNeutral } from "../models/Markers.model";

interface MapProps {
  gameObj: {
    object: string;
    translatedName: string;
  };
  points: {
    quiz: number;
    map: number;
    words: number;
  };
  switchStage: (stage: number) => void;
  setPoints: (points: any) => void;
  getQuestions: (item: string) => void;
  setQuestions: (questions: IMapIcon[]) => void;
  questions: IMapIcon[];
  playTransition: (props) => void;
}

export class Map extends Component<MapProps> {
  state = {
    localPoints: 0,
    questions: null,
    answers: [],
    questionIndex: 0,
    errors: {},
    selectedIcon: null,
  };

  componentDidMount() {
    // CSR
    this.props.playTransition({
      title: "Karte",
      description: "Spied uz ikonām un atbildi uz apgalvojumiem!",
      length: 3000,
    });
    this.props.getQuestions(this.props.gameObj.object);
  }

  private submitQuestion = (e: any) => {
    e.preventDefault();

    // Make a post request to validate answer
    if (!this.state.selectedIcon.answer) {
      this.setState({
        errors: {
          ...this.state.errors,
          [this.state.selectedIcon.id]: {
            noInputError: true,
          },
        },
      });
      return;
    }
    axios
      .get(`${process.env.HOST}/api/map/answers/`, {
        params: {
          id: this.state.selectedIcon.id,
        },
      })
      .then((res) => {
        const questionIndex = this.props.questions.findIndex(
          (item) => item.id == this.state.selectedIcon.id
        );
        let newQuestions = this.props.questions;

        const correctAnswer = {
          isCorrect: res.data[0].answers.find(
            (item) => item.id == this.state.selectedIcon.answer
          ).is_correct,
          answerMessage: res.data[0].answer_message,
        };

        newQuestions[questionIndex] = {
          ...newQuestions[questionIndex],
          isCorrect: correctAnswer.isCorrect,
          answerMessage: correctAnswer.answerMessage,
        };

        console.log(newQuestions);
        this.props.setQuestions(newQuestions);
        this.setState({
          selectedIcon: {
            ...this.state.selectedIcon,
            isCorrect: correctAnswer.isCorrect,
            answerMessage: correctAnswer.answerMessage,
          },
        });
        try {
          this.validateAnswer(res);
        } catch (err) {
          if (err) {
            console.log(err);
          }
        }
      });
  };

  private validateAnswer = (res) => {
    // Update answers state with isCorrect and message to show if user has answered

    if (res.data.isCorrect)
      this.setState({ localPoints: this.state.localPoints + 5 });

    // If all questions are answered, then start next level, else return to start or end game
    if (this.state.answers.length >= this.props.questions.length) {
      setTimeout(() => {
        this.setState({
          questionIndex: this.state.questionIndex + 1,
          answers: [],
        });
        // this.getQuestions();
        if (this.state.questionIndex >= 3) {
          this.props.setPoints({
            ...this.props.points,
            map: this.props.points.map + this.state.localPoints,
          });
          this.props.switchStage(4);
        }
      }, 2000);
    }
  };

  render() {
    // Make sure the map loads with ssr set to false
    return (
      <div className={styles.map}>
        <h2 className={styles.counter} style={{ WebkitUserSelect: "none" }}>
          Uzkrātais punktu skaits: <span>{this.state.localPoints}</span>
        </h2>
        <MapContainer
          className={styles["map-container"]}
          maxZoom={4}
          center={[51.505, -0.09]}
          zoom={4}
          style={{ width: "100vw", height: "100vh", zIndex: 0 }}
          scrollWheelZoom={false}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=9AUzah9Vs15KRZwaOGTebGYk3tGtWfglxz7QPv1jiGAzulcJlAfBvLCPf61wYOxI"
          />
          {/* Load icons with questions to map */}
          {this.props.questions &&
            this.props.questions.map((item, i) => (
              <Marker
                icon={
                  (item.isCorrect && item.isCorrect == true && dotCorrect) ||
                  (item.isCorrect == false && dotIncorrect) ||
                  dotNeutral
                }
                // Set icon positions to random place in Europe
                position={[item.position[0], item.position[1]]}
                key={i}
              >
                <Popup
                  onOpen={() => this.setState({ selectedIcon: item })}
                  className={`${styles.popup}`}
                >
                  {/* If user has answered, display information without inputs */}
                  {this.state.selectedIcon &&
                    !this.state.selectedIcon.answerMessage && (
                      <div>
                        <h2>{item.statement}</h2>
                        {this.state.selectedIcon.answers.map((item, i) => (
                          <div key={i} className={styles["radio-container"]}>
                            <input
                              id={i}
                              type="radio"
                              className={styles.radio}
                              name={this.state.selectedIcon.id}
                              value={item.id}
                              onChange={(e) => {
                                this.setState({
                                  selectedIcon: {
                                    ...this.state.selectedIcon,
                                    answer: parseInt(e.target.value),
                                  },
                                });
                              }}
                            />
                            <label htmlFor={i}>{item.answer}</label>
                          </div>
                        ))}

                        <button
                          className={`${styles.btn} ${styles["btn-orange"]}`}
                          type="button"
                          name={this.state.selectedIcon.icon}
                          onClick={(e) => this.submitQuestion(e)}
                        >
                          Atbildēt
                        </button>
                      </div>
                    )}
                  {this.state.selectedIcon &&
                    this.state.selectedIcon.answerMessage && (
                      <div
                        className={
                          this.state.selectedIcon.isCorrect
                            ? styles.correct
                            : styles.incorrect
                        }
                      >
                        <h2>
                          {this.state.selectedIcon.isCorrect
                            ? "Pareizi!"
                            : "Nepareizi!"}
                        </h2>
                        <p>{this.state.selectedIcon.question}</p>

                        <h4>{this.state.selectedIcon.answerMessage}</h4>
                        {this.state.selectedIcon.isCorrect && (
                          <h3 style={{ WebkitUserSelect: "none" }}>+5</h3>
                        )}
                      </div>
                    )}
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameObj: state.gameObj,
  points: state.points,
  questions: state.map.questions,
});

export default connect(mapStateToProps, {
  setPoints,
  switchStage,
  getQuestions,
  setQuestions,
  playTransition,
})(Map);
