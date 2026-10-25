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

      {/* Sobre mí: corto, con foto */}
      <section className="about-mini" aria-labelledby="about-mini-title">
        <img
          className="about-mini__photo"
          src={`${base}fotoclarenyabout.jpg`}
          alt={t('about.photoAlt')}
          loading="lazy"
          width="1080"
          height="1080"
        />
        <div className="about-mini__text">
          <p className="kicker text-iris">{t('site.about.kicker')}</p>
          <h2 id="about-mini-title">
            <span>{t('about.title1')} </span>
            <span className="text-iris">{t('about.title2')}</span>
          </h2>
          <p>{t('about.p1')}</p>
          <p>{t('about.p3')}</p>
          <p className="about-mini__meta">
            {t('about.posterPlace')} · {t('about.posterCeo')}
          </p>
        </div>
      </section>
    </section>
  );
}
