import { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';

// Carrega automaticamente todas as imagens da pasta wallpaper
const wallpaperModules = import.meta.glob('/public/assets/wallpaper/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default'
});

// Converte para o formato esperado pelo slider
const IMAGES = Object.keys(wallpaperModules)
  .map((path) => {
    const filename = path.split('/').pop();
    // Remove extensão para usar como título
    const title = filename.replace(/\.(jpg|jpeg|png|webp)$/i, '');
    return {
      path,
      filename,
      title,
      src: `/assets/wallpaper/${filename}`
    };
  })
  .sort((a, b) => a.filename.localeCompare(b.filename))
  .map((item, index, array) => ({
    id: index + 1,
    src: item.src,
    title: item.title,
    label: `${String(index + 1).padStart(2, '0')} / ${String(array.length).padStart(2, '0')}`,
  }));

function Sky() {
  return (
    <>
      <div className="sky" />
      <div className="sky-stars" />
      <div className="aurora-fog" />
    </>
  );
}

function Nav() {
  return (
    <nav className="nav">
      <div className="nav-brand">
        <img src="/assets/img/terminal.svg" alt="gcrepho logo" width={28} height={28} />
        <span>gcrepho<span className="dot">.</span>dev</span>
        <span className="cursor blink">_</span>
      </div>
      <span className="nav-label">wallpaper slider</span>
    </nav>
  );
}

const DOTS_VISIBLE = 7;

function Dots({ total, current, onSelect }) {
  const half = Math.floor(DOTS_VISIBLE / 2);
  let start = Math.max(0, current - half);
  let end = Math.min(total - 1, start + DOTS_VISIBLE - 1);
  if (end - start < DOTS_VISIBLE - 1) start = Math.max(0, end - DOTS_VISIBLE + 1);

  const items = [];
  for (let i = start; i <= end; i++) items.push(i);

  return (
    <div className="dots">
      {start > 0 && (
        <button
          className="dot-btn dot-edge"
          onClick={() => onSelect(0)}
          aria-label="Ir para imagem 1"
        />
      )}
      {items.map((i) => (
        <button
          key={i}
          className={'dot-btn' + (i === current ? ' active' : '') + (Math.abs(i - current) === half ? ' dot-small' : '')}
          onClick={() => onSelect(i)}
          aria-label={`Ir para imagem ${i + 1}`}
        />
      ))}
      {end < total - 1 && (
        <button
          className="dot-btn dot-edge"
          onClick={() => onSelect(total - 1)}
          aria-label={`Ir para imagem ${total}`}
        />
      )}
    </div>
  );
}

function Slider() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * IMAGES.length));
  const [direction, setDirection] = useState('next');
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((nextIndex, dir = 'next') => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    timerRef.current = setTimeout(() => {
      setIndex(nextIndex);
      setAnimating(false);
    }, 180);
  }, [animating]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const prev = useCallback(() => {
    goTo((index - 1 + IMAGES.length) % IMAGES.length, 'prev');
  }, [index, goTo]);

  const next = useCallback(() => {
    goTo((index + 1) % IMAGES.length, 'next');
  }, [index, goTo]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next]);

  const img = IMAGES[index];

  return (
    <section className="slider-section">
      <div className="slider-card scanlines">
        <div className={'slider-img-wrap' + (animating ? ' anim-' + direction : '')}>
          <img
            key={img.id}
            src={img.src}
            alt={img.title}
            className="slider-img"
          />
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
          onSelect={(i) => {
            if (i === index) return;
            goTo(i, i > index ? 'next' : 'prev');
          }}
        />

        <button className="ctrl-btn" onClick={next} aria-label="Próximo">
          <span className="ctrl-label">próximo</span>
          <span className="ctrl-arrow">▶</span>
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>this is a Work In Progress</p>
      <p>made 4 fun with <span className="heart">❤️</span></p>
    </footer>
  );
}

export default function App() {
  return (
    <div className="app">
      <Sky />
      <Nav />
      <main className="main">
        <Slider />
      </main>
      <Footer />
    </div>
  );
}
