import { useLanguage } from '../contexts/LanguageContext';
import GoogleReviews from './GoogleReviews';
import MixCompare from './MixCompare';

const PLAYLIST_URL = 'https://open.spotify.com/playlist/0kHxXnOwz121HvCttid3Qt';
const SPOTIFY_ARTIST = 'https://open.spotify.com/artist/1kS2GOJRVZeWbgeuNrdpaE';

function PlayIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true" className="sound-btn__icon">
      <path d="M6.2 4.4v9.2l8-4.6-8-4.6Z" fill="currentColor" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true" className="sound-btn__icon">
      <path
        d="M5 13 13 5M7.2 5H13v5.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home({ onNavClick = () => {} }) {
  const { t } = useLanguage();
  const basePath = import.meta.env.BASE_URL;

  const openService = (event, tab) => {
    onNavClick(event, 'servicios');
    window.dispatchEvent(new CustomEvent('clareny-service-tab', { detail: tab }));
  };

  return (
    <section id="home" className="hero-section">
      <div className="sound-hero">
        <div className="sound-hero__meta">
          <p>{t('home.role')}</p>
          <p>{t('home.place')}</p>
        </div>

        <div className="sound-hero__stage">
          <div className="sound-hero__copy">
            <h1>
              <span>{t('home.line1')}</span>
              <span>{t('home.line2')}</span>
            </h1>
            <p className="sound-hero__lead">{t('home.lead')}</p>
            <div className="sound-hero__actions">
              <a className="sound-btn sound-btn--primary" href="#playlist">
                {t('home.listen')}
                <PlayIcon />
              </a>
              <a
                className="sound-btn sound-btn--ghost"
                href="#contacto"
                onClick={(event) => onNavClick(event, 'contacto')}
              >
                {t('home.create')}
                <ArrowIcon />
              </a>
            </div>
          </div>

          <aside className="sound-card">
            <p className="sound-card__live">
              <span className="sound-card__dot" aria-hidden="true" />
              {t('home.onTrack')}
            </p>
            <p className="sound-card__title">
              <span>{t('home.identity1')}</span>
              <span>{t('home.identity2')}</span>
              <span>{t('home.identity3')}</span>
            </p>
            <a
              className="sound-card__code"
              href={SPOTIFY_ARTIST}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={`${basePath}spotify-code-white.png`} alt={t('home.spotifyCode')} />
            </a>
            <p className="sound-card__credits">
              <span>{t('home.credits')}</span>
              <span>{t('home.ceo')}</span>
            </p>
          </aside>
        </div>

        <div className="sound-hero__note">
          <p className="sound-hero__question">{t('home.question')}</p>
          <p className="sound-hero__answer">
            {t('home.answerBefore')}
            <a
              href="#servicios"
              onClick={(event) => openService(event, 'beats')}
              aria-label={t('home.remakeAria')}
            >
              {t('home.answerRemake')}
            </a>
            {t('home.answerMid')}
            <a
              href="#servicios"
              onClick={(event) => openService(event, 'vocal')}
              aria-label={t('home.mixAria')}
            >
              {t('home.answerMix')}
            </a>
            {t('home.answerAfter')}
          </p>
          <a className="sound-hero__down" href="#playlist" aria-label={t('home.listen')}>
            <svg viewBox="0 0 18 18" aria-hidden="true">
              <path
                d="M9 3.5v11M4.5 10.2 9 14.5l4.5-4.3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <div className="sound-strip">
          <p>{t('home.genres')}</p>
          <p>{t('home.modes')}</p>
        </div>
      </div>

      <section className="results-block" id="playlist">
        <header className="ed-head">
          <div>
            <p className="ed-kicker">{t('home.resultsKicker')}</p>
            <h2>{t('home.resultsTitle')}</h2>
          </div>
          <p>{t('home.resultsCopy')}</p>
        </header>
        <div className="playlist-stage">
          <div className="playlist-stamp">
            <span>{t('home.playlistStamp')}</span>
            <strong>CLARENY</strong>
            <p>
              <span>{t('home.playlistKind')}</span>
              <i aria-hidden="true" />
            </p>
          </div>
          <div className="playlist-copy">
            <p className="ed-kicker">{t('home.playlistKicker')}</p>
            <h3>
              <span>{t('home.playlistTitle1')}</span>
              <span>{t('home.playlistTitle2')}</span>
            </h3>
            <p>{t('home.playlistCopy')}</p>
            <div className="playlist-listen">
              <a
                className="playlist-play"
                href={PLAYLIST_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('home.listenSpotify')}
              >
                <PlayIcon />
              </a>
              <a href={PLAYLIST_URL} target="_blank" rel="noopener noreferrer">
                {t('home.listenSpotify')} ↗
              </a>
            </div>
          </div>
          <div className="playlist-side">
            <a className="playlist-open" href={PLAYLIST_URL} target="_blank" rel="noopener noreferrer">
              {t('home.openPlaylist')}
              <ArrowIcon />
            </a>
            <p>{t('home.playlistNote')}</p>
          </div>
        </div>
      </section>

      <section className="mix-block">
        <header className="ed-head">
          <div>
            <p className="ed-kicker">{t('home.mixKicker')}</p>
            <h2>{t('home.mixTitle')}</h2>
          </div>
          <p>{t('home.mixCopy')}</p>
        </header>
        <MixCompare />
        <p className="mix-hint">{t('home.mixHint')}</p>
        <GoogleReviews />
      </section>
    </section>
  );
}
