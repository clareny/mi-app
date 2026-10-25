// Ícono de una red social: SVG propio o el ícono de /public/icons (pintado con currentColor).
export default function LinkIcon({ item }) {
  if (item.svg) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d={item.svg} />
      </svg>
    );
  }
  if (item.icon) {
    return (
      <span
        className="link-icon"
        style={{ '--link-icon': `url("${import.meta.env.BASE_URL}icons/${item.icon}")` }}
        aria-hidden="true"
      />
    );
  }
  return <span className="link-icon link-icon--dot" aria-hidden="true" />;
}
