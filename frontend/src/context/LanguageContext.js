import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import translations from '@/i18n/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('kkemi-lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('kkemi-lang', lang);
    document.documentElement.lang = lang === 'el' ? 'el' : lang === 'ru' ? 'ru' : 'en';
  }, [lang]);

  const t = useCallback((path) => {
    const keys = path.split('.');
    let result = translations[lang];
    for (const key of keys) {
      if (result === undefined) return path;
      result = result[key];
    }
    return result || path;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
