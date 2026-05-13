import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase admin client.
 * Never import this in Client Components.
 *
 * This uses SUPABASE_SECRET_KEY and bypasses RLS.
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!secretKey) {
    throw new Error("Missing SUPABASE_SECRET_KEY");
  }

  return createClient(supabaseUrl, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
