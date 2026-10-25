// Navegación por "mundos" con el hash de la URL: #/musica, #/servicios, #/formacion.
// Funciona en GitHub Pages sin configurar un servidor.
import { useEffect, useState } from 'react';

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
    const sync = () => {
      setRoute(readRoute());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  return route;
}
