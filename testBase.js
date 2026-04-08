import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

async function testSupabase() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error("Missing credentials in environment variables.");
    return;
  }

  const supabase = createClient(url, key);

  console.log(`Testing connection to ${url}...`);

  // Test 1: Fetch blogs
  const { data: blogs, error: blogError } = await supabase.from('blogs').select('id, title').limit(2);
  if (blogError) {
    console.error("Failed to fetch blogs:", blogError.message);
  } else {
    console.log(`Successfully fetched ${blogs.length} blogs.`);
  }

  // Test 2: Auth Ping (try to get an anonymous session or just hit the API)
  const { data: authData, error: authError } = await supabase.auth.getSession();
  if (authError) {
    console.error("Auth API seems inaccessible:", authError.message);
  } else {
    console.log("Auth API is responding.");
  }
}

testSupabase();
