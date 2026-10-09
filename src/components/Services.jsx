import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  appleSpring,
  cardVariants,
  HireCta,
  itemVariants,
  listVariants,
  usePhone,
  WHATSAPP_NUMBER,
} from './planKit';

const tabTheme = {
  combo: {
    pill: 'linear-gradient(135deg, #1cdadd, #c084fc)',
    glow: '0 1px 4px rgba(0, 0, 0, 0.18), 0 0 16px rgba(28, 218, 221, 0.45), 0 0 18px rgba(166, 92, 255, 0.3)',
    bloom: 'rgba(28, 218, 221, 0.5)',
    bloom2: 'rgba(166, 92, 255, 0.38)',
  },
  vocal: {
    pill: 'linear-gradient(135deg, #1cdadd, #72f6d2)',
    glow: '0 1px 4px rgba(0, 0, 0, 0.18), 0 0 18px rgba(28, 218, 221, 0.55)',
    bloom: 'rgba(28, 218, 221, 0.55)',
    bloom2: 'rgba(114, 246, 210, 0.28)',
  },
  beats: {
    pill: 'linear-gradient(135deg, #b875ff, #e0a7ff)',
    glow: '0 1px 4px rgba(0, 0, 0, 0.18), 0 0 18px rgba(184, 117, 255, 0.58)',
    bloom: 'rgba(184, 117, 255, 0.55)',
    bloom2: 'rgba(224, 167, 255, 0.32)',
  },
};

const beatGenres = ['Trap', 'Rap', 'R&B', 'Reggaeton', 'Drill', 'Pop', 'Afrobeats', 'Lo-fi', 'Soul', 'House'];
const beatKeys = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

const AUTO_LINE = /^(Enfoque|Focus|Género|Genre|Tonalidad|Key):/;

const stripAutoLines = (value) =>
  value
    .split('\n')
    .filter((line) => !AUTO_LINE.test(line.trim()))
    .join('\n')
    .replace(/^\n+/, '');

const buildVocalMessage = (selections, extra, labels) => {
  const lines = [];
  if (selections.length) lines.push(`${labels.focus}: ${selections.join(', ')}.`);
  if (extra.trim()) lines.push(extra.trim());
  return lines.join('\n');
};

const buildBeatMessage = (selections, genre, key, scale, extra, mood, labels) => {
  const lines = [];
  if (selections.length) lines.push(`${labels.focus}: ${selections.join(', ')}.`);
  if (genre) lines.push(`${labels.genre}: ${genre}.`);
  if (key) lines.push(`${labels.key}: ${key} ${scale}.`);
  if (mood.trim()) lines.push(`Mood: ${mood.trim()}.`);
  if (extra.trim()) lines.push(extra.trim());
  return lines.join('\n');
};

