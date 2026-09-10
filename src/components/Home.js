import { useMemo, useState } from 'react';

const discographyItems = [
  {
    title: 'NOKIA',
    artist: 'Clareny',
    cover: 'linear-gradient(135deg, rgba(13, 75, 80, 0.92), rgba(37, 117, 133, 0.82), rgba(9, 12, 20, 0.88))',
    spotifyUrl: 'https://open.spotify.com/track/6TZy5Wa9sz2bpZD0PmPOAP',
    embedUrl: 'https://open.spotify.com/embed/track/6TZy5Wa9sz2bpZD0PmPOAP?utm_source=generator&si=87abfe7172df490d',
  },
  {
    title: 'UNHAPPY',
    artist: 'Clareny',
    cover: 'linear-gradient(135deg, rgba(32, 32, 32, 1), rgba(94, 94, 94, 0.86), rgba(17, 17, 17, 0.94))',
    spotifyUrl: 'https://open.spotify.com/track/228rNWpp6djyqw5LPkK7Vc',
    embedUrl: 'https://open.spotify.com/embed/track/228rNWpp6djyqw5LPkK7Vc?utm_source=generator&theme=0&si=5eaa3afc56084d64',
  },
  {
    title: 'JAIA SON WBDS',
    artist: 'Clareny, Bment',
    cover: 'linear-gradient(135deg, rgba(39, 39, 39, 1), rgba(108, 108, 108, 0.9), rgba(14, 14, 14, 0.88))',
    spotifyUrl: 'https://open.spotify.com/track/4lxg4xDUZHzoN3hLBwnnPd',
    embedUrl: 'https://open.spotify.com/embed/track/4lxg4xDUZHzoN3hLBwnnPd?utm_source=generator&si=1d78968b9cf544a5',
  },
  {
    title: 'BABYGIRL',
    artist: 'Easy Mo, Clareny, kodsay',
    cover: 'linear-gradient(135deg, rgba(156, 74, 132, 1), rgba(107, 58, 118, 0.94), rgba(28, 12, 28, 0.92))',
    spotifyUrl: 'https://open.spotify.com/album/7eXyJAT0uk4gSSiCEoP3at',
    embedUrl: 'https://open.spotify.com/embed/album/7eXyJAT0uk4gSSiCEoP3at?utm_source=generator&theme=0&si=45e10ba002f04f88',
  },
  {
    title: 'PQMC',
    artist: 'Red 21',
    cover: 'linear-gradient(135deg, rgba(177, 28, 26, 0.96), rgba(98, 11, 11, 0.92), rgba(28, 5, 5, 0.96))',
    spotifyUrl: 'https://open.spotify.com/album/3U2j60f0viLvsVlGPNUFi2',
    embedUrl: 'https://open.spotify.com/embed/album/3U2j60f0viLvsVlGPNUFi2?utm_source=generator&theme=0&si=82b96d50425d4ca9',
  },
  {
    title: 'LUCY',
    artist: 'Clareny',
    cover: 'linear-gradient(135deg, rgba(29, 36, 58, 1), rgba(52, 79, 104, 0.8), rgba(10, 10, 16, 0.94))',
    spotifyUrl: 'https://open.spotify.com/track/7oebyDcVPIl5Gucgvx2hRE',
    embedUrl: 'https://open.spotify.com/embed/track/7oebyDcVPIl5Gucgvx2hRE?utm_source=generator&theme=0&si=35ca133be6624743',
  },
  {
    title: 'HONEY',
    artist: 'Clareny',
    cover: 'linear-gradient(135deg, rgba(120, 38, 58, 1), rgba(231, 107, 112, 0.9), rgba(39, 12, 20, 0.94))',
    spotifyUrl: 'https://open.spotify.com/track/1JLkS0IisitvLtqB8fJgkq',
    embedUrl: 'https://open.spotify.com/embed/track/1JLkS0IisitvLtqB8fJgkq?utm_source=generator&si=ef8d11b7edcd4fc8',
  },
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeTrack = useMemo(() => discographyItems[activeIndex], [activeIndex]);

  const moveTrack = (direction) => {
    setActiveIndex((prev) => {
      const total = discographyItems.length;
      return (prev + direction + total) % total;
    });
  };

  return (
    <section id="home" className="hero-section">
      <div className="home-top">
        <div className="home-brand-block">
          <h1>EMPECEMOS...</h1>
        </div>

        <div className="hero-actions" aria-label="Acciones principales">
          <a className="pill-btn pill-btn--primary" href="#services">contratar mezcla</a>
          <a className="pill-btn pill-btn--secondary" href="#services">contratar beats</a>
        </div>
      </div>

      <p className="intro">
        Diseña tu sonido...
      </p>

      <div className="portfolio-block regular-portfolio">
        <div className="portfolio-header">
          <div>
            <h3>Discography</h3>
          </div>
          <a className="portfolio-link" href="#contact">Contactar</a>
        </div>

        <div className="arcade-player arcade-player--normal">
          <button type="button" className="slider-arrow" onClick={() => moveTrack(-1)} aria-label="Tema anterior">
            ‹
          </button>

          <div className="spotify-embed-shell">
            <iframe
              key={`${activeTrack.title}-${activeIndex}`}
              title={activeTrack.title}
              src={activeTrack.embedUrl}
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ borderRadius: '12px', display: 'block' }}
            />
          </div>

          <button type="button" className="slider-arrow" onClick={() => moveTrack(1)} aria-label="Tema siguiente">
            ›
          </button>
        </div>

      </div>
    </section>
  );
}
