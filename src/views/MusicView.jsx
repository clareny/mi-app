import GoogleReviews from '../components/GoogleReviews';
import MixCompare from '../components/MixCompare';
import { useLanguage } from '../contexts/LanguageContext';
import { CREDITS } from '../data/credits';
import { PLAYLIST_URL } from '../data/links';
import { GOOGLE_WRITE_URL } from '../data/googleReviews';
import { routeHref } from '../hooks/useHashRoute';
import WorldView from './WorldView';

const PLAYLIST_EMBED = `${PLAYLIST_URL.replace('open.spotify.com/', 'open.spotify.com/embed/')}?utm_source=generator`;

export default function MusicView() {
  const { t } = useLanguage();

  return (
    <WorldView id="musica">
      {/* 01 · Playlist */}
      <section className="music-block">
        <header className="music-block__head">
          <p className="kicker text-iris">{t('home.resultsKicker')}</p>
          <h2>{t('home.resultsTitle')}</h2>
          <p>{t('home.playlistCopy')}</p>
        </header>
        <div className="playlist-embed">
          <iframe
            title={t('site.music.spotifyEmbed')}
            src={PLAYLIST_EMBED}
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </div>
        <a className="pill-link" href={PLAYLIST_URL} target="_blank" rel="noopener noreferrer">
          {t('home.openPlaylist')} ↗
        </a>
      </section>

      {/* 02 · Antes / después */}
      <section className="music-block">
        <header className="music-block__head">
          <p className="kicker text-iris">{t('home.mixKicker')}</p>
          <h2>{t('home.mixTitle')}</h2>
          <p>{t('home.mixCopy')}</p>
        </header>
        <MixCompare />
        <p className="fine-print">{t('home.mixHint')}</p>
      </section>

      {/* 03 · Artistas */}
      <section className="music-block">
        <header className="music-block__head">
          <p className="kicker text-iris">{t('about.credits')}</p>
        </header>
        <ul className="credits text-iris">
          {CREDITS.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </section>

      {/* 04 · Reseñas (solo aparecen si hay reseñas de Google) */}
      <section className="music-block music-block--reviews">
        <GoogleReviews />
        <a className="fine-print" href={GOOGLE_WRITE_URL} target="_blank" rel="noopener noreferrer">
          {t('reviews.write')} ↗
        </a>
      </section>

      <a className="world-next" href={routeHref('servicios')}>
        <span>{t('site.music.ctaTitle')}</span>
        <strong>
          {t('site.music.ctaBtn')} <span aria-hidden="true">→</span>
        </strong>
      </a>
    </WorldView>
  );
}
