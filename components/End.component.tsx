import Link from "next/link";
import IPoints from "../models/Points.model";
import styles from "../styles/end.module.scss";

export default function End({
  exitGame,
  restartGame,
  points,
}: {
  exitGame: () => void;
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
    if (totalPoints >= 75) return { name: "Apritnieks", interval: "75-100" };
    else if (totalPoints >= 35)
      return { name: "Vidritnieks", interval: "35-74" };
    else return { name: "Švakrinieks", interval: "1-34" };
  };

  return (
    <div className={styles.end}>
      <div>
        <h1>Spēle beigusies!</h1>
        <h2>Tavs rezultāts</h2>
        <div className={styles["result-table"]}>
          <h4>Patiesība/meli</h4>
          <h5>{points.questions}</h5>
          <h4>Karte</h4>
          <h5>{points.map}</h5>
          <h4>Augošie vārdi</h4>
          <h5>{points.words}</h5>
        </div>
        <h1>
          Tu esi <span>{getResultLevel.name}</span>
        </h1>
        <h4>{getResultLevel.interval}</h4>
        <Link href="/">
          <button onClick={exitGame} className="btn btn-neutral">
            Uz sākumu
          </button>
        </Link>
        <Link href="/game">
          <button onClick={restartGame} className="btn btn-green">
            Spēlēt vēlreiz
          </button>
        </Link>
      </div>
    </div>
  );
}
