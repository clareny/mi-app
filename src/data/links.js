// Única fuente de links, redes y contacto de la web.
// Para cambiar un link o el WhatsApp, cambialo solo acá.

export const WHATSAPP_NUMBER = '59897989368';
export const WHATSAPP_DISPLAY = '+598 97 989 368';

export const waLink = (message) =>
  message ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}` : `https://wa.me/${WHATSAPP_NUMBER}`;

export const SPOTIFY_ARTIST = 'https://open.spotify.com/artist/1kS2GOJRVZeWbgeuNrdpaE';
export const PLAYLIST_URL = 'https://open.spotify.com/playlist/0kHxXnOwz121HvCttid3Qt';
export const GOOGLE_REVIEW_URL = 'https://g.page/r/CZ1T54gyvCjgEBM/review';
export const GOOGLE_PROFILE_URL = 'https://share.google/FC1dC6WBRe29qIgUK';

const WHATSAPP_PATH =
  'M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35ZM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43a9.38 9.38 0 0 1 9.43 9.44c0 5.2-4.24 9.43-9.44 9.43Zm8.02-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.72 5.8.72 12.05c0 2 .52 3.95 1.52 5.66L.62 23.28l5.7-1.5a11.3 11.3 0 0 0 5.42 1.38h.01c6.25 0 11.33-5.08 11.33-11.33 0-3.03-1.18-5.87-3.32-8.01Z';

const DISCORD_PATH =
  'M19.27 5.33A17.2 17.2 0 0 0 15.07 4c-.18.32-.39.76-.53 1.1a16.1 16.1 0 0 0-5.08 0A10 10 0 0 0 8.93 4a17.3 17.3 0 0 0-4.22 1.34C1.78 9.05 1.17 12.66 1.48 16.22A17.4 17.4 0 0 0 6.9 18.5c.36-.49.68-1.01.96-1.56-.53-.2-1.04-.44-1.52-.72.13-.1.25-.2.37-.3 2.92 1.36 6.08 1.36 8.97 0 .12.1.24.2.37.3-.48.28-.99.52-1.52.72.28.55.6 1.07.96 1.56a17.3 17.3 0 0 0 5.42-2.28c.37-4.14-.63-7.72-2.64-10.89ZM8.68 14.33c-.88 0-1.6-.82-1.6-1.82s.71-1.82 1.6-1.82 1.61.82 1.61 1.82-.72 1.82-1.61 1.82Zm6.64 0c-.88 0-1.6-.82-1.6-1.82s.71-1.82 1.6-1.82 1.61.82 1.61 1.82-.73 1.82-1.61 1.82Z';

// Smart links (MySocial): cuando crees el smart link de una red en
// https://mysocial.io/smartlink/, pegalo en `smart`. La web lo usa en lugar de `url`
// y así el link abre directo la app (YouTube, Instagram, TikTok...).
//
// group: 'music' | 'learn' | 'community' | 'social' | 'work' (títulos en i18n: links.<group>)
// rail: true  = aparece en la barra de redes fija (desktop).
// quick: true = aparece en los accesos rápidos de la entrada (celular).
export const SOCIAL_LINKS = [
  { id: 'spotify', label: 'Spotify', subKey: 'links.spotify', url: SPOTIFY_ARTIST, smart: '', icon: 'spotify.svg', group: 'music', rail: true, quick: true },
  { id: 'youtube', label: 'YouTube', subKey: 'links.youtube', url: 'https://www.youtube.com/@clareny', smart: 'https://to.mysocial.io/s/WSxdVsNWA', icon: 'youtube.svg', group: 'music', rail: true, quick: true },
  { id: 'beats', label: 'YouTube Beats', subKey: 'links.beats', url: 'https://www.youtube.com/@clarenyonthetrack', smart: 'https://to.mysocial.io/s/EHvACy1D0', icon: 'youtubemusic.svg', group: 'music', quick: true },
  { id: 'casita', label: 'Casita de Madera', subKey: 'links.casita', url: 'https://www.youtube.com/@casitademadera', smart: 'https://to.mysocial.io/s/2JQ-NYru6', icon: 'youtube.svg', group: 'learn', quick: true },
  { id: 'discord', label: 'Discord', subKey: 'links.discord', url: 'https://discord.com/invite/8zuG68qvvv', smart: '', svg: DISCORD_PATH, group: 'learn', rail: true, quick: true },
  { id: 'wa-community', label: 'Comunidad WhatsApp', subKey: 'links.waCommunity', url: 'https://chat.whatsapp.com/D4dezS7xQ0K2j5KzrYfcAG', smart: '', svg: WHATSAPP_PATH, group: 'community', rail: true, quick: true },
  { id: 'instagram', label: 'Instagram', sub: '@clarenymusic', url: 'https://www.instagram.com/clarenymusic', smart: '', icon: 'instagram.svg', group: 'social', rail: true, quick: true },
  { id: 'tiktok', label: 'TikTok', sub: '@clarenymusic', url: 'https://www.tiktok.com/@clarenymusic', smart: '', icon: 'tiktok.svg', group: 'social', rail: true },
  { id: 'facebook', label: 'Facebook', sub: 'clarenymusic', url: 'https://www.facebook.com/clarenymusic/', smart: '', icon: 'facebook.svg', group: 'social' },
  { id: 'soundbetter', label: 'SoundBetter', subKey: 'links.soundbetter', url: 'https://soundbetter.com/profiles/265231-clareny', smart: '', group: 'work' },
];

export const linkHref = (item) => item.smart || item.url;
