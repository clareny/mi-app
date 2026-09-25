import { createContext, useContext, useEffect, useState } from 'react';
import en from '../i18n/en.json';
import es from '../i18n/es.json';

const LanguageContext = createContext({
  language: 'es',
  setLanguage: () => {},
  t: (key) => key,
});

const translations = { es, en };

const readText = (tree, key) => {
  const value = key.split('.').reduce((acc, part) => acc?.[part], tree);
  return typeof value === 'string' && value.trim() ? value : '';
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

  const t = (key) => {
    const current = readText(translations[language], key);
    if (current) return current;
    const other = readText(translations[language === 'en' ? 'es' : 'en'], key);
    return other || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
