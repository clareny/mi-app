import { useRef } from 'react';

export default function About() {
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
      <h2 className="section-title">Clareny</h2>

      <div className="about-showcase">
        <div className="about-visual">
          <img src={`${basePath}/fotoclarenyabout.jpg`} alt="Clareny" className="about-photo" />
        </div>

        <div className="about-copy-wrap">
          <p className="about-copy about-copy--3">
            Hola, soy Clareny. Me gusta trabajar en ideas profundas, con una intención clara y un sonido que conecte más allá de lo superficial.
            Llevo años acompañando artistas y proyectos con una mirada creativa y técnica, cuidando cada detalle para que la música se sienta auténtica, clara y memorable.
            Me interesa transformar ideas en experiencias sonoras con identidad propia, con sensibilidad, rigor y una visión más grande que el simple resultado final.
          </p>

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
                rel="noreferrer"
                className="bio-social"
                aria-label={link.label}
                data-label={link.label}
              >
                <span className="bio-social__ring" aria-hidden="true" />
                <img src={`${basePath}/icons/${link.icon}`} alt="" className="bio-social__icon" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
