import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = 'https://peafpzbzudytszxhelcs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlYWZwemJ6dWR5dHN6eGhlbGNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MzI1NzgsImV4cCI6MjAyNTQwODU3OH0.ZC6ZJB2FDNvYZYTAGpGYyEOVXKZZxYJIZxZWmXrEQEI'

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})