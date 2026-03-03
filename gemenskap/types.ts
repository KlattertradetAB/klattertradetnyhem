
export interface Profile {
  id: string;
  email: string | null;
  membership_level?: number | null;
  membership_active?: boolean | null;
  full_name: string | null;
  role?: string | null;
  avatar_url?: string | null;
  notifications_enabled?: boolean | null;
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
