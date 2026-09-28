import { AnimatePresence, LayoutGroup, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const appleSpring = {
  type: 'spring',
  stiffness: 380,
  damping: 32,
  mass: 0.72,
};

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

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.985,
    filter: 'blur(22px)',
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    zIndex: 2,
    transition: {
      ...appleSpring,
      filter: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 1.02,
    filter: 'blur(18px)',
    zIndex: 1,
    transition: { duration: 0.32, ease: [0.4, 0, 1, 1] },
  },
};

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.96, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: appleSpring,
  },
};

const hireCtaMotion = {
  rest: { scale: 1 },
  hover: { scale: 1.045, transition: appleSpring },
};

const hireBlobA = {
  rest: {
    x: [0, 10, -6, 0],
    y: [0, -6, 5, 0],
    scale: [1, 1.12, 0.94, 1],
    opacity: 0.82,
    transition: { duration: 5.6, repeat: Infinity, ease: 'easeInOut' },
  },
  hover: {
    x: 18,
    y: -12,
    scale: 1.55,
    opacity: 1,
    transition: appleSpring,
  },
};

const hireBlobB = {
  rest: {
    x: [0, -8, 7, 0],
    y: [0, 6, -4, 0],
    scale: [1, 0.92, 1.14, 1],
    opacity: 0.76,
    transition: { duration: 6.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
  },
  hover: {
    x: -16,
    y: 12,
    scale: 1.5,
    opacity: 1,
    transition: appleSpring,
  },
};

const HireCta = ({ href, label, animate }) => {
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);
  const spotOp = useMotionValue(0);
  const x = useSpring(spotX, { stiffness: 260, damping: 22, mass: 0.6 });
  const y = useSpring(spotY, { stiffness: 260, damping: 22, mass: 0.6 });
  const opacity = useSpring(spotOp, { stiffness: 320, damping: 28 });

  const onPointerMove = (event) => {
    if (!animate) return;
    const box = event.currentTarget.getBoundingClientRect();
    spotX.set(event.clientX - box.left - box.width / 2);
    spotY.set(event.clientY - box.top - box.height / 2);
  };

  const onPointerEnter = () => {
    if (animate) spotOp.set(1);
  };

  const onPointerLeave = () => {
    spotX.set(0);
    spotY.set(0);
    spotOp.set(0);
  };

  return (
    <motion.a
      className="haste-pro hire-cta"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variants={animate ? hireCtaMotion : undefined}
      initial={false}
      animate={animate ? 'rest' : false}
      whileHover={animate ? 'hover' : undefined}
      whileTap={animate ? { scale: 0.96 } : undefined}
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      {animate ? (
        <>
          <motion.span className="hire-cta__blob hire-cta__blob--a" variants={hireBlobA} aria-hidden="true" />
          <motion.span className="hire-cta__blob hire-cta__blob--b" variants={hireBlobB} aria-hidden="true" />
          <motion.span className="hire-cta__spot" style={{ x, y, opacity }} aria-hidden="true" />
        </>
      ) : (
        <>
          <span className="hire-cta__blob hire-cta__blob--a" aria-hidden="true" />
          <span className="hire-cta__blob hire-cta__blob--b" aria-hidden="true" />
        </>
      )}
      <span className="haste-pro__label hire-cta__label">{label}</span>
    </motion.a>
  );
};

const usePhone = () => {
  const [phone, setPhone] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 900px)').matches : false
  );

  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px)');
    const sync = () => setPhone(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  return phone;
};

const WHATSAPP_NUMBER = '59897989368';

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

