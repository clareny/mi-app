import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { mailLink, waLink } from '../data/links';
import Chips from '../components/site/Chips';
import { routeHref } from '../hooks/useHashRoute';
import WorldView from './WorldView';

// Servicios de producción. `brief` decide qué preguntas muestra el formulario.
const SERVICES = [
  { id: 'combo', n: '01', brief: 'combo', special: true },
  { id: 'custom', n: '02', brief: 'beat' },
  { id: 'remake', n: '03', brief: 'beat' },
  { id: 'vocal', n: '04', brief: 'vocal' },
];

const VOCAL_OPTIONS = ['rec', 'edit', 'mix', 'upgrade'];
const GENRES = ['Trap', 'Rap', 'R&B', 'Reggaeton', 'Drill', 'Pop', 'Afrobeats', 'Lo-fi', 'Soul', 'House'];
const KEYS = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

export default function ProductionView() {
  const { t } = useLanguage();
  const [serviceId, setServiceId] = useState('combo');
  const [vocal, setVocal] = useState([]);
  const [genre, setGenre] = useState('');
  const [key, setKey] = useState('');
  const [scale, setScale] = useState('minor');
  const [mood, setMood] = useState('');
  const [notes, setNotes] = useState('');

  const service = SERVICES.find((item) => item.id === serviceId);

  const toggleVocal = (option) =>
    setVocal((current) => (current.includes(option) ? current.filter((item) => item !== option) : [...current, option]));

  const message = () => {
    const lines = [`${t('services.waHi')} ${t(`site.prod.s.${serviceId}.name`)}.`];
    if (service.brief === 'vocal' && vocal.length) {
      lines.push(`${t('services.waFocus')}: ${vocal.map((option) => t(`services.${option}`)).join(', ')}.`);
    }
    if (service.brief === 'beat') {
      if (genre) lines.push(`${t('services.waGenre')}: ${genre}.`);
      if (key) lines.push(`${t('services.waKey')}: ${key} ${t(`services.${scale}`)}.`);
      if (mood.trim()) lines.push(`Mood: ${mood.trim()}.`);
    }
    lines.push(notes.trim() ? `${t('services.waDetails')}: ${notes.trim()}` : t('services.waDefine'));
    return lines.join('\n');
  };

  const placeholder = { combo: 'services.comboPh', beat: 'services.beatPh', vocal: 'services.vocalPh' }[service.brief];

  return (
    <WorldView id="servicios">
      {/* 01 · Elegir servicio */}
      <section className="prod-block">
        <p className="kicker text-iris">{t('site.prod.pickKicker')}</p>
        <div className="services-grid" role="radiogroup" aria-label={t('site.prod.pickKicker')}>
          {SERVICES.map((item) => {
            const active = item.id === serviceId;
            return (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={active}
                className={`service-card service-card--${item.id} ${active ? 'is-active' : ''}`}
                onClick={() => setServiceId(item.id)}
              >
                <span className="service-card__top">
                  <span>{item.n}</span>
                  {item.special && <span className="service-card__flag">{t('site.prod.special')}</span>}
                </span>
                <span className="service-card__name">{t(`site.prod.s.${item.id}.name`)}</span>
                <span className="service-card__line">{t(`site.prod.s.${item.id}.line`)}</span>
                <span className="service-card__pick">{active ? `✓ ${t('site.prod.chosen')}` : t('site.prod.choose')}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 02 · Un solo brief que se adapta al servicio elegido */}
      <section className="prod-block">
        <p className="kicker text-iris">{t('site.prod.briefKicker')}</p>
        <form className="brief-card" onSubmit={(event) => event.preventDefault()}>
          <h2 className="brief-card__title">{t(`site.prod.s.${serviceId}.name`)}</h2>

          {service.brief === 'vocal' && (
            <div className="field">
              <span>{t('site.prod.vocalWhat')}</span>
              <Chips options={VOCAL_OPTIONS} selected={vocal} onToggle={toggleVocal} label={(option) => t(`services.${option}`)} />
            </div>
          )}

          {service.brief === 'beat' && (
            <>
              <div className="field">
                <span>{t('services.genre')}</span>
                <Chips options={GENRES} selected={genre} onToggle={(value) => setGenre(value === genre ? '' : value)} />
              </div>
              <div className="field">
                <span>{t('services.key')}</span>
                <Chips options={KEYS} selected={key} onToggle={(value) => setKey(value === key ? '' : value)} />
                <Chips options={['minor', 'major']} selected={scale} onToggle={setScale} label={(value) => t(`services.${value}`)} />
              </div>
              <label className="field">
                <span>{t('services.mood')}</span>
                <input type="text" value={mood} placeholder={t('services.moodPh')} onChange={(event) => setMood(event.target.value)} />
              </label>
            </>
          )}

          <label className="field">
            <span>{t('services.refs')}</span>
            <textarea rows="4" value={notes} placeholder={t(placeholder)} onChange={(event) => setNotes(event.target.value)} />
          </label>

          <div className="brief-card__send">
            <a className="btn-dark" href={waLink(message())} target="_blank" rel="noopener noreferrer">
              {t('site.prod.sendWa')} ↗
            </a>
            <a className="btn-text" href={mailLink(t('site.prod.mailSubject'), message())}>
              {t('site.prod.sendMail')}
            </a>
          </div>
        </form>
      </section>

      {/* 03 · Proceso en 3 pasos */}
      <section className="prod-block">
        <p className="kicker text-iris">{t('site.prod.processKicker')}</p>
        <ol className="steps">
          {[1, 2, 3].map((step) => (
            <li key={step}>
              <strong>{t(`process.step${step}`)}</strong>
              <span>{t(`process.step${step}Copy`)}</span>
            </li>
          ))}
        </ol>
      </section>

      <a className="world-next" href={routeHref('formacion')}>
        <span>{t('site.prod.toTraining')}</span>
        <strong>
          {t('site.prod.toTrainingBtn')} <span aria-hidden="true">→</span>
        </strong>
      </a>
    </WorldView>
  );
}
