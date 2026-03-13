export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

export enum Section {
  HOME = 'HOME',
  PILLARS = 'PILLARS',
  CHECKLIST = 'CHECKLIST'
}