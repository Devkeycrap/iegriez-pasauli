import { useEffect, useRef, useState } from "react";
import "../styles/wheel.module.scss";
import { gsap } from "gsap";
import {
  foodPath,
  powerPath,
  tourismPath,
  transportPath,
  wastePath,
} from "../public/icons/paths";

export default function Wheel({ setStage, setGameObj }) {
  const spinRef = useRef(null);
  const resultRef = useRef(null);
  const canvasRef = useRef(null);
  const PI = Math.PI;
  const TAU = 2 * PI;
  const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
  let ang = 0; // Angle in radians
  const rand = (m, M) => Math.random() * (M - m) + m;
  let tot,
    canvas,
    spinEl,
    result,
    ctx,
    dia,
    rad,
    arc,
    getIndex,
    angVel = null;

  const sectors = [
    {
      color: "#FFA52F",
      image: foodPath,
      name: "Bananas",
      displayName: "Banāni",
    },
    {
      color: "#EBE1D1",
      image: powerPath,
      name: "Hamburger",
      displayName: "Hamburgers",
    },
    {
      color: "#2C85A4",
      image: tourismPath,
      name: "Headphones",
      displayName: "Austiņas",
    },
    {
      color: "#C3E5ED",
      image: transportPath,
      name: "Longboard",
      displayName: "Longbords",
    },
    {
      color: "#FD6579",
      image: wastePath,
      imageColor: "",
      name: "T-shirt",
      displayName: "T-krekls",
    },
  ];
  useEffect(() => {
    tot = sectors.length;
    canvas = canvasRef.current;
    spinEl = spinRef.current;
    result = resultRef.current;
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
  }, []);

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
    ctx.translate(75, -20);
    ctx.scale(0.1, 0.1);
    ctx.fill(path);
    // TEXT
    //
    ctx.restore();
  }

  function rotate() {
    const sector = sectors[getIndex()];
    ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
    result.textContent = sector.displayName;
    result.style.color = sector.color;

    if (angVel == 0) {
      setGameObj(sector.name);
      transition();
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

  function transition() {
    setTimeout(() => {
      setStage(2);
    }, 3000);
  }

  return (
    <div id="wheelOfFortune">
      <canvas ref={canvasRef} id="wheel" width="300" height="300"></canvas>
      <h2 className="result" ref={resultRef}></h2>
      <button ref={spinRef} className="btn btn-orange">
        Iegriezt
      </button>
    </div>
  );
}
