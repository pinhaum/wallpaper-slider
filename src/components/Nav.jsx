export default function Nav() {
  return (
    <nav className="nav">
      <a
        className="nav-brand"
        href="https://pinhaum.github.io/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/assets/img/terminal.svg"
          alt="gcrepho logo"
          width={28}
          height={28}
        />
        <span>
          gcrepho<span className="dot">.</span><span className="cursor blink">_</span>
        </span>
      </a>
      <span className="nav-label">wallpaper slider</span>
    </nav>
  );
}
