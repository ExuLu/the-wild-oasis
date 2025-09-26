import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://rbxbooyeremafggkuigp.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJieGJvb3llcmVtYWZnZ2t1aWdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwNjE4MTcsImV4cCI6MjA3MjYzNzgxN30.bX5lCPV2amnFvX56z9s9ZU9bpFUZAVCTYef-MjXuezU';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
