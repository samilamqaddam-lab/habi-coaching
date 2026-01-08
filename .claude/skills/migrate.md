# /migrate - Run Sanity Migration

Run a Sanity content migration script.

## Arguments

- `script` (optional): Name of migration script to run. If not provided, list available migrations.

## Instructions

### List Migrations

If no script specified:
1. Scan `/scripts/` for migration files (`migrate-*.mjs`)
2. List available migrations with descriptions

### Run Migration

If script specified:
1. Verify the script exists
2. Show what the migration will do (dry run if possible)
3. Ask for confirmation before running
4. Execute the migration
5. Report results

## Migration Location

Scripts are in: `/scripts/migrate-*.mjs`

## Example Migrations

- `migrate-homepage-to-sanity.mjs` - Migrate homepage content from translation files to Sanity

## Command

```bash
# Run a specific migration
node scripts/migrate-<name>.mjs
```

## Safety Checks

Before running any migration:
1. Verify Sanity credentials are configured
2. Check if migration has already been run
3. Backup recommendation for destructive migrations
4. Dry-run option when available

## Creating New Migrations

Migrations should:
1. Be idempotent (safe to run multiple times)
2. Include rollback instructions
3. Log all changes made
4. Handle errors gracefully
