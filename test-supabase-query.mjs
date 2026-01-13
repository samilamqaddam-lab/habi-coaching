import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://serlmuwwebjqxpwnybko.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlcmxtdXd3ZWJqcXhwd255YmtvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODMwODEwNCwiZXhwIjoyMDgzODg0MTA0fQ.OSscbHuIZqGFy-Kpc_4-Vi5NwFMlZESFkNxgmhuX6to';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

console.log('Testing Supabase query for upa-yoga edition...\n');

try {
  const { data, error } = await supabaseAdmin
    .from('programme_editions')
    .select('*')
    .eq('programme_key', 'upa-yoga')
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Success! Found edition:');
    console.log(JSON.stringify(data, null, 2));
  }
} catch (err) {
  console.error('Exception:', err);
}
