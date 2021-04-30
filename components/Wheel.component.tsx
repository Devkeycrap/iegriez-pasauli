import { useEffect, useRef, useState } from "react";
import styles from "../styles/wheel.module.scss";

export default function Wheel({
  setStage,
  setGameObj,
  gameObj,
  sectors,
  setSectors,
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

  useEffect(() => {
    if (sectors.length == 1) {
      setGameObj({
        object: sectors[0].name,
        name: sectors[0].displayName,
      });
    }

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
    if (sector.name == "Bananas") ctx.scale(0.13, 0.13);
    else if (sector.name == "Longboard") ctx.scale(0.3, 0.3);
    else if (sector.name == "Hamburger") ctx.scale(0.3, 0.3);
    else {
      ctx.scale(0.4, 0.4);
    }
    ctx.fill(path);
    // TEXT
    //
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
      new Audio("/sfx/tick.wav").play();
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
        setGameObj({
          object: currentSectorParams.object,
          name: currentSectorParams.text,
        });
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
    console.log(currentSectorParams);
    removeSector(currentSectorParams.object);
    setStage(2);
  }

  const removeSector = (object) =>
    setSectors((sectors) => sectors.filter((sector) => sector.name !== object));

  return (
    <div className={styles["wheel-container"]}>
      <h2 className="result" style={{ color: sectorParams.color }}>
        {sectorParams.text}
      </h2>
      <div
        style={{ display: gameObj || sectors.length == 1 ? "none" : "block" }}
      >
        <div className={styles.arrow}></div>
        <canvas
          ref={canvasRef}
          className={styles.wheel}
          width="1000"
          height="1000"
        ></canvas>
        <button
          ref={spinRef}
          className={`${styles.btn} ${styles["btn-orange"]}`}
        >
          Iegriezt
        </button>
      </div>
      {gameObj && (
        <div className={styles["spin-result"]}>
          <img src={`/icons/${gameObj.object.toLowerCase()}.svg`} alt="" />
          <button
            onClick={saveAndTransition}
            className={`${styles.btn} ${styles["btn-orange"]}`}
          >
            Turpināt
          </button>
        </div>
      )}
    </div>
  );
}
