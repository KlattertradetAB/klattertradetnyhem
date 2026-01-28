
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { themes } from '../themes';

type ColorMode = 'light' | 'dark';

interface ThemeContextType {
  themeName: string;
  setThemeName: (name: string) => void;
  colorMode: ColorMode;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getInitialColorMode = (): ColorMode => {
    try {
        const storedMode = window.localStorage.getItem('app-color-mode');
        if (storedMode === 'light' || storedMode === 'dark') {
            return storedMode;
        }
    } catch (error) {
        console.warn('Could not read color mode from localStorage', error);
    }
    // Default to dark mode if nothing is set in localStorage
    return 'dark';
};


export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState(() => {
    try {
      const storedTheme = window.localStorage.getItem('app-theme');
      return storedTheme && themes[storedTheme] ? storedTheme : 'default';
    } catch (error) {
      console.warn('Could not read theme from localStorage', error);
      return 'default';
    }
  });

  const [colorMode, setColorMode] = useState<ColorMode>(getInitialColorMode);

  useEffect(() => {
    const theme = themes[themeName];
    if (theme) {
      const root = document.documentElement;
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
      });
      try {
        window.localStorage.setItem('app-theme', themeName);
      } catch (error) {
        console.error('Failed to save theme to localStorage', error);
      }
    }
  }, [themeName]);

  useEffect(() => {
    const root = document.documentElement;
    if (colorMode === 'dark') {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }
    try {
        window.localStorage.setItem('app-color-mode', colorMode);
    } catch (error) {
        console.error('Failed to save color mode to localStorage', error);
    }
  }, [colorMode]);

  const toggleColorMode = useCallback(() => {
    setColorMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo(() => ({ themeName, setThemeName, colorMode, toggleColorMode }), [themeName, colorMode, toggleColorMode]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
