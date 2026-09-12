import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/mi-app/',
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  server: {
    watch: {
      ignored: ['**/public/*.wav', '**/public/*.mp3'],
    },
  },
});
