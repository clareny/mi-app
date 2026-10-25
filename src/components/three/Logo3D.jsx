// Logo 3D a partir de un SVG: se extruye, flota y se puede girar con el mouse.
// Se carga aparte (lazy) para no frenar la primera carga de la web.
import { ContactShadows, Environment, Float, Lightformer, PresentationControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import useExtrudedSvg from './useExtrudedSvg';

function LogoMesh({ src, depth, detail, spin, sway }) {
  const geometry = useExtrudedSvg(src, depth, detail);
  const ref = useRef();

  useFrame((state, delta) => {
    if (!ref.current) return;
    if (spin) {
      ref.current.rotation.y += delta * spin;
    } else if (sway) {
      // Vaivén lento para que se note el volumen sin tocarlo.
      const t = state.clock.elapsedTime;
      ref.current.rotation.y = Math.sin(t * 0.45) * 0.42;
      ref.current.rotation.x = 0.1 + Math.sin(t * 0.3) * 0.06;
    }
  });

  return (
    <mesh ref={ref} geometry={geometry} dispose={null} castShadow>
      <meshPhysicalMaterial color="#1a1a1a" roughness={0.22} metalness={0.35} clearcoat={1} clearcoatRoughness={0.12} />
    </mesh>
  );
}

// Luces de estudio armadas a mano (sin descargar HDRs externos).
function StudioLights() {
  return (
    <Environment resolution={256}>
      <Lightformer intensity={0.5} position={[0, 0, 7]} scale={[12, 12, 1]} />
      <Lightformer intensity={2.4} position={[0, 4, 4]} scale={[8, 2, 1]} />
      <Lightformer intensity={1.4} position={[-5, 1, 2]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
      <Lightformer intensity={1.2} position={[5, -1, 2]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} />
      <Lightformer form="ring" color="#a9eef2" intensity={1.5} position={[-2, 2, -3]} scale={2} />
      <Lightformer form="ring" color="#d2c9fb" intensity={1.5} position={[3, -1, -3]} scale={2} />
    </Environment>
  );
}

export default function Logo3D({ src, depth = 90, detail = 'high', spin = 0, interactive = true, shadow = true, className = '' }) {
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
  const canDrag = interactive && finePointer;

  const mesh = <LogoMesh src={src} depth={depth} detail={detail} spin={reduceMotion ? 0 : spin} sway={!reduceMotion} />;

  return (
    <div className={`logo3d ${canDrag ? 'logo3d--drag' : ''} ${className}`.trim()}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5.2], fov: 35 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[2, 4, 5]} intensity={1.1} />
        <Suspense fallback={null}>
          <StudioLights />
          <Float speed={reduceMotion ? 0 : 1.6} rotationIntensity={0.35} floatIntensity={0.7}>
            {canDrag ? (
              <PresentationControls
                global={false}
                cursor
                snap
                speed={1.6}
                polar={[-0.5, 0.5]}
                azimuth={[-Math.PI, Math.PI]}
              >
                {mesh}
              </PresentationControls>
            ) : (
              mesh
            )}
          </Float>
          {shadow && <ContactShadows position={[0, -1.55, 0]} opacity={0.32} scale={7} blur={2.6} far={3} />}
        </Suspense>
      </Canvas>
    </div>
  );
}
