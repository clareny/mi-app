import { useState } from 'react';

const WHATSAPP_NUMBER = '59897989368';

const vocalServices = [
  { name: 'Grabación', spec: 'Gain, HPF, Pro-DS / RX' },
  { name: 'Edición', spec: 'Melodyne / Auto-Tune, RX' },
  { name: 'Mezcla', spec: 'Pro-Q, CLA-76 / Pro-C' },
];

const beatServices = [
  { name: 'Remake', spec: 'Tu referencia, en tu tono' },
  { name: 'Custom beat', spec: 'Original para tu voz' },
];

const beatGenres = ['Trap', 'Rap', 'R&B', 'Reggaeton', 'Drill', 'Pop', 'Afrobeats', 'Lo-fi', 'Soul', 'House'];
const beatKeys = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

const comboRows = [
  { label: 'Alcance', value: 'Canción completa' },
  { label: 'Incluye', value: 'Vocal + instrumental' },
  { label: 'Enfoque', value: 'Producción desde cero' },
  { label: 'Entrega', value: 'Mezcla lista para subir' },
];

const AUTO_LINE = /^(Enfoque|Género|Tonalidad):/;

const stripAutoLines = (value) =>
  value
    .split('\n')
    .filter((line) => !AUTO_LINE.test(line.trim()))
    .join('\n')
    .replace(/^\n+/, '');

const buildVocalMessage = (selections, extra) => {
  const lines = [];
  if (selections.length) lines.push(`Enfoque: ${selections.join(', ')}.`);
  if (extra.trim()) lines.push(extra.trim());
  return lines.join('\n');
};

const buildBeatMessage = (selections, genre, key, scale, extra) => {
  const lines = [];
  if (selections.length) lines.push(`Enfoque: ${selections.join(', ')}.`);
  if (genre) lines.push(`Género: ${genre}.`);
  if (key) lines.push(`Tonalidad: ${key} ${scale}.`);
  if (extra.trim()) lines.push(extra.trim());
  return lines.join('\n');
};

