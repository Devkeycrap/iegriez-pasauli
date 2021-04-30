import Link from "next/link";
import { useEffect, useState } from "react";
import Questions from "../components/Questions.component";
import Timer from "../components/Timer.component";
import Wheel from "../components/Wheel.component";
import dynamic from "next/dynamic";
import styles from "../styles/game.module.scss";
import {
  bananasPath,
  tshirtPath,
  burgerPath,
  headphonesPath,
  longboardPath,
} from "../public/icons/paths";
import End from "../components/End.component";
import IPoints from "../models/Points.model";

export default function Game({ isActive, setIsActive }) {
  const [stage, setStage] = useState(3);
  const [gameObj, setGameObj] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [points, setPoints] = useState<IPoints>({
    questions: 0,
    map: 0,
    words: 0,
  });
  const [sectors, setSectors] = useState([
    {
      color: "#B8D97A",
      image: bananasPath,
      name: "Bananas",
      displayName: "Banāni",
    },
    {
      color: "#CCE49F",
      image: burgerPath,
      name: "Hamburger",
      displayName: "Hamburgers",
    },
    {
      color: "#E1EFC5",
      image: headphonesPath,
      name: "Headphones",
      displayName: "Austiņas",
    },
    {
      color: "#F5F9EC",
      image: longboardPath,
      name: "Longboard",
      displayName: "Longbords",
    },
    {
      color: "#FCFDF9",
      image: tshirtPath,
      imageColor: "",
      name: "T-shirt",
      displayName: "T-krekls",
    },
  ]);

  useEffect(() => {
    setIsActive(true);
  }, []);

  const restartGame = () => {
    setStage(1);
    setGameEnded(false);
    setIsActive(true);
    setGameObj(null);
  };

  const exitGame = () => {
    setGameEnded(true);
    setIsActive(false);
  };

  const Map = dynamic(() => import("../components/Map.component"), {
    ssr: false,
  });

  return (
    <div className={styles.main}>
      {gameEnded && (
        <div className={styles.endscreen}>
          <End exitGame={exitGame} restartGame={restartGame} points={points} />
        </div>
      )}
      {!gameEnded && (
        <div className={styles.game}>
          <div className={styles["game-info"]}>
            <Link href="/">
              <button
                onClick={exitGame}
                className={`${styles.btn} ${styles["btn-orange"]}`}
              >
                Uz sākumu
              </button>
            </Link>
            <div className={styles.info}>
              <Timer
                isActive={isActive}
                setIsActive={setIsActive}
                setGameEnded={setGameEnded}
              />
              {gameObj && (
                <div>
                  <h3>{gameObj.name}</h3>
                  <img
                    src={`/icons/${gameObj.object.toLowerCase()}.svg`}
                    alt=""
                  />
                </div>
              )}
            </div>
            <div className={styles.points}>
              <h2>Iegūtie punkti</h2>
              <h3>
                {Object.keys(points).reduce(
                  (sum, key) => sum + parseInt(points[key] || 0),
                  0
                ) || 0}
              </h3>
            </div>
          </div>
          <div className={styles["stage-container"]}>
            {stage === 1 && (
              <Wheel
                sectors={sectors}
                setSectors={setSectors}
                setStage={setStage}
                gameObj={gameObj}
                setGameObj={setGameObj}
              />
            )}
            {stage === 2 && (
              <Questions
                setPoints={setPoints}
                gameObj={gameObj}
                setStage={setStage}
              />
            )}
            {stage === 3 && (
              <Map
                points={points}
                setPoints={setPoints}
                setStage={setStage}
                gameObj={gameObj}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
