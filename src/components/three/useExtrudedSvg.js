// Convierte un SVG en una pieza 3D (extruida, centrada y de ~2.4 unidades de ancho).
import { useLoader } from '@react-three/fiber';
import { useMemo } from 'react';
import { Box3, ExtrudeGeometry, Vector3 } from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

// Nivel de detalle: menos segmentos = menos vértices = menos trabajo al entrar a la página.
const DETAIL = {
  high: { curveSegments: 10, bevelSegments: 4, bevel: true },
  medium: { curveSegments: 6, bevelSegments: 2, bevel: true },
  lite: { curveSegments: 3, bevelSegments: 0, bevel: false },
};

// Las geometrías se arman una sola vez y se reutilizan al volver a cada mundo.
const cache = new Map();

function buildGeometry(svg, depth, detail) {
  const { curveSegments, bevelSegments, bevel } = DETAIL[detail];
  const shapes = svg.paths.flatMap((path) => SVGLoader.createShapes(path));
  const parts = shapes.map(
    (shape) =>
      new ExtrudeGeometry(shape, {
        depth,
        curveSegments,
        bevelEnabled: bevel,
        bevelThickness: depth * 0.16,
        bevelSize: depth * 0.06,
        // El bisel crece hacia adentro para no cerrar los huecos finos (la "E").
        bevelOffset: -depth * 0.06,
        bevelSegments,
      })
  );
  const geometry = mergeGeometries(parts);
  parts.forEach((part) => part.dispose());

  // Centrar y normalizar: el SVG tiene el eje Y hacia abajo.
  geometry.scale(1, -1, 1);
  geometry.computeBoundingBox();
  const box = new Box3().copy(geometry.boundingBox);
  const center = box.getCenter(new Vector3());
  geometry.translate(-center.x, -center.y, -center.z);
  const size = box.getSize(new Vector3());
  const scale = 2.4 / Math.max(size.x, size.y);
  geometry.scale(scale, scale, scale);
  geometry.computeVertexNormals();
  return geometry;
}

export default function useExtrudedSvg(src, depth, detail = 'high') {
  const svg = useLoader(SVGLoader, src);

  return useMemo(() => {
    const key = `${src}|${depth}|${detail}`;
    if (!cache.has(key)) cache.set(key, buildGeometry(svg, depth, detail));
    return cache.get(key);
  }, [svg, src, depth, detail]);
}
