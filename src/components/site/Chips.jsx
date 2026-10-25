// Botones tipo "chip": selección simple (string) o múltiple (array).
export default function Chips({ options, selected, onToggle, label = (value) => value, isDisabled = () => false }) {
  return (
    <div className="chips">
      {options.map((option) => {
        const active = Array.isArray(selected) ? selected.includes(option) : selected === option;
        return (
          <button
            key={option}
            type="button"
            className={active ? 'is-active' : undefined}
            aria-pressed={active}
            disabled={!active && isDisabled(option)}
            onClick={() => onToggle(option)}
          >
            {label(option)}
          </button>
        );
      })}
    </div>
  );
}
