import { useState } from 'react';
import Chips from '../components/site/Chips';
import { useLanguage } from '../contexts/LanguageContext';
import { DISCORD_CLASS_INVITE, mailLink, waLink } from '../data/links';
import WorldView from './WorldView';

const PRICE_PER_HOUR = 30;

// Temas sugeridos según quién quiere aprender.
const TOPICS = {
  artista: ['ipi', 'royalties', 'buyBeats', 'splits'],
  productor: ['mixVocals', 'tuneVocals', 'charge', 'workflow'],
  sello: ['openLabel', 'manageArtists', 'release', 'royalties'],
};
const PROFILES = Object.keys(TOPICS);
const HOURS = [1, 2, 3];
const MAX_HOURS = 12;
const DAYS = [0, 1, 2, 3, 4, 5, 6];
const TIMES = ['morning', 'afternoon', 'night'];

const toggle = (list, value) => (list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);

export default function TrainingView() {
  const { t } = useLanguage();
  const [profile, setProfile] = useState('artista');
  const [topics, setTopics] = useState([]);
  const [hours, setHours] = useState(1);
  const [hoursText, setHoursText] = useState('1');
  const [days, setDays] = useState([]);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [other, setOther] = useState('');
  const [booked, setBooked] = useState(false);

  const k = (key) => t(`site.training.${key}`);
  const topicLabel = (id) => k(`topics.${id}`);
  const hoursLabel = (h) => `${h} ${h === 1 ? k('hour') : k('hoursPlural')}`;
  const ready = topics.length > 0 || other.trim();
  const today = new Date().toISOString().slice(0, 10);

  // Cada hora de clase habilita un día más para elegir.
  const changeHours = (value) => {
    const next = Math.min(MAX_HOURS, Math.max(1, Math.round(Number(value)) || 1));
    setHours(next);
    setHoursText(String(next));
    setDays((current) => current.slice(0, next));
  };

  // Deja borrar el número mientras se escribe; se corrige al salir del campo.
  const typeHours = (value) => {
    setHoursText(value);
    if (value !== '') changeHours(value);
  };

  const toggleDay = (day) =>
    setDays((current) => (current.includes(day) || current.length < hours ? toggle(current, day) : current));

  const fill = (text, values) => Object.entries(values).reduce((out, [key, val]) => out.replace(`{${key}}`, val), text);

  const changeProfile = (next) => {
    setProfile(next);
    setTopics((current) => current.filter((id) => TOPICS[next].includes(id)));
  };

  const message = () => {
    const lines = [k('waHi'), `${k('waProfile')}: ${k(`profiles.${profile}`)}.`];
    if (topics.length) lines.push(`${k('waTopics')}: ${topics.map(topicLabel).join(', ')}.`);
    if (other.trim()) lines.push(`${k('waOther')}: ${other.trim()}`);
    lines.push(`${k('waDuration')}: ${hoursLabel(hours)} (${hours * PRICE_PER_HOUR} USD).`);
    if (days.length) lines.push(`${k('waDays')}: ${days.map((d) => k(`dayNames.${d}`)).join(', ')}.`);
    if (time) lines.push(`${k('waTime')}: ${k(`times.${time}`)}.`);
    if (date) lines.push(`${k('waDate')}: ${date}.`);
    if (name.trim()) lines.push(`${k('waName')}: ${name.trim()}.`);
    return lines.join('\n');
  };

  return (
    <WorldView id="formacion">
      {/* 01 · Perfil */}
      <section className="prod-block">
        <p className="kicker text-iris">{k('profileKicker')}</p>
        <div className="profile-switch" role="radiogroup" aria-label={k('profileKicker')}>
          {PROFILES.map((id) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={profile === id}
              className={profile === id ? 'is-active' : undefined}
              onClick={() => changeProfile(id)}
            >
              {k(`profiles.${id}`)}
            </button>
          ))}
        </div>
      </section>

      {/* 02 · Temas */}
      <section className="prod-block">
        <p className="kicker text-iris">{k('topicsKicker')}</p>
        <div className="topics">
          {TOPICS[profile].map((id, index) => {
            const active = topics.includes(id);
            return (
              <button
                key={id}
                type="button"
                className={`topic ${active ? 'is-active' : ''}`}
                aria-pressed={active}
                onClick={() => setTopics((current) => toggle(current, id))}
              >
                <span className="topic__n">0{index + 1}</span>
                <span className="topic__name">{topicLabel(id)}</span>
                <span className="topic__check" aria-hidden="true">{active ? '✓' : '+'}</span>
              </button>
            );
          })}
        </div>
        <p className="fine-print">{k('topicsHint')}</p>
      </section>

      {/* 03 · Agendador */}
      <section className="prod-block">
        <p className="kicker text-iris">{k('bookKicker')}</p>
        <form className="brief-card" onSubmit={(event) => event.preventDefault()}>
          <div className="field">
            <span>{k('hours')}</span>
            <div className="hours-picker">
              <Chips options={HOURS} selected={hours} onToggle={changeHours} label={hoursLabel} />
              <label className="hours-picker__other">
                <span>{k('hoursOther')}</span>
                <input
                  type="number"
                  min="1"
                  max={MAX_HOURS}
                  inputMode="numeric"
                  value={hoursText}
                  onChange={(event) => typeHours(event.target.value)}
                  onBlur={() => setHoursText(String(hours))}
                />
              </label>
            </div>
            <p className="estimate">
              {fill(k('estimate'), { h: hoursLabel(hours), t: hours * PRICE_PER_HOUR })}
            </p>
          </div>
          <div className="field">
            <span>{k('days')}</span>
            <Chips
              options={DAYS}
              selected={days}
              onToggle={toggleDay}
              isDisabled={() => days.length >= hours}
              label={(day) => k(`dayNames.${day}`)}
            />
            <p className="fine-print">{fill(k('daysHint'), { n: hours, d: hours === 1 ? k('day') : k('daysWord') })}</p>
          </div>
          <div className="field">
            <span>{k('time')}</span>
            <Chips
              options={TIMES}
              selected={time}
              onToggle={(value) => setTime(value === time ? '' : value)}
              label={(value) => k(`times.${value}`)}
            />
          </div>
          <div className="field-row">
            <label className="field">
              <span>{k('date')}</span>
              <input type="date" min={today} value={date} onChange={(event) => setDate(event.target.value)} />
            </label>
            <label className="field">
              <span>{k('name')}</span>
              <input type="text" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} />
            </label>
          </div>
          <label className="field">
            <span>{k('other')}</span>
            <textarea rows="3" value={other} onChange={(event) => setOther(event.target.value)} />
          </label>

          <div className="brief-card__send">
            {ready ? (
              <>
                <a
                  className="btn-dark"
                  href={waLink(message())}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setBooked(true)}
                >
                  {k('sendWa')} ↗
                </a>
                <a className="btn-text" href={mailLink(k('mailSubject'), message())} onClick={() => setBooked(true)}>
                  {k('sendMail')}
                </a>
              </>
            ) : (
              <p className="fine-print">{k('pickTopic')}</p>
            )}
          </div>
          <p className="fine-print">{k('price')}</p>

          {/* El link de Discord solo aparece después de agendar */}
          {booked && (
            <div className="booked" role="status">
              <strong>{k('bookedTitle')}</strong>
              <p>{k('bookedCopy')}</p>
              <a className="btn-discord" href={DISCORD_CLASS_INVITE} target="_blank" rel="noopener noreferrer">
                {k('joinDiscord')} ↗
              </a>
            </div>
          )}
        </form>
      </section>
    </WorldView>
  );
}
