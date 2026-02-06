export type Theme = 'light' | 'sepia' | 'dark';

export interface ThemeColors {
  '--bg-color': string;
  '--text-color': string;
  '--accent-color': string;
  '--secondary-text': string;
  '--border-color': string;
  '--paper-shadow': string;
  '--info-green-dark': string;
  '--info-green-light': string;
  '--info-bg-summary': string;
  '--info-text-summary': string;
  // Chart colors
  '--blue-500': string;
  '--blue-100': string;
  '--red-500': string;
  '--red-100': string;
  '--orange-500': string;
  '--orange-100': string;
  '--purple-500': string;
  '--purple-100': string;
  // Helper for background outside book
  '--app-bg': string;
}
