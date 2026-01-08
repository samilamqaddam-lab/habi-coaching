# /sync-translations - Synchronize Translations

Synchronize French translations to English, ensuring all keys exist in both files.

## Instructions

### Phase 1: Analysis

1. Read `/locales/fr.json` (source of truth)
2. Read `/locales/en.json` (target)
3. Compare key structures recursively

### Phase 2: Identify Gaps

Find:
- Keys in FR missing from EN
- Keys in EN not in FR (orphaned)
- Keys with identical values (not translated)

### Phase 3: Translation Strategy

For missing EN keys:
1. **Auto-translate** using context-aware translation
2. **Mark for review** with `[TODO]` prefix if uncertain
3. **Keep FR value** for proper nouns, names, technical terms

### Phase 4: Generate Updates

Create updated en.json with:
- All keys from fr.json
- Existing EN translations preserved
- New translations added
- Orphaned keys removed

### Phase 5: Report

```
📊 Translation Sync Report

📁 Source: /locales/fr.json (245 keys)
📁 Target: /locales/en.json

✅ Already synced: 240 keys
➕ Added to EN: 5 keys
🗑️ Removed orphaned: 2 keys
⚠️ Need review: 3 keys marked [TODO]

New translations:
  home.hero.newFeature → "New Feature"
  coaching.process.step5 → "Follow-up Session"
  ...
```

## Translation Rules

1. **Preserve tone**: Professional, warm, inviting
2. **Keep proper nouns**: Hajar Habi, Sadhguru, Isha Foundation
3. **Maintain formatting**: Keep markdown, variables like {name}
4. **Cultural adaptation**: Adapt idioms appropriately

## Files

- Source: `/locales/fr.json`
- Target: `/locales/en.json`

## Workflow Note

Per CLAUDE.md:
- Team proposes content in French only
- English translation is handled automatically
- Never manually edit en.json for content changes
