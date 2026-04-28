import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vaegkhfkswfkjngzhnxe.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhZWdraGZrc3dma2puZ3pobnhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyNzkwMDYsImV4cCI6MjA5Mjg1NTAwNn0.HJXLZVGIIGTT1Zovtln16Hmy0Xx9kK7rjBNJ3sAa-cg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)