import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY;

let supabase = null;

if (!supabaseUrl || !supabaseAnonKey) {
  // Avoid crashing the app on missing envs; log a clear error instead.
  // Pages depending on Supabase will show limited functionality until envs are set.
  console.error('[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Configure Netlify env and redeploy.');
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };