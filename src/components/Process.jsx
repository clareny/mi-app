import { useLanguage } from '../contexts/LanguageContext';

export default function Process() {
  const { t } = useLanguage();
  const steps = [
    { n: '01', title: t('process.step1'), copy: t('process.step1Copy') },
    { n: '02', title: t('process.step2'), copy: t('process.step2Copy') },
    { n: '03', title: t('process.step3'), copy: t('process.step3Copy') },
  ];

  return (
    <section className="process-section">
      <div className="process-head">
        <p className="ed-kicker">{t('process.kicker')}</p>
        <h2>
          <span>{t('process.title1')}</span>
          <span>{t('process.title2')}</span>
        </h2>
      </div>
      <div className="process-steps">
        {steps.map((step) => (
          <article key={step.n}>
            <p>{step.n} /</p>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
