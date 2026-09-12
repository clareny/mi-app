import { useEffect, useRef } from 'react';

const RESULTADO_LIMIT_MS = (2 * 60 + 7) * 1000;

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

export default function MixCompare() {
  const resultadoRef = useRef(null);

  const clips = [
    {
      id: 'antes',
      label: 'Antes',
      caption: 'Maqueta · idea original',
      title: 'MAQUETA',
      href: 'https://soundcloud.com/clarenymusic/maqueta/s-wD5zXGeNnjz',
      src: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%3Atracks%3A2398921599%3Fsecret_token%3Ds-wD5zXGeNnjz&color=%23a65ee3&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false',
    },
    {
      id: 'despues',
      label: 'Después',
      caption: 'Remake + voces mezcladas · hasta 2:07',
      title: 'RESULTADO',
      href: 'https://soundcloud.com/clarenymusic/resultado',
      src: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2398922043&color=%2325cfde&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false',
    },
  ];

  useEffect(() => {
    let widget;
    let cancelled = false;

    const bindLimit = async () => {
      if (!resultadoRef.current) return;
      const SC = await loadSoundCloudApi();
      if (cancelled || !SC?.Widget) return;

      widget = SC.Widget(resultadoRef.current);
      widget.bind(SC.Widget.Events.PLAY_PROGRESS, (data) => {
        if (data.currentPosition >= RESULTADO_LIMIT_MS) {
          widget.pause();
          widget.seekTo(RESULTADO_LIMIT_MS);
        }
      });
    };

    bindLimit();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mix-compare">
      <div className="mix-compare__header">
        <p className="eyebrow">Producción</p>
        <h3>Antes y después</h3>
        <p>Remake del beat y mezcla de las voces.</p>
      </div>

      <div className="mix-compare__list">
        {clips.map((clip) => (
          <article key={clip.id} className={`mix-sc mix-sc--${clip.id}`}>
            <div className="mix-sc__meta">
              <strong>{clip.label}</strong>
              <a href={clip.href} target="_blank" rel="noreferrer">{clip.caption}</a>
            </div>
            <iframe
              ref={clip.id === 'despues' ? resultadoRef : undefined}
              title={clip.title}
              width="100%"
              height="80"
              scrolling="no"
              frameBorder="no"
              allow="autoplay; encrypted-media"
              src={clip.src}
            />
          </article>
        ))}
      </div>
    </div>
  );
}
