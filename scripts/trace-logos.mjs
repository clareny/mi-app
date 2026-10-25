// Convierte las máscaras PNG de los logos en SVG vectorial (para extruirlos en 3D).
// Uso: node scripts/trace-logos.mjs <mascara.png> <salida.svg>
import { writeFile } from 'node:fs/promises';
import potrace from 'potrace';

const [input, output] = process.argv.slice(2);

potrace.trace(input, { turdSize: 12, optTolerance: 0.4, threshold: 128, color: '#000' }, async (error, svg) => {
  if (error) throw error;
  await writeFile(output, svg);
  console.log(`${output} (${svg.length} bytes)`);
});
