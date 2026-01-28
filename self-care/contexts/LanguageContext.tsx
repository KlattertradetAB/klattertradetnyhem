import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { LanguageCode } from '../types';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getInitialLanguage = (): LanguageCode => {
    try {
        const storedLang = window.localStorage.getItem('app-language');
        if (storedLang && ['sv', 'en', 'ar', 'fi', 'es', 'de'].includes(storedLang)) {
            return storedLang as LanguageCode;
        }
    } catch (error) {
        console.warn('Could not read language from localStorage', error);
    }
    // Default to Swedish if nothing is set in localStorage
    return 'sv';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(getInitialLanguage);

  useEffect(() => {
    try {
        window.localStorage.setItem('app-language', language);
        document.documentElement.lang = language;
        // Set text direction for Arabic
        if (language === 'ar') {
            document.documentElement.dir = 'rtl';
        } else {
            document.documentElement.dir = 'ltr';
        }
    } catch (error) {
        console.error('Failed to save language to localStorage', error);
    }
  }, [language]);

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang);
  }, []);

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};