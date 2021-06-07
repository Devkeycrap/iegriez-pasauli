// General imports
import { Component } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import axios from "axios";
import ReactMapGl, { Popup, Marker } from "react-map-gl";

// Styles & animations
import styles from "../styles/map.module.scss";

// Redux
import { connect } from "react-redux";
import { switchStage } from "../actions/game";
import { setPoints } from "../actions/points";
import { getQuestions, setQuestions } from "../actions/map";

import IMapIcon from "../models/MapIcon.model";

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
}

export class Map extends Component<MapProps> {
  state = {
    localPoints: 0,
    questions: null,
    answers: [],
    questionIndex: 0,
    errors: {},
    selectedIcon: null,
    viewport: {
      lat: 45.4211,
      lon: -75.6903,
      minZoom: 2.5,
      maxZoom: 2.5,
      zoom: 2.5,
      width: "100%",
      height: "100%",
    },
  };

  componentDidMount() {
    // CSR
    // this.getQuestions();
    this.props.getQuestions(this.props.gameObj.object);
  }

  // private getQuestions = () => {
  //   // Get questions for current object
  //   axios
  //     .get(
  //       `https://iegriez-pasauli-backend.herokuapp.com/map/${this.props.gameObj.object}/questions/${this.state.questionIndex}`
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //       res.data.questions.map(
  //         (item) =>
  //           (item["position"] = [
  //             Math.random() * 20 + 40,
  //             Math.random() * 30 - 5,
  //           ])
  //       );
  //       this.setState({ questions: res.data.questions });
  //     });
  // };

  private submitQuestion = (e: any) => {
    console.log(this.state.selectedIcon, "selected item");
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
      .get(`${process.env.HOST}/api/map/answers`, {
        params: {
          id: this.state.selectedIcon.answer,
        },
      })
      .then((res) => {
        console.log(res.data);
        const questionIndex = this.props.questions.findIndex(
          (item) => item.id == this.state.selectedIcon.id
        );
        let newQuestions = this.props.questions;
        newQuestions[questionIndex] = {
          ...newQuestions[questionIndex],
          isCorrect: res.data[0].is_correct,
          answerMessage: res.data[0].answer_message,
        };

        console.log(newQuestions);
        this.props.setQuestions(newQuestions);
        this.setState({
          selectedIcon: {
            ...this.state.selectedIcon,
            isCorrect: res.data[0].is_correct,
            answerMessage: res.data[0].answer_message,
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

        {/* leaflet.js map component */}
        <ReactMapGl
          {...this.state.viewport}
          mapboxApiAccessToken={
            "pk.eyJ1IjoiZGV2a2V5IiwiYSI6ImNrcGgzcXZhaTJoODYycGxsc3QyM2lzNnAifQ.06fOYFbbtJWs95bamJyNwQ"
          }
          onViewportChange={(viewport) =>
            this.setState({
              viewport,
            })
          }
          mapStyle={
            "mapbox://styles/devkey/ckoclzmjl086p17od55gdtbho?optimize=true"
          }
        >
          {this.props.questions &&
            this.props.questions.map((item, i) => (
              <Marker
                // icon={
                //   (this.state.answers[item.icon] &&
                //     (this.state.answers[item.icon].isCorrect
                //       ? dotCorrect
                //       : dotIncorrect)) ||
                //   dotNeutral
                // }
                longitude={item.position[1]}
                latitude={item.position[0]}
                // Set icon positions to random place in Europe
                // position={item.position}
                key={i}
              >
                <button
                  className={styles.marker}
                  onClick={() =>
                    this.setState({
                      selectedIcon: item,
                    })
                  }
                >
                  {!("isCorrect" in item) && (
                    <img src="/icons/dot-neutral.svg" alt="Neutral" />
                  )}

                  {"isCorrect" in item && item.isCorrect == true && (
                    <img src="/icons/dot-correct.svg" alt="Correct" />
                  )}

                  {"isCorrect" in item && item.isCorrect == false && (
                    <img src="/icons/dot-incorrect.svg" alt="Incorrect" />
                  )}
                </button>
              </Marker>
            ))}
          {this.state.selectedIcon && (
            <Popup
              longitude={this.state.selectedIcon.position[1]}
              latitude={this.state.selectedIcon.position[0]}
              className={styles.popup}
            >
              {!this.state.selectedIcon.answerMessage ? (
                <div>
                  <h2>{this.state.selectedIcon.statement}</h2>
                  <p>{this.state.selectedIcon.question}</p>
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
                              answer: e.target.value,
                            },
                          });
                        }}
                      />
                      <label htmlFor={i}>{item.answer}</label>
                    </div>
                  ))}
                  {this.state.errors[this.state.selectedIcon.icon]
                    ?.noInputError && (
                    <p className={styles.error}>Lūdzu izvēlies atbildi!</p>
                  )}

                  {this.state.selectedIcon && (
                    <h4>{this.state.selectedIcon.answerMessage}</h4>
                  )}

                  <button
                    className={`${styles.btn} ${styles["btn-orange"]}`}
                    type="button"
                    name={this.state.selectedIcon.icon}
                    onClick={(e) => this.submitQuestion(e)}
                  >
                    Atbildēt
                  </button>
                </div>
              ) : (
                <div
                  className={
                    this.state.selectedIcon.isCorrect
                      ? styles.correct
                      : styles.incorrect
                  }
                >
                  <h2>
                    {this.state.selectedIcon.isCorrect
                      ? "Pareizi"
                      : "Nepareizi"}
                  </h2>
                  <p>{this.state.selectedIcon.question}</p>

                  <h4>{this.state.selectedIcon.answerMessage}</h4>
                  {this.state.selectedIcon.isCorrect && (
                    <h3 style={{ WebkitUserSelect: "none" }}>+5</h3>
                  )}
                </div>
              )}
            </Popup>
          )}
        </ReactMapGl>
        {/* <MapContainer
          className={styles["map-container"]}
          maxZoom={4}
          center={[51.505, -0.09]}
          zoom={4}
          scrollWheelZoom={false}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="mapbox://styles/devkey/ckoclzmjl086p17od55gdtbho?optimize=true"
          />
        </MapContainer> */}
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
})(Map);
