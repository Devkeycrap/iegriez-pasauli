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
      <div className={styles.container}>
        <h2>Spēle beigusies!</h2>
        <h4>Tu esi <span>{getResultLevel.name}</span>!</h4>
        <h5>Tavi rezultāti</h5>
        <div className={styles["result-table"]}>
          <h3>Patiesība/meli</h3>
          <h4>{points.questions}</h4>
          <h3>Pasaules karte</h3>
          <h4>{points.map}</h4>
          <h3>Augošie vārdi</h3>
          <h4>{points.words}</h4>
      </div>
      <div className={styles["btn-container"]}>
          <Link href="/">
            <button onClick={exitGame} className="btn btn-neutral">
              Uz sākumu
            </button>
          </Link>
          <Link href="/game">
            <button onClick={restartGame} className="btn btn-orange">
              Spēlēt vēlreiz
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
