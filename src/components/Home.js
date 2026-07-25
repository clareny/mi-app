const spotifyEmbeds = [
  {
    title: 'Album principal',
    src: 'https://open.spotify.com/embed/album/5vMJPhQN90lnUIwozXoY5s?utm_source=generator&si=7dcaa506bb744441',
    height: 152,
    compact: true,
  },
  {
    title: 'Perfil de artista',
    src: 'https://open.spotify.com/embed/artist/1kS2GOJRVZeWbgeuNrdpaE?utm_source=generator&si=9bbd7f8fc9a4478f',
    height: 152,
    compact: true,
  },
  {
    title: 'Track 1',
    src: 'https://open.spotify.com/embed/track/1FzwjIJtUwq1ocVNncQxAQ?utm_source=generator&si=47c26abea41441ce',
    height: 152,
    compact: true,
  },
  {
    title: 'Track 2',
    src: 'https://open.spotify.com/embed/track/4lxg4xDUZHzoN3hLBwnnPd?utm_source=generator&si=871f72d62a13460b',
    height: 152,
    compact: true,
  },
  {
    title: 'Track 3',
    src: 'https://open.spotify.com/embed/track/7oebyDcVPIl5Gucgvx2hRE?utm_source=generator&si=3daaf1feca944b74',
    height: 152,
    compact: true,
  },
];

function SpotifyEmbed({ title, src, height, compact }) {
  return (
    <div className={`spotify-card ${compact ? 'spotify-card--compact' : ''}`}>
      <iframe
        title={title}
        style={{ borderRadius: '12px' }}
        src={src}
        width="100%"
        height={height}
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
}

export default function Home() {
  return (
    <section id="home" className="hero-section" >
      
      <h1>¿Por donde empezamos?</h1>
      <p className="intro">
        Marca tu identidad no trates de imitar algo.
      </p>

      <div className="hero-actions">
        <a className="btn btn-primary btn-large" href="#services">Enfoque de mezcla</a>
        <a className="btn btn-secondary btn-large" href="#services">Enfoque beats</a>
      </div>

      <div className="portfolio-block">
        <div className="portfolio-header">
          <div>
            <h3>Mi portfolio</h3>
            <p>Escuchá referencias reales de mi trabajo, mis beats y mis canciones.</p>
          </div>
          <a className="portfolio-link" href="#contact">Contactar</a>
        </div>

        <div className="portfolio-tiles">
          <div className="portfolio-tile">
            <h4>Spotify</h4>
            <p>Reproducciones y referencias musicales.</p>
          </div>
          <div className="portfolio-tile">
            <h4>Beats</h4>
            <p>Producción y desarrollo de ideas sonoras.</p>
          </div>
          <div className="portfolio-tile">
            <h4>Mezcla</h4>
            <p>Detalle, claridad y presencia en cada track.</p>
          </div>
        </div>

        <div className="portfolio-links">
          <a href="https://open.spotify.com/artist/1kS2GOJRVZeWbgeuNrdpaE" target="_blank" rel="noreferrer">Spotify</a>
          <a href="https://www.youtube.com/c/clareny" target="_blank" rel="noreferrer">YouTube</a>
          <a href="https://www.youtube.com/@clarenyonthetrack" target="_blank" rel="noreferrer">Beats</a>
          <a href="https://www.instagram.com/clarenymusic" target="_blank" rel="noreferrer">Instagram</a>
        </div>

        <div className="spotify-stack">
          {spotifyEmbeds.map((item) => (
            <SpotifyEmbed key={item.src} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
