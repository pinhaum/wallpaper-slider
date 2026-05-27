import { useState, useEffect, useCallback } from 'react';
import './App.css';

const IMAGES = [
  {
    id: 1,
    src: 'https://picsum.photos/seed/zebes/1200/800',
    title: 'Zebes',
    label: '01 / 06',
  },
  {
    id: 2,
    src: 'https://picsum.photos/seed/aurora/1200/800',
    title: 'Aurora',
    label: '02 / 06',
  },
  {
    id: 3,
    src: 'https://picsum.photos/seed/moonring/1200/800',
    title: 'Moonring',
    label: '03 / 06',
  },
  {
    id: 4,
    src: 'https://picsum.photos/seed/celeste/1200/800',
    title: 'Celeste',
    label: '04 / 06',
  },
  {
    id: 5,
    src: 'https://picsum.photos/seed/norfair/1200/800',
    title: 'Norfair',
    label: '05 / 06',
  },
  {
    id: 6,
    src: 'https://picsum.photos/seed/crateria/1200/800',
    title: 'Crateria',
    label: '06 / 06',
  },
];

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

function Dots({ total, current, onSelect }) {
  return (
    <div className="dots">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          className={'dot-btn' + (i === current ? ' active' : '')}
          onClick={() => onSelect(i)}
          aria-label={`Ir para imagem ${i + 1}`}
        />
      ))}
    </div>
  );
}

function Slider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((next, dir = 'next') => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setIndex(next);
      setAnimating(false);
    }, 180);
  }, [animating]);

  const prev = () => {
    const next = (index - 1 + IMAGES.length) % IMAGES.length;
    goTo(next, 'prev');
  };

  const next = () => {
    const next = (index + 1) % IMAGES.length;
    goTo(next, 'next');
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [index, animating]);

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

        <Dots total={IMAGES.length} current={index} onSelect={(i) => goTo(i, i > index ? 'next' : 'prev')} />

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
