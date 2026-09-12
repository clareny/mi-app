// Context para manejar el idioma en toda la aplicación
import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  es: {
    // Navbar
    nav: {
      discography: 'discografía',
      services: 'servicios',
      bio: 'bio',
      contact: 'contacto',
    },
    // Home/Portfolio
    home: {
      discography: 'Discography',
      hireForMixing: 'contratar mezcla',
      hireForBeats: 'contratar beats',
    },
    // Services
    services: {
      vocal: 'Vocal',
      beats: 'Beats',
      recordingAndMixing: 'Grabación + mezcla',
      remakeAndCustomBeat: 'Remake + custom beat',
      chooseApproach: 'Elegí el enfoque',
      recording: 'Grabación de voces',
      recordingDesc: 'Voz limpia y estable para grabar con claridad.',
      editing: 'Edición vocal',
      editingDesc: 'Afinación, recorte y pulido para una entrega más sólida.',
      mixing: 'Mezcla vocal',
      mixingDesc: 'Sonido más amplio, equilibrado y listo para lanzar.',
      remake: 'Remake',
      remakeDesc: 'Adaptación del estilo a la idea del proyecto.',
      customBeat: 'Custom beat',
      customBeatDesc: 'Beat original a medida según la referencia.',
      whatDoYouNeed: 'Qué necesitás?',
      whatStyleLooking: 'Qué estilo buscas?',
      hireMixing: 'contratar mezcla',
      hireBeat: 'contratar beat',
    },
    // About
    about: {
      title: 'Clareny',
      description: 'Hola, soy Clareny. Me gusta trabajar en ideas profundas, con una intención clara y un sonido que conecte más allá de lo superficial. Llevo años acompañando artistas y proyectos con una mirada creativa y técnica, cuidando cada detalle para que la música se sienta auténtica, clara y memorable. Me interesa transformar ideas en experiencias sonoras con identidad propia, con sensibilidad, rigor y una visión más grande que el simple resultado final.',
    },
    // Contact
    contact: {
      title: 'Contacto',
      description: 'Si querés trabajar conmigo, mandame WhatsApp con lo que necesitás y te respondo con una propuesta acorde a la idea. También podés reservar una videollamada por Discord para hablar ideas, escuchar referencias y resolver dudas antes de arrancar.',
      importantNotice: 'Aviso importante',
      noticeText: 'Toda sesión de trabajo se realizará por Discord en una videollamada de uno a uno, para mantener el proceso claro, directo y profesional.',
      pricesNotice: 'Los precios se ajustan según el proyecto, la complejidad y el alcance del trabajo. Escribime y te paso una propuesta acorde a lo que necesitás.',
      sendWhatsApp: 'Enviar WhatsApp',
      joinDiscord: 'Entrar a Discord',
    },
  },
  en: {
    // Navbar
    nav: {
      discography: 'discography',
      services: 'services',
      bio: 'bio',
      contact: 'contact',
    },
    // Home/Portfolio
    home: {
      discography: 'Discography',
      hireForMixing: 'hire for mixing',
      hireForBeats: 'hire for beats',
    },
    // Services
    services: {
      vocal: 'Vocal',
      beats: 'Beats',
      recordingAndMixing: 'Recording + mixing',
      remakeAndCustomBeat: 'Remake + custom beat',
      chooseApproach: 'Choose your approach',
      recording: 'Voice recording',
      recordingDesc: 'Clean and stable voice for clear recording.',
      editing: 'Vocal editing',
      editingDesc: 'Tuning, trimming and polishing for a more solid delivery.',
      mixing: 'Vocal mixing',
      mixingDesc: 'Wider, balanced sound ready to release.',
      remake: 'Remake',
      remakeDesc: 'Style adaptation to the project idea.',
      customBeat: 'Custom beat',
      customBeatDesc: 'Original custom beat according to reference.',
      whatDoYouNeed: 'What do you need?',
      whatStyleLooking: 'What style are you looking for?',
      hireMixing: 'hire mixing',
      hireBeat: 'hire beat',
    },
    // About
    about: {
      title: 'Clareny',
      description: "Hi, I'm Clareny. I like working on deep ideas, with clear intention and a sound that connects beyond the superficial. I've been accompanying artists and projects for years with a creative and technical perspective, taking care of every detail so that the music feels authentic, clear and memorable. I'm interested in transforming ideas into sound experiences with their own identity, with sensitivity, rigor and a vision greater than the simple final result.",
    },
    // Contact
    contact: {
      title: 'Contact',
      description: 'If you want to work with me, send me a WhatsApp with what you need and I\'ll respond with a proposal according to the idea. You can also book a video call on Discord to discuss ideas, listen to references and resolve doubts before starting.',
      importantNotice: 'Important notice',
      noticeText: 'All work sessions will be conducted via Discord in a one-on-one video call, to keep the process clear, direct and professional.',
      pricesNotice: 'Prices are adjusted according to the project, complexity and scope of work. Write me and I\'ll send you a proposal according to what you need.',
      sendWhatsApp: 'Send WhatsApp',
      joinDiscord: 'Join Discord',
    },
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('es');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
