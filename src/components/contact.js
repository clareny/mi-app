export default function Contact() {
  const links = [
    { label: 'Facebook', url: 'https://www.facebook.com/clareny', icon: '📘' },
    { label: 'Instagram', url: 'https://www.instagram.com/clarenymusic', icon: '📸' },
    { label: 'TikTok', url: 'https://www.tiktok.com/@clarenymusic', icon: '🎵' },
    { label: 'YouTube', url: 'https://www.youtube.com/c/clareny', icon: '▶️' },
    { label: 'Beats YouTube', url: 'https://www.youtube.com/@clarenyonthetrack', icon: '🎛️' },
    { label: 'Spotify', url: 'https://open.spotify.com/artist/1kS2GOJRVZeWbgeuNrdpaE', icon: '🎧' },
  ];

  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">Contacto</h2>
      <p className="contact-copy">
        Si querés trabajar conmigo, mandame WhatsApp con lo que necesitás y te respondo con una propuesta acorde a la idea. También podés reservar una videollamada por Discord para hablar ideas, escuchar referencias y definir el proyecto.
      </p>

      <div className="social-links">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-info social-pill social-pill--icon"
            aria-label={link.label}
          >
            <span className="social-icon" aria-hidden="true">{link.icon}</span>
          </a>
        ))}
      </div>

      <div className="contact-grid">
        <a className="btn btn-primary btn-lg" href="https://wa.me/59897989368" target="_blank" rel="noreferrer">Enviar WhatsApp</a>
        <a className="btn btn-outline-light btn-lg" href="https://discord.gg/gN4dTZ2rJ" target="_blank" rel="noreferrer">Entrar a Discord</a>
      </div>

      <div className="calendar-card">
        <p className="calendar-label">Disponibilidad</p>
        <p className="calendar-copy">Podés ver mis espacios disponibles y reservar una llamada de forma sencilla.</p>
        <iframe
          title="Calendario de disponibilidad"
          src="https://calendar.google.com/calendar/embed?src=d58w7kzfTmrHnQ8z9&ctz=America%2FMontevideo"
          style={{ border: 0, borderRadius: '16px' }}
          width="100%"
          height="420"
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </div>

      <div className="notice-box">
        <p className="notice-title">Aviso importante</p>
        <p>Toda sesión de trabajo se realizará por Discord en una videollamada de uno a uno, para mantener el proceso claro, directo y profesional.</p>
      </div>

      <div className="teaser-box">
        <p>Los precios se ajustan según el proyecto, la complejidad y el alcance del trabajo. Escribime y te paso una propuesta acorde a lo que necesitás.</p>
      </div>
    </section>
  );
}
