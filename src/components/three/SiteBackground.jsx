// Fondo del sitio: muestra la imagen CLU al instante y carga la "ciudad" 3D aparte.
// Si no hay WebGL, el usuario pidió ahorrar datos o algo falla, queda la imagen.
import { Component, lazy, Suspense, useState } from 'react';

const CityBackground = lazy(() => import('./CityBackground'));

const canUse3D = () => {
  try {
    if (navigator.connection?.saveData) return false;
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
};

class KeepImage extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function SiteBackground({ route }) {
  const [use3D] = useState(() => typeof window !== 'undefined' && canUse3D());

  return (
    <div className="site-bg" aria-hidden="true">
      <img src={`${import.meta.env.BASE_URL}Backgroundprincipal.webp`} alt="" />
      {use3D && (
        <KeepImage>
          <Suspense fallback={null}>
            <CityBackground route={route} />
          </Suspense>
        </KeepImage>
      )}
    </div>
  );
}
