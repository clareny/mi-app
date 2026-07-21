export default function Welcome() {
  const services = [
    { name: 'Grabación de voces', description: 'Grabación vocal profesional con sonido limpio y listo para trabajar.', price: '$500 UYU' },
    { name: 'Mezcla + Master', description: 'Precio variable según la complejidad del proyecto. Se consulta por WhatsApp.', price: 'Consultar' },
    { name: 'Paquete básico', description: 'Grabación + mezcla + master para un beat propio, según necesidad del proyecto.', price: 'Consultar' },
  ];

  const extraServices = [
    { name: 'Remake beats', description: '2 cambios · 30 USD', price: '30 USD' },
    { name: 'Custom beat', description: '4 cambios · 555 USD', price: '555 USD' },
  ];

  const links = [
    { label: 'Instagram', url: 'https://www.instagram.com/clareny/' },
    { label: 'TikTok', url: 'https://www.tiktok.com/@clareny' },
    { label: 'Linktree', url: 'https://linktr.ee/clareny' },
    { label: 'Tienda de beats', url: 'https://linktr.ee/clareny' },
  ];

  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">Producción, grabación y mezcla vocal</p>
        <h1>Clareny</h1>
        <p className="intro">
          Ofrezco un servicio de grabación, mezcla y edición vocal con enfoque en que la canción suene bien, se entienda y conecte emocionalmente. Mi plus es guiar composicionalmente y trabajar el detalle para que cada canción se escuche profesional.
        </p>

        <div className="pricing-card">
          <h2>Tabla de precios</h2>
          <div className="pricing-list">
            {services.map((service) => (
              <div className="pricing-item" key={service.name}>
                <div>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </div>
                <strong>{service.price}</strong>
              </div>
            ))}
          </div>
          <div className="pricing-list extra-list">
            {extraServices.map((service) => (
              <div className="pricing-item" key={service.name}>
                <div>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </div>
                <strong>{service.price}</strong>
              </div>
            ))}
          </div>
          <p className="note">La grabación tiene precio fijo. La mezcla y el master pueden variar según el proyecto y se consultan por WhatsApp.</p>
        </div>

        <div className="socials">
          <h2>Conectá conmigo</h2>
          <div className="social-links">
            {links.map((link) => (
              <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}