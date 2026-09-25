import { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navbar({ onNavClick = () => {}, activeSection = 'portfolio' }) {
  const basePath = import.meta.env.BASE_URL;
  const { language, setLanguage, t } = useLanguage();
  const gazeRef = useRef(null);
  const coinRef = useRef(null);

  const links = [
    { label: t('nav.discography'), href: '#portfolio', id: 'portfolio' },
    { label: t('nav.services'), href: '#servicios', id: 'servicios' },
    { label: t('nav.bio'), href: '#sobre-mi', id: 'sobre-mi' },
    { label: t('nav.contact'), href: '#contacto', id: 'contacto' },
  ];

  useEffect(() => {
    const gaze = gazeRef.current;
    const coin = coinRef.current;
    if (!gaze || !coin) return undefined;

    const desktop = window.matchMedia('(min-width: 901px) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const resetGaze = () => {
      gaze.style.transform = '';
    };

    const followCursor = (event) => {
      if (!desktop.matches || reduced.matches) {
        resetGaze();
        return;
      }

      const rect = coin.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2);
      const dy = (event.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2);
      const tiltY = Math.max(-16, Math.min(16, dx * 16));
      const tiltX = Math.max(-10, Math.min(10, -dy * 10));
      gaze.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    };

    window.addEventListener('pointermove', followCursor, { passive: true });
    return () => {
      window.removeEventListener('pointermove', followCursor);
      resetGaze();
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <div className="nav-links nav-links--left">
          {links.slice(0, 2).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link nav-link--${link.id}${activeSection === link.id ? ' is-active' : ''}`}
              aria-current={activeSection === link.id ? 'page' : undefined}
              onClick={(event) => onNavClick(event, link.id)}
            >
              <span>{link.label}</span>
            </a>
          ))}
        </div>
        <a className="brand" href="#portfolio" onClick={(event) => onNavClick(event, 'portfolio')}>
          <span className="brand-gaze" ref={gazeRef}>
            <span className="brand-coin" ref={coinRef}>
              <img src={`${basePath}logoblanco.png`} alt="Clareny" className="brand-logo" />
            </span>
          </span>
        </a>
        <div className="nav-links nav-links--right">
          {links.slice(2).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link nav-link--${link.id}${activeSection === link.id ? ' is-active' : ''}`}
              aria-current={activeSection === link.id ? 'page' : undefined}
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
            <span>ES</span>
          </button>
          <button
            type="button"
            className={`lang-switch__btn ${language === 'en' ? 'is-active' : ''}`}
            onClick={() => setLanguage('en')}
            aria-pressed={language === 'en'}
          >
            <span>EN</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
