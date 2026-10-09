import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { cardVariants, HireCta, itemVariants, listVariants, waLink } from './planKit';

const DISCORD_PATH =
  'M19.27 5.33A17.2 17.2 0 0 0 15.07 4c-.18.32-.39.76-.53 1.1a16.1 16.1 0 0 0-5.08 0A10 10 0 0 0 8.93 4a17.3 17.3 0 0 0-4.22 1.34C1.78 9.05 1.17 12.66 1.48 16.22A17.4 17.4 0 0 0 6.9 18.5c.36-.49.68-1.01.96-1.56-.53-.2-1.04-.44-1.52-.72.13-.1.25-.2.37-.3 2.92 1.36 6.08 1.36 8.97 0 .12.1.24.2.37.3-.48.28-.99.52-1.52.72.28.55.6 1.07.96 1.56a17.3 17.3 0 0 0 5.42-2.28c.37-4.14-.63-7.72-2.64-10.89ZM8.68 14.33c-.88 0-1.6-.82-1.6-1.82s.71-1.82 1.6-1.82 1.61.82 1.61 1.82-.72 1.82-1.61 1.82Zm6.64 0c-.88 0-1.6-.82-1.6-1.82s.71-1.82 1.6-1.82 1.61.82 1.61 1.82-.73 1.82-1.61 1.82Z';

const groups = [
  {
    id: 'music',
    items: [
      { label: 'Spotify', subKey: 'links.spotify', url: 'https://open.spotify.com/artist/1kS2GOJRVZeWbgeuNrdpaE', icon: 'spotify.svg' },
      { label: 'YouTube', subKey: 'links.youtube', url: 'https://www.youtube.com/c/clareny', icon: 'youtube.svg' },
      { label: 'Beats YouTube', subKey: 'links.beats', url: 'https://www.youtube.com/@clarenyonthetrack', icon: 'youtubemusic.svg' },
    ],
  },
  {
    id: 'social',
    items: [
      { label: 'Instagram', sub: '@clarenymusic', url: 'https://www.instagram.com/clarenymusic', icon: 'instagram.svg' },
      { label: 'TikTok', sub: '@clarenymusic', url: 'https://www.tiktok.com/@clarenymusic', icon: 'tiktok.svg' },
      { label: 'Facebook', sub: 'clarenymusic', url: 'https://www.facebook.com/clarenymusic/', icon: 'facebook.svg' },
    ],
  },
  {
    id: 'community',
    items: [{ label: 'Discord', subKey: 'links.discord', url: 'https://discord.gg/8zuG68qvvv', svg: DISCORD_PATH }],
  },
];

export default function Links() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const animate = !reduceMotion;
  const basePath = import.meta.env.BASE_URL;

  return (
    <section id="links-page" className="links-section">
      <motion.article
        className="plan-card plan-card--combo links-card"
        variants={animate ? cardVariants : undefined}
        initial={animate ? 'hidden' : false}
        whileInView={animate ? 'show' : undefined}
        viewport={{ once: true, amount: 0.2 }}
      >
        <span className="plan-card__accent" aria-hidden="true" />
        <header className="plan-card__head links-card__head">
          <span className="links-card__avatar">
            <img src={`${basePath}logoblanco.png`} alt="" />
          </span>
          <span>
            <h3>{t('links.title')}</h3>
            <p>{t('links.tag')}</p>
          </span>
        </header>
        <motion.div
          className="plan-card__body"
          variants={animate ? listVariants : undefined}
          initial={animate ? 'hidden' : false}
          whileInView={animate ? 'show' : undefined}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p className="plan-card__hook" variants={animate ? itemVariants : undefined}>
            {t('links.hook')}
          </motion.p>
          {groups.map((group) => (
            <div key={group.id} className="link-group">
              <p className="link-group__label">{t(`links.${group.id}`)}</p>
              {group.items.map((item) => (
                <motion.a
                  key={item.label}
                  className="link-row"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={animate ? itemVariants : undefined}
                >
                  <span className="link-row__icon" aria-hidden="true">
                    {item.svg ? (
                      <svg viewBox="0 0 24 24">
                        <path fill="currentColor" d={item.svg} />
                      </svg>
                    ) : (
                      <span
                        className="link-row__glyph"
                        style={{ '--link-icon': `url("${basePath}icons/${item.icon}")` }}
                      />
                    )}
                  </span>
                  <span className="link-row__text">
                    <strong>{item.label}</strong>
                    <small>{item.subKey ? t(item.subKey) : item.sub}</small>
                  </span>
                  <svg className="link-row__arrow" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M7 17 17 7M9 7h8v8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
              ))}
            </div>
          ))}
        </motion.div>
        <div className="plan-card__foot">
          <HireCta href={waLink(t('links.waHi'))} label={t('links.cta')} animate={animate} />
        </div>
      </motion.article>
    </section>
  );
}
