import Link from "next/link";
import { useEffect, useState } from "react";
import Questions from "../components/Questions.component";
import Timer from "../components/Timer.component";
import Wheel from "../components/Wheel.component";
import dynamic from "next/dynamic";

export default function Game() {
  useEffect(() => {
    setIsActive(true);
    console.log("called");
  }, []);
  const [isActive, setIsActive] = useState(false);
  const [stage, setStage] = useState(1);
  const [gameObj, setGameObj] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);

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
    <div>
      {gameEnded && (
        <div className="endscreen">
          Time's up!
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
        <div className="game">
          <Timer
            isActive={isActive}
            setIsActive={setIsActive}
            setGameEnded={setGameEnded}
          />
          {stage === 1 && <Wheel setStage={setStage} setGameObj={setGameObj} />}
          {stage === 2 && <Questions gameObj={gameObj} setStage={setStage} />}
          {stage === 3 && <Map gameObj={gameObj} />}
        </div>
      )}
    </div>
  );
}
