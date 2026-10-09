import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navbar({ onNavClick = () => {}, activeSection = 'portfolio' }) {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;

    const root = document.documentElement;
    const close = () => setOpen(false);
    const onKey = (event) => {
      if (event.key === 'Escape') close();
    };
    const onResize = () => {
      if (window.innerWidth > 900) close();
    };

    root.classList.add('is-menu-open');
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);

    return () => {
      root.classList.remove('is-menu-open');
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const links = [
    { label: t('nav.discography'), href: '#portfolio', id: 'portfolio' },
    { label: t('nav.services'), href: '#servicios', id: 'servicios' },
    { label: t('nav.bio'), href: '#sobre-mi', id: 'sobre-mi' },
    { label: t('nav.contact'), href: '#contacto', id: 'contacto' },
  ];

  const go = (event, id) => {
    setOpen(false);
    onNavClick(event, id);
  };

  return (
    <nav className={`site-nav ${open ? 'is-open' : ''}`}>
      <a className="site-nav__brand" href="#portfolio" onClick={(event) => go(event, 'portfolio')}>
        <img
          className="site-nav__logo"
          src={`${import.meta.env.BASE_URL}logo-clareny-white.png`}
          alt=""
        />
        CLARENY
      </a>

      <div className="site-nav__links" id="site-nav-links">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className={activeSection === link.id ? 'is-active' : undefined}
            aria-current={activeSection === link.id ? 'page' : undefined}
            onClick={(event) => go(event, link.id)}
          >
            {link.label}
          </a>
        ))}
        <a className="site-nav__talk site-nav__talk--menu" href="#contacto" onClick={(event) => go(event, 'contacto')}>
          {t('nav.talk')}
        </a>
      </div>

      <div className="site-nav__end">
        <div className="lang-switch" role="group" aria-label={t('nav.lang')}>
          <button
            type="button"
            className={`lang-switch__btn ${language === 'es' ? 'is-active' : ''}`}
            onClick={() => setLanguage('es')}
            aria-pressed={language === 'es'}
          >
            ES
          </button>
          <span className="lang-switch__slash" aria-hidden="true">/</span>
          <button
            type="button"
            className={`lang-switch__btn ${language === 'en' ? 'is-active' : ''}`}
            onClick={() => setLanguage('en')}
            aria-pressed={language === 'en'}
          >
            EN
          </button>
        </div>
        <a className="site-nav__talk" href="#contacto" onClick={(event) => go(event, 'contacto')}>
          {t('nav.talk')}
          <svg viewBox="0 0 18 18" aria-hidden="true">
            <path d="M5 13 13 5M7.2 5H13v5.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <button
          type="button"
          className="site-nav__menu"
          aria-expanded={open}
          aria-controls="site-nav-links"
          aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
