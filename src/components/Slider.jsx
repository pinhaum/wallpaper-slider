import { useState, useEffect, useCallback, useRef } from "react";
import IMAGES from "../data/images.js";
import Dots from "./Dots.jsx";

const FADE_HALF = 150;

export default function Slider() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * IMAGES.length));
  const [phase, setPhase] = useState(null);
  const timerRef = useRef(null);

  const animating = phase !== null;

  const goTo = useCallback(
    (nextIndex) => {
      if (animating) return;
      setPhase("out");
      timerRef.current = setTimeout(() => {
        setIndex(nextIndex);
        setPhase("in");
        timerRef.current = setTimeout(() => setPhase(null), FADE_HALF);
      }, FADE_HALF);
    },
    [animating],
  );

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const prev = useCallback(() => {
    goTo((index - 1 + IMAGES.length) % IMAGES.length);
  }, [index, goTo]);

  const next = useCallback(() => {
    goTo((index + 1) % IMAGES.length);
  }, [index, goTo]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  const img = IMAGES[index];

  return (
    <section className="slider-section">
      <div className="slider-card scanlines">
        <div className={"slider-img-wrap" + (phase ? " anim-" + phase : "")}>
          <img key={img.id} src={img.src} alt={img.title} className="slider-img" />
        </div>
        <div className="slider-overlay">
          <span className="slider-counter">{img.label}</span>
          <span className="slider-title">{img.title}</span>
        </div>
      </div>

      <div className="slider-controls">
        <button className="ctrl-btn" onClick={prev} aria-label="Anterior">
          <span className="ctrl-arrow">◀</span>
          <span className="ctrl-label">anterior</span>
        </button>

        <Dots
          total={IMAGES.length}
          current={index}
          onSelect={(i) => { if (i !== index) goTo(i); }}
        />

        <button className="ctrl-btn" onClick={next} aria-label="Próximo">
          <span className="ctrl-label">próximo</span>
          <span className="ctrl-arrow">▶</span>
        </button>
      </div>
    </section>
  );
}
