
export interface Profile {
  id: string;
  email: string;
  membership_level?: number;
  membership_active?: boolean;
  full_name: string;
  role?: string;
  avatar_url?: string;
  notifications_enabled?: boolean;
}

export enum AuthStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  AUTHENTICATED = 'AUTHENTICATED',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  ERROR = 'ERROR'
}

export interface ChatMessage {
  id?: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  edit_count?: number;
  is_edited?: boolean;
}
