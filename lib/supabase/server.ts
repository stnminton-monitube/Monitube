import { createClient } from "@supabase/supabase-js";

// Server-side admin client — uses service role key, bypasses RLS safely.
// Only use this in server components, API routes, and server actions.
// Never expose this client to the browser.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
