
/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tkvogxqtylddfzzsgmtv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrdm9neHF0eWxkZGZ6enNnbXR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxNTQ5MTIsImV4cCI6MjA4MzczMDkxMn0.3WKSkeFCj8BmZwBBdnMFUwJRzzp8KP42k1HmoiBZce4';

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

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : MockClient;
