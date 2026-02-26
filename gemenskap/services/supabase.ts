import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file.'
  );
}

// Ensure URL is clean (fixes common Vercel/env env copy-paste issues)
const cleanUrl = supabaseUrl.replace(/^VITE_SUPABASE_URL=/, '').trim();
const cleanKey = supabaseAnonKey.replace(/^VITE_SUPABASE_ANON_KEY=/, '').trim();

export const supabase = createClient<Database>(cleanUrl, cleanKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
