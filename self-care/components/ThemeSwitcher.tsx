import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { themes } from '../themes';
import { SunIcon, MoonIcon } from './icons';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from '../../components/ui/ThemeToggle';

const ThemeSwitcher: React.FC = () => {
  const { themeName, setThemeName, colorMode, toggleColorMode } = useTheme();

  return (
    <div className="flex items-center justify-center p-1.5 bg-white/20 dark:bg-black/10 backdrop-blur-lg rounded-full shadow-lg border border-white/30 dark:border-white/20">
      <div className="flex items-center gap-x-4">
            {/* Dark/Light Mode Toggle */}
            <div className="flex items-center justify-center gap-2">
                <ThemeToggle 
                  isDarkMode={colorMode === 'dark'} 
                  onToggle={toggleColorMode} 
                  size={46}
                />
            </div>

            {/* Theme Circles */}
            <div className="flex items-center justify-center gap-2">
                {Object.values(themes).map((theme) => (
                    <button
                    key={theme.name}
                    title={theme.displayName}
                    onClick={() => setThemeName(theme.name)}
                    className={`w-6 h-6 rounded-full transition-transform transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-secondary dark:focus-visible:ring-offset-gray-800 backdrop-blur-sm border-2 border-white/40 dark:border-white/20 ${
                        themeName === theme.name ? 'ring-2 ring-offset-2 ring-brand-secondary ring-offset-slate-100 dark:ring-offset-gray-800' : ''
                    }`}
                    style={{ backgroundColor: `rgba(${theme.colors['brand-primary']}, 0.4)` }}
                    aria-pressed={themeName === theme.name}
                    >
                    <span className="sr-only">Set theme to {theme.displayName}</span>
                    </button>
                ))}
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />
        </div>
    </div>
  );
};

export default ThemeSwitcher;