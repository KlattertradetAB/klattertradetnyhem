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

export type EmotionalState = 'Regulated' | 'Compensated' | 'Overwhelmed';

export interface EmotionalStatus {
  state: EmotionalState;
  score: number;
  description: string;
}

export interface AnalysisResult {
  primaryWound: WoundScore;
  secondaryWound: WoundScore; // The second highest wound
  emotionalState: EmotionalStatus;
  secondaryWounds: WoundScore[]; // Remaining wounds, possibly empty or just the rest
  summary: string;
  allScores: WoundScore[];
}
