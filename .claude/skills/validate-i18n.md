# /validate-i18n - Validate Internationalization

Check for missing, unused, or problematic translation keys.

## Instructions

### Phase 1: Extract Used Keys

Scan all source files for translation key usage:
- `t('key.path')` patterns in TSX/TS files
- `useTranslation()` hook usage
- Dynamic key construction patterns

### Phase 2: Compare with Definitions

Cross-reference used keys with:
- `/locales/fr.json`
- `/locales/en.json`

### Phase 3: Identify Issues

1. **Missing Keys**: Used in code but not defined
2. **Unused Keys**: Defined but never used (potential cleanup)
3. **Mismatched Keys**: Different structure between FR/EN
4. **Empty Values**: Keys with empty string values
5. **Placeholder Issues**: Mismatched {variables} between languages

### Phase 4: Report

```
📊 i18n Validation Report

✅ Valid keys: 240
❌ Missing keys: 3
⚠️ Unused keys: 12
🔤 Empty values: 1

MISSING KEYS (used but not defined):
  ❌ home.newSection.title (used in HomeContent.tsx:45)
  ❌ coaching.cta.book (used in CoachingPage.tsx:123)

UNUSED KEYS (defined but not used):
  ⚠️ home.oldSection.* (5 keys) - consider removing
  ⚠️ footer.oldLinks.* (7 keys) - consider removing

EMPTY VALUES:
  🔤 ressources.coming.description (FR is empty)

PLACEHOLDER MISMATCHES:
  ⚠️ contact.success.message
     FR: "Merci {name}, votre message..."
     EN: "Thank you, your message..." (missing {name})
```

### Phase 5: Auto-Fix Options

Offer to:
1. Add missing keys with placeholder values
2. Remove unused keys (with confirmation)
3. Fill empty values from other language
4. Fix placeholder mismatches

## Files to Scan

```
/app/**/*.tsx
/components/**/*.tsx
/locales/fr.json
/locales/en.json
```

## Pattern Detection

```typescript
// Direct usage
t('key.path')

// With fallback
t('key.path', 'Default value')

// Dynamic (harder to validate)
t(`dynamic.${variable}.key`)
```
