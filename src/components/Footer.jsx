import { useLanguage } from '../contexts/LanguageContext';

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/clarenymusic' },
  { label: 'Facebook', href: 'https://www.facebook.com/clarenymusic/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@clarenymusic' },
  { label: 'YouTube', href: 'https://www.youtube.com/c/clareny' },
  { label: 'YouTube Beats', href: 'https://www.youtube.com/@clarenyonthetrack' },
  { label: 'Spotify', href: 'https://open.spotify.com/artist/1kS2GOJRVZeWbgeuNrdpaE' },
  { label: 'SoundBetter', href: 'https://soundbetter.com/profiles/265231-clareny' },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="site-footer__review">
        <div>
          <p className="ed-kicker">{t('footer.brand')}</p>
          <p>{t('footer.invite')}</p>
        </div>
        <div className="site-footer__review-links">
          <a href="https://g.page/r/CZ1T54gyvCjgEBM/review" target="_blank" rel="noopener noreferrer">
            {t('footer.review')} ↗
          </a>
          <a href="https://share.google/FC1dC6WBRe29qIgUK" target="_blank" rel="noopener noreferrer">
            {t('footer.records')} ↗
          </a>
        </div>
      </div>

      <div className="site-footer__socials">
        <p className="ed-kicker">{t('footer.follow')}</p>
        <div>
          {SOCIALS.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>

      <p className="site-footer__word">CLARENY</p>

      <div className="site-footer__bar">
        <p>{t('footer.rights')}</p>
        <p>{t('footer.ceo')}</p>
        <a href="#portfolio">{t('footer.top')} ↑</a>
      </div>
    </footer>
  );
}
