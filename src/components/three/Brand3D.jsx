// Envoltorio liviano: muestra la imagen 2D al instante y carga el 3D (Three.js) aparte.
// Si el navegador no soporta WebGL o algo falla, se queda la imagen 2D.
import { Component, lazy, Suspense, useState } from 'react';

const Logo3D = lazy(() => import('./Logo3D'));

const hasWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
};

class Fallback2D extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function Brand3D({ svg, image, className = '', ...props }) {
  const [webgl] = useState(() => typeof window !== 'undefined' && hasWebGL());
  const fallback = (
    <div className={`logo3d logo3d--flat ${className}`.trim()}>
      <img src={image} alt="" />
    </div>
  );

  if (!webgl) return fallback;

  return (
    <Fallback2D fallback={fallback}>
      <Suspense fallback={fallback}>
        <Logo3D src={svg} className={className} {...props} />
      </Suspense>
    </Fallback2D>
  );
}
