import { useCallback, useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const RESULTADO_LIMIT_MS = (2 * 60 + 7) * 1000;
const BARS = [
  6, 49, 33, 28, 41, 9, 28, 18, 11, 8, 7, 18,
  21, 18, 39, 15, 42, 41, 22, 52, 19, 40, 37, 15,
  33, 14, 16, 11, 7, 16, 14, 23, 33, 11, 46, 28,
  36, 49, 9, 48, 29, 27, 35, 7, 22, 12, 7, 12,
  8, 25, 25, 22, 44, 13, 45, 40, 25, 50, 16, 38,
  32, 15, 26, 10, 10, 8, 9, 24, 16, 29, 37, 14, 49, 27, 38,
];

function loadSoundCloudApi() {
  if (window.SC?.Widget) return Promise.resolve(window.SC);

  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-sc-widget]');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.SC), { once: true });
      existing.addEventListener('error', reject, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://w.soundcloud.com/player/api.js';
    script.async = true;
    script.dataset.scWidget = 'true';
    script.onload = () => resolve(window.SC);
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

function formatTime(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = String(total % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function HeadphonesIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path
        d="M3.2 9.2V8.4a5.8 5.8 0 0 1 11.6 0v.8M3.2 9.2v4.2a1.3 1.3 0 0 0 1.3 1.3h.7V9.2H3.2Zm11.6 0v4.2a1.3 1.3 0 0 1-1.3 1.3h-.7V9.2h2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MixCard({ clip, accent, claim, registerPause }) {
  const { t } = useLanguage();
  const frameRef = useRef(null);
  const widgetRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  const span = clip.limit ? Math.min(duration || clip.limit, clip.limit) : duration;
  const ratio = span ? Math.min(1, position / span) : 0;
  const played = Math.round(ratio * BARS.length);
  const hotUntil = !playing && position === 0 && accent ? 12 : played;

  useEffect(() => {
    let cancelled = false;

    const bind = async () => {
      const SC = await loadSoundCloudApi();
      if (cancelled || !frameRef.current || !SC?.Widget) return;

      const widget = SC.Widget(frameRef.current);
      widgetRef.current = widget;

      widget.bind(SC.Widget.Events.READY, () => {
        widget.getDuration((ms) => {
          if (!cancelled) setDuration(ms || 0);
        });
      });
      widget.bind(SC.Widget.Events.PLAY, () => {
        claim(clip.id);
        if (!cancelled) setPlaying(true);
      });
      widget.bind(SC.Widget.Events.PAUSE, () => {
        if (!cancelled) setPlaying(false);
      });
      widget.bind(SC.Widget.Events.FINISH, () => {
        if (cancelled) return;
        setPlaying(false);
        setPosition(0);
      });
      widget.bind(SC.Widget.Events.PLAY_PROGRESS, (data) => {
        const next = data.currentPosition || 0;
        if (clip.limit && next >= clip.limit) {
          widget.pause();
          widget.seekTo(clip.limit);
          if (!cancelled) {
            setPosition(clip.limit);
            setPlaying(false);
          }
          return;
        }
        if (!cancelled) setPosition(next);
      });
    };

    bind();
    registerPause(clip.id, () => widgetRef.current?.pause());

    return () => {
      cancelled = true;
    };
  }, [claim, clip.id, clip.limit, registerPause]);

  const toggle = () => {
    const widget = widgetRef.current;
    if (!widget) return;
    if (playing) {
      widget.pause();
      return;
    }
    claim(clip.id);
    if (clip.limit && position >= clip.limit) {
      widget.seekTo(0);
      setPosition(0);
    }
    widget.play();
  };

  const seek = (event) => {
    const widget = widgetRef.current;
    if (!widget || !span) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nextRatio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    claim(clip.id);
    widget.seekTo(Math.round(span * nextRatio));
    widget.play();
  };

  return (
    <article className={`mix-card ${accent ? 'mix-card--after' : ''}`}>
      <div className="mix-card__top">
        <p>{clip.label}</p>
        <HeadphonesIcon />
      </div>
      <div className="mix-card__title">
        <h3>{clip.title}</h3>
        <p>{clip.caption}</p>
      </div>
      <div className="mix-card__playrow">
        <button type="button" className="mix-card__play" onClick={toggle} aria-label={playing ? t('mix.pause') : t('mix.play')}>
          {playing ? (
            <svg viewBox="0 0 18 18" aria-hidden="true">
              <path d="M6 4.2h2.1v9.6H6V4.2Zm3.9 0H12v9.6H9.9V4.2Z" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 18 18" aria-hidden="true">
              <path d="M6.4 4.2v9.6l7.4-4.8-7.4-4.8Z" fill="currentColor" />
            </svg>
          )}
        </button>
        <button type="button" className="mix-card__wave" onClick={seek} aria-label={t('mix.play')}>
          {BARS.map((height, index) => (
            <span key={`${height}-${index}`} className={index < hotUntil ? 'is-hot' : undefined} style={{ height: `${height}px` }} />
          ))}
        </button>
      </div>
      <div className="mix-card__foot">
        <span>{formatTime(position)}</span>
        <a href={clip.href} target="_blank" rel="noopener noreferrer">
          {t('mix.listen')} ↗
        </a>
      </div>
      <div className="mix-sc__engine">
        <iframe
          ref={frameRef}
          title={clip.title}
          scrolling="no"
          frameBorder="no"
          allow="autoplay; encrypted-media"
          src={clip.src}
        />
      </div>
    </article>
  );
}

export default function MixCompare() {
  const { t } = useLanguage();
  const pauses = useRef(new Map());

  const claim = useCallback((id) => {
    pauses.current.forEach((pause, key) => {
      if (key !== id) pause();
    });
  }, []);

  const registerPause = useCallback((id, pause) => {
    pauses.current.set(id, pause);
  }, []);

  const clips = [
    {
      id: 'antes',
      label: t('mix.before'),
      caption: t('mix.beforeCap'),
      title: t('mix.beforeTitle'),
      href: 'https://soundcloud.com/clarenymusic/maqueta/s-wD5zXGeNnjz',
      src: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%3Atracks%3A2398921599%3Fsecret_token%3Ds-wD5zXGeNnjz&color=%231cdadd&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false',
    },
    {
      id: 'despues',
      label: t('mix.after'),
      caption: t('mix.afterCap'),
      title: t('mix.afterTitle'),
      href: 'https://soundcloud.com/clarenymusic/resultado',
      limit: RESULTADO_LIMIT_MS,
      src: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2398922043&color=%231cdadd&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false',
    },
  ];

  return (
    <div className="mix-compare">
      <div className="mix-compare__list">
        {clips.map((clip) => (
          <MixCard
            key={clip.id}
            clip={clip}
            accent={clip.id === 'despues'}
            claim={claim}
            registerPause={registerPause}
          />
        ))}
      </div>
    </div>
  );
}
