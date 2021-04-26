import { useEffect, useState } from "react";
import styles from "../styles/timer.module.scss";

export default function Timer({ isActive, setIsActive, setGameEnded }) {
  const [seconds, setSeconds] = useState(900);
  const [strokeOffset, setStrokeOffset] = useState("251.2, 251.2");

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds == 0) {
          setIsActive(false);
          clearInterval(interval);
          setGameEnded(true);
        }
        setStrokeOffset(
          `${
            parseFloat(strokeOffset.split(", ")[0]) -
            parseInt(strokeOffset.split(", ")[0]) / seconds
          }, 251.2`
        );
        setSeconds(seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className={styles.timer}>
      <svg id="animated" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="#435d43" />
        <path
          strokeDasharray={strokeOffset}
          id="progress"
          strokeLinecap="round"
          strokeWidth="5"
          stroke="white"
          fill="none"
          d="M50 10
           a 40 40 0 0 1 0 80
           a 40 40 0 0 1 0 -80"
        ></path>
        <text
          className="time"
          id="count"
          x="50"
          y="50"
          textAnchor="middle"
          dy="7"
          fontSize="20"
          fill="white"
          fontFamily="Open Sans"
          fontWeight="bold"
        >
          {Math.floor(seconds / 60)}:
          {seconds % 60 < 10 ? "0" + (seconds % 60) : seconds % 60}
        </text>
      </svg>
    </div>
  );
}
