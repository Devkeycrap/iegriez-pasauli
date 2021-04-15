import { useEffect, useRef, useState } from "react";
import "../styles/wheel.module.scss";
import { gsap } from "gsap";

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
    { color: "#3C3C58", image: "bananas.png", name: "Bananas" },
    { color: "#EBE1D1", image: "hamburger.png", name: "Hamburger" },
    { color: "#2C85A4", image: "headphones.png", name: "Headphones" },
    { color: "#C3E5ED", image: "longboard.png", name: "Longboard" },
    { color: "#FD6579", image: "tshirt.png", name: "T-shirt" },
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
    sectors.forEach(drawImage);
    rotate(); // Initial rotation
    engine(); // Start engine
    spinEl.addEventListener("click", () => {
      if (!angVel) angVel = rand(0.25, 0.35);
    });
  }, []);

  function drawImage(sector) {
    const img = new Image();
    img.src = `/img/${sector.image}`;
    img.onload = () => {
      ctx.drawImage(img, rad - 10, 10, 50, 50);
      ctx.rotate(ang + arc / 2);
    };
  }

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
    // TEXT
    ctx.translate(rad, rad);
    ctx.rotate(ang + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 30px sans-serif";

    //
    ctx.restore();
  }

  function rotate() {
    const sector = sectors[getIndex()];
    ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
    result.textContent = sector.name;
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
