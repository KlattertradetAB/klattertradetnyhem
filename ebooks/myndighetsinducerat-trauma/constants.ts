import { Theme, ThemeColors } from './types';

const COMMON_COLORS = {
  '--blue-500': '#3b82f6',
  '--blue-100': '#eff6ff',
  '--red-500': '#ef4444',
  '--red-100': '#fef2f2',
  '--orange-500': '#f97316',
  '--orange-100': '#fff7ed',
  '--purple-500': '#a855f7',
  '--purple-100': '#faf5ff',
};

export const THEMES: Record<Theme, ThemeColors> = {
  light: {
    ...COMMON_COLORS,
    '--bg-color': '#fdfdfd',
    '--text-color': '#333333',
    '--accent-color': '#2c3e50',
    '--secondary-text': '#666',
    '--border-color': '#eee',
    '--paper-shadow': '0 4px 20px rgba(0,0,0,0.1)',
    '--info-green-dark': '#3f684c',
    '--info-green-light': '#4b8a66',
    '--info-bg-summary': '#e0f2f1',
    '--info-text-summary': '#0f482d',
    '--app-bg': '#eef2f5',
  },
  sepia: {
    ...COMMON_COLORS,
    '--bg-color': '#f4ecd8',
    '--text-color': '#5b4636',
    '--accent-color': '#463426',
    '--secondary-text': '#7a6652',
    '--border-color': '#e0d6c0',
    '--paper-shadow': '0 4px 20px rgba(60, 50, 40, 0.15)',
    '--info-green-dark': '#3f684c', // Keep contrast
    '--info-green-light': '#4b8a66',
    '--info-bg-summary': '#e8e0cc',
    '--info-text-summary': '#3d2f24',
    '--app-bg': '#e4dcc8',
  },
  dark: {
    ...COMMON_COLORS,
    '--bg-color': '#1a1a1a',
    '--text-color': '#e0e0e0',
    '--accent-color': '#4da6ff',
    '--secondary-text': '#aaaaaa',
    '--border-color': '#333',
    '--paper-shadow': '0 4px 20px rgba(0,0,0,0.5)',
    '--info-green-dark': '#2d4a36',
    '--info-green-light': '#6eb58d',
    '--info-bg-summary': '#25332e',
    '--info-text-summary': '#a7f3d0',
    '--app-bg': '#111111',
    // Override chart backgrounds for dark mode legibility if needed
    '--blue-100': 'rgba(59, 130, 246, 0.2)',
    '--red-100': 'rgba(239, 68, 68, 0.2)',
    '--orange-100': 'rgba(249, 115, 22, 0.2)',
    '--purple-100': 'rgba(168, 85, 247, 0.2)',
  },
};
