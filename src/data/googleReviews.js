export const GOOGLE_REVIEWS_URL = 'https://share.google/FC1dC6WBRe29qIgUK';
export const GOOGLE_WRITE_URL = 'https://g.page/r/CZ1T54gyvCjgEBM/review';
export const GOOGLE_PLACE_NAME = 'GRAYKIDS RECORDS';
export const GOOGLE_PLACE_QUERY = 'GRAYKIDS RECORDS';

const CACHE_KEY = 'graykids-google-reviews';
const CACHE_MS = 60 * 60 * 1000;

const readCache = () => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, reviews } = JSON.parse(raw);
    if (!Array.isArray(reviews) || Date.now() - at > CACHE_MS) return null;
    return reviews;
  } catch {
    return null;
  }
};

const writeCache = (reviews) => {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), reviews }));
  } catch {
    /* ignore */
  }
};

export async function loadGoogleReviews() {
  const key = import.meta.env.VITE_GOOGLE_PLACES_KEY;
  if (!key) return [];

  const cached = readCache();
  if (cached) return cached;

  const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask': 'places.displayName,places.rating,places.userRatingCount,places.reviews',
    },
    body: JSON.stringify({
      textQuery: GOOGLE_PLACE_QUERY,
      languageCode: 'es',
      maxResultCount: 1,
    }),
  });

  if (!response.ok) return [];

  const data = await response.json();
  const reviews = (data.places?.[0]?.reviews ?? [])
    .map((review, index) => ({
      id: review.name || String(index),
      name: review.authorAttribution?.displayName || 'Google',
      stars: review.rating || 5,
      text: review.text?.text || review.originalText?.text || '',
    }))
    .filter((review) => review.text);

  writeCache(reviews);
  return reviews;
}
