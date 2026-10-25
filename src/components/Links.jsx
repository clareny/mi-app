import { useLanguage } from '../contexts/LanguageContext';
import { linkHref, SOCIAL_LINKS, WHATSAPP_DISPLAY, waLink } from '../data/links';

const GROUPS = ['music', 'learn', 'community', 'social', 'work'];

export function LinkIcon({ item }) {
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

// Barra fija de redes (desktop): las redes marcadas con `rail: true`.
export function SocialRail() {
  const { t } = useLanguage();
  return (
    <nav className="social-rail" aria-label={t('links.rail')}>
      {SOCIAL_LINKS.filter((item) => item.rail).map((item) => (
        <a key={item.id} href={linkHref(item)} target="_blank" rel="noopener noreferrer" aria-label={item.label}>
          <LinkIcon item={item} />
        </a>
      ))}
      <span className="social-rail__line" aria-hidden="true" />
    </nav>
  );
}

// Accesos rápidos en la entrada (pensados para celular): las redes con `quick: true`.
export function QuickLinks() {
  const { t } = useLanguage();
  return (
    <nav className="quick-links" aria-label={t('links.quickTitle')}>
      <p className="quick-links__title">{t('links.quickTitle')}</p>
      <ul>
        {SOCIAL_LINKS.filter((item) => item.quick).map((item, i) => (
          <li key={item.id}>
            <a href={linkHref(item)} target="_blank" rel="noopener noreferrer">
              <span className="quick-links__num">/{String(i + 1).padStart(2, '0')}</span>
              <span className="quick-links__icon">
                <LinkIcon item={item} />
              </span>
              <span className="quick-links__text">
                <strong>{item.label}</strong>
                <small>{item.subKey ? t(item.subKey) : item.sub}</small>
              </span>
              <span aria-hidden="true">→</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Links() {
  const { t } = useLanguage();
  let index = 0;

  return (
    <section className="links-index">
      <header className="ed-head">
        <div>
          <p className="ed-kicker">{t('links.kicker')}</p>
          <h2>/{t('links.heading')}</h2>
        </div>
        <p>{t('links.copy')}</p>
      </header>

      <div className="links-index__groups">
        {GROUPS.map((group) => (
          <div key={group} className="links-index__group">
            <p className="links-index__label">{t(`links.${group}`)}</p>
            <ul>
              {SOCIAL_LINKS.filter((item) => item.group === group).map((item) => {
                index += 1;
                return (
                  <li key={item.id}>
                    <a href={linkHref(item)} target="_blank" rel="noopener noreferrer">
                      <span className="links-index__num">/{String(index).padStart(2, '0')}</span>
                      <span className="links-index__icon">
                        <LinkIcon item={item} />
                      </span>
                      <span className="links-index__name">× {item.label.toLowerCase()}</span>
                      <small>{item.subKey ? t(item.subKey) : item.sub}</small>
                      <span className="links-index__arrow" aria-hidden="true">→</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <a className="links-index__wa" href={waLink(t('links.waHi'))} target="_blank" rel="noopener noreferrer">
        <span>{t('links.whatsapp')}</span>
        <strong>WhatsApp · {WHATSAPP_DISPLAY}</strong>
        <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
