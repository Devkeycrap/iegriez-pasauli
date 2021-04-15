import { useState } from "react";
import Questions from "../components/Questions.component";
import Wheel from "../components/Wheel.component";

export default function Game() {
  const [stage, setStage] = useState(1);
  const [gameObj, setGameObj] = useState(null);

  return (
    <div>
      {stage === 1 && <Wheel setStage={setStage} setGameObj={setGameObj} />}
      {stage === 2 && <Questions gameObj={gameObj} />}
    </div>
  );
}
