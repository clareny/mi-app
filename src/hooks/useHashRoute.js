// Navegación por "mundos" con el hash de la URL: #/musica, #/servicios, #/formacion.
// Funciona en GitHub Pages sin configurar un servidor.
import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

export const ROUTES = ['inicio', 'musica', 'servicios', 'formacion'];

// Links viejos (#servicios, #contacto...) siguen llevando a su mundo.
const LEGACY = {
  portfolio: 'musica',
  playlist: 'musica',
  resultados: 'musica',
  servicios: 'servicios',
  proceso: 'servicios',
  contacto: 'servicios',
  mentoria: 'formacion',
};

const readRoute = () => {
  const raw = window.location.hash.replace(/^#\/?/, '').split(/[/?]/)[0];
  if (ROUTES.includes(raw)) return raw;
  return LEGACY[raw] || 'inicio';
};

export const routeHref = (route) => (route === 'inicio' ? '#/' : `#/${route}`);

export default function useHashRoute() {
  const [route, setRoute] = useState(() => (typeof window === 'undefined' ? 'inicio' : readRoute()));

  useEffect(() => {
    let current = readRoute();
    let active = null;
    const sync = () => {
      const next = readRoute();
      // Dirección del deslizamiento: hacia un mundo más a la derecha en el menú → entra desde la derecha.
      document.documentElement.dataset.vtDir = ROUTES.indexOf(next) >= ROUTES.indexOf(current) ? 'forward' : 'back';
      current = next;
      const apply = () => {
        flushSync(() => setRoute(next));
        window.scrollTo({ top: 0, behavior: 'instant' });
      };
      // Cambio de mundo con transición suave (View Transitions) donde el navegador lo soporta.
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (document.startViewTransition && !reduceMotion) {
        // Si tocan otro mundo antes de que termine la animación, se corta la anterior sin errores.
        active?.skipTransition();
        active = document.startViewTransition(apply);
        const done = active;
        done.ready.catch(() => {});
        done.finished.catch(() => {}).finally(() => {
          if (active === done) active = null;
        });
      } else {
        apply();
      }
    };
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  return route;
}