export default function Services() {
  const { t } = useLanguage();
  const phone = usePhone();
  const reduceMotion = useReducedMotion();
  const animateCards = phone && !reduceMotion;
  const animateHire = !reduceMotion;
  const [vocalSelections, setVocalSelections] = useState([]);
  const [beatSelections, setBeatSelections] = useState([]);
  const [comboExtra, setComboExtra] = useState('');
  const [vocalExtra, setVocalExtra] = useState('');
  const [beatExtra, setBeatExtra] = useState('');
  const [beatMood, setBeatMood] = useState('');
  const [beatGenre, setBeatGenre] = useState('');
  const [beatKey, setBeatKey] = useState('');
  const [beatScale, setBeatScale] = useState('menor');
  const [activeTab, setActiveTab] = useState('combo');

  useEffect(() => {
    const openTab = (event) => {
      const tab = event.detail;
      if (tab === 'combo' || tab === 'vocal' || tab === 'beats') {
        setActiveTab(tab);
        requestAnimationFrame(() => {
          document.querySelector(`.offer--${tab}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    };

    window.addEventListener('clareny-service-tab', openTab);
    return () => window.removeEventListener('clareny-service-tab', openTab);
  }, []);

  const formLabels = {
    focus: t('services.waFocus'),
    genre: t('services.waGenre'),
    key: t('services.waKey'),
  };
  const vocalLabels = vocalSelections.map((id) => t(`services.${id}`));
  const vocalNeed = buildVocalMessage(vocalLabels, vocalExtra, formLabels);
  const beatNeed = buildBeatMessage(
    beatSelections,
    beatGenre,
    beatKey,
    beatScale === 'mayor' ? t('services.major') : t('services.minor'),
    beatExtra,
    beatMood,
    formLabels
  );

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
        ? `${t('services.waHi')} ${t('services.waCombo')} ${t('services.waDetails')}: ${extra}`
        : `${t('services.waHi')} ${t('services.waCombo')}`;
      return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    }

    const label = type === 'vocal' ? t('services.waVocalLabel') : t('services.waBeatsLabel');
    const need = type === 'vocal' ? vocalNeed : beatNeed;
    const detailText = need.trim()
      ? `${t('services.waDetails')}: ${need.trim()}`
      : t('services.waDefine');
    const message = `${t('services.waHi')} ${label}. ${detailText}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const briefType = beatSelections.length
    ? beatSelections.map((id) => t(`services.${id}`)).join(' / ')
    : t('services.remake');
  const briefSpec = [beatGenre, beatKey && `${beatKey} ${beatScale === 'mayor' ? t('services.major') : t('services.minor')}`]
    .filter(Boolean)
    .join(' · ');

  return (
    <section id="services" className={`services-section editorial-services services-section--${activeTab}`}>
      <header className="ed-head">
        <div>
          <p className="ed-kicker">{t('services.sectionKicker')}</p>
          <h2>
            <span>{t('services.sectionTitle1')}</span>
            <span>{t('services.sectionTitle2')}</span>
          </h2>
        </div>
        <p>{t('services.sectionCopy')}</p>
      </header>
      <LayoutGroup>
      <div className="service-segmented" aria-label={t('services.tabsAria')}>
        {serviceTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`service-segmented__button ${activeTab === tab.id ? 'is-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            aria-pressed={activeTab === tab.id}
          >
            {animateCards && activeTab === tab.id ? (
              <motion.span
                className={`service-segmented__glow service-segmented__glow--${tab.id}`}
                layoutId="services-apple-pill"
                initial={false}
                animate={{
                  background: tabTheme[tab.id].pill,
                  boxShadow: tabTheme[tab.id].glow,
                }}
                transition={appleSpring}
              />
            ) : null}
            <span className="service-segmented__label">{tab.label}</span>
          </button>
        ))}
      </div>
      </LayoutGroup>

      <div className="offer-list">
        <article className="offer offer--combo">
          <div className="offer__cat">
            <p>{t('services.comboIndex')}</p>
            <span>{t('services.flag')}</span>
          </div>
          <div className="offer__main">
            <h3><span>{t('services.comboTitle1')}</span><span>{t('services.comboTitle2')}</span></h3>
            <p>{t('services.comboHook')}</p>
            <label>
              <span>{t('services.comboField')}</span>
              <textarea rows="4" placeholder={t('services.comboPh')} value={comboExtra} onChange={(e) => setComboExtra(e.target.value)} />
            </label>
            <HireCta href={buildWhatsAppLink('combo')} label={t('services.hireCombo')} animate={animateHire} />
          </div>
          <aside className="offer__side">
            <p>{t('services.sideKicker')}</p>
            <div><strong>{t('services.side1t')}</strong><span>{t('services.side1c')}</span></div>
            <div><strong>{t('services.side2t')}</strong><span>{t('services.side2c')}</span></div>
            <div><strong>{t('services.side3t')}</strong><span>{t('services.side3c')}</span></div>
          </aside>
        </article>

        <article className="offer offer--vocal">
          <div className="offer__cat">
            <p>{t('services.vocalIndex')}</p>
          </div>
          <div className="offer__main">
            <h3><span>{t('services.vocalTitle1')}</span><span>{t('services.vocalTitle2')}</span></h3>
            <p>{t('services.vocalHook')}</p>
            <div className="offer__chips">
              {vocalServices.map((service) => {
                const isActive = vocalSelections.includes(service.id);
                return (
                  <button
                    key={service.id}
                    type="button"
                    className={isActive ? 'is-active' : undefined}
                    onClick={() => toggleSelection(service.id, vocalSelections, setVocalSelections)}
                    aria-pressed={isActive}
                  >
                    {t(`services.${service.id}`)}
                  </button>
                );
              })}
            </div>
            <label>
              <span>{t('services.vocalField')}</span>
              <textarea rows="4" placeholder={t('services.vocalPh')} value={vocalNeed} onChange={(e) => setVocalExtra(stripAutoLines(e.target.value))} />
            </label>
            <HireCta href={buildWhatsAppLink('vocal')} label={t('services.hireMix')} animate={animateHire} />
          </div>
          <aside className="offer__side">
            {vocalServices.map((service) => (
              <div key={service.id}>
                <strong>{t(`services.${service.id}`)}</strong>
                <span>{t(`services.${service.id}Side`)}</span>
              </div>
            ))}
          </aside>
        </article>

        <article className="offer offer--beats">
          <div className="offer__cat">
            <p>{t('services.beatsIndex')}</p>
          </div>
          <div className="offer__main">
            <h3><span>{t('services.beatsTitle1')}</span><span>{t('services.beatsTitle2')}</span></h3>
            <p>{t('services.beatsHook')}</p>
            <a className="offer__jump" href="#brief">{t('services.prepareBeat')}</a>
          </div>
          <aside className="offer__side">
            {beatServices.map((service) => (
              <div key={service.id}>
                <strong>{t(`services.${service.id}`)}</strong>
                <span>{service.spec}</span>
              </div>
            ))}
            <p>{t('services.briefNext')}</p>
          </aside>
        </article>
      </div>

      <section className="brief" id="brief">
        <div className="brief__intro">
          <p className="ed-kicker">{t('services.briefKicker')}</p>
          <h2>
            <span>{t('services.briefTitle1')}</span>
            <span>{t('services.briefTitle2')}</span>
          </h2>
          <p>{t('services.briefCopy')}</p>
          <div className="brief__summary">
            <p>{t('services.briefPreparing')}</p>
            <strong>{t('services.briefActive')} / {briefType}</strong>
            <span>{briefSpec || t('services.briefRest')}</span>
          </div>
          <p>{t('services.briefNote')}</p>
        </div>
        <form className="brief__form" onSubmit={(event) => event.preventDefault()}>
          <header>
            <strong>{t('services.briefActive')}</strong>
            <span>{t('services.briefKicker')}</span>
          </header>
          <div className="brief__group">
            <span>{t('services.beatType')}</span>
            <div className="offer__chips">
              {beatServices.map((service) => {
                const isActive = beatSelections.includes(service.id);
                return (
                  <button
                    key={service.id}
                    type="button"
                    className={isActive ? 'is-active' : undefined}
                    onClick={() => toggleSelection(service.id, beatSelections, setBeatSelections)}
                    aria-pressed={isActive}
                  >
                    {t(`services.${service.id}`)}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="brief__group">
            <span>{t('services.genre')}</span>
            <div className="offer__chips">
              {beatGenres.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  className={beatGenre === genre ? 'is-active' : undefined}
                  onClick={() => setBeatGenre(genre)}
                  aria-pressed={beatGenre === genre}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
          <div className="brief__group">
            <span>{t('services.key')}</span>
            <div className="offer__chips">
              {beatKeys.map((keyName) => (
                <button
                  key={keyName}
                  type="button"
                  className={beatKey === keyName ? 'is-active' : undefined}
                  onClick={() => setBeatKey(keyName)}
                  aria-pressed={beatKey === keyName}
                >
                  {keyName}
                </button>
              ))}
            </div>
          </div>
          <div className="brief__group">
            <span>{t('services.scale')}</span>
            <div className="offer__chips">
              {['menor', 'mayor'].map((scale) => (
                <button
                  key={scale}
                  type="button"
                  className={beatScale === scale ? 'is-active' : undefined}
                  onClick={() => setBeatScale(scale)}
                  aria-pressed={beatScale === scale}
                >
                  {scale === 'menor' ? t('services.minor') : t('services.major')}
                </button>
              ))}
            </div>
          </div>
          <label>
            <span>{t('services.refs')}</span>
            <textarea rows="4" placeholder={t('services.beatPh')} value={beatExtra} onChange={(e) => setBeatExtra(e.target.value)} />
          </label>
          <label>
            <span>{t('services.mood')}</span>
            <input type="text" placeholder={t('services.moodPh')} value={beatMood} onChange={(e) => setBeatMood(e.target.value)} />
          </label>
          <HireCta href={buildWhatsAppLink('beat')} label={t('services.hireBeat')} animate={animateHire} />
        </form>
      </section>
    </section>
  );
}
