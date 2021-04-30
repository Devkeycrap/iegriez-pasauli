import { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import styles from "../styles/map.module.scss";
import {
  iconFood,
  iconPower,
  iconTourism,
  iconTransport,
  iconWaste,
} from "../models/Markers.model";
import IPoints from "../models/Points.model";

interface MapProps {
  gameObj: {
    object: string;
    name: string;
  };
  points: IPoints;
  setStage: (stage: number) => void;
  setPoints: (points: any) => void;
}

export default class Map extends Component<MapProps> {
  state = {
    localPoints: 0,
    inBrowser: false,
    questions: null,
    answers: {},
    questionIndex: 0,
    helpOpened: false,
    errors: {},
    isCurrentQuestionCorrect: null,
  };

  componentDidMount() {
    // CSR
    this.setState({ inBrowser: true });
    this.getQuestions();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
    // TODO: reject component updates when it's unnecessary
  }

  // Returns icon based on object name
  getIcon = (object: string) => {
    switch (object) {
      case "transport":
        return iconTransport;
      case "power":
        return iconPower;
      case "tourism":
        return iconTourism;
      case "food":
        return iconFood;
      case "waste":
        return iconWaste;
    }
  };

  // Returns object translation to display in UI
  getPopupName = (object: string) => {
    switch (object) {
      case "transport":
        return "Transports";
      case "power":
        return "Elektroenerģija";
      case "tourism":
        return "Tūrisms";
      case "food":
        return "Pārtika";
      case "waste":
        return "Atkritumi";
    }
  };

  handleRadio = (e: any) => {
    this.setState({
      answers: {
        ...this.state.answers,
        [e.target.name]: { answer: e.target.value },
      },
    });
  };

  getQuestions = () => {
    // Get questions for current object
    axios
      //${this.props.gameObj.object}
      .get(
        `http://localhost:8000/map/Hamburger/questions/${this.state.questionIndex}`
      )
      .then((res) => {
        res.data.questions.map(
          (item) =>
            (item["position"] = [
              Math.random() * 20 + 40,
              Math.random() * 30 - 5,
            ])
        );
        this.setState({ questions: res.data.questions });
      });
  };

  submitQuestion = (e: any, item) => {
    e.preventDefault();

    // Check answered question count
    let answerCount = 0;
    Object.keys(this.state.answers).forEach((key) => {
      if (this.state.answers[key] && this.state.answers[key].message) {
        answerCount++;
      }
    });

    // Make a post request to validate answer
    if (!this.state.answers[item.icon]) {
      this.setState({
        errors: {
          ...this.state.errors,
          [item.icon]: {
            noInputError: true,
          },
        },
      });
      return;
    }
    axios
      .post(
        `http://localhost:8000/map/${this.props.gameObj}/answer/${e.target.name}/${this.state.questionIndex}`,
        {
          answer: this.state.answers[item.icon].answer,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        this.validateAnswer(res, item, answerCount);
      });
  };

  validateAnswer = (res, item, answerCount) => {
    // Update answers state with isCorrect and message to show if user has answered
    this.setState({
      answers: {
        ...this.state.answers,
        [item.icon]: {
          ...this.state.answers[item.icon],
          isCorrect: res.data.isCorrect,
          message: res.data.message,
        },
      },
    });
    if (res.data.isCorrect)
      this.setState({ localPoints: this.state.localPoints + 5 });

    // If all questions are answered, then start next level, else return to start or end game
    if (answerCount >= this.state.questions.length - 1) {
      setTimeout(() => {
        this.setState({
          questionIndex: this.state.questionIndex + 1,
          answers: {},
        });
        this.getQuestions();
        if (this.state.questionIndex >= 3) {
          this.props.setPoints((points) => ({
            map: points.map + this.state.localPoints,
          }));
          this.props.setStage(1);
        }
      }, 2000);
    }
  };

  render() {
    // Make sure the map loads with ssr set to false
    if (!this.state.inBrowser) {
      return null;
    }
    return (
      <div className={styles.map}>
        {/* Help box */}
        <h2 className={styles.counter}>
          Uzkrātais punktu skaits: <span>{this.state.localPoints}</span>
        </h2>
        {this.state.helpOpened && (
          <div className={styles.help}>
            <div
              className={styles.close}
              onClick={() => this.setState({ helpOpened: false })}
            >
              ×
            </div>
            Atbildi uz visiem ikonu jautājumiem, lai piekļūtu nākamā etapa
            jautājumiem
          </div>
        )}
        <div
          className={styles["help-btn"]}
          onClick={() => this.setState({ helpOpened: !this.state.helpOpened })}
        >
          Info
        </div>

        {/* leaflet.js map component */}
        <MapContainer
          className={styles["map-container"]}
          maxZoom={4}
          center={[51.505, -0.09]}
          zoom={4}
          scrollWheelZoom={false}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Load icons with questions to map */}
          {this.state.questions &&
            this.state.questions.map((item, i) => (
              <Marker
                icon={this.getIcon(item.icon)}
                // Set icon positions to random place in Europe
                position={item.position}
                key={i}
              >
                <Popup className={`${styles.popup}`}>
                  {/* If user has answered, display information without inputs */}
                  {this.state.answers &&
                  !this.state.answers[item.icon]?.message ? (
                    <div>
                      <h2>{this.getPopupName(item.icon)}</h2>
                      <p>{item.question}</p>
                      {item.answers.map((text, i) => (
                        <div key={i} className={styles["radio-container"]}>
                          <input
                            id={i}
                            type="radio"
                            className={styles.radio}
                            name={item.icon}
                            value={i}
                            onChange={this.handleRadio}
                          />
                          <label htmlFor={i}>{text}</label>
                        </div>
                      ))}
                      {this.state.errors[item.icon]?.noInputError && (
                        <p className={styles.error}>Lūdzu izvēlies atbildi!</p>
                      )}

                      {this.state.answers && this.state.answers[item.icon] && (
                        <h4>{this.state.answers[item.icon].message}</h4>
                      )}

                      <button
                        className={`${styles.btn} ${styles["btn-orange"]}`}
                        type="button"
                        name={item.icon}
                        onClick={(e) => this.submitQuestion(e, item)}
                      >
                        Atbildēt
                      </button>
                    </div>
                  ) : (
                    <div
                      className={
                        this.state.answers[item.icon].isCorrect
                          ? styles.correct
                          : styles.incorrect
                      }
                    >
                      <h2>
                        {this.state.answers[item.icon].isCorrect
                          ? "Pareizi"
                          : "Nepareizi"}
                      </h2>
                      <p>{item.question}</p>

                      {this.state.answers && this.state.answers[item.icon] && (
                        <h4>{this.state.answers[item.icon].message}</h4>
                      )}
                      {this.state.answers[item.icon].isCorrect && <h3>+5</h3>}
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
