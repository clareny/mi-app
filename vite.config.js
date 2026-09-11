import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/mi-app/',
  plugins: [react()],
  build: {
    outDir: 'build',
  },
});
