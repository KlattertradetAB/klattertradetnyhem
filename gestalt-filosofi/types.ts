
export interface QuestionData {
  id: string;
  label: string;
  placeholder?: string;
  type: 'textarea' | 'text';
}

export interface SectionData {
  id: string;
  title: string;
  description: string;
  questions: QuestionData[];
}

export interface CaseStudyData {
  id: string;
  title: string;
  situation: string;
  questions: QuestionData[];
}

export interface AppState {
  answers: Record<string, string>;
  isAiLoading: boolean;
  aiResponse: string | null;
}
