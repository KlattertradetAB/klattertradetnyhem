import React from 'react';
import { Theme } from '../types';

interface ToolbarProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ currentTheme, onThemeChange }) => {
  return (
    <div className="sticky top-5 z-50 flex gap-4 px-6 py-3 mb-8 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-200">
      <button
        onClick={() => onThemeChange('light')}
        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          currentTheme === 'light' ? 'border-[var(--accent-color)] ring-2 ring-blue-500' : 'border-transparent'
        }`}
        style={{ backgroundColor: '#fff', border: currentTheme === 'light' ? '2px solid #2c3e50' : '1px solid #ddd' }}
        title="Ljust läge"
        aria-label="Ljust läge"
      />
      <button
        onClick={() => onThemeChange('sepia')}
        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
          currentTheme === 'sepia' ? 'border-[var(--accent-color)] ring-2 ring-amber-500' : 'border-transparent'
        }`}
        style={{ backgroundColor: '#f4ecd8' }}
        title="Sepia läge"
        aria-label="Sepia läge"
      />
      <button
        onClick={() => onThemeChange('dark')}
        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
          currentTheme === 'dark' ? 'border-[var(--accent-color)] ring-2 ring-gray-500' : 'border-transparent'
        }`}
        style={{ backgroundColor: '#333' }}
        title="Mörkt läge"
        aria-label="Mörkt läge"
      />
    </div>
  );
};