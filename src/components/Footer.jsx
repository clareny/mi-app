import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <strong className="site-footer__brand">GRAYKIDS</strong>
        <p className="site-footer__rights">{t('footer.rights')}</p>
        <p className="site-footer__meta">{t('footer.meta')}</p>
      </div>
    </footer>
  );
}
