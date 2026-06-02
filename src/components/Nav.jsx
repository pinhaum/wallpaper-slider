export default function Nav() {
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
