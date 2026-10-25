import { useLanguage } from '../contexts/LanguageContext';
import Brand3D from '../components/three/Brand3D';
import { routeHref } from '../hooks/useHashRoute';

const base = import.meta.env.BASE_URL;

// Cabecera común de cada mundo. El contenido de cada uno llega en las próximas fases.
export default function WorldView({ id, children }) {
  const { t } = useLanguage();

  return (
    <section className={`world world--${id}`}>
      <a className="world__back" href={routeHref('inicio')}>
        <span aria-hidden="true">←</span> {t('site.nav.back')}
      </a>
      <header className="world__head">
        {id === 'formacion' && (
          <div className="world__mark" aria-hidden="true">
            <Brand3D
              svg={`${base}brand/graykids.svg`}
              image={`${base}brand/graykids.png`}
              depth={45}
              detail="medium"
              spin={0.35}
              interactive={false}
              shadow={false}
            />
          </div>
        )}
        <h1 className="world__title text-iris">{t(`site.doors.${id}.title`)}</h1>
        <p className="world__lead">{t(`site.doors.${id}.copy`)}</p>
      </header>
      {children || <p className="world__soon fine-print">{t('site.soon')}</p>}
    </section>
  );
}
