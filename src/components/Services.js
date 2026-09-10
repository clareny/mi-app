import { useState } from 'react';

export default function Services() {
  const vocalServices = [
    { name: 'Grabación', description: 'Voz limpia y estable para grabar con claridad.' },
    { name: 'Edición', description: 'Afinación, recorte y pulido para una entrega más sólida.' },
    { name: 'Mezcla', description: 'Sonido más amplio, equilibrado y listo para lanzar.' },
  ];

  const beatServices = [
    { name: 'Remake', description: 'Adaptación del estilo a la idea del proyecto.' },
    { name: 'Custom beat', description: 'Beat original a medida según la referencia.' },
  ];

  const [vocalSelections, setVocalSelections] = useState([]);
  const [beatSelections, setBeatSelections] = useState([]);
  const [vocalNeed, setVocalNeed] = useState('');
  const [beatNeed, setBeatNeed] = useState('');
  const [activeTab, setActiveTab] = useState('vocal');

  const serviceTabs = [
    { id: 'vocal', label: 'Vocal' },
    { id: 'beats', label: 'Beats' },
  ];

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
    <section id="services" className={`services-section services-section--${activeTab}`}>
      <div className="service-segmented" aria-label="Selecciona entre vocal o beats">
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

      <div className="services-grid compact-services-grid">
        <div className={`service-card service-card--vocal service-panel ${activeTab === 'vocal' ? 'is-active' : ''}`}>
          <div className="service-card__header">
            <span className="service-badge">Vocal</span>
            <h3>Grabación + mezcla</h3>
          </div>

          <div className="mini-service-list">
            {vocalServices.map((service) => (
              <div key={service.name} className="mini-service-item">
                <strong>{service.name}</strong>
                <span>{service.description}</span>
              </div>
            ))}
          </div>

          <div className="service-form compact-form">
            <label className="service-form__label">Elegí el enfoque</label>
            <div className="option-grid compact-grid">
              {vocalServices.map((service) => {
                const isActive = vocalSelections.includes(service.name);
                const vocalAriaLabel =
                  service.name === 'Grabación'
                    ? 'Grabación de voces'
                    : service.name === 'Edición'
                      ? 'Edición vocal'
                      : service.name === 'Mezcla'
                        ? 'Mezcla vocal'
                        : service.name;

                return (
                  <button
                    key={service.name}
                    type="button"
                    className={`option-card ${isActive ? 'option-card--active' : ''}`}
                    onClick={() => handleVocalSelect(service.name)}
                    aria-label={vocalAriaLabel}
                    aria-pressed={isActive}
                  >
                    <span className="option-card__check" aria-hidden="true">{isActive ? '✓' : '○'}</span>
                    <span className="option-card__content">
                      <strong>{service.name}</strong>
                    </span>
                  </button>
                );
              })}
            </div>

            <textarea
              rows="2"
              placeholder="Qué necesitás?"
              value={vocalNeed}
              onChange={(e) => setVocalNeed(e.target.value)}
            />

            <a className="btn btn-primary" href={buildWhatsAppLink('vocal', vocalSelections, vocalNeed)} target="_blank" rel="noreferrer">
              contratar mezcla
            </a>
          </div>
        </div>

        <div className={`service-card service-card--beats service-panel ${activeTab === 'beats' ? 'is-active' : ''}`}>
          <div className="service-card__header">
            <span className="service-badge">Beats</span>
            <h3>Remake + custom beat</h3>
          </div>

          <div className="mini-service-list">
            {beatServices.map((service) => (
              <div key={service.name} className="mini-service-item">
                <strong>{service.name}</strong>
                <span>{service.description}</span>
              </div>
            ))}
          </div>

          <div className="service-form compact-form">
            <label className="service-form__label">Elegí el enfoque</label>
            <div className="option-grid compact-grid">
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
                    </span>
                  </button>
                );
              })}
            </div>

            <textarea
              rows="2"
              placeholder="Qué estilo buscas?"
              value={beatNeed}
              onChange={(e) => setBeatNeed(e.target.value)}
            />

            <a className="btn btn-primary" href={buildWhatsAppLink('beat', beatSelections, beatNeed)} target="_blank" rel="noreferrer">
              contratar beat
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
