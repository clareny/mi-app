import { useState } from 'react';

export default function Services() {
  const vocalServices = [
    { name: 'Grabación de voces', description: 'Grabación profesional con sonido limpio, estable y listo para trabajar.' },
    { name: 'Edición vocal', description: 'Recorte, afinación, limpieza y pulido para que la voz suene más sólida.' },
    { name: 'Mezcla + master', description: 'Mezcla y masterización con enfoque claro, dinámico y profesional.' },
  ];

  const beatServices = [
    { name: 'Remake beats', description: 'Adaptación creativa de una idea o referencia para que encaje mejor con el proyecto.' },
    { name: 'Custom beat', description: 'Beat original desarrollado a medida según la visión del artista y el contexto.' },
  ];

  const [vocalSelections, setVocalSelections] = useState([]);
  const [beatSelections, setBeatSelections] = useState([]);
  const [vocalNeed, setVocalNeed] = useState('');
  const [beatNeed, setBeatNeed] = useState('');

  const stripSelectionPrefix = (value) => value.replace(/^Enfoque seleccionado: .*?(?:\.|$)\s*/, '').trim();

  const toggleSelection = (name, selectedItems, setSelectedItems, setNeed) => {
    const nextSelection = selectedItems.includes(name)
      ? selectedItems.filter((item) => item !== name)
      : [...selectedItems, name];

    setSelectedItems(nextSelection);
    setNeed((prev) => {
      const cleanedNeed = stripSelectionPrefix(prev);
      const selectionText = nextSelection.length ? `Enfoque seleccionado: ${nextSelection.join(', ')}.` : '';
      return selectionText ? `${selectionText} ${cleanedNeed}`.trim() : cleanedNeed;
    });
  };

  const handleVocalSelect = (serviceName) => {
    toggleSelection(serviceName, vocalSelections, setVocalSelections, setVocalNeed);
  };

  const handleBeatSelect = (serviceName) => {
    toggleSelection(serviceName, beatSelections, setBeatSelections, setBeatNeed);
  };

  const buildWhatsAppLink = (type, selections, need) => {
    const label = type === 'vocal' ? 'Producción vocal' : 'Beats';
    const selectionText = selections.length ? `Enfoques seleccionados: ${selections.join(', ')}.` : '';
    const detailText = need ? `Detalles: ${need}` : 'Quiero que me ayuden a definir el enfoque ideal.';
    const message = `Hola, estoy interesado en ${label}. ${selectionText} ${detailText}`;
    return `https://wa.me/59897989368?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="services" className="services-section">
      <h2 className="section-title">Servicios</h2>
      <p className="service-intro service-intro--lead">
        Dos enfoques distintos para trabajar: producción vocal y desarrollo de beats. Cada uno se adapta según la idea, el estilo y la necesidad del proyecto.
      </p>

      <div className="services-grid">
        <div className="service-card service-card--vocal">
          <div className="service-card__header">
            <span className="service-badge">Producción vocal</span>
            <h3>Tratamiento vocal y mezcla</h3>
          </div>
          <p>
            Ideal para artistas que necesitan un sonido más limpio, profesional y listo para publicar. Incluye acompañamiento creativo para que la canción se sienta más sólida.
          </p>
          <div className="pricing-list">
            {vocalServices.map((service) => (
              <div className="pricing-item" key={service.name}>
                <div>
                  <h4>{service.name}</h4>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="service-form">
            <label className="service-form__label">Elegí el enfoque</label>
            <div className="option-grid">
              {vocalServices.map((service) => {
                const isActive = vocalSelections.includes(service.name);
                return (
                  <button
                    key={service.name}
                    type="button"
                    className={`option-card ${isActive ? 'option-card--active' : ''}`}
                    onClick={() => handleVocalSelect(service.name)}
                    aria-pressed={isActive}
                  >
                    <span className="option-card__check" aria-hidden="true">{isActive ? '✓' : '○'}</span>
                    <span className="option-card__content">
                      <strong>{service.name}</strong>
                      <span>{service.description}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <label className="service-form__label" htmlFor="vocal-need">Qué necesitás</label>
            <textarea
              id="vocal-need"
              rows="3"
              placeholder="Ej: una voz más limpia para una canción, mezcla para un demo, etc."
              value={vocalNeed}
              onChange={(e) => setVocalNeed(e.target.value)}
            />

            <a className="btn btn-primary" href={buildWhatsAppLink('vocal', vocalSelections, vocalNeed)} target="_blank" rel="noreferrer">
              Pedir propuesta vocal
            </a>
          </div>
        </div>

        <div className="service-card service-card--beats">
          <div className="service-card__header">
            <span className="service-badge">Beats</span>
            <h3>Remake y custom beat</h3>
          </div>
          <p>
            Para quienes buscan un beat que funcione según su contexto, su estilo o la dirección que quieren dar a la canción.
          </p>
          <div className="pricing-list">
            {beatServices.map((service) => (
              <div className="pricing-item" key={service.name}>
                <div>
                  <h4>{service.name}</h4>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="service-form">
            <label className="service-form__label">Elegí el enfoque</label>
            <div className="option-grid">
              {beatServices.map((service) => {
                const isActive = beatSelections.includes(service.name);
                return (
                  <button
                    key={service.name}
                    type="button"
                    className={`option-card ${isActive ? 'option-card--active' : ''}`}
                    onClick={() => handleBeatSelect(service.name)}
                    aria-pressed={isActive}
                  >
                    <span className="option-card__check" aria-hidden="true">{isActive ? '✓' : '○'}</span>
                    <span className="option-card__content">
                      <strong>{service.name}</strong>
                      <span>{service.description}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <label className="service-form__label" htmlFor="beat-need">Qué necesitás</label>
            <textarea
              id="beat-need"
              rows="3"
              placeholder="Ej: un beat para trap, un remake con estilo específico, etc."
              value={beatNeed}
              onChange={(e) => setBeatNeed(e.target.value)}
            />

            <a className="btn btn-primary" href={buildWhatsAppLink('beat', beatSelections, beatNeed)} target="_blank" rel="noreferrer">
              Pedir propuesta de beat
            </a>
          </div>
        </div>
      </div>

      <div className="contact-cta">
        <p>Los proyectos se cotizan según la idea, la complejidad y el alcance del trabajo. Si querés hablar de algo concreto, elegí el enfoque y escribime por WhatsApp con lo que necesitás.</p>
      </div>
    </section>
  );
}
