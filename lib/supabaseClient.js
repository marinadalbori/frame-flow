import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://enycopswhpaxxalrzhac.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVueWNvcHN3aHBheHhhbHJ6aGFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MzQ4MzEsImV4cCI6MjA1MDIxMDgzMX0.i7ayDxYX6ysW1aVIXh7rHiDf4dyPtLLqMotm4QP_B30';

export const supabase = createClient(supabaseUrl, supabaseKey);
