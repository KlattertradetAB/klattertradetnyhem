import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const envContent = readFileSync('.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) env[parts[0].trim()] = parts[1].trim();
});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function fetch() {
  const { data, error, count } = await supabase.from('blogs').select('*', { count: 'exact' });
  if (error) console.error('Error:', error);
  else console.log('Fetched', data.length, 'posts');
}

fetch();
