import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const WHATSAPP_NUMBER = '59897989368';

const beatGenres = ['Trap', 'Rap', 'R&B', 'Reggaeton', 'Drill', 'Pop', 'Afrobeats', 'Lo-fi', 'Soul', 'House'];
const beatKeys = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

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
  const { t } = useLanguage();
  const [vocalSelections, setVocalSelections] = useState([]);
  const [beatSelections, setBeatSelections] = useState([]);
  const [comboExtra, setComboExtra] = useState('');
  const [vocalExtra, setVocalExtra] = useState('');
  const [beatExtra, setBeatExtra] = useState('');
  const [beatGenre, setBeatGenre] = useState('');
  const [beatKey, setBeatKey] = useState('');
  const [beatScale, setBeatScale] = useState('menor');
  const [activeTab, setActiveTab] = useState('combo');

  useEffect(() => {
    const openTab = (event) => {
      const tab = event.detail;
      if (tab === 'combo' || tab === 'vocal' || tab === 'beats') {
        setActiveTab(tab);
      }
    };

    window.addEventListener('clareny-service-tab', openTab);
    return () => window.removeEventListener('clareny-service-tab', openTab);
  }, []);

  const vocalLabels = vocalSelections.map((id) => t(`services.${id}`));
  const vocalNeed = buildVocalMessage(vocalLabels, vocalExtra);
  const beatNeed = buildBeatMessage(beatSelections, beatGenre, beatKey, beatScale, beatExtra);

  const vocalServices = [
    { id: 'rec', copyKey: 'recCopy' },
    { id: 'edit', copyKey: 'editCopy' },
    { id: 'mix', copyKey: 'mixCopy' },
    { id: 'upgrade', copyKey: 'upgradeCopy' },
  ];

  const beatServices = [
    { id: 'remake', spec: t('services.remakeSpec') },
    { id: 'custom', spec: t('services.customSpec') },
  ];

  const comboRows = [
    { label: t('services.scope'), value: t('services.scopeVal') },
    { label: t('services.includes'), value: t('services.includesVal') },
    { label: t('services.focus'), value: t('services.focusVal') },
    { label: t('services.delivery'), value: t('services.deliveryVal') },
  ];

  const serviceTabs = [
    { id: 'combo', label: t('services.combo') },
    { id: 'vocal', label: t('services.vocal') },
    { id: 'beats', label: t('services.beats') },
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
      const extra = comboExtra.trim();
      const message = extra
        ? `Hola, estoy interesado en Combo: canción íntima, producción completa, virtual o presencial. Detalles: ${extra}`
        : 'Hola, estoy interesado en Combo: canción íntima, producción completa, virtual o presencial.';
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
            <span className="plan-card__flag">{t('services.flag')}</span>
            <h3>{t('services.combo')}</h3>
            <p>{t('services.comboTag')}</p>
          </header>
          <div className="plan-card__body">
            <p className="plan-card__hook">
              {t('services.comboHook')}
            </p>
            <ul className="plan-rows">
              {comboRows.map((row) => (
                <li key={row.label}>
                  <span>{row.label}</span>
                  <strong>{row.value}</strong>
                </li>
              ))}
            </ul>
            <textarea
              rows="5"
              placeholder={t('services.comboPh')}
              value={comboExtra}
              onChange={(e) => setComboExtra(e.target.value)}
            />
          </div>
          <div className="plan-card__foot">
            <a className="haste-pro" href={buildWhatsAppLink('combo')} target="_blank" rel="noopener noreferrer">
              <span className="haste-pro__glow" aria-hidden="true" />
              <span className="haste-pro__label">{t('services.hireCombo')}</span>
            </a>
          </div>
        </article>

        <article className={`plan-card plan-card--vocal service-panel ${activeTab === 'vocal' ? 'is-active' : ''}`}>
          <header className="plan-card__head">
            <h3>{t('services.vocal')}</h3>
            <p>{t('services.vocalTag')}</p>
          </header>
          <div className="plan-card__body">
            <p className="plan-card__hook">
              {t('services.vocalHook')}
            </p>
            <div className="plan-options">
              {vocalServices.map((service) => {
                const isActive = vocalSelections.includes(service.id);
                const title = t(`services.${service.id}`);
                return (
                  <button
                    key={service.id}
                    type="button"
                    className={`plan-option ${isActive ? 'is-active' : ''}`}
                    onClick={() => toggleSelection(service.id, vocalSelections, setVocalSelections)}
                    aria-pressed={isActive}
                  >
                    <span className="plan-option__text">
                      <strong>{title}</strong>
                      <small className="plan-option__copy">{t(`services.${service.copyKey}`)}</small>
                    </span>
                  </button>
                );
              })}
            </div>
            <textarea
              rows="5"
              placeholder={t('services.vocalPh')}
              value={vocalNeed}
              onChange={(e) => setVocalExtra(stripAutoLines(e.target.value))}
            />
          </div>
          <div className="plan-card__foot">
            <a className="haste-pro" href={buildWhatsAppLink('vocal')} target="_blank" rel="noopener noreferrer">
              <span className="haste-pro__glow" aria-hidden="true" />
              <span className="haste-pro__label">{t('services.hireMix')}</span>
            </a>
          </div>
        </article>

        <article className={`plan-card plan-card--beats service-panel ${activeTab === 'beats' ? 'is-active' : ''}`}>
          <header className="plan-card__head">
            <h3>{t('services.beats')}</h3>
            <p>{t('services.beatsTag')}</p>
          </header>
          <div className="plan-card__body">
            <p className="plan-card__hook">
              {t('services.beatsHook')}
            </p>
            <div className="plan-options">
              {beatServices.map((service) => {
                const isActive = beatSelections.includes(service.id);
                return (
                  <button
                    key={service.id}
                    type="button"
                    className={`plan-option ${isActive ? 'is-active' : ''}`}
                    onClick={() => toggleSelection(service.id, beatSelections, setBeatSelections)}
                    aria-pressed={isActive}
                  >
                    <span className="plan-option__text">
                      <strong>{t(`services.${service.id}`)}</strong>
                      <small className="plan-option__copy">{service.spec}</small>
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="beat-spec beat-spec--compact">
              <label className="beat-spec__field">
                <span className="service-form__label">{t('services.genre')}</span>
                <select value={beatGenre} onChange={(e) => setBeatGenre(e.target.value)} aria-label={t('services.genre')}>
                  <option value="">{t('services.genrePh')}</option>
                  {beatGenres.map((genre) => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </label>
              <label className="beat-spec__field">
                <span className="service-form__label">{t('services.key')}</span>
                <div className="beat-spec__key">
                  <select value={beatKey} onChange={(e) => setBeatKey(e.target.value)} aria-label={t('services.key')}>
                    <option value="">{t('services.note')}</option>
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
                        {scale === 'menor' ? t('services.minor') : t('services.major')}
                      </button>
                    ))}
                  </div>
                </div>
              </label>
            </div>
            <textarea
              rows="5"
              placeholder={t('services.beatPh')}
              value={beatNeed}
              onChange={(e) => setBeatExtra(stripAutoLines(e.target.value))}
            />
          </div>
          <div className="plan-card__foot">
            <a className="haste-pro" href={buildWhatsAppLink('beat')} target="_blank" rel="noopener noreferrer">
              <span className="haste-pro__glow" aria-hidden="true" />
              <span className="haste-pro__label">{t('services.hireBeat')}</span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
