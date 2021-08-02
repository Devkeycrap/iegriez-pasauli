// General imports
import Link from "next/link";
import styles from "../styles/end.module.scss";

// Interfaces
import IPoints from "../models/Points.model";

// Redux
import { connect } from "react-redux";
import { endGame, restartGame } from "../actions/game";

export function End({
  endGame,
  restartGame,
  points,
}: {
  endGame: () => void;
  restartGame: () => void;
  points: IPoints;
}) {
  const getTotalPoints = (): number => {
    return (
      Object.keys(points).reduce(
        (sum, key) => sum + parseInt(points[key] || 0),
        0
      ) || 0
    );
  };

  const getResultLevel = () => {
    const totalPoints: number = getTotalPoints();

    if (totalPoints >= (80 / 100) * 80) return "RITenis";
    else return "PĀRTenis";
  };

  return (
    <div className={styles.container}>
      <h2>Spēle beigusies!</h2>
      <h1>
        Tu esi <span>{getResultLevel()}</span>!
      </h1>
      <h5>Tavi rezultāti</h5>
      <div className={styles["result-table"]}>
        <h3>Izvērtē apgalvojumus!</h3>
        <h4>
          {points.quiz} <span>punkti</span>
        </h4>
        <h3>Izvēlies pareizo skaidrojumu!</h3>
        <h4>
          {points.map} <span>punkti</span>
        </h4>
        <h3>Klikšķini un krāj!</h3>
        <h4>
          {points.words} <span>punkti</span>
        </h4>
        <h3>Kopā:</h3>
        <h4>
          {getTotalPoints} <span>punkti</span>
        </h4>
      </div>
      <div className={styles["btn-container"]}>
        <Link href="/">
          <button
            onClick={() => endGame()}
            className={`${styles.btn} ${styles["btn-neutral"]} ${styles["shadow-dark"]}`}
          >
            Uz sākumu
          </button>
        </Link>
        <Link href="/game">
          <button onClick={() => restartGame()} className="btn btn-orange">
            Spēlēt vēlreiz
          </button>
        </Link>
      </div>
      <div className={styles["confetti-container"]}>
        {Array.from(Array(149).keys()).map((item) => (
          <div
            key={item}
            className={`${styles.confetti} ${styles[`confetti-${item}`]}`}
          ></div>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  points: state.points,
});

export default connect(mapStateToProps, { endGame, restartGame })(End);
