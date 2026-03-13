import { createContext, useContext } from 'react';
import { translations } from '../translations';

// --- Theme ---
export type Theme = 'light' | 'dark';
export interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}
export const ThemeContext = createContext<ThemeContextType | null>(null);
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};

// --- Language ---
export type Language = 'sv' | 'en';
export interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    t: (typeof translations)['sv'];
}
export const LanguageContext = createContext<LanguageContextType | null>(null);
export const useTranslations = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useTranslations must be used within a LanguageProvider");
    return context;
};
