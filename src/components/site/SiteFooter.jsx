import { useLanguage } from '../../contexts/LanguageContext';
import { linkHref, SOCIAL_LINKS } from '../../data/links';
import LinkIcon from './LinkIcon';

export default function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <nav className="site-footer__social" aria-label={t('links.rail')}>
        {SOCIAL_LINKS.filter((item) => item.icon || item.svg).map((item) => (
          <a key={item.id} href={linkHref(item)} target="_blank" rel="noopener noreferrer" aria-label={item.label} title={item.label}>
            <LinkIcon item={item} />
          </a>
        ))}
      </nav>
      <p className="fine-print">{t('site.footer')}</p>
    </footer>
  );
}
