// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      // automatically exchange magic-link tokens from the URL
      detectSessionInUrl: true,
      // persist session in localStorage
      persistSession: true,
    },
  }
)
