
/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Please check .env.local');
}

// Fallback dummy client to prevent crash if env vars are missing
const MockClient = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    startAutoRefresh: () => { },
    stopAutoRefresh: () => { },
  },
  from: () => ({
    select: () => ({
      eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }),
      insert: () => Promise.resolve({ data: null, error: null }),
      upsert: () => Promise.resolve({ data: null, error: null }),
    }),
  }),
  channel: () => ({
    on: () => ({ subscribe: () => { } }),
    unsubscribe: () => { },
  }),
  removeChannel: () => { },
} as any;

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : MockClient;
