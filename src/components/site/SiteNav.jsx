import { useLanguage } from '../../contexts/LanguageContext';
import { waLink } from '../../data/links';
import { routeHref } from '../../hooks/useHashRoute';

const WORLDS = ['musica', 'servicios', 'formacion'];

export default function SiteNav({ route }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="site-nav">
      <a className="site-nav__brand" href={routeHref('inicio')} aria-label="Clareny">
        <img src={`${import.meta.env.BASE_URL}brand/clareny-logo-black.png`} alt="" />
        <span>CLARENY</span>
      </a>

      <nav className="site-nav__worlds" aria-label="Clareny">
        {WORLDS.map((world) => (
          <a
            key={world}
            href={routeHref(world)}
            className={route === world ? 'is-active' : undefined}
            aria-current={route === world ? 'page' : undefined}
          >
            {t(`site.nav.${world}`)}
          </a>
        ))}
      </nav>

      <div className="site-nav__end">
        <button
          type="button"
          className="site-nav__lang"
          onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
          aria-label={t('nav.lang')}
        >
          {language === 'es' ? 'EN' : 'ES'}
        </button>
        <a className="site-nav__cta" href={waLink(t('links.waHi'))} target="_blank" rel="noopener noreferrer">
          {t('site.nav.cta')}
        </a>
      </div>
    </header>
  );
}
