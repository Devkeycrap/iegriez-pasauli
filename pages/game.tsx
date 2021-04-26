import Link from "next/link";
import { useEffect, useState } from "react";
import Questions from "../components/Questions.component";
import Timer from "../components/Timer.component";
import Wheel from "../components/Wheel.component";
import Words from "../components/Words.component";
import dynamic from "next/dynamic";
import styles from "../styles/game.module.scss";
import {
  bananasPath,
  tshirtPath,
  burgerPath,
  headphonesPath,
  longboardPath,
} from "../public/icons/paths";

export default function Game({ isActive, setIsActive }) {
  useEffect(() => {
    setIsActive(true);
    console.log("called");
  }, []);

  const [stage, setStage] = useState(1);
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

  const restartGame = () => {
    setStage(1);
    setGameEnded(false);
    setIsActive(true);
    setGameObj(null);
  };

  const Map = dynamic(() => import("../components/Map.component"), {
    ssr: false,
  });

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
          <Timer
            isActive={isActive}
            setIsActive={setIsActive}
            setGameEnded={setGameEnded}
          />
          <div className={styles["stage-container"]}>
            {stage === 1 && (
              <Wheel
                sectors={sectors}
                setSectors={setSectors}
                setStage={setStage}
                setGameObj={setGameObj}
              />
            )}
            {stage === 2 && <Questions gameObj={gameObj} setStage={setStage} />}
            {stage === 3 && <Map setStage={setStage} gameObj={gameObj} />}
            {stage === 4 && <Words/>}
          </div>
        </div>
      )}
    </div>
  );
}
