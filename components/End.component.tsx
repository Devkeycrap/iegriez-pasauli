// General imports
import Link from "next/link";
import styles from "../styles/end.module.scss";

// Interfaces
import IPoints from "../models/Points.model";

// Redux
import { connect } from "react-redux";
import { endGame, restartGame } from "../actions/game";
import { useEffect, useState } from "react";
import axios from "axios";
import IUser from "../models/User.model";

export function End({
  endGame,
  restartGame,
  points,
}: {
  endGame: () => void;
  restartGame: () => void;
  points: IPoints;
}) {
  const [leaderboard, setLeaderboard] = useState<IUser[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/users/").then((res) => {
      const sortedLeaderboard = sortLeaderboard(res.data);
      setLeaderboard(sortedLeaderboard);
    });
  }, []);

  const sortLeaderboard = (leaderboard: IUser[]) => {
    const sortedLeaderboard = leaderboard.sort((a, b) =>
      a.points > b.points ? -1 : 1
    );
    return sortedLeaderboard;
  };

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
    if (totalPoints >= 75) return "Apritnieks (75-100p)";
    else if (totalPoints >= 35) return "Vidritnieks (35-74p)";
    else return "Švakritnieks (1-34p)";
  };

  return (
    <div className={styles.container}>
      <h2>Spēle beigusies!</h2>
      <h1>
        Tu esi <span>{getResultLevel()}</span>!
      </h1>
      <h5>Tavi rezultāti</h5>
      <div className={styles["result-table"]}>
        <h3>Patiesība/meli</h3>
        <h4>
          {points.quiz} <span>punkti</span>
        </h4>
        <h3>Pasaules karte </h3>
        <h4>
          {points.map} <span>punkti</span>
        </h4>
        <h3>Augošie vārdi</h3>
        <h4>
          {points.words} <span>punkti</span>
        </h4>
      </div>
      <div className={styles["btn-container"]}>
        <Link href="/">
          <button onClick={() => endGame()} className="btn btn-neutral">
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
