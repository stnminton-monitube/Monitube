import { createClient } from "@supabase/supabase-js";

// Browser-side client — uses the anon key with RLS enforced.
// Safe to use in client components.
export function createBrowserClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
