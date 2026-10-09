import { useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { WHATSAPP_NUMBER } from './planKit';

const CONTACT_EMAIL = 'contact@clareny.com';
// Pegá acá el código largo que FormSubmit manda al confirmar desde clareny.com.
// Con el email a palo, cada origen nuevo (localhost, Pages, clareny.com) pide activar de nuevo.
const FORMSUBMIT_ID = '';
const formSubmitPath = FORMSUBMIT_ID || CONTACT_EMAIL;
const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 80, email: 120, message: 2000 };
const SEND_COOLDOWN_MS = 12000;
const MIN_FILL_MS = 2800;
const MIN_MESSAGE = 12;
const MAX_LINKS = 2;
const FORMSUBMIT_BLACKLIST = 'crypto,bitcoin,casino,viagra,backlink,forex,préstamo,prestamo';
const LINK_RE = /https?:\/\/[^\s]+|www\.[^\s]+|t\.me\/[^\s]+/gi;
const BAD_LINK_RE = /bit\.ly|tinyurl|t\.co\/|rb\.gy|cutt\.ly|ow\.ly|is\.gd|javascript:|data:text|file:|\.exe\b|\.zip\b|\.apk\b/i;
const PROMO_RE = /crypto|bitcoin|forex|casino|viagra|seo\s|backlink|work from home|gana dinero|préstamo|prestamo|inversion garantiz|followers cheap|buy now|limited offer|telegram\.me/i;

const clip = (value, max) => value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').slice(0, max);

const screenMessage = (text) => {
  const value = text.trim();
  if (value.length < MIN_MESSAGE) return 'tooShort';
  if (BAD_LINK_RE.test(value)) return 'blocked';
  if ((value.match(LINK_RE) || []).length > MAX_LINKS) return 'blocked';
  if (PROMO_RE.test(value)) return 'blocked';
  return '';
};

export default function Contact() {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const lastSendRef = useRef(0);
  const openedAtRef = useRef(Date.now());

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
    const block = screenMessage(message);
    if (block) {
      setStatus(t(`contact.${block}`));
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
    const block = screenMessage(message);
    if (block) {
      setStatus(t(`contact.${block}`));
      return;
    }
    if (Date.now() - openedAtRef.current < MIN_FILL_MS) {
      setStatus(t('contact.blocked'));
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
          _blacklist: FORMSUBMIT_BLACKLIST,
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
      setStatus('');
      setMessage('');
      setSent(true);
    } catch {
      openMailto();
      setStatus(t('contact.mailFallback'));
    } finally {
      setSending(false);
    }
  };

  const writeAgain = () => {
    openedAtRef.current = Date.now();
    setSent(false);
  };

  return (
    <section id="contact" className="contact-section editorial-contact">
      <section className="studio-band">
        <div className="studio-band__copy">
          <p className="ed-kicker">{t('contact.badge')}</p>
          <h2>{t('contact.discordTitle')}</h2>
          <p>{t('contact.discordCopy')}</p>
          <a
            className="ed-btn ed-btn--fill"
            href="https://discord.gg/8zuG68qvvv"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('contact.discord')}
          </a>
        </div>
        <aside className="studio-band__side">
          <strong>
            <span>{t('contact.discordSide1')}</span>
            <span>{t('contact.discordSide2')}</span>
          </strong>
          <p>{t('contact.discordMeta')}</p>
        </aside>
      </section>

      <div className="contact-layout">
      <div className="contact-invite">
        <p className="ed-kicker">{t('contact.kicker')}</p>
        <h2>
          <span>{t('contact.title1')}</span>
          <span>{t('contact.title2')}</span>
          <span>{t('contact.title3')}</span>
        </h2>
        <p>{t('contact.copy')}</p>
        <div className="contact-channels">
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL} ↗</a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">WHATSAPP / +598 97 989 368</a>
        </div>
      </div>

      <form
        className="contact-form"
        action={`https://formsubmit.co/${formSubmitPath}`}
        method="POST"
        onSubmit={handleEmail}
      >
        {sent ? (
          <div className="contact-success" role="status">
            <p className="ed-kicker">{t('contact.sentKicker')}</p>
            <p className="contact-success__title">{t('contact.sentTitle')}</p>
            <p className="contact-success__copy">{t('contact.sentCopy')}</p>
            {senderEmail.trim() ? (
              <p className="contact-success__reply">
                <span>{t('contact.replyTo')}</span>
                {senderEmail.trim()}
              </p>
            ) : null}
            <button type="button" className="ed-btn ed-btn--line" onClick={writeAgain}>
              {t('contact.writeAgain')}
            </button>
          </div>
        ) : (
          <>
            <p className="contact-form__title">{t('contact.formTitle')}</p>
            <input type="hidden" name="_subject" value="Contacto desde la web — Clareny" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_honey" value="" />
            <input type="hidden" name="_blacklist" value={FORMSUBMIT_BLACKLIST} />
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

            <label className="contact-form__field contact-form__field--message">
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
              <button type="submit" className="ed-btn ed-btn--fill" disabled={sending}>
                {sending ? t('contact.sending') : t('contact.sendMail')}
              </button>
              <a
                className="ed-btn ed-btn--line"
                href={message.trim() ? buildWhatsAppLink() : `https://wa.me/${WHATSAPP_NUMBER}`}
                onClick={handleWhatsApp}
              >
                {t('contact.sendWa')}
              </a>
            </div>

            {status ? <p className="contact-form__status" role="status">{status}</p> : null}
            <p className="contact-note">{t('contact.note')}</p>
          </>
        )}
      </form>
      </div>
    </section>
  );
}
