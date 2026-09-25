import { useLanguage } from '../contexts/LanguageContext';
import GoogleReviews from './GoogleReviews';
import MixCompare from './MixCompare';

const PLAYLIST_EMBED =
  'https://open.spotify.com/embed/playlist/0kHxXnOwz121HvCttid3Qt?utm_source=generator&si=59ab99aafb3245dd';

export default function Home({ onNavClick = () => {} }) {
  const { t } = useLanguage();

  return (
    <section id="home" className="hero-section">
      <div className="home-top home-pitch-panel">
        <p className="home-pitch">
          {t('home.pitchBefore')}
          <a
            className="home-pitch__link home-pitch__link--remake"
            href="#servicios"
            onClick={(event) => {
              onNavClick(event, 'servicios');
              window.dispatchEvent(new CustomEvent('clareny-service-tab', { detail: 'beats' }));
            }}
            aria-label={t('home.remakeAria')}
          >
            {t('home.pitchRemake')}
          </a>
          {t('home.pitchMid')}
          <a
            className="home-pitch__link home-pitch__link--mix"
            href="#servicios"
            onClick={(event) => {
              onNavClick(event, 'servicios');
              window.dispatchEvent(new CustomEvent('clareny-service-tab', { detail: 'vocal' }));
            }}
            aria-label={t('home.mixAria')}
          >
            {t('home.pitchMix')}
          </a>
        </p>
      </div>

      <div className="portfolio-block regular-portfolio">
        <div className="playlist-embed">
          <iframe
            data-testid="embed-iframe"
            title="Playlist Clareny"
            src={PLAYLIST_EMBED}
            width="100%"
            height="152"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ borderRadius: '12px' }}
          />
        </div>

        <MixCompare />
        <GoogleReviews />
      </div>
    </section>
  );
}
