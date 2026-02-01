#!/usr/bin/env node

/**
 * Script to run Supabase migrations programmatically
 * Usage: node scripts/run-supabase-migrations.mjs
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in environment variables');
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗');
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '✗');
  process.exit(1);
}

// Create Supabase admin client
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Migration files in order
const migrationFiles = [
  '20260131_create_tags_table.sql',
  '20260131_create_articles_table.sql',
  '20260131_create_resources_table.sql',
];

async function runMigration(filename) {
  const migrationPath = path.join(__dirname, '../supabase/migrations', filename);

  if (!fs.existsSync(migrationPath)) {
    console.error(`❌ Migration file not found: ${filename}`);
    return false;
  }

  const sql = fs.readFileSync(migrationPath, 'utf-8');

  console.log(`\n🔄 Running migration: ${filename}`);
  console.log('─'.repeat(60));

  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql_string: sql });

    if (error) {
      // If exec_sql function doesn't exist, try direct query execution
      // (This is a workaround - Supabase doesn't have a direct SQL execution API)
      console.warn('⚠️  Direct SQL execution not available via API');
      console.log('📋 Please run this SQL manually in Supabase Dashboard > SQL Editor:');
      console.log('');
      console.log(sql);
      console.log('');
      return false;
    }

    console.log(`✅ Migration completed: ${filename}`);
    return true;
  } catch (err) {
    console.error(`❌ Error running migration ${filename}:`, err.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Supabase Migration Runner');
  console.log('='.repeat(60));
  console.log(`📍 Supabase URL: ${supabaseUrl}`);
  console.log(`📦 Found ${migrationFiles.length} migration(s)`);

  console.log('\n⚠️  IMPORTANT NOTE:');
  console.log('Supabase client library does not support direct SQL execution.');
  console.log('You have two options:\n');
  console.log('Option 1 (Recommended): Manual execution');
  console.log('  1. Go to: https://supabase.com/dashboard/project/serlmuwwebjqxpwnybko/sql/new');
  console.log('  2. Copy and paste each migration file content');
  console.log('  3. Run them in order\n');
  console.log('Option 2: Install Supabase CLI');
  console.log('  brew install supabase/tap/supabase');
  console.log('  supabase link --project-ref serlmuwwebjqxpwnybko');
  console.log('  supabase db push\n');

  console.log('📄 Migration files to run:');
  migrationFiles.forEach((file, index) => {
    const filePath = path.join(__dirname, '../supabase/migrations', file);
    console.log(`  ${index + 1}. ${file} ${fs.existsSync(filePath) ? '✓' : '✗'}`);
  });

  console.log('\n' + '='.repeat(60));
  console.log('✨ Run these migrations manually in Supabase Dashboard');
  console.log('   SQL Editor: https://supabase.com/dashboard/project/serlmuwwebjqxpwnybko/sql/new');
}

main().catch(console.error);
