
export enum Page {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  CHAT = 'CHAT',
  THERAPY = 'THERAPY',
  GROUP_THERAPY = 'GROUP_THERAPY',
  GESTALT_TRAINING = 'GESTALT_TRAINING',
  BEHANDLINGS_ASSISTENT = 'BEHANDLINGS_ASSISTENT',
  BLOG = 'BLOG',
  COMMUNITY = 'COMMUNITY',
  CONTACT = 'CONTACT',
  SURVEY = 'SURVEY',
  DOWNLOADS = 'DOWNLOADS',
  LOGIN = 'LOGIN',
  GEMENSKAP_APP = 'GEMENSKAP_APP',
  BOOK = 'BOOK',
  CHECKOUT = 'CHECKOUT',
  PRIVACY = 'PRIVACY',
  TERMS = 'TERMS',
  COOKIE_POLICY = 'COOKIE_POLICY',
  PREMIUM_APPLICATION = 'PREMIUM_APPLICATION',
  FREE_REGISTRATION = 'FREE_REGISTRATION'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initial: string;
}

export interface StatData {
  name: string;
  value: number;
}