export default function Services() {
  const [vocalSelections, setVocalSelections] = useState([]);
  const [beatSelections, setBeatSelections] = useState([]);
  const [vocalExtra, setVocalExtra] = useState('');
  const [beatExtra, setBeatExtra] = useState('');
  const [beatGenre, setBeatGenre] = useState('');
  const [beatKey, setBeatKey] = useState('');
  const [beatScale, setBeatScale] = useState('menor');
  const [activeTab, setActiveTab] = useState('combo');

  const vocalNeed = buildVocalMessage(vocalSelections, vocalExtra);
  const beatNeed = buildBeatMessage(beatSelections, beatGenre, beatKey, beatScale, beatExtra);

  const serviceTabs = [
    { id: 'combo', label: 'Combo' },
    { id: 'vocal', label: 'Vocal' },
    { id: 'beats', label: 'Beats' },
  ];

  const toggleSelection = (name, selectedItems, setSelectedItems) => {
    setSelectedItems(
      selectedItems.includes(name)
        ? selectedItems.filter((item) => item !== name)
        : [...selectedItems, name]
    );
  };

  const buildWhatsAppLink = (type) => {
    if (type === 'combo') {
      const message = 'Hola, estoy interesado en Combo completo: una canción, vocal + instrumental, producción desde cero.';
      return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    }

    const label = type === 'vocal' ? 'Producción vocal' : 'Beats';
    const need = type === 'vocal' ? vocalNeed : beatNeed;
    const detailText = need.trim() ? `Detalles: ${need.trim()}` : 'Quiero que me ayuden a definir el enfoque ideal.';
    const message = `Hola, estoy interesado en ${label}. ${detailText}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="services" className={`services-section services-section--${activeTab}`}>
      <div className="service-segmented" aria-label="Elegí combo, vocal o beats">
        {serviceTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`service-segmented__button ${activeTab === tab.id ? 'is-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            aria-pressed={activeTab === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="plan-grid">
        <article className={`plan-card plan-card--combo service-panel ${activeTab === 'combo' ? 'is-active' : ''}`}>
          <header className="plan-card__head">
            <span className="plan-card__flag">Especial</span>
            <h3>Combo</h3>
            <p>Canción completa</p>
          </header>
          <div className="plan-card__body">
            <p className="plan-card__hook">
              Una canción, de cero a release. Voz e instrumental en la misma producción.
            </p>
            <ul className="plan-rows">
              {comboRows.map((row) => (
                <li key={row.label}>
                  <span>{row.label}</span>
                  <strong>{row.value}</strong>
                </li>
              ))}
            </ul>
          </div>
          <div className="plan-card__foot">
            <a className="btn btn-primary" href={buildWhatsAppLink('combo')} target="_blank" rel="noreferrer">
              contratar combo
            </a>
          </div>
        </article>

        <article className={`plan-card plan-card--vocal service-panel ${activeTab === 'vocal' ? 'is-active' : ''}`}>
          <header className="plan-card__head">
            <h3>Vocal</h3>
            <p>Solo voces</p>
          </header>
          <div className="plan-card__body">
            <p className="plan-card__hook">
              Tu voz ya tiene la canción. Falta que se escuche como un release.
            </p>
            <div className="plan-options">
              {vocalServices.map((service) => {
                const isActive = vocalSelections.includes(service.name);
                return (
                  <button
                    key={service.name}
                    type="button"
                    className={`plan-option ${isActive ? 'is-active' : ''}`}
                    onClick={() => toggleSelection(service.name, vocalSelections, setVocalSelections)}
                    aria-pressed={isActive}
                  >
                    <span className="plan-option__check" aria-hidden="true">{isActive ? '✓' : '○'}</span>
                    <span className="plan-option__text">
                      <strong>{service.name}</strong>
                      <small>{service.spec}</small>
                    </span>
                  </button>
                );
              })}
            </div>
            <textarea
              rows="2"
              placeholder="Contame el tema..."
              value={vocalNeed}
              onChange={(e) => setVocalExtra(stripAutoLines(e.target.value))}
            />
          </div>
          <div className="plan-card__foot">
            <a className="btn btn-primary" href={buildWhatsAppLink('vocal')} target="_blank" rel="noreferrer">
              contratar mezcla
            </a>
          </div>
        </article>

        <article className={`plan-card plan-card--beats service-panel ${activeTab === 'beats' ? 'is-active' : ''}`}>
          <header className="plan-card__head">
            <h3>Beats</h3>
            <p>Solo instrumental</p>
          </header>
          <div className="plan-card__body">
            <p className="plan-card__hook">
              Si el beat no te empuja a grabar hoy, no es el beat.
            </p>
            <div className="plan-options">
              {beatServices.map((service) => {
                const isActive = beatSelections.includes(service.name);
                return (
                  <button
                    key={service.name}
                    type="button"
                    className={`plan-option ${isActive ? 'is-active' : ''}`}
                    onClick={() => toggleSelection(service.name, beatSelections, setBeatSelections)}
                    aria-pressed={isActive}
                  >
                    <span className="plan-option__check" aria-hidden="true">{isActive ? '✓' : '○'}</span>
                    <span className="plan-option__text">
                      <strong>{service.name}</strong>
                      <small>{service.spec}</small>
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="beat-spec beat-spec--compact">
              <label className="beat-spec__field">
                <span className="service-form__label">Género</span>
                <select value={beatGenre} onChange={(e) => setBeatGenre(e.target.value)} aria-label="Género del beat">
                  <option value="">Elegí el género</option>
                  {beatGenres.map((genre) => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </label>
              <label className="beat-spec__field">
                <span className="service-form__label">Tonalidad</span>
                <div className="beat-spec__key">
                  <select value={beatKey} onChange={(e) => setBeatKey(e.target.value)} aria-label="Tonalidad del beat">
                    <option value="">Nota</option>
                    {beatKeys.map((keyName) => (
                      <option key={keyName} value={keyName}>{keyName}</option>
                    ))}
                  </select>
                  <div className="beat-scale" role="group" aria-label="Escala">
                    {['menor', 'mayor'].map((scale) => (
                      <button
                        key={scale}
                        type="button"
                        className={`beat-scale__button ${beatScale === scale ? 'is-active' : ''}`}
                        onClick={() => setBeatScale(scale)}
                        aria-pressed={beatScale === scale}
                      >
                        {scale}
                      </button>
                    ))}
                  </div>
                </div>
              </label>
            </div>
            <textarea
              rows="2"
              placeholder="Referencias, mood..."
              value={beatNeed}
              onChange={(e) => setBeatExtra(stripAutoLines(e.target.value))}
            />
          </div>
          <div className="plan-card__foot">
            <a className="btn btn-primary" href={buildWhatsAppLink('beat')} target="_blank" rel="noreferrer">
              contratar beat
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