const buildBeatMessage = (selections, genre, key, scale, extra, labels) => {
  const lines = [];
  if (selections.length) lines.push(`${labels.focus}: ${selections.join(', ')}.`);
  if (genre) lines.push(`${labels.genre}: ${genre}.`);
  if (key) lines.push(`${labels.key}: ${key} ${scale}.`);
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

  return (
    <section id="services" className={`services-section services-section--${activeTab}`}>
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

      <div className="plan-grid">
        {animateCards ? (
          <motion.div
            key={`bloom-${activeTab}`}
            className="service-panel-bloom"
            initial={{ opacity: 0.9, scale: 0.82 }}
            animate={{ opacity: 0, scale: 1.22 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: `radial-gradient(ellipse at 50% 28%, ${tabTheme[activeTab].bloom} 0%, ${tabTheme[activeTab].bloom2} 42%, transparent 72%)`,
            }}
            aria-hidden="true"
          />
        ) : null}
        <AnimatePresence mode="sync" initial={false}>
          {(!phone || activeTab === 'combo') ? (
        <motion.article
          key="combo"
          className={`plan-card plan-card--combo service-panel ${activeTab === 'combo' ? 'is-active' : ''}`}
          variants={animateCards ? cardVariants : undefined}
          initial={animateCards ? 'hidden' : false}
          animate={animateCards ? 'show' : false}
          exit={animateCards ? 'exit' : undefined}
          style={animateCards ? { originY: 0, originX: 0.5 } : undefined}
        >
          <span className="plan-card__accent" aria-hidden="true" />
          <header className="plan-card__head">
            <span className="plan-card__flag">{t('services.flag')}</span>
            <h3>{t('services.combo')}</h3>
            <p>{t('services.comboTag')}</p>
          </header>
          <motion.div
            className="plan-card__body"
            variants={animateCards ? listVariants : undefined}
            initial={animateCards ? 'hidden' : false}
            animate="show"
          >
            <motion.p className="plan-card__hook" variants={animateCards ? itemVariants : undefined}>
              {t('services.comboHook')}
            </motion.p>
            <motion.ul className="plan-rows" variants={animateCards ? itemVariants : undefined}>
              {comboRows.map((row) => (
                <li key={row.label}>
                  <span className="plan-check" aria-hidden="true" />
                  <span className="plan-row__copy">
                    <span>{row.label}</span>
                    <strong>{row.value}</strong>
                  </span>
                </li>
              ))}
            </motion.ul>
            <motion.textarea
              rows="5"
              placeholder={t('services.comboPh')}
              value={comboExtra}
              onChange={(e) => setComboExtra(e.target.value)}
              variants={animateCards ? itemVariants : undefined}
            />
          </motion.div>
          <div className="plan-card__foot">
            <HireCta href={buildWhatsAppLink('combo')} label={t('services.hireCombo')} animate={animateHire} />
          </div>
        </motion.article>
          ) : null}

          {(!phone || activeTab === 'vocal') ? (
        <motion.article
          key="vocal"
          className={`plan-card plan-card--vocal service-panel ${activeTab === 'vocal' ? 'is-active' : ''}`}
          variants={animateCards ? cardVariants : undefined}
          initial={animateCards ? 'hidden' : false}
          animate={animateCards ? 'show' : false}
          exit={animateCards ? 'exit' : undefined}
          style={animateCards ? { originY: 0, originX: 0.5 } : undefined}
        >
          <span className="plan-card__accent" aria-hidden="true" />
          <header className="plan-card__head">
            <h3>{t('services.vocal')}</h3>
            <p>{t('services.vocalTag')}</p>
          </header>
          <motion.div
            className="plan-card__body"
            variants={animateCards ? listVariants : undefined}
            initial={animateCards ? 'hidden' : false}
            animate="show"
          >
            <motion.p className="plan-card__hook" variants={animateCards ? itemVariants : undefined}>
              {t('services.vocalHook')}
            </motion.p>
            <motion.div className="plan-options" variants={animateCards ? listVariants : undefined}>
              {vocalServices.map((service) => {
                const isActive = vocalSelections.includes(service.id);
                const title = t(`services.${service.id}`);
                const Option = animateCards ? motion.button : 'button';
                return (
                  <Option
                    key={service.id}
                    type="button"
                    className={`plan-option ${isActive ? 'is-active' : ''}`}
                    onClick={() => toggleSelection(service.id, vocalSelections, setVocalSelections)}
                    aria-pressed={isActive}
                    variants={animateCards ? itemVariants : undefined}
                  >
                    <span className="plan-option__mark" aria-hidden="true" />
                    <span className="plan-option__text">
                      <strong>{title}</strong>
                      <small className="plan-option__copy">{t(`services.${service.copyKey}`)}</small>
                    </span>
                  </Option>
                );
              })}
            </motion.div>
            <motion.textarea
              rows="5"
              placeholder={t('services.vocalPh')}
              value={vocalNeed}
              onChange={(e) => setVocalExtra(stripAutoLines(e.target.value))}
              variants={animateCards ? itemVariants : undefined}
            />
          </motion.div>
          <div className="plan-card__foot">
            <HireCta href={buildWhatsAppLink('vocal')} label={t('services.hireMix')} animate={animateHire} />
          </div>
        </motion.article>
          ) : null}

          {(!phone || activeTab === 'beats') ? (
        <motion.article
          key="beats"
          className={`plan-card plan-card--beats service-panel ${activeTab === 'beats' ? 'is-active' : ''}`}
          variants={animateCards ? cardVariants : undefined}
          initial={animateCards ? 'hidden' : false}
          animate={animateCards ? 'show' : false}
          exit={animateCards ? 'exit' : undefined}
          style={animateCards ? { originY: 0, originX: 0.5 } : undefined}
        >
          <span className="plan-card__accent" aria-hidden="true" />
          <header className="plan-card__head">
            <h3>{t('services.beats')}</h3>
            <p>{t('services.beatsTag')}</p>
          </header>
          <motion.div
            className="plan-card__body"
            variants={animateCards ? listVariants : undefined}
            initial={animateCards ? 'hidden' : false}
            animate="show"
          >
            <motion.p className="plan-card__hook" variants={animateCards ? itemVariants : undefined}>
              {t('services.beatsHook')}
            </motion.p>
            <motion.div className="plan-options" variants={animateCards ? listVariants : undefined}>
              {beatServices.map((service) => {
                const isActive = beatSelections.includes(service.id);
                const Option = animateCards ? motion.button : 'button';
                return (
                  <Option
                    key={service.id}
                    type="button"
                    className={`plan-option ${isActive ? 'is-active' : ''}`}
                    onClick={() => toggleSelection(service.id, beatSelections, setBeatSelections)}
                    aria-pressed={isActive}
                    variants={animateCards ? itemVariants : undefined}
                  >
                    <span className="plan-option__mark" aria-hidden="true" />
                    <span className="plan-option__text">
                      <strong>{t(`services.${service.id}`)}</strong>
                      <small className="plan-option__copy">{service.spec}</small>
                    </span>
                  </Option>
                );
              })}
            </motion.div>
            <motion.div className="beat-spec beat-spec--compact" variants={animateCards ? itemVariants : undefined}>
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
                  <div className="beat-scale" role="group" aria-label={t('services.scaleAria')}>
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
            </motion.div>
            <motion.textarea
              rows="5"
              placeholder={t('services.beatPh')}
              value={beatNeed}
              onChange={(e) => setBeatExtra(stripAutoLines(e.target.value))}
              variants={animateCards ? itemVariants : undefined}
            />
          </motion.div>
          <div className="plan-card__foot">
            <HireCta href={buildWhatsAppLink('beat')} label={t('services.hireBeat')} animate={animateHire} />
          </div>
        </motion.article>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
