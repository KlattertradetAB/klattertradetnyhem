import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data, count, error } = await supabase.from('profiles').select('id', { count: 'exact' });
  console.log('Anon key profile query error:', error);
  console.log('Anon key profile fetch length:', data?.length);
  console.log('Anon key profile exact count:', count);
}
test();
