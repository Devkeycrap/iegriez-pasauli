import Link from "next/link";
import { useEffect, useState } from "react";
import Questions from "../components/Questions.component";
import Timer from "../components/Timer.component";
import Wheel from "../components/Wheel.component";
import Words from "../components/Words.component";
import dynamic from "next/dynamic";
import styles from "../styles/game.module.scss";

export default function Game() {
  useEffect(() => {
    setIsActive(true);
    console.log("called");
  }, []);

  const [isActive, setIsActive] = useState(false);
  const [stage, setStage] = useState(3);
  const [gameObj, setGameObj] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [points, setPoints] = useState(0);

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
          {stage === 1 && <Wheel setStage={setStage} setGameObj={setGameObj} />}
          {stage === 2 && <Questions gameObj={gameObj} setStage={setStage} />}
          {stage === 3 && <Words/>}
          {stage === 4 && <Map gameObj={gameObj} />}
        </div>
      )}
    </div>
  );
}
