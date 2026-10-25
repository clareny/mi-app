// Convierte un SVG en una pieza 3D (extruida, centrada y de ~2.4 unidades de ancho).
import { useLoader } from '@react-three/fiber';
import { useMemo } from 'react';
import { Box3, ExtrudeGeometry, Vector3 } from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

// `lite`: sin bisel y con menos segmentos (~15 veces menos vértices) para piezas chicas o repetidas.
export default function useExtrudedSvg(src, depth, lite = false) {
  const svg = useLoader(SVGLoader, src);

  return useMemo(() => {
    const shapes = svg.paths.flatMap((path) => SVGLoader.createShapes(path));
    const parts = shapes.map(
      (shape) =>
        new ExtrudeGeometry(shape, {
          depth,
          curveSegments: lite ? 3 : 10,
          bevelEnabled: !lite,
          bevelThickness: depth * 0.16,
          bevelSize: depth * 0.06,
          // El bisel crece hacia adentro para no cerrar los huecos finos (la "E").
          bevelOffset: -depth * 0.06,
          bevelSegments: 4,
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
  }, [svg, depth, lite]);
}
