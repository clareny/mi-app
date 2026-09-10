export default function About() {
  const publicUrl = process.env.PUBLIC_URL;

  return (
    <section id="about" className="about-section">
      <h2 className="section-title">Clareny</h2>

      <div className="about-showcase">
        <div className="about-visual">
          <img src="/fotoclarenyabout.jpg" alt="Clareny" className="about-photo" />
        </div>

        <div className="about-copy-wrap">
          <p className="about-copy about-copy--1">
            Hola, soy Clareny. Me gusta trabajar en ideas profundas, con una intención clara y un sonido que conecte más allá de lo superficial.
          </p>

          <p className="about-copy about-copy--2">
            Llevo años acompañando artistas y proyectos con una mirada creativa y técnica, cuidando cada detalle para que la música se sienta auténtica, clara y memorable.
          </p>

          <p className="about-copy about-copy--3">
            Me interesa transformar ideas en experiencias sonoras con identidad propia, con sensibilidad, rigor y una visión más grande que el simple resultado final.
          </p>
        </div>
      </div>
    </section>
  );
}
