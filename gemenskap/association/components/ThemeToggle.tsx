import React from 'react';
import { useTheme } from '../hooks';
import ThemeToggleUI from '../../../components/ui/ThemeToggle';

const ThemeToggle: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const isDarkMode = theme === 'dark';

    return (
        <ThemeToggleUI 
            isDarkMode={isDarkMode} 
            onToggle={() => setTheme(isDarkMode ? 'light' : 'dark')}
            className="transform scale-50 origin-center"
            size={60}
        />
    );
};

export default ThemeToggle;
