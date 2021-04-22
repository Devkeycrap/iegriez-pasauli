import { useEffect, useState, memo, useRef } from "react";
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
// import QuestionPopup from "./QuestionPopup.component";
// import IPopup from "../models/Popup.model";

export default function Map({ gameObj }) {
  const [inBrowser, setInBrowser] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  // const [popup, setPopup] = useState<IPopup>({
  //   isOpen: false,
  //   title: "",
  //   question: "",
  //   answers: [],
  //   icon: "",
  // });

  useEffect(() => {
    setInBrowser(true);
    axios.get(`http://localhost:8000/map/${gameObj}/questions`).then((res) => {
      setQuestions(res.data);
    });
  }, []);

  const getIcon = (object: string) => {
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

  const getPopupName = (object: string) => {
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

  const handleRadio = (e: any) => {
    setAnswers({
      ...answers,
      [e.target.name]: { answer: e.target.value },
    });
  };

  const submit = (e: any, item) => {
    e.preventDefault();

    let answerCount = 0;
    Object.keys(answers).forEach((key) => {
      if (answers[key].message) {
        answerCount++;
      }
    });
    console.log(questions["questions"].length);
    if (answerCount >= questions["questions"].length - 1) {
      console.log("reset");
      setQuestionIndex(questionIndex + 1);
      setAnswers({});
    }

    axios
      .post(
        `http://localhost:8000/map/${gameObj}/answer/${e.target.name}/${questionIndex}`,
        {
          answer: answers[item.icon].answer,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        setAnswers({
          ...answers,
          [item.icon]: {
            ...answers[item.icon],
            isCorrect: res.data.isCorrect,
            message: res.data.message,
          },
        });
      });
  };

  // const openPopup = (item: any) => {
  //   setPopup({
  //     ...popup,
  //     isOpen: true,
  //     title: getPopupName(item.icon),
  //     question: item.questions[questionIndex],
  //     answers: item.answers[questionIndex],
  //     icon: item.icon,
  //   });
  // };

  if (!inBrowser) {
    return null;
  }

  return (
    <div className={styles.map}>
      {/* {popup.isOpen && (
        <QuestionPopup
          title={popup.title}
          question={popup.question}
          answers={popup.answers}
          icon={popup.icon}
          setPopup={setPopup}
        />
      )} */}
      <MapContainer
        maxZoom={4}
        className="map"
        center={[51.505, -0.09]}
        zoom={4}
        scrollWheelZoom={false}
        zoomControl={false}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {questions &&
          questions["questions"].map((item, i) => (
            <Marker
              icon={getIcon(item.icon)}
              position={[Math.random() * 20 + 40, Math.random() * 30 - 5]}
              key={i}
            >
              <Popup
                className={`${styles.popup} ${
                  answers[item.icon] && answers[item.icon].isCorrect
                    ? styles.correct
                    : styles.incorrect
                }`}
              >
                {!answers[item.icon]?.message ? (
                  <div>
                    <h2>{getPopupName(item.icon)}</h2>
                    <p>{item.questions[questionIndex]}</p>
                    {item.answers[questionIndex].map((text, i) => (
                      <div key={i} className={styles["radio-container"]}>
                        <input
                          id={item.icon}
                          type="radio"
                          className={styles.radio}
                          name={item.icon}
                          value={i}
                          onChange={handleRadio}
                        />
                        <label htmlFor={item.icon}>{text}</label>
                      </div>
                    ))}
                    {answers[item.icon] && <p>{answers[item.icon].message}</p>}

                    <button
                      className={styles["btn-orange"]}
                      type="button"
                      name={item.icon}
                      onClick={(e) => submit(e, item)}
                    >
                      Atbildēt
                    </button>
                  </div>
                ) : (
                  <div>
                    <h2>{getPopupName(item.icon)}</h2>
                    <p>{item.questions[questionIndex]}</p>

                    {answers[item.icon] && <p>{answers[item.icon].message}</p>}
                  </div>
                )}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
