import React, { createContext, useContext, useState, useEffect } from 'react';
import { sv } from '../translations/sv';
import { en } from '../translations/en';

export type Lang = 'sv' | 'en';

interface LanguageContextType {
    lang: Lang;
    setLang: (lang: Lang) => void;
    t: typeof sv;
}

const LanguageContext = createContext<LanguageContextType>({
    lang: 'sv',
    setLang: () => { },
    t: sv,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lang, setLangState] = useState<Lang>(() => {
        const saved = localStorage.getItem('site-lang');
        return (saved === 'en' ? 'en' : 'sv') as Lang;
    });

    const setLang = (newLang: Lang) => {
        setLangState(newLang);
        localStorage.setItem('site-lang', newLang);
    };

    const t = lang === 'en' ? en : sv;

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
