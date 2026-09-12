import { useState } from 'react';

const CONTACT_EMAIL = 'spieronilton@gmail.com';
const WHATSAPP_NUMBER = '59897989368';

export default function Contact() {
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const composedMessage = () => {
    const intro = name.trim() ? `Hola, soy ${name.trim()}.` : 'Hola, te escribo desde la web.';
    return `${intro}\n\n${message.trim()}`;
  };

  const buildWhatsAppLink = () => {
    const text = encodeURIComponent(composedMessage());
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  };

  const openMailto = () => {
    const subject = encodeURIComponent('Contacto desde la web — Clareny');
    const body = encodeURIComponent(
      `${composedMessage()}${senderEmail.trim() ? `\n\nResponder a: ${senderEmail.trim()}` : ''}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleWhatsApp = (event) => {
    event.preventDefault();
    if (!message.trim()) {
      setStatus('Escribí un mensaje para enviarlo.');
      return;
    }
    setStatus('Abriendo WhatsApp con tu mensaje...');
    window.open(buildWhatsAppLink(), '_blank', 'noopener,noreferrer');
  };

  const handleEmail = async (event) => {
    event.preventDefault();
    if (!message.trim()) {
      setStatus('Escribí un mensaje para enviarlo.');
      return;
    }
    if (!senderEmail.trim()) {
      setStatus('Para el correo, dejame tu email así te puedo responder.');
      return;
    }

    setSending(true);
    setStatus('Enviando el correo...');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name.trim() || 'Sin nombre',
          email: senderEmail.trim(),
          message: composedMessage(),
          _subject: 'Contacto desde la web — Clareny',
        }),
      });

      if (!response.ok) {
        throw new Error('formsubmit');
      }

      setStatus('Listo. El mensaje ya salió por correo.');
      setMessage('');
    } catch {
      openMailto();
      setStatus('Abrí tu correo con el mensaje listo para enviar.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">Contacto</h2>
      <p className="contact-copy">
        Escribime lo que necesitás por correo o WhatsApp. La sesión de trabajo, después, es en Discord: ahí se escucha, se habla y se cierra.
      </p>

      <a
        className="discord-cta"
        href="https://discord.gg/8zuG68qvvv"
        target="_blank"
        rel="noreferrer"
      >
        <span className="discord-cta__badge">Acá se trabaja</span>
        <div className="discord-cta__copy">
          <strong>Entrar a Discord</strong>
          <p>Videollamada uno a uno. Entrá, coordinamos horarios y arrancamos el tema.</p>
        </div>
        <span className="discord-cta__button">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M19.27 5.33A17.2 17.2 0 0 0 15.07 4c-.18.32-.39.76-.53 1.1a16.1 16.1 0 0 0-5.08 0A10 10 0 0 0 8.93 4a17.3 17.3 0 0 0-4.22 1.34C1.78 9.05 1.17 12.66 1.48 16.22A17.4 17.4 0 0 0 6.9 18.5c.36-.49.68-1.01.96-1.56-.53-.2-1.04-.44-1.52-.72.13-.1.25-.2.37-.3 2.92 1.36 6.08 1.36 8.97 0 .12.1.24.2.37.3-.48.28-.99.52-1.52.72.28.55.6 1.07.96 1.56a17.3 17.3 0 0 0 5.42-2.28c.37-4.14-.63-7.72-2.64-10.89ZM8.68 14.33c-.88 0-1.6-.82-1.6-1.82s.71-1.82 1.6-1.82 1.61.82 1.61 1.82-.72 1.82-1.61 1.82Zm6.64 0c-.88 0-1.6-.82-1.6-1.82s.71-1.82 1.6-1.82 1.61.82 1.61 1.82-.73 1.82-1.61 1.82Z"
            />
          </svg>
          Unirme
        </span>
      </a>

      <form className="contact-form" onSubmit={handleEmail}>
        <div className="contact-form__row">
          <label className="contact-form__field">
            <span>Nombre</span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Cómo te llamás"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="contact-form__field">
            <span>Tu correo</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="para responderte"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
            />
          </label>
        </div>

        <label className="contact-form__field">
          <span>Mensaje</span>
          <textarea
            name="message"
            rows="4"
            required
            placeholder="Contame el proyecto, referencias, plazos o lo que haga falta..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (status) setStatus('');
            }}
          />
        </label>

        <div className="contact-form__actions">
          <button className="btn btn-outline-light btn-lg" type="submit" disabled={sending}>
            {sending ? 'Enviando...' : 'Enviar correo'}
          </button>
          <a
            className="btn btn-primary btn-lg"
            href={message.trim() ? buildWhatsAppLink() : `https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            onClick={handleWhatsApp}
          >
            Enviar WhatsApp
          </a>
        </div>

        {status ? <p className="contact-form__status" role="status">{status}</p> : null}
      </form>

      <p className="contact-note">Toda sesión de trabajo es por Discord, en una videollamada de uno a uno.</p>
    </section>
  );
}
