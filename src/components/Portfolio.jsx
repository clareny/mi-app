import { useCallback, useEffect, useRef, useState } from 'react';
import MixCompare from './MixCompare';

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

const wrapIndex = (index, total = discographyItems.length) => ((index % total) + total) % total;

function NoteFace({ track, withPlayer = false, activeIndex = 0, overlay = null }) {
  return (
    <>
      <div className="note-bind" aria-hidden="true">
        <span className="note-bind__dots" />
        <span className="note-bind__title">{track.title}</span>
      </div>
      {withPlayer ? (
        <div className="spotify-embed-shell">
          <iframe
            key={`${track.title}-${activeIndex}`}
            title={track.title}
            src={track.embedUrl}
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ borderRadius: '12px', display: 'block' }}
          />
          {overlay}
        </div>
      ) : (
        <div className="note-preview" style={{ background: track.cover }}>
          <strong>{track.title}</strong>
          <span>{track.artist}</span>
        </div>
      )}
    </>
  );
}

export default function Home({ onNavClick = () => {} }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [motion, setMotion] = useState(null);
  const [hintOn, setHintOn] = useState(true);
  const lockRef = useRef(false);
  const touchRef = useRef({ x: 0, y: 0 });
  const scrollZoneRef = useRef(null);
  const idleTimerRef = useRef(0);

  const activeTrack = discographyItems[activeIndex];
  const nextTrack = discographyItems[wrapIndex(activeIndex + 1)];
  const prevTrack = discographyItems[wrapIndex(activeIndex - 1)];
  const stackedTrack = discographyItems[wrapIndex(activeIndex + 2)];

  const hideHint = useCallback(() => {
    setHintOn(false);
    window.clearTimeout(idleTimerRef.current);
    idleTimerRef.current = window.setTimeout(() => setHintOn(true), 1200);
  }, []);

  const moveTrack = useCallback((direction) => {
    if (lockRef.current || !direction) return;
    lockRef.current = true;
    hideHint();
    setMotion(direction > 0 ? 'next' : 'prev');

    window.setTimeout(() => {
      setActiveIndex((current) => wrapIndex(current + direction));
      setMotion(null);
      lockRef.current = false;
    }, 560);
  }, [hideHint]);

  useEffect(() => () => window.clearTimeout(idleTimerRef.current), []);

  useEffect(() => {
    const zone = scrollZoneRef.current;
    if (!zone) return undefined;

    const onWheel = (event) => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      event.preventDefault();
      event.stopPropagation();
      hideHint();
      if (Math.abs(event.deltaY) < 16) return;
      moveTrack(event.deltaY < 0 ? 1 : -1);
    };

    zone.addEventListener('wheel', onWheel, { passive: false });
    return () => zone.removeEventListener('wheel', onWheel);
  }, [activeIndex, hideHint, moveTrack]);

  const onTouchStart = (event) => {
    const touch = event.changedTouches[0];
    touchRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event) => {
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchRef.current.x;
    const dy = touchRef.current.y - touch.clientY;
    if (Math.abs(dy) < 28 || Math.abs(dy) < Math.abs(dx)) return;
    event.preventDefault();
    event.stopPropagation();
    moveTrack(dy > 0 ? 1 : -1);
  };

  return (
    <section id="home" className="hero-section">
      <div className="home-top">
        <a
          className="hire-line notranslate"
          href="#servicios"
          translate="no"
          onClick={(event) => onNavClick(event, 'servicios')}
          aria-label="Ir a servicios: contratá un beat, una mezcla o una canción"
        >
          <span className="hire-line__lead" />
          <span className="hire-line__cycle">
            <span className="hire-line__word hire-line__word--beat" />
            <span className="hire-line__word hire-line__word--mix" />
            <span className="hire-line__word hire-line__word--song" />
          </span>
        </a>
      </div>

      <div className="portfolio-block regular-portfolio">
        <div className={`note-deck ${motion ? `note-deck--${motion}` : ''}`}>
          <div className="note-sheet note-sheet--depth-2" aria-hidden="true">
            <NoteFace track={stackedTrack} />
          </div>
          <div className="note-sheet note-sheet--depth-1" aria-hidden="true">
            <NoteFace track={nextTrack} />
          </div>
          <div className="note-sheet note-sheet--under" aria-hidden="true">
            <NoteFace track={nextTrack} />
          </div>

          {motion === 'prev' && (
            <div className="note-sheet note-sheet--incoming">
              <NoteFace track={prevTrack} />
            </div>
          )}

          <div className={`note-sheet note-sheet--front ${motion === 'next' ? 'is-peeling' : ''}`}>
            <NoteFace
              track={activeTrack}
              withPlayer
              activeIndex={activeIndex}
              overlay={(
                <>
                  <div className={`note-scroll-mark ${hintOn ? 'is-hinting' : ''}`} aria-hidden="true">
                    <span className="note-scroll-mark__chevron note-scroll-mark__chevron--up" />
                    <span className="note-scroll-mark__wheel">
                      <i />
                    </span>
                    <span className="note-scroll-mark__chevron note-scroll-mark__chevron--down" />
                  </div>
                  <div
                    ref={scrollZoneRef}
                    className="note-scroll-zone"
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                    aria-label="Scrolleá o deslizá sobre la canción para cambiar de tema"
                  />
                </>
              )}
            />
          </div>
        </div>

        <MixCompare />
      </div>
    </section>
  );
}
