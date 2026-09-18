import { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext({
  language: 'es',
  setLanguage: () => {},
  t: (key) => key,
});

const translations = {
  es: {
    nav: {
      discography: 'discografía',
      services: 'servicios',
      bio: 'bio',
      contact: 'contacto',
      lang: 'Idioma',
    },
    home: {
      hireLead: 'hoy suena tu',
      wordBeat: 'beat',
      wordMix: 'mezcla',
      wordSong: 'canción',
      hireAria: 'Ir a servicios: contratá un beat, una mezcla o una canción',
    },
    mix: {
      eyebrow: 'Producción',
      copy: 'Hice un remake del beat y la mezcla vocal.',
      before: 'Antes',
      after: 'Después',
      beforeCap: 'Maqueta · idea original',
      afterCap: 'Remake + voces mezcladas · hasta 2:07',
    },
    services: {
      combo: 'Combo',
      vocal: 'mezcla',
      beats: 'Beats',
      flag: 'Especial',
      comboTag: 'Enfoque íntimo',
      comboHook: 'Una canción con conexión propia: el color del artista, no un molde. Producción completa, mezcla vocal creativa y un beat que se arma como un puzzle.',
      scope: 'Sesión',
      scopeVal: 'Virtual o presencial',
      includes: 'Incluye',
      includesVal: 'Producción + mezcla vocal',
      focus: 'El beat',
      focusVal: 'Modificable, como un puzzle',
      delivery: 'Si es virtual',
      deliveryVal: 'Grabás vos o en un estudio',
      hireCombo: 'contratar identidad',
      comboPh: 'Contame la canción, referencias, cómo la querés sentir...',
      vocalTag: 'Vocals mix/grabación/upgrade beat.',
      vocalHook: 'Elegí el tramo: grabar, editar, mezclar o subir el beat. Cada uno es un contrato distinto.',
      rec: 'Grabación',
      recCopy: 'Si buscás dónde grabar, contratá grabación. Registramos las voces para después editar y mezclar.',
      edit: 'Edición',
      editCopy: 'Si ya tenés las voces y solo querés algo puntual: por secciones, afinación, tempo o limpieza vocal.',
      mix: 'Mezcla vocal',
      mixCopy: 'Si ya tenés las voces, contratá mezcla vocal. Quedan con el color que querés sobre tu beat.',
      upgrade: 'Upgrade beat',
      upgradeCopy: 'Si el beat lo hiciste vos: se mejora la instrumental y viene con mezcla incluida.',
      vocalPh: 'Contame el tema y cómo lo querés sentir...',
      hireMix: 'contratar mezcla',
      beatsTag: 'Remake o custom',
      beatsHook: 'Remake: recreo el beat y le hago cambios ligeros. Custom: un instrumental nuevo, a tu estilo y a tu idea, para que suenes distinto.',
      remake: 'Remake',
      remakeSpec: 'Recreo el beat, cambios sutiles',
      custom: 'Custom beat',
      customSpec: 'Nuevo, a tu estilo e idea',
      genre: 'Género',
      genrePh: 'Elegí el género',
      key: 'Tonalidad',
      note: 'Nota',
      minor: 'menor',
      major: 'mayor',
      beatPh: 'Referencias, mood...',
      hireBeat: 'contratar instrumental',
    },
    about: {
      kicker: 'Productor e ingeniero de mezcla',
      role: 'GRAYKIDS',
      p1: 'Trabajo con artistas,productores, compositores y escritores desde hace mucho tiempo y lleve mi vida como cantante.Y gracias a ese aprendizaje puedo sentir empatia con otros artistas para sus ideas se hagan realidad en cada creación.',
      p2: 'Produzco canciones. No un molde: sino el color del artista, la conexión, el corte que hace que el tema enganche.',
      p3: 'Como ingeniero de mezcla busco encontrar su propia identidad de cada artista',
      credits: 'Creditos',
    },
    contact: {
      title: 'Contacto',
      copy: 'Escribime desde Montevideo o de afuera. Acá coordinamos. En Discord se escucha y se cierra.',
      badge: 'Estudio en vivo',
      discord: 'Entrar a Discord',
      discordCopy: 'Videollamada uno a uno. Horario, referencias y arrancamos.',
      join: 'Unirme',
      name: 'Nombre',
      namePh: 'Cómo te llamás',
      email: 'Tu correo',
      emailPh: 'para responderte',
      message: 'Mensaje',
      messagePh: 'Contame el proyecto, referencias, plazos o lo que haga falta...',
      sendMail: 'Enviar correo',
      sending: 'Enviando...',
      sendWa: 'Enviar WhatsApp',
      needMsg: 'Escribí un mensaje para enviarlo.',
      needMail: 'Para el correo, dejame tu email así te puedo responder.',
      badMail: 'Ese correo no se ve válido.',
      wait: 'Esperá unos segundos y volvé a intentar.',
      openingWa: 'Abriendo WhatsApp con tu mensaje...',
      sent: 'Listo. El mensaje ya salió por correo.',
      mailFallback: 'Abrí tu correo con el mensaje listo para enviar.',
      note: 'Sesiones uno a uno por Discord. Atención en Montevideo y en remoto.',
    },
    footer: {
      rights: '© 2026 GRAYKIDS. Todos los derechos reservados.',
      meta: 'CEO Clareny · Certificado TLS',
    },
  },
  en: {
    nav: {
      discography: 'discography',
      services: 'services',
      bio: 'bio',
      contact: 'contact',
      lang: 'Language',
    },
    home: {
      hireLead: 'today, your',
      wordBeat: 'beat',
      wordMix: 'mix',
      wordSong: 'song',
      hireAria: 'Go to services: book a beat, a mix or a song',
    },
    mix: {
      eyebrow: 'Production',
      copy: 'I did a beat remake and the vocal mix.',
      before: 'Before',
      after: 'After',
      beforeCap: 'Demo · original idea',
      afterCap: 'Remake + mixed vocals · until 2:07',
    },
    services: {
      combo: 'Combo',
      vocal: 'Vocal',
      beats: 'Beats',
      flag: 'Featured',
      comboTag: 'Intimate focus',
      comboHook: 'A song with your own connection: the artist’s color, not a template. Full production, a creative vocal mix, and a beat you can reshape like a puzzle.',
      scope: 'Session',
      scopeVal: 'Online or in person',
      includes: 'Includes',
      includesVal: 'Production + vocal mix',
      focus: 'The beat',
      focusVal: 'Flexible, like a puzzle',
      delivery: 'If online',
      deliveryVal: 'You record, or a studio does',
      hireCombo: 'book combo',
      comboPh: 'Tell me about the song, references, how you want it to feel...',
      vocalTag: 'Vocals already recorded, or we record them.',
      vocalHook: 'Pick the step: record, edit, mix, or upgrade the beat. Each one is a separate booking.',
      rec: 'Recording',
      recCopy: 'If you need a place to record, book recording. We capture the vocals so they can be edited and mixed after.',
      edit: 'Editing',
      editCopy: 'If you already have vocals and only need something specific: by sections, tuning, timing, or vocal cleanup.',
      mix: 'Vocal mix',
      mixCopy: 'If you already have the vocals, book a vocal mix. They sit on your beat with the color you want.',
      upgrade: 'Upgrade beat',
      upgradeCopy: 'If you made the beat: we lift the instrumental, and mixing is included.',
      vocalPh: 'Tell me about the track and how you want it to feel...',
      hireMix: 'book mixing',
      beatsTag: 'Remake or custom',
      beatsHook: 'Remake: I rebuild the beat and make light changes. Custom: a new instrumental in your style and idea, so you sound like yourself.',
      remake: 'Remake',
      remakeSpec: 'Rebuild the beat, light changes',
      custom: 'Custom beat',
      customSpec: 'New, in your style and idea',
      genre: 'Genre',
      genrePh: 'Pick a genre',
      key: 'Key',
      note: 'Note',
      minor: 'minor',
      major: 'major',
      beatPh: 'References, mood...',
      hireBeat: 'book beat',
    },
    about: {
      kicker: 'Producer and mix engineer',
      role: 'GRAYKIDS',
      p1: 'I have worked with artists, producers, composers and writers for a long time, and I lived my life as a singer. Thanks to that I can feel empathy with other artists so their ideas become real in every creation.',
      p2: 'I produce songs. Not a template: the artist’s color, the connection, the cut that makes the track stick.',
      p3: 'As a mix engineer I look for each artist’s own identity.',
      credits: 'Credits',
    },
    contact: {
      title: 'Contact',
      copy: 'Write from Montevideo or abroad. We coordinate here. On Discord we listen and lock it in.',
      badge: 'Live session',
      discord: 'Join Discord',
      discordCopy: 'One-to-one video call. Time, references, and we start.',
      join: 'Join',
      name: 'Name',
      namePh: 'What should I call you',
      email: 'Your email',
      emailPh: 'so I can reply',
      message: 'Message',
      messagePh: 'Tell me about the project, references, deadlines or whatever you need...',
      sendMail: 'Send email',
      sending: 'Sending...',
      sendWa: 'Send WhatsApp',
      needMsg: 'Write a message to send it.',
      needMail: 'For email, leave your address so I can reply.',
      badMail: 'That email does not look valid.',
      wait: 'Wait a few seconds and try again.',
      openingWa: 'Opening WhatsApp with your message...',
      sent: 'Done. The message went out by email.',
      mailFallback: 'I opened your mail app with the message ready to send.',
      note: 'One-to-one sessions on Discord. Work from Montevideo and remotely.',
    },
    footer: {
      rights: '© 2026 GRAYKIDS. All rights reserved.',
      meta: 'CEO Clareny · TLS secured',
    },
  },
};

const readText = (tree, key) => {
  const value = key.split('.').reduce((acc, part) => acc?.[part], tree);
  return typeof value === 'string' ? value : key;
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('clareny-lang') === 'en' ? 'en' : 'es';
    } catch {
      return 'es';
    }
  });

  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'es';
    try {
      localStorage.setItem('clareny-lang', language);
    } catch {
      /* ignore */
    }
  }, [language]);

  const t = (key) => readText(translations[language], key);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
