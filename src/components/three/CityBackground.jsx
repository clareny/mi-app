// Fondo 3D: una "ciudad" de carteles hechos con el background CLU.
// La cámara avanza por la calle al hacer scroll y se mueve de barrio al cambiar de mundo.
import { useTexture } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef } from 'react';
import { MathUtils } from 'three';
import useExtrudedSvg from './useExtrudedSvg';

const TEXTURE = `${import.meta.env.BASE_URL}brand/clu-texture.webp`;
const ASPECT = 2560 / 1039;
const BG = '#f1f0ec';

// Cada mundo es un "barrio": la cámara se desplaza hacia un costado distinto.
const DISTRICTS = {
  inicio: { x: 0, y: 0 },
  musica: { x: -2.4, y: 0.4 },
  servicios: { x: 2.4, y: -0.2 },
  formacion: { x: 0, y: 1.1 },
};

const STREET_LENGTH = 70;

// Carteles a ambos lados de la calle, como fachadas de edificios.
// `spread` = qué tan abierta es la calle (más angosta en pantallas verticales).
function makeBillboards(count, spread) {
  const items = [];
  for (let i = 0; i < count; i += 1) {
    const side = i % 2 === 0 ? -1 : 1;
    const z = 2 - (i / count) * STREET_LENGTH;
    items.push({
      key: i,
      position: [side * (spread + (i % 3) * spread * 0.25), -0.4 + ((i * 37) % 5) * 0.55, z],
      rotation: [0, side * -0.9, 0],
      scale: 3.2 + ((i * 13) % 4) * 0.6,
      opacity: 0.5 + ((i * 7) % 3) * 0.12,
    });
  }
  // Un cartel gigante al fondo de la calle
  items.push({ key: 'end', position: [0, 1, -STREET_LENGTH - 6], rotation: [0, 0, 0], scale: 16, opacity: 0.7 });
  return items;
}

function Billboard({ texture, position, rotation, scale, opacity }) {
  return (
    <mesh position={position} rotation={rotation} scale={[scale * ASPECT, scale, 1]}>
      <planeGeometry />
      <meshBasicMaterial map={texture} transparent opacity={opacity} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

// Logos GRAYKIDS flotando por la ciudad, pintados con los colores del degradado.
const GRAYKIDS_SVG = `${import.meta.env.BASE_URL}brand/graykids.svg`;
const MARK_COLORS = ['#2cbfca', '#8a72ee', '#5a92ee'];

function GraykidsMarks({ count, spread }) {
  const geometry = useExtrudedSvg(GRAYKIDS_SVG, 40, true);
  const marks = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        key: i,
        position: [(((i * 53) % 9) / 8 - 0.5) * spread * 1.6, ((i * 29) % 5) * 0.5 - 0.8, -5 - i * (STREET_LENGTH / count)],
        scale: 0.38 + ((i * 17) % 4) * 0.08,
        color: MARK_COLORS[i % MARK_COLORS.length],
        speed: 0.2 + (i % 4) * 0.06,
      })),
    [count, spread]
  );
  const refs = useRef([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.current.forEach((mark, i) => {
      if (!mark) return;
      // De frente a la cámara: la espiral gira en su plano y se balancea un poco.
      mark.rotation.z = -t * marks[i].speed;
      mark.rotation.y = Math.sin(t * 0.5 + i) * 0.5;
      mark.rotation.x = Math.sin(t * 0.4 + i) * 0.2;
      mark.position.y = marks[i].position[1] + Math.sin(t * 0.6 + i) * 0.25;
    });
  });

  return marks.map((mark, i) => (
    <mesh
      key={mark.key}
      ref={(el) => (refs.current[i] = el)}
      geometry={geometry}
      position={mark.position}
      scale={mark.scale}
    >
      <meshStandardMaterial color={mark.color} roughness={0.35} metalness={0.2} transparent opacity={0.9} />
    </mesh>
  ));
}

function Street({ route, lite, still }) {
  const texture = useTexture(TEXTURE);
  const spread = useMemo(() => {
    const aspect = window.innerWidth / window.innerHeight;
    return 1.3 + 2.1 * Math.min(aspect, 1.6) / 1.6;
  }, []);
  const billboards = useMemo(() => makeBillboards(lite ? 12 : 18, spread), [lite, spread]);

  useFrame((state, delta) => {
    const { camera, pointer } = state;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? window.scrollY / max : 0;
    const district = DISTRICTS[route] || DISTRICTS.inicio;
    const ease = still ? 1 : 1 - Math.exp(-delta * 2.2);

    // Avanzar por la calle con el scroll (motion de desplazamiento)
    const targetZ = 6 - progress * (STREET_LENGTH * 0.55);
    const targetX = district.x + (still ? 0 : pointer.x * 0.4);
    const targetY = district.y + (still ? 0 : pointer.y * 0.25);

    camera.position.z = MathUtils.lerp(camera.position.z, targetZ, ease);
    camera.position.x = MathUtils.lerp(camera.position.x, targetX, ease);
    camera.position.y = MathUtils.lerp(camera.position.y, targetY, ease);
    camera.lookAt(district.x * 0.4, district.y * 0.5, camera.position.z - 10);
  });

  return (
    <>
      {billboards.map(({ key, ...props }) => (
        <Billboard key={key} texture={texture} {...props} />
      ))}
      <GraykidsMarks count={lite ? 4 : 8} spread={spread} />
      <gridHelper args={[16, 40, '#d9d8d2', '#e4e3de']} position={[0, -3, -STREET_LENGTH / 2]} scale={[1, 1, STREET_LENGTH / 16]} />
    </>
  );
}

export default function CityBackground({ route }) {
  const lite = typeof window !== 'undefined' && window.matchMedia('(max-width: 860px)').matches;
  const still = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <Canvas
      className="city-canvas"
      dpr={[1, lite ? 1.25 : 1.5]}
      camera={{ position: [0, 0, 6], fov: 55, near: 0.1, far: 120 }}
      gl={{ antialias: !lite, alpha: false, powerPreference: 'low-power' }}
    >
      <color attach="background" args={[BG]} />
      {/* La niebla funde los carteles lejanos con el blanco mate */}
      <fog attach="fog" args={[BG, 8, 46]} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} />
      <Suspense fallback={null}>
        <Street route={route} lite={lite} still={still} />
      </Suspense>
    </Canvas>
  );
}
