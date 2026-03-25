import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.log('Missing env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log("Checking notifications table...");
  const { data: nData, error: nErr } = await supabase.from('notifications').select('*').order('created_at', { ascending: false }).limit(5);
  console.log('Notifications (any user):', nData?.length, nErr);
  if (nData && nData.length > 0) {
      console.log('First 2 notifications:', nData.slice(0, 2));
  }

  console.log("Checking chat messages...");
  const { data: cData, error: cErr } = await supabase.from('chat_messages').select('*').order('created_at', { ascending: false }).limit(5);
  console.log('Chat messages:', cData?.length, cErr);
  if (cData && cData.length > 0) {
      console.log('First 2 chat messages:', cData.slice(0, 2));
  }
  // Test inserting a chat message as anon (won't work without auth, but we can see if it's an RLS error)
}
test();
