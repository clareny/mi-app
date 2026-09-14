import { useLanguage } from '../contexts/LanguageContext';

export default function Navbar({ onNavClick = () => {} }) {
  const basePath = import.meta.env.BASE_URL;
  const { language, setLanguage, t } = useLanguage();

  const links = [
    { label: t('nav.discography'), href: '#portfolio', id: 'portfolio' },
    { label: t('nav.services'), href: '#servicios', id: 'servicios' },
    { label: t('nav.bio'), href: '#sobre-mi', id: 'sobre-mi' },
    { label: t('nav.contact'), href: '#contacto', id: 'contacto' },
  ];

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <a className="brand" href="#portfolio" onClick={(event) => onNavClick(event, 'portfolio')}>
          <img src={`${basePath}logoblanco.png`} alt="Clareny" className="brand-logo" />
        </a>
        <div className="nav-links">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={(event) => onNavClick(event, link.id)}
            >
              <span>{link.label}</span>
            </a>
          ))}
        </div>
        <div className="lang-switch" role="group" aria-label={t('nav.lang')}>
          <button
            type="button"
            className={`lang-switch__btn ${language === 'es' ? 'is-active' : ''}`}
            onClick={() => setLanguage('es')}
            aria-pressed={language === 'es'}
          >
            ES
          </button>
          <button
            type="button"
            className={`lang-switch__btn ${language === 'en' ? 'is-active' : ''}`}
            onClick={() => setLanguage('en')}
            aria-pressed={language === 'en'}
          >
            EN
          </button>
        </div>
      </div>
    </nav>
  );
}
