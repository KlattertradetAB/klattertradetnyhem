import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://tkvogxqtylddfzzsgmtv.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrdm9neHF0eWxkZGZ6enNnbXR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxNTQ5MTIsImV4cCI6MjA4MzczMDkxMn0.3WKSkeFCj8BmZwBBdnMFUwJRzzp8KP42k1HmoiBZce4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
