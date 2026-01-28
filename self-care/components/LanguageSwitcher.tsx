import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { LanguageCode } from '../types';
import { SwedenFlag, UKFlag, ArabLeagueFlag, FinlandFlag, SpainFlag, GermanyFlag, ChevronDownIcon } from './flags';

interface LanguageOption {
  code: LanguageCode;
  name: string;
  flag: React.FC<React.SVGProps<SVGSVGElement>>;
}

const languageOptions: LanguageOption[] = [
  { code: 'sv', name: 'Svenska', flag: SwedenFlag },
  { code: 'en', name: 'English', flag: UKFlag },
  { code: 'ar', name: 'العربية', flag: ArabLeagueFlag },
  { code: 'fi', name: 'Suomi', flag: FinlandFlag },
  { code: 'es', name: 'Español', flag: SpainFlag },
  { code: 'de', name: 'Deutsch', flag: GermanyFlag },
];

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLanguage = languageOptions.find(opt => opt.code === language) || languageOptions[0];

  const handleLanguageChange = (langCode: LanguageCode) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-white/20 dark:bg-black/10 backdrop-blur-lg rounded-full border border-white/30 dark:border-white/20 shadow-lg hover:bg-white/40 dark:hover:bg-black/20 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-gray-800"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <selectedLanguage.flag className="w-5 h-5 rounded-full object-cover" />
        <ChevronDownIcon className={`w-4 h-4 text-gray-600 dark:text-gray-300 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-40 bg-white/20 dark:bg-black/10 backdrop-blur-xl rounded-xl shadow-2xl border border-white/30 dark:border-white/20 overflow-hidden z-10 animate-fade-in-up">
          <ul className="py-1" role="menu" aria-orientation="vertical">
            {languageOptions.map(option => (
              <li key={option.code} role="presentation">
                <button
                  onClick={() => handleLanguageChange(option.code)}
                  role="menuitem"
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors duration-200 ${
                    language === option.code
                      ? 'bg-white/30 dark:bg-white/20 text-brand-primary dark:text-slate-100 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10'
                  }`}
                >
                  <option.flag className="w-5 h-5 rounded-full object-cover" />
                  <span>{option.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <style>{`
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LanguageSwitcher;