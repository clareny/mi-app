import { useLanguage } from '../contexts/LanguageContext';
import Brand3D from '../components/three/Brand3D';
import { routeHref } from '../hooks/useHashRoute';

const base = import.meta.env.BASE_URL;

// Cada "puerta" lleva a un mundo distinto de la web.
const DOORS = [
  { id: 'musica', n: '01' },
  { id: 'servicios', n: '02' },
  { id: 'formacion', n: '03', mark: `${base}brand/graykids.png` },
];

export default function HomeView() {
  const { t } = useLanguage();

  return (
    <section className="home">
      <div className="home__hero">
        <div className="home__logo" aria-hidden="true">
          <Brand3D svg={`${base}brand/clareny-logo.svg`} image={`${base}brand/clareny-logo-black.png`} />
        </div>
        <p className="kicker home__kicker">{t('site.home.kicker')}</p>
        <h1 className="home__title">
          <span>{t('site.home.title1')}</span>
          <span className="text-iris">{t('site.home.title2')}</span>
        </h1>
        <p className="home__choose">{t('site.home.choose')}</p>
      </div>

      <nav className="doors" aria-label={t('site.home.choose')}>
        {DOORS.map((door) => (
          <a key={door.id} className={`door door--${door.id}`} href={routeHref(door.id)}>
            <span className="door__n">{door.n}</span>
            {door.mark && <img className="door__mark" src={door.mark} alt="" aria-hidden="true" />}
            <span className="door__title">{t(`site.doors.${door.id}.title`)}</span>
            <span className="door__copy">{t(`site.doors.${door.id}.copy`)}</span>
            <span className="door__enter">
              {t('site.doors.enter')} <span aria-hidden="true">→</span>
            </span>
          </a>
        ))}
      </nav>
    </section>
  );
}
