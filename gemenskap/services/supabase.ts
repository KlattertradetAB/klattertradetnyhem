
/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

let supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
let supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fix for common Vercel configuration error where value includes the key
if (supabaseUrl && supabaseUrl.startsWith('VITE_SUPABASE_URL=')) {
  console.warn('Detected malformed VITE_SUPABASE_URL. Attempting to fix...');
  supabaseUrl = supabaseUrl.replace('VITE_SUPABASE_URL=', '');
}

if (supabaseAnonKey && supabaseAnonKey.startsWith('VITE_SUPABASE_ANON_KEY=')) {
  console.warn('Detected malformed VITE_SUPABASE_ANON_KEY. Attempting to fix...');
  supabaseAnonKey = supabaseAnonKey.replace('VITE_SUPABASE_ANON_KEY=', '');
}



console.log('Supabase initializing with URL:', supabaseUrl);

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

let client;
try {
  client = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : MockClient;
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
  client = MockClient;
}

export const supabase = client;
