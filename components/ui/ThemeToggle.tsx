import React from 'react';
import './ModernThemeToggle.css';

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
  className?: string;
  size?: number;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, onToggle, className = "", size = 60 }) => {
  const switchId = React.useId();
  // We can calculate scale if size is provided (default 60 height)
  const scale = size / 60;

  return (
    <div 
      className={`modern-theme-container ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}
    >
        <input 
          type="checkbox" 
          id={switchId}
          className="modern-theme-checkbox" 
          checked={isDarkMode}
          onChange={onToggle}
        />
        <label htmlFor={switchId} className="modern-theme-label" aria-label="Toggle Dark Mode"></label>
    </div>
  );
};

export default ThemeToggle;
