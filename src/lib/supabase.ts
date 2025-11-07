import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

let client: SupabaseClient | null = null

if (supabaseUrl && supabaseKey) {
  client = createClient(supabaseUrl, supabaseKey)
}

export const supabase = client