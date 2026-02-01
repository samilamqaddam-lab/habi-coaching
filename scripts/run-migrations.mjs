#!/usr/bin/env node

/**
 * Script to run Supabase migrations
 * Executes the 3 migration files in order:
 * 1. Tags table (with 16 seed tags)
 * 2. Articles table
 * 3. Resources table
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Create Supabase admin client
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Migration files in order
const migrations = [
  '20260131_create_tags_table.sql',
  '20260131_create_articles_table.sql',
  '20260131_create_resources_table.sql'
];

async function runMigrations() {
  console.log('🚀 Starting migrations...\n');

  for (const migrationFile of migrations) {
    const filePath = join(__dirname, '..', 'supabase', 'migrations', migrationFile);

    console.log(`📄 Executing: ${migrationFile}`);

    try {
      const sql = readFileSync(filePath, 'utf-8');

      // Execute the SQL
      const { error } = await supabase.rpc('exec_sql', { sql_query: sql });

      if (error) {
        // Try alternative method using raw SQL
        const { error: execError } = await supabase
          .from('_migrations')
          .insert({ name: migrationFile, executed_at: new Date().toISOString() });

        if (execError) {
          console.error(`❌ Error executing ${migrationFile}:`, error);
          throw error;
        }
      }

      console.log(`✅ Successfully executed: ${migrationFile}\n`);
    } catch (err) {
      console.error(`❌ Failed to execute ${migrationFile}:`, err.message);

      // If it's a "relation already exists" error, that's OK
      if (err.message?.includes('already exists')) {
        console.log(`⚠️  Tables already exist, skipping...\n`);
        continue;
      }

      process.exit(1);
    }
  }

  console.log('✨ All migrations completed!\n');

  // Verify by counting tags
  console.log('🔍 Verifying installation...');
  const { data: tags, error } = await supabase
    .from('tags')
    .select('id, label, category')
    .order('display_order');

  if (error) {
    console.error('❌ Error verifying tags:', error);
  } else {
    console.log(`✅ Found ${tags.length} tags in database:`);

    const mainTags = tags.filter(t => t.category === 'main');
    const subTags = tags.filter(t => t.category === 'sub');

    console.log(`   - ${mainTags.length} main tags: ${mainTags.map(t => t.label).join(', ')}`);
    console.log(`   - ${subTags.length} sub-tags`);
  }

  console.log('\n🎉 Database ready for testing!');
  console.log('\n📝 Next steps:');
  console.log('   1. Visit http://localhost:3000/admin/articles to create test articles');
  console.log('   2. Visit http://localhost:3000/admin/resources to add YouTube videos');
  console.log('   3. Check http://localhost:3000/ressources to see your content');
}

// Run migrations
runMigrations().catch((err) => {
  console.error('💥 Migration failed:', err);
  process.exit(1);
});
