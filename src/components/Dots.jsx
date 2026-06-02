const DOTS_VISIBLE = 7;

export default function Dots({ total, current, onSelect }) {
  const half = Math.floor(DOTS_VISIBLE / 2);
  let start = Math.max(0, current - half);
  let end = Math.min(total - 1, start + DOTS_VISIBLE - 1);
  if (end - start < DOTS_VISIBLE - 1)
    start = Math.max(0, end - DOTS_VISIBLE + 1);

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
          className={
            "dot-btn" +
            (i === current ? " active" : "") +
            (Math.abs(i - current) === half ? " dot-small" : "")
          }
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
