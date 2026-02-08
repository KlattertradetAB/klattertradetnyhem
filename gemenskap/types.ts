
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

export interface Thread {
  id: string;
  title: string;
  description: string;
  category: string;
  created_at: string;
  user_id: string;
  author_name?: string; // Optional, can be joined or fetched separately
  views?: number;
  replies_count?: number;
}

export interface DbBlog {
  id: string;
  title: string;
  description: string;
  content: string;
  image_url?: string;
  author_name: string;
  user_id: string;
  created_at: string;
  views?: number;
}
