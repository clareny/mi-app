import { useLanguage } from '../contexts/LanguageContext';
import { GOOGLE_PROFILE_URL, GOOGLE_REVIEW_URL } from '../data/links';

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
          <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer">
            {t('footer.review')} ↗
          </a>
          <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer">
            {t('footer.records')} ↗
          </a>
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
