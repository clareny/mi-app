import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const productionCsp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self' https://formsubmit.co mailto:",
  "script-src 'self' https://translate.google.com https://translate.googleapis.com https://www.gstatic.com https://w.soundcloud.com https://widget.sndcdn.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.gstatic.com https://translate.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  "media-src 'self'",
  "connect-src 'self' https://formsubmit.co https://translate.googleapis.com https://translate.google.com https://www.gstatic.com https://api.soundcloud.com https://w.soundcloud.com https://places.googleapis.com",
  "frame-src https://open.spotify.com https://embed.spotify.com https://w.soundcloud.com https://widget.sndcdn.com https://translate.google.com https://www.google.com",
  'upgrade-insecure-requests',
].join('; ');

const htmlSecurity = {
  name: 'html-security-headers',
  transformIndexHtml: {
    order: 'pre',
    handler(html, ctx) {
      const isBuild = Boolean(ctx?.server) === false;
      const cspTag = isBuild
        ? `    <meta http-equiv="Content-Security-Policy" content="${productionCsp}" />\n`
        : '';
      return html.replace(
        '<head>',
        `<head>\n${cspTag}    <meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), payment=(), usb=()" />`
      );
    },
  },
};

export default defineConfig({
  base: '/',
  plugins: [react(), htmlSecurity],
  build: {
    outDir: 'build',
    sourcemap: false,
    minify: true,
  },
  server: {
    watch: {
      ignored: ['**/public/*.wav', '**/public/*.mp3'],
    },
  },
});
