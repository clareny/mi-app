import { useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const CONTACT_EMAIL = 'spieronilton@gmail.com';
// Pegá acá el código largo que FormSubmit manda al confirmar desde clareny.com.
// Con el email a palo, cada origen nuevo (localhost, Pages, clareny.com) pide activar de nuevo.
const FORMSUBMIT_ID = '';
const formSubmitPath = FORMSUBMIT_ID || CONTACT_EMAIL;
const WHATSAPP_NUMBER = '59897989368';
const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 80, email: 120, message: 2000 };
const SEND_COOLDOWN_MS = 12000;

const clip = (value, max) => value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').slice(0, max);

export default function Contact() {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const lastSendRef = useRef(0);

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
    if (honeypot.trim()) return;
    if (!message.trim()) {
      setStatus(t('contact.needMsg'));
      return;
    }
    setStatus(t('contact.openingWa'));
    window.open(buildWhatsAppLink(), '_blank', 'noopener,noreferrer');
  };

  const handleEmail = async (event) => {
    event.preventDefault();
    if (!message.trim()) {
      setStatus(t('contact.needMsg'));
      return;
    }
    if (honeypot.trim()) return;
    if (!senderEmail.trim()) {
      setStatus(t('contact.needMail'));
      return;
    }
    if (!EMAIL_OK.test(senderEmail.trim())) {
      setStatus(t('contact.badMail'));
      return;
    }
    if (Date.now() - lastSendRef.current < SEND_COOLDOWN_MS) {
      setStatus(t('contact.wait'));
      return;
    }

    setSending(true);
    setStatus(t('contact.sending'));

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${formSubmitPath}`, {
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
          _honey: honeypot,
          _captcha: 'false',
        }),
      });

      const data = await response.json().catch(() => ({}));
      const payload = `${data.message || ''} ${data.success || ''}`;
      const needsConfirm = /activat|confirm|verif/i.test(payload);

      if (needsConfirm) {
        lastSendRef.current = Date.now();
        setStatus(t('contact.confirmOnce'));
        return;
      }

      if (!response.ok || data.success === 'false' || data.success === false) {
        throw new Error('formsubmit');
      }

      lastSendRef.current = Date.now();
      setStatus(t('contact.sent'));
      setMessage('');
    } catch {
      openMailto();
      setStatus(t('contact.mailFallback'));
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">{t('contact.title')}</h2>
      <p className="contact-copy">
        {t('contact.copy')}
      </p>

      <a
        className="discord-cta"
        href="https://discord.gg/8zuG68qvvv"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="discord-cta__badge">{t('contact.badge')}</span>
        <div className="discord-cta__copy">
          <strong>{t('contact.discord')}</strong>
          <p>{t('contact.discordCopy')}</p>
        </div>
        <span className="discord-cta__button">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M19.27 5.33A17.2 17.2 0 0 0 15.07 4c-.18.32-.39.76-.53 1.1a16.1 16.1 0 0 0-5.08 0A10 10 0 0 0 8.93 4a17.3 17.3 0 0 0-4.22 1.34C1.78 9.05 1.17 12.66 1.48 16.22A17.4 17.4 0 0 0 6.9 18.5c.36-.49.68-1.01.96-1.56-.53-.2-1.04-.44-1.52-.72.13-.1.25-.2.37-.3 2.92 1.36 6.08 1.36 8.97 0 .12.1.24.2.37.3-.48.28-.99.52-1.52.72.28.55.6 1.07.96 1.56a17.3 17.3 0 0 0 5.42-2.28c.37-4.14-.63-7.72-2.64-10.89ZM8.68 14.33c-.88 0-1.6-.82-1.6-1.82s.71-1.82 1.6-1.82 1.61.82 1.61 1.82-.72 1.82-1.61 1.82Zm6.64 0c-.88 0-1.6-.82-1.6-1.82s.71-1.82 1.6-1.82 1.61.82 1.61 1.82-.73 1.82-1.61 1.82Z"
            />
          </svg>
          {t('contact.join')}
        </span>
      </a>

      <form
        className="contact-form"
        action={`https://formsubmit.co/${formSubmitPath}`}
        method="POST"
        onSubmit={handleEmail}
      >
        <input type="hidden" name="_subject" value="Contacto desde la web — Clareny" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_honey" value="" />
        <div className="contact-form__row">
          <label className="contact-form__field">
            <span>{t('contact.name')}</span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              placeholder={t('contact.namePh')}
              maxLength={LIMITS.name}
              value={name}
              onChange={(e) => setName(clip(e.target.value, LIMITS.name))}
            />
          </label>
          <label className="contact-form__field">
            <span>{t('contact.email')}</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder={t('contact.emailPh')}
              maxLength={LIMITS.email}
              value={senderEmail}
              onChange={(e) => setSenderEmail(clip(e.target.value, LIMITS.email))}
            />
          </label>
        </div>

        <label className="contact-form__honeypot" aria-hidden="true">
          <span>Empresa</span>
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>

        <label className="contact-form__field">
          <span>{t('contact.message')}</span>
          <textarea
            name="message"
            rows="4"
            required
            maxLength={LIMITS.message}
            placeholder={t('contact.messagePh')}
            value={message}
            onChange={(e) => {
              setMessage(clip(e.target.value, LIMITS.message));
              if (status) setStatus('');
            }}
          />
        </label>

        <div className="contact-form__actions">
          <button className="btn btn-outline-light btn-lg" type="submit" disabled={sending}>
            {sending ? t('contact.sending') : t('contact.sendMail')}
          </button>
          <a
            className="btn btn-primary btn-lg"
            href={message.trim() ? buildWhatsAppLink() : `https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsApp}
          >
            {t('contact.sendWa')}
          </a>
        </div>

        {status ? <p className="contact-form__status" role="status">{status}</p> : null}
      </form>

      <p className="contact-note">{t('contact.note')}</p>
    </section>
  );
}
