import React from 'react';
import { useTheme } from '../hooks';
import '../../../components/ui/ModernThemeToggle.css';

const ThemeToggle: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const isDarkMode = theme === 'dark';
    const switchId = React.useId();

    return (
        <div className="modern-theme-container transform scale-50 origin-center p-2">
            <input 
              type="checkbox" 
              id={switchId}
              className="modern-theme-checkbox" 
              checked={isDarkMode}
              onChange={() => setTheme(isDarkMode ? 'light' : 'dark')}
            />
            <label htmlFor={switchId} className="modern-theme-label" aria-label="Toggle Dark Mode"></label>
        </div>
    );
};

export default ThemeToggle;
