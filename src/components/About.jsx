import { useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  const basePath = import.meta.env.BASE_URL;
  const socialsRef = useRef(null);

  const socialLinks = [
    { label: 'Facebook', url: 'https://www.facebook.com/clarenymusic/', icon: 'facebook.svg' },
    { label: 'Instagram', url: 'https://www.instagram.com/clarenymusic', icon: 'instagram.svg' },
    { label: 'TikTok', url: 'https://www.tiktok.com/@clarenymusic', icon: 'tiktok.svg' },
    { label: 'YouTube', url: 'https://www.youtube.com/c/clareny', icon: 'youtube.svg' },
    { label: 'Beats YouTube', url: 'https://www.youtube.com/@clarenyonthetrack', icon: 'youtubemusic.svg' },
    { label: 'Spotify', url: 'https://open.spotify.com/artist/1kS2GOJRVZeWbgeuNrdpaE', icon: 'spotify.svg' },
  ];

  const credits = [
    'Red21',
    'Easy Mo',
    'Snokblaze',
    'Bment',
    'Darkxox',
    'BA',
    'Miserable',
    'Laika',
    'Parimyos',
    'Kodsay',
    'Antian rose',
    'elie',
  ];

  const resetSocialMotion = () => {
    const icons = socialsRef.current?.querySelectorAll('.bio-social');
    icons?.forEach((icon) => {
      icon.style.transform = '';
    });
  };

  const handleSocialMove = (event) => {
    const icons = socialsRef.current?.querySelectorAll('.bio-social');
    if (!icons?.length) return;

    icons.forEach((icon) => {
      const rect = icon.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const distance = Math.hypot(dx, dy);
      const influence = Math.max(0, 1 - distance / 88);
      const lift = influence * 7;
      const scale = 1 + influence * 0.08;
      icon.style.transform = `translateY(${-lift}px) scale(${scale})`;
    });
  };

  return (
    <section id="about" className="about-section">
      <header className="about-head">
        <p className="about-kicker">{t('about.kicker')}</p>
        <h2 className="section-title">Clareny</h2>
        <p className="about-role">{t('about.role')}</p>
      </header>

      <div className="about-showcase">
        <div className="about-visual">
          <img src={`${basePath}fotoclarenyabout.jpg`} alt="Clareny, productor e ingeniero de mezcla" className="about-photo" />
        </div>

        <div className="about-copy-wrap">
          <p className="about-copy">{t('about.p1')}</p>
          <p className="about-copy">{t('about.p2')}</p>
          <p className="about-copy about-copy--line">{t('about.p3')}</p>
          <p className="about-credits-label">{t('about.credits')}</p>
          <ul className="about-roster">
            {credits.map((name) => (
              <li key={name} className="about-credit">{name}</li>
            ))}
          </ul>

          <div
            className="bio-socials"
            aria-label="Redes sociales"
            ref={socialsRef}
            onMouseMove={handleSocialMove}
            onMouseLeave={resetSocialMotion}
          >
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bio-social"
                aria-label={link.label}
                data-label={link.label}
                style={{ '--bio-icon': `url("${basePath}icons/${link.icon}")` }}
              >
                <span className="bio-social__ring" aria-hidden="true" />
                <img src={`${basePath}icons/${link.icon}`} alt="" className="bio-social__icon" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
