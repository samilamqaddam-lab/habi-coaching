# Supabase Migrations - Page Ressources Refonte

## Overview

Ces migrations créent les tables nécessaires pour transformer la page `/ressources` en hub de contenu complet avec :
- **Articles** : Blog posts et actualités (remplace Sanity CMS)
- **Resources** : Vidéos YouTube, PDFs, liens éducatifs
- **Tags** : Système hiérarchique de catégorisation (2 niveaux)

## Migration Files (Execute in Order)

1. **`20260131_create_tags_table.sql`**
   - Crée table `tags` avec hiérarchie parent/enfant
   - Seed 4 main tags + 12 sub-tags
   - Indexes pour performance

2. **`20260131_create_articles_table.sql`**
   - Crée table `articles` pour blog/actualités
   - Support bilingue (FR/EN)
   - Content en JSONB (rich text)
   - Relations optionnelles vers événements/programmes
   - Auto-update `updated_at` trigger

3. **`20260131_create_resources_table.sql`**
   - Crée table `resources` pour contenus éducatifs
   - Types: video, pdf, link, audio
   - Support YouTube (video_id, thumbnail auto-fetch)
   - Tags et relations similaires à articles

## How to Run Migrations

### Option 1: Supabase Dashboard (Recommended)

1. Go to **SQL Editor** in Supabase Dashboard:
   ```
   https://supabase.com/dashboard/project/serlmuwwebjqxpwnybko/sql/new
   ```

2. Open each migration file in order and execute:
   - Copy content of `20260131_create_tags_table.sql`
   - Paste in SQL Editor
   - Click "Run"
   - Repeat for other files

### Option 2: Supabase CLI

```bash
# Install CLI (if not already installed)
brew install supabase/tap/supabase

# Link to project
supabase link --project-ref serlmuwwebjqxpwnybko

# Run migrations
supabase db push
```

### Option 3: Node Script (Info Only)

```bash
# Note: Supabase JS client doesn't support direct SQL execution
# This script will show migration content to copy-paste manually
node scripts/run-supabase-migrations.mjs
```

## Verification

After running migrations, verify tables exist:

```sql
-- Check tables
SELECT tablename FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('tags', 'articles', 'resources');

-- Check tags seed data
SELECT id, label, parent_id, category FROM tags ORDER BY parent_id NULLS FIRST, display_order;

-- Should show:
-- 4 main tags (parent_id = NULL)
-- 12 sub-tags (parent_id = 'yoga' or 'coaching-organisations')
```

## Schema Summary

### `tags`
```
id (PK, varchar) | label | label_en | parent_id (FK) | category | color | display_order
```

### `articles`
```
id (PK, uuid) | title | title_en | slug (unique) | excerpt | content (jsonb)
tags (array) | author_name | is_published | featured | published_at | related_event_id | related_programme_key
```

### `resources`
```
id (PK, uuid) | resource_type | title | title_en | url | video_id | thumbnail_url
tags (array) | duration_minutes | is_active | featured | related_programme_key | related_event_id
```

## Rollback (if needed)

```sql
-- WARNING: This will delete all data in these tables
DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
```

## Next Steps

After running migrations:
1. ✅ Complete Task #1 (Créer tables Supabase)
2. → Task #2 (Créer types TypeScript)
3. → Task #3 (API routes publiques)
