import Link from "next/link";
import { useEffect, useState } from "react";
import Questions from "../components/Questions.component";
import Timer from "../components/Timer.component";
import Wheel from "../components/Wheel.component";
import dynamic from "next/dynamic";
import Endscreen from '../components/Endscreen.component';
import styles from "../styles/game.module.scss";
import {
  bananasPath,
  tshirtPath,
  burgerPath,
  headphonesPath,
  longboardPath,
} from "../public/icons/paths";

export default function Game({ isActive, setIsActive }) {

  const [stage, setStage] = useState(5);
  const [gameObj, setGameObj] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [points, setPoints] = useState(0);

  const [sectors, setSectors] = useState([
    {
      color: "#FFA52F",
      image: bananasPath,
      name: "Bananas",
      displayName: "Banāni",
    },
    {
      color: "#EBE1D1",
      image: burgerPath,
      name: "Hamburger",
      displayName: "Hamburgers",
    },
    {
      color: "#2C85A4",
      image: headphonesPath,
      name: "Headphones",
      displayName: "Austiņas",
    },
    {
      color: "#C3E5ED",
      image: longboardPath,
      name: "Longboard",
      displayName: "Longbords",
    },
    {
      color: "#FD6579",
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

  const Map = dynamic(() => import("../components/Map.component"), {
    ssr: false,
  });

  const Words = dynamic(() => import("../components/Words.component"), {
    ssr: false,
  })

  return (
    <div className={styles.main}>
      {gameEnded && (
        <div className={styles.endscreen}>
          Laiks beidzies!
          <Link href="/">
            <button className="btn btn-neutral">Home</button>
          </Link>
          <Link href="/game">
            <button onClick={restartGame} className="btn btn-green">
              Play again
            </button>
          </Link>
        </div>
      )}
      {!gameEnded && (
        <div className={styles.game}>
          <div className={styles["game-info"]}>
            <Timer
              isActive={isActive}
              setIsActive={setIsActive}
              setGameEnded={setGameEnded}
            />
            <h2>
              Iegūtie punkti: <span>{points || 0}</span>
            </h2>
          </div>
          <div className={styles["stage-container"]}>
            {stage === 1 && (
              <Wheel
                sectors={sectors}
                setSectors={setSectors}
                setStage={setStage}
                setGameObj={setGameObj}
              />
            )}
            {stage === 2 && (
              <Questions
                points={points}
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
            {stage === 4 && (
              <Words
                setStage={setStage}
              />
            )}
            {stage === 5 && (
              <Endscreen
                points={points}
                setPoints={setPoints}
                setStage={setStage}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
