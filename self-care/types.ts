export type LanguageCode = 'sv' | 'en' | 'ar' | 'fi' | 'es' | 'de';

export interface Question {
  id: number;
  category: Partial<Record<LanguageCode, string>>;
  categoryCode: string;
  text: Partial<Record<LanguageCode, string>>;
  options: Partial<Record<LanguageCode, string[]>>;
}

export interface TranslatedQuestion {
  id: number;
  category: string;
  categoryCode: string;
  text: string;
  options: string[];
}

export interface WoundScore {
  name: string;
  score: number;
  description: string;
  code: string;
  [key: string]: any;
}

export interface AnalysisResult {
  primaryWound: WoundScore;
  secondaryWounds: WoundScore[];
  summary: string;
  allScores: WoundScore[];
}
