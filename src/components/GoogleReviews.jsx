import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { GOOGLE_PLACE_NAME, GOOGLE_REVIEWS_URL, GOOGLE_WRITE_URL, loadGoogleReviews } from '../data/googleReviews';

const Stars = ({ value = 5 }) => (
  <span className="g-reviews__stars" aria-label={`${value} / 5`}>
    {'★★★★★'.slice(0, value)}
    <span className="g-reviews__stars-empty">{'★★★★★'.slice(value)}</span>
  </span>
);

export default function GoogleReviews() {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = reviews.length;

  useEffect(() => {
    let cancelled = false;

    loadGoogleReviews()
      .then((next) => {
        if (!cancelled) setReviews(next);
      })
      .catch(() => {
        if (!cancelled) setReviews([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (total < 2 || paused) return undefined;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [paused, total]);

  return (
    <aside
      className="g-reviews"
      aria-label={t('reviews.label')}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <header className="g-reviews__head">
        <p className="g-reviews__brand">{GOOGLE_PLACE_NAME}</p>
        <a
          className="g-reviews__google"
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('reviews.google')}
        </a>
      </header>

      {total === 0 ? (
        <p className="g-reviews__empty">
          {t('reviews.empty')}
          {' '}
          <a href={GOOGLE_WRITE_URL} target="_blank" rel="noopener noreferrer">
            {t('reviews.write')}
          </a>
        </p>
      ) : (
        <>
          <div className="g-reviews__viewport">
            <div
              className="g-reviews__track"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {reviews.map((review) => (
                <article key={review.id} className="g-reviews__card">
                  <div className="g-reviews__meta">
                    <strong>{review.name}</strong>
                    <Stars value={review.stars} />
                  </div>
                  <p>{review.text}</p>
                </article>
              ))}
            </div>
          </div>

          {total > 1 && (
            <div className="g-reviews__dots" role="tablist" aria-label={t('reviews.label')}>
              {reviews.map((review, dotIndex) => (
                <button
                  key={review.id}
                  type="button"
                  className={`g-reviews__dot ${dotIndex === index ? 'is-active' : ''}`}
                  aria-label={`${dotIndex + 1} / ${total}`}
                  aria-current={dotIndex === index ? 'true' : undefined}
                  onClick={() => setIndex(dotIndex)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </aside>
  );
}
