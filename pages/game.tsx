// General imports
import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Components
import Questions from "../components/Questions.component";
import Timer from "../components/Timer.component";
import Wheel from "../components/Wheel.component";
import End from "../components/End.component";

// Interfaces
import IPoints from "../models/Points.model";

// Icons for wheel (temporary)
import {
  bananasPath,
  tshirtPath,
  burgerPath,
  headphonesPath,
  longboardPath,
} from "../public/icons/paths";

// Styles & animations
import styles from "../styles/game.module.scss";
import { motion } from "framer-motion";

// Redux
import { connect } from "react-redux";
import { setGameObj } from "../actions/gameObj";
import { startGame, exitGame } from "../actions/game";

export function Game({
  hasFinished,
  gameObj,
  startGame,
  exitGame,
  points,
  stage,
}) {
  const [sectors, setSectors] = useState([
    {
      color: "#B8D97A",
      image: bananasPath,
      name: "Banana",
      displayName: "Banāns",
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
      name: "Skateboard",
      displayName: "Skrituļdēlis",
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
    startGame();
  }, []);

  const Map = dynamic(() => import("../components/Map.component"), {
    ssr: false,
  });

  const Words = dynamic(() => import("../components/Words.component"), {
    ssr: false,
  });

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial="initial"
      animate="animate"
      className={styles.main}
    >
      {hasFinished && (
        <div className={styles.endscreen}>
          <End />
        </div>
      )}
      {!hasFinished && (
        <div className={styles.game}>
          <div className={styles["game-info"]}>
            <Link href="/">
              <button
                onClick={() => exitGame()}
                className={`${styles.btn} ${styles["btn-neutral"]}`}
              >
                Uz sākumu
              </button>
            </Link>
            <div className={styles.info}>
              <Timer />
              {gameObj.object && (
                <div>
                  <img
                    src={`/icons/${gameObj.object.toLowerCase()}.svg`}
                    alt=""
                  />
                </div>
              )}
            </div>
            <div className={styles.points}>
              <h2 style={{ WebkitUserSelect: "none" }}>Iegūtie punkti</h2>
              <h3 style={{ WebkitUserSelect: "none" }}>
                {Object.keys(points).reduce(
                  (sum, key) => sum + parseInt(points[key] || 0),
                  0
                ) || 0}
              </h3>
            </div>
          </div>
          <div className={styles["stage-container"]}>
            {stage === 1 && <Wheel sectors={sectors} />}
            {stage === 2 && <Questions />}
            {stage === 3 && <Map />}
            {stage === 4 && <Words sectors={sectors} />}
          </div>
        </div>
      )}
    </motion.div>
  );
}

const mapStateToProps = (state) => ({
  gameObj: state.gameObj,
  hasFinished: state.game.hasFinished,
  isActive: state.game.isActive,
  points: state.points,
  stage: state.game.stage,
});

export default connect(mapStateToProps, {
  setGameObj,
  startGame,
  exitGame,
})(Game);
