export interface Theme {
  name: string;
  displayName: string;
  colors: {
    'brand-primary': string;
    'brand-secondary': string;
    'brand-accent': string;
    'brand-light': string;
    'brand-text': string;
    'brand-dark-bg': string;
    'brand-dark-text': string;
    'brand-dark-surface': string;
  };
}

export const themes: Record<string, Theme> = {
  default: {
    name: 'default',
    displayName: 'Ocean',
    colors: {
      'brand-primary': '30 58 138',
      'brand-secondary': '59 130 246',
      'brand-accent': '147 197 253',
      'brand-light': '239 246 255',
      'brand-text': '17 24 39',
      'brand-dark-bg': '17 24 39',
      'brand-dark-text': '243 244 246',
      'brand-dark-surface': '31 41 55',
    },
  },
  sunset: {
    name: 'sunset',
    displayName: 'Sunset',
    colors: {
      'brand-primary': '194 65 12',
      'brand-secondary': '249 115 22',
      'brand-accent': '253 186 116',
      'brand-light': '255 247 237',
      'brand-text': '28 25 23',
      'brand-dark-bg': '28 25 23',
      'brand-dark-text': '255 237 213',
      'brand-dark-surface': '68 64 60',
    },
  },
};
