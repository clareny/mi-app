import { useLanguage } from '../contexts/LanguageContext';
import { waLink } from './planKit';

export default function About() {
  const { t } = useLanguage();
  const basePath = import.meta.env.BASE_URL;

  const credits = [
    'Red21',
    'Easy Mo',
    'Snokblaze',
    'Bment',
    'Darkxox',
    'BA',
    'Miserable',
    'Laika',
    'Parimyos',
    'Kodsay',
    'Antian rose',
    'elie',
  ];

  return (
    <section id="about" className="about-section editorial-bio">
      <div className="bio-layout">
        <aside className="bio-poster">
          <div className="bio-poster__frame">
            <img
              className="bio-poster__photo"
              src={`${basePath}fotoclarenyabout.jpg`}
              alt={t('about.photoAlt')}
            />
          </div>
        </aside>
        <div className="bio-story">
          <p className="ed-kicker">{t('about.kicker')}</p>
          <h2>
            <span>{t('about.title1')}</span>
            <span>{t('about.title2')}</span>
          </h2>
          <p>{t('about.p1')}</p>
          <p>{t('about.p2')}</p>
          <p className="bio-story__line">{t('about.p3')}</p>
        </div>
      </div>
      <div className="bio-credits">
        <p className="ed-kicker">{t('about.credits')}</p>
        <ul>
          {credits.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
      <a className="bio-mentor" href={waLink(t('about.mentorWa'))} target="_blank" rel="noopener noreferrer">
        {t('about.mentorCta')}
      </a>
    </section>
  );
}
