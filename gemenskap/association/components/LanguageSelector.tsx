import React from 'react';
import { useTranslations } from '../hooks';

const LanguageSelector: React.FC = () => {
    const { lang, setLang } = useTranslations();
    return (
        <div className="flex items-center gap-x-1 p-1 rounded-full bg-slate-800">
            {(['sv', 'en'] as const).map((l) => (
                <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${
                        lang === l
                            ? 'bg-cyan-500 text-white'
                            : 'text-slate-400 hover:bg-slate-700'
                    }`}
                >
                    {l.toUpperCase()}
                </button>
            ))}
        </div>
    );
};

export default LanguageSelector;
