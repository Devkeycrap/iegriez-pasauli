// General imports
import { useEffect, useRef, useState } from "react";

// Styles & animations
import styles from "../styles/wheel.module.scss";
import { motion } from "framer-motion";
import { fadeInUp } from "../models/animations/animations";

// Redux
import { connect } from "react-redux";
import { setGameObj } from "../actions/gameObj";
import { switchStage } from "../actions/game";
import { playTransition } from "../actions/transition";

export function Wheel({
  switchStage,
  setGameObj,
  gameObj,
  sectors,
  playTransition,
}) {
  const spinRef = useRef(null);
  const canvasRef = useRef(null);

  const PI = Math.PI;
  const TAU = 2 * PI;
  const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
  let ang = 0; // Angle in radians
  const rand = (m, M) => Math.random() * (M - m) + m;
  let tot, canvas, spinEl, result, ctx, dia, rad, arc, getIndex, angVel;
  let currentSectorParams = {
    text: "",
    color: "",
    object: null,
  };

  const [sectorParams, setSectorParams] = useState({
    text: "",
    color: "",
    object: null,
  });
  const [wheelSpinned, setWheelSpinned] = useState(false);

  useEffect(() => {
    playTransition({
      title: "Laimes rats",
      description: "Iegriez ratu un sāc spēli!",
      length: 3000,
    });

    tot = sectors.length;
    canvas = canvasRef.current;
    spinEl = spinRef.current;
    ctx = canvas.getContext("2d");
    dia = ctx.canvas.width;
    rad = dia / 2;

    arc = TAU / sectors.length;

    getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;

    sectors.forEach(drawSector);
    rotate(); // Initial rotation
    engine(); // Start engine
    spinEl.addEventListener("click", () => {
      if (!angVel) angVel = rand(0.25, 0.35);
    });
  }, [sectors]);

  function drawSector(sector, i) {
    const ang = arc * i;
    ctx.save();
    // COLOR
    ctx.beginPath();
    ctx.fillStyle = sector.color;
    ctx.moveTo(rad, rad);
    ctx.arc(rad, rad, rad, ang, ang + arc);
    ctx.lineTo(rad, rad);
    ctx.fill();
    const path = new Path2D(sector.image);
    ctx.fillStyle = "black";
    ctx.translate(rad, rad);
    ctx.rotate(ang + arc / 2);
    ctx.translate(250, -60);

    // Set the scale of particular icons
    if (sector.name == "Bananas") ctx.scale(0.13, 0.13);
    else if (sector.name == "Skateboard") ctx.scale(0.3, 0.3);
    else if (sector.name == "Hamburger") ctx.scale(0.3, 0.3);
    else {
      ctx.scale(0.4, 0.4);
    }

    ctx.fill(path);
    ctx.restore();
  }

  function rotate() {
    const sector = sectors[getIndex()];
    ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
    const newSectorParams = {
      text: sector.displayName,
      color: sector.color,
      object: sector.name,
    };

    if (newSectorParams.object !== currentSectorParams.object) {
      currentSectorParams = newSectorParams;
      setSectorParams({
        ...sectorParams,
        text: newSectorParams.text,
        color: newSectorParams.color,
        object: newSectorParams.object,
      });
    }

    if (angVel == 0) {
      setTimeout(() => {
        saveAndTransition();
      }, 2000);
    }
  }

  function frame() {
    if (!angVel) return;
    angVel *= friction; // Decrement velocity by friction
    if (angVel < 0.002) angVel = 0; // Bring to stop
    ang += angVel; // Update angle
    ang %= TAU; // Normalize angle
    rotate();
  }

  function engine() {
    frame();
    requestAnimationFrame(engine);
  }

  function saveAndTransition() {
    setGameObj({
      object: currentSectorParams.object,
      translatedName: currentSectorParams.text,
    });
    switchStage(2);
  }

  return (
    <motion.div exit={{ opacity: 0 }} className={styles["wheel-container"]}>
      <h2
        className="result"
        style={{ color: sectorParams.color, WebkitUserSelect: "none" }}
      >
        {gameObj.translatedName || sectorParams.text}
      </h2>
      <div
        style={{
          display: gameObj.object || sectors.length == 1 ? "none" : "block",
        }}
      >
        <motion.div
          variants={fadeInUp}
          exit={{ opacity: 0 }}
          initial="initial"
          animate="animate"
        >
          <div className={styles.arrow}></div>
          <canvas
            ref={canvasRef}
            className={styles.wheel}
            width="1000"
            height="1000"
          ></canvas>
        </motion.div>
        <button
          style={{ display: !wheelSpinned ? "initial" : "none" }}
          ref={spinRef}
          onClick={() => setWheelSpinned(true)}
          className={`${styles.btn} ${styles["btn-orange"]}`}
        >
          Iegriezt
        </button>
      </div>
    </motion.div>
  );
}

const mapStateToProps = (state) => ({
  gameObj: state.gameObj,
});

export default connect(mapStateToProps, {
  setGameObj,
  switchStage,
  playTransition,
})(Wheel);
