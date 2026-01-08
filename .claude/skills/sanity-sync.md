# /sanity-sync - Verify and Sync Sanity Structure

Comprehensive verification that Sanity CMS structure matches ALL site pages and content.

## Instructions

### Phase 1: Full Site Mapping

Analyze all pages and their content sources:

| Page | Route | Content Source | Sanity Schema |
|------|-------|----------------|---------------|
| Homepage | `/` | Sanity + fr.json | homepageContent, heroSection |
| Coaching | `/coaching` | fr.json | heroSection |
| Yoga/Programmes | `/programmes` | fr.json | heroSection |
| Organisations | `/organisations` | fr.json | heroSection |
| Contact | `/contact` | fr.json | heroSection, contactForm |
| Ressources | `/ressources` | fr.json + Sanity | heroSection, post |
| Expertise | `/expertise` | fr.json | heroSection |

### Phase 2: Schema Analysis

1. Read ALL Sanity schemas from `/sanity/schemas/`
2. For each schema, identify:
   - Which pages consume it
   - Required vs optional fields
   - Relations to other schemas

### Phase 3: Content Structure Verification

For EACH page:

1. **Translation File Check** (`/locales/fr.json`, `/locales/en.json`):
   - All required keys exist
   - No orphaned keys (defined but unused)
   - FR and EN keys match

2. **Sanity Content Check**:
   - Schema fields match component props
   - Required content is populated
   - Image references are valid

3. **Component Props Check**:
   - Props match data sources
   - No hardcoded content that should be dynamic
   - Fallbacks work correctly

### Phase 4: Cross-Page Consistency

Verify consistency across all pages:
- Hero sections have consistent structure
- Theme colors match page intent
- CTAs link to valid routes
- Images exist and are optimized

### Phase 5: Detailed Report

```
📊 Sanity Full Site Sync Report

🏠 HOMEPAGE (/)
   ✅ Hero: All fields populated
   ✅ Expertise Section: 3/3 cards configured
   ✅ About Section: Image + content OK
   ✅ Services Section: 3/3 services configured
   ✅ CTA Section: OK

🧘 YOGA (/programmes)
   ✅ Hero: splitLayout with Sadhguru image
   ✅ Classes: 4 yoga classes defined
   ⚠️ Lineage section: Consider moving to Sanity

💼 COACHING (/coaching)
   ✅ Hero: splitLayout configured
   ✅ Services: 3 coaching types
   ✅ Process: 4 steps defined

🏢 ORGANISATIONS (/organisations)
   ✅ Hero: corporate theme
   ✅ Services: B2B offerings defined

📞 CONTACT (/contact)
   ✅ Hero: contact theme
   ✅ Form: Sanity submission configured
   ⚠️ Missing: Office hours in Sanity

📚 RESSOURCES (/ressources)
   ⚠️ Blog posts: 0 published
   ✅ Hero configured

🎓 EXPERTISE (/expertise)
   ✅ Credentials: All certifications listed
   ✅ Timeline: Experience displayed

🌐 TRANSLATIONS
   ✅ fr.json: 245 keys
   ✅ en.json: 245 keys (synced)
   ⚠️ 3 keys missing translations

🖼️ IMAGES
   ✅ Hero images: 6/6 exist
   ⚠️ 2 images not optimized (>500KB)

❌ ISSUES REQUIRING ACTION:
   1. Blog posts empty - create content or hide section
   2. Contact office hours missing
   3. Large images need optimization
```

### Phase 6: Auto-Sync Options

Offer to fix detected issues:

1. **Schema Updates**: Generate migration for new fields
2. **Translation Sync**: Add missing EN keys from FR
3. **Content Creation**: Generate placeholder content
4. **Image Optimization**: Compress large images

## Files to Analyze

```
/app/
  page.tsx              → Homepage
  coaching/page.tsx     → Coaching
  programmes/page.tsx   → Yoga
  organisations/page.tsx → B2B
  contact/page.tsx      → Contact
  ressources/page.tsx   → Blog/Resources
  expertise/page.tsx    → Credentials

/sanity/schemas/        → All schema definitions
/lib/sanity.queries.ts  → GROQ queries
/lib/sanity.ts          → Fetch functions
/locales/fr.json        → French translations
/locales/en.json        → English translations
/public/images/         → Static images
```

## Sanity Project

- **Project ID**: czmpe9zr
- **Dataset**: production
- **Studio**: https://transcendencework.com/studio
