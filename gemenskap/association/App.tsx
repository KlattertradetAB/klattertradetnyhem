import React, { useState, useEffect, useMemo } from 'react';
import AppContent from './AppContent';
import { translations } from '../translations';
import { Language, LanguageContext } from './hooks';
import { Theme, ThemeContext } from './hooks';

// --- Main App Component with Providers ---
const App: React.FC = () => {
    // Language state
    const [lang, setLang] = useState<Language>('sv');
    const languageContextValue = useMemo(() => ({
        lang,
        setLang,
        t: translations[lang]
    }), [lang]);

    // Theme state
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedTheme = window.localStorage.getItem('theme');
            if (storedTheme === 'light' || storedTheme === 'dark') {
                return storedTheme;
            }
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
        }
        return 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <LanguageContext.Provider value={languageContextValue}>
                <AppContent />
            </LanguageContext.Provider>
        </ThemeContext.Provider>
    );
};

export default App;
