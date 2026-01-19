# Hajar Habi - Coaching Website Project Memory

## Project Overview
Professional coaching website for Hajar Habi - Holistic Coach & Traditional Yoga Teacher.

**Tech Stack:**
- Next.js 16.0.10 (App Router)
- React 19.2.2
- TypeScript
- Tailwind CSS 4
- i18n with JSON locale files (fr.json, en.json)

**Repository:** https://github.com/samilamqaddam-lab/habi-coaching.git
**Deployment:** Vercel (auto-deploy on push to main)

## Informations Critiques (NE JAMAIS INVENTER)

> **RÈGLE ABSOLUE:** Ne JAMAIS inventer ou deviner des informations critiques comme les coordonnées bancaires, adresses, numéros de téléphone, etc. Toujours utiliser les données ci-dessous ou demander confirmation à l'utilisateur.

### Coordonnées Bancaires
- **Titulaire:** HAJAR HABI
- **Banque:** CIH Bank
- **RIB:** 230 810 3473290211005600 89

### Coordonnées de Contact
- **Email professionnel:** hajar@transcendencework.com
- **Téléphone:** +212 663 096 857
- **WhatsApp:** +212 663 096 857

### Réseaux Sociaux
- **LinkedIn:** https://www.linkedin.com/in/hajar-habi/
- **Spotify Podcast:** https://open.spotify.com/show/3c1fH8hzdIRcFVwRGYQClR

### Adresse Studio Yoga
- **Nom:** Studio Shido Mind
- **Adresse:** 36 B boulevard d'Anfa, 5ème étage, Appartement 54, Casablanca

### Site Web
- **URL Production:** https://transcendencework.com
- **Domaine email:** @transcendencework.com

## Design System

### Theme Colors
- `yoga`: golden-orange
- `coaching`: mystic-mauve
- `corporate`: morocco-blue
- `default`: dune-beige/golden-orange

### Key Design Principles
- NO background images on Hero sections - preserve color gradient flow
- Split layout (text left, image right) for internal pages
- Centered layout for Homepage with minimal height
- Images should be situational, symbolic - avoid showing faces unless it's Hajar herself
- Sadhguru presence on yoga page to honor the Sadhguru Gurukulam lineage

## Nomenclatures Officielles des Expertises

Ces nomenclatures DOIVENT être utilisées de manière cohérente sur tout le site:

### 1. Corporate
- **Titre:** Expérience Corporate & Conseil
- **Durée:** ≃20 ans (avec symbole ≃ pour "environ")
- **Contexte:** Entreprises marocaines et internationales + cabinets de conseil
- **NE PAS utiliser:** "20 ans en entreprise" (trop vague)

### 2. Coaching
- **Certification:** Coach & Team – Transformance Pro
- **Référence:** Vincent Lenhardt (référence européenne du coaching)
- **Note:** EMCC peut compléter mais pas remplacer le nom complet
- **NE PAS utiliser:** "Coach & Team (EMCC)" seul

### 3. Yoga
- **Certification:** Sadhguru Gurukulam
- **Titre:** Hatha Yoga Classique
- **Formation:** 1750h (21 semaines résidentielles)
- **NE PAS utiliser:** "Isha Foundation" seul, "formée par Sadhguru"
- **Utiliser:** "certifiée par Sadhguru Gurukulam"

## Hero Component Modes

### Props Available
```tsx
interface HeroProps {
  title: string;
  titleSuffix?: string;      // Displayed below title (e.g., "— Individus & Organisations")
  subtitle?: string;
  description: string;
  primaryCTA?: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  backgroundImage?: string;
  overlay?: boolean;
  centered?: boolean;
  theme?: 'yoga' | 'coaching' | 'corporate' | 'default';
  compact?: boolean;         // Reduced height for internal pages
  minimal?: boolean;         // Minimum height for homepage
  useVhSpacing?: boolean;    // Legacy vh-based spacing
  endWithWhite?: boolean;    // Gradient ends white (for contrast)
  splitLayout?: boolean;     // Text left, image right
  splitImage?: string;       // Image for split layout
  children?: React.ReactNode; // Additional content after CTAs
}
```

### Height Modes
- **minimal**: `min-h-[28rem] sm:min-h-[32rem] lg:min-h-[34rem]` - Homepage only
- **compact**: `min-h-[32rem] sm:min-h-[36rem] lg:min-h-[40rem]` - Internal pages
- **default**: `min-h-[40rem] sm:min-h-[44rem] lg:min-h-[48rem] xl:min-h-[52rem]`
- **splitLayout**: `min-h-[44rem] sm:min-h-[48rem] lg:min-h-[52rem] xl:min-h-[56rem]`

### Scroll Arrow
- Hidden in `minimal` mode
- Centered under left text column in `splitLayout` mode (`left-1/2 lg:left-1/4`)

## Pages Configuration

### Homepage (`/`)
- **Layout:** Centered, minimal height
- **Title:** Slogan "Croissance Consciente & Transformation"
- **titleSuffix:** "Individus & Organisations"
- **Props:** `minimal`, `endWithWhite`
- **NO scroll arrow**
- Hajar's photo appears in "Qui suis-je?" section below

### /yoga (Programmes Yoga)
- **URL:** `/yoga` (anciennement `/programmes`, redirect 301 en place)
- **Image:** `/images/heroes/sadhguru-hero.jpg`
- **Source:** Pexels - Traditional monk in meditation (orange robes)
- **Theme:** yoga (golden-orange accents)
- **Special Features:**
  - Isha Foundation lineage section with Sadhguru info
  - Link to isha.sadhguru.org
  - Icône "ouvrir dans nouvel onglet" sur les cartes (hover)

### /[programmeKey] (Pages Dédiées Programmes)
- **URLs:** `/upa-yoga`, `/surya-kriya`, `/angamardana`, `/yogasanas`, `/surya-shakti`
- **Layout:** Two columns (info left, form right)
- **Components:** Instructor card, details with icons, registration form
- **Data:** Dynamique via `useEditionData` hook (Supabase)

### /coaching
- **Image:** `/images/heroes/coaching-path-hero.jpg`
- **Source:** Pexels - Tunnel de feuillage menant vers la lumière
- **Theme:** coaching (mystic-mauve accents)
- **Symbolism:** Path through transformation toward light/clarity

### /organisations
- **Image:** `/images/heroes/organisations-meeting-room-hero.jpg`
- **Source:** Unsplash (Adrien Olichon) - Glass walled meeting room
- **Theme:** corporate (morocco-blue accents)
- **Symbolism:** Professional corporate environment

### /ressources
- **Image:** `/images/heroes/ressources-notebook-hero.jpg`
- **Source:** Pexels (Ann poan) - Notebook with candle and mug
- **Theme:** default
- **Symbolism:** Learning, reflection, personal development

### /contact
- **Image:** `/images/heroes/contact-coffee-cups-hero.jpg`
- **Source:** Pexels (Hilal Cavus) - Two coffee cups on wooden table
- **Theme:** default
- **Symbolism:** Invitation to conversation, warmth, connection

### /expertise
- Detailed credentials page
- Coach & Team – Transformance Pro (EMCC), Sadhguru Gurukulam, ≃20 ans Corporate & Conseil

### Pages Légales
- `/mentions-legales` - Mentions légales (éditeur, hébergement, propriété intellectuelle)
- `/confidentialite` - Politique de confidentialité (RGPD, cookies, droits)
- `/cgv` - Conditions générales de vente (services, tarifs, annulation)

### Page 404
- **Fichier:** `app/(site)/not-found.tsx`
- Design personnalisé avec suggestions (yoga, coaching, contact)
- Utilise le Hero compact centré

## Sadhguru Gurukulam Integration

### Yoga Page (`/yoga`) - Lineage Section
Honors the source of Hajar's yoga training:
- Sadhguru info card with role "Fondateur de Sadhguru Gurukulam / Isha Foundation"
- Training details: 21-week residential, 1750+ hours
- Global community: 150+ countries
- External link to official Isha Foundation website

### Dedicated Programme Pages (`/[programmeKey]`)
- **Instructor Component:** Hajar's photo + credentials (not Sadhguru)
- **Certification display:** "Certifiée Sadhguru Gurukulam • 1750 heures de formation"
- **Design rule:** Badges "Par Sadhguru" supprimés pour éviter confusion avec l'instructrice

### Translation Keys
```
programmes.lineage.subtitle/title/intro
programmes.lineage.sadhguru.title/role/description/link
programmes.lineage.training.title/description
programmes.lineage.hours.title/description
programmes.lineage.global.title/description
```

## Real Photos Available
Location: `/public/images/Reel/`
- `Hajar.jpg` - Main portrait (used in Homepage "Qui suis-je?")
- `IMG_4078.jpeg` - Retreat location (used in programmes)
- Other real photos for testimonials and about sections

## Important Notes

### Hajar's Credentials
- ≃20 ans Expérience Corporate & Conseil (entreprises + cabinets de conseil)
- Certification: Coach & Team – Transformance Pro (EMCC)
- Hatha Yoga Classique – Sadhguru Gurukulam (1750h, 21 semaines résidentielles)

### Design Rules
- Avoid duplicating Hajar's photo on same page
- Always maintain contrast between hero gradient and following section
- Balance Sadhguru presence with Hajar's content on yoga page

### Security
- React 19.2.2 and Next.js 16.0.10 (patched for CVE-2025-55182, CVE-2025-55183, CVE-2025-55184)

## Analytics & RGPD Compliance

### Analytics Stack
- **Vercel Analytics:** `@vercel/analytics` - Intégré dans layout.tsx
- **Google Analytics 4:** `@next/third-parties/google` - ID: `G-Z5XGDJYXGV`
- GA4 chargé conditionnellement après consentement cookies

### Cookie Consent (RGPD)
**Composants:**
- `hooks/useConsentManager.ts` - Gestion du consentement (localStorage)
- `components/ui/CookieConsentBanner.tsx` - Bannière avec Accept/Reject
- `components/analytics/ConditionalGA4.tsx` - Charge GA4 seulement si consentement

**Fonctionnement:**
1. Bannière apparaît à la première visite
2. Choix stocké dans `localStorage` (clé: `transcendence_consent`)
3. GA4 chargé uniquement si `consent === 'accepted'`
4. Vercel Analytics toujours actif (anonymisé, pas de cookies)

**États possibles:** `pending` | `accepted` | `rejected`

### JSON-LD Structured Data
**Fichiers:**
- `components/seo/JsonLd.tsx` - Wrapper component
- `lib/structured-data.ts` - Schémas (Organization, Person, Website, FAQ, Service)

**Schémas globaux (layout.tsx):**
- `organizationSchema` - LocalBusiness avec coordonnées
- `personSchema` - Hajar Habi avec credentials
- `websiteSchema` - Site multilingue

**Schémas spécifiques:**
- `getFaqSchema(faqs)` - Pour pages FAQ
- `getServiceSchema(service)` - Pour pages services

## Sanity CMS Integration

### Overview
Full Sanity CMS integration completed January 2025 for managing dynamic content.

**Sanity Project:** `czmpe9zr` (production dataset)
**Studio URL:** https://transcendencework.com/studio

### Content Managed via Sanity
- **Homepage Content** (`homepageContent`):
  - Section Expertise (3 cards)
  - Section "Qui suis-je?" (About)
  - Section Services (3 services)
  - Section CTA finale
- **Hero Sections** (`heroSection`) - Per-page hero configuration
- **Blog Posts** (`post`) - Articles with rich text, images, SEO
- **Testimonials** (`testimonial`) - Client testimonials with ratings
- **Contact Forms** - Form submissions stored in Sanity

### Migration from Translation Files
Previously, all content was hardcoded in `/locales/fr.json` and `/locales/en.json`.
Homepage content has been migrated to Sanity for easier content management.

**Migration Pattern:**
1. Create schema in `/sanity/schemas/[content-type].ts`
2. Add schema to `/sanity/schemas/index.ts`
3. Create GROQ query in `/lib/sanity.queries.ts`
4. Add fetch function in `/lib/sanity.ts`
5. Update page component to fetch from Sanity
6. Create migration script to populate initial data

**Example:** See `/scripts/migrate-homepage-to-sanity.mjs`

**Documentation complète:** See `/docs/SANITY-TECHNICAL-GUIDE.md` (aussi dans Notion: 📚 Guides & Références)

### Priorité des Sources de Contenu

| Section | Source Principale | Modifiable via Sanity? |
|---------|-------------------|------------------------|
| Hero | `locales/*.json` | ❌ Non |
| Qui suis-je? | `locales/*.json` | ❌ Non (texte) / ✅ Oui (image) |
| Expertise, Services, CTA | `locales/*.json` via migration | ⚠️ Écrasé par migration |
| Testimonials | Sanity | ✅ Oui |

**Règle d'or:** Les fichiers `locales/*.json` sont la source de vérité. Modifier le JSON → push → déploiement auto.

### When to Update Sanity Schemas

**✅ YES - Update schemas when:**
- Adding new fields to existing content types
- Renaming fields (requires data migration)
- Adding new content types/pages
- Changing data structure (array → object, etc.)

**❌ NO - Don't update schemas for:**
- Visual/CSS changes only
- Layout reorganization without data changes
- Adding animations or interactions
- Responsive design adjustments

**Rule:** Sanity schemas must **mirror the data structure** that your code consumes.

### Vercel Environment Variables

**Required Variables:**
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=czmpe9zr
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=sk[...]  # Write token for preview/webhooks
RESEND_API_KEY=re_[...]    # For contact form emails
SANITY_PREVIEW_SECRET=transcendence-preview-2024
SANITY_WEBHOOK_SECRET=transcendence-webhook-2024
```

**Configuration Method:**
- ⚠️ **DO NOT use `vercel env add` via CLI** - causes `\n` character issues
- ✅ **Use Vercel Web UI** for manual configuration:
  1. Go to Vercel Dashboard → Project Settings → Environment Variables
  2. Add each variable manually (no trailing newlines)
  3. Select all environments: Production, Preview, Development

**Common Pitfall - Newline Characters:**
When using `echo` or `printf` with pipes in bash scripts, literal `\n` characters can be added to environment variable values, causing errors like:
```
Error: Configuration must contain projectId (only a-z, 0-9, and dashes)
```

**Scripts Available (Reference Only):**
- `/scripts/clean-and-fix-vercel-env.sh` - Removes and re-adds all Sanity vars
- `/scripts/fix-vercel-env.sh` - Attempts to fix `\n` issues

These scripts are **not recommended** due to newline issues. Use Vercel Web UI instead.

**Local Development:**
Ensure `.env.local` has clean values without `\n`:
```bash
# ✅ Correct
NEXT_PUBLIC_SANITY_PROJECT_ID=czmpe9zr

# ❌ Wrong (literal \n at end)
NEXT_PUBLIC_SANITY_PROJECT_ID="czmpe9zr\n"
```

**Verifying Setup:**
```bash
# Local build should succeed
npm run build

# Check deployed variables (will show if \n present)
vercel env pull .env.vercel.check
cat .env.vercel.check
```

## Programme Editions System (Supabase)

### Overview
Dynamic registration system for yoga programmes using Supabase as backend.

**Database:** Supabase project linked to Vercel

### Tables Structure
```
programme_editions     - Éditions (ex: "Upa Yoga - Janvier 2025")
  ├── id, programme_key, title, status (draft/active/completed/cancelled)
  └── created_at, updated_at

edition_sessions       - Sessions de chaque édition
  ├── id, edition_id, session_number, title
  └── date_options[] (JSONB: date_time, max_spots, remaining_spots)

registrations          - Inscriptions des participants
  ├── id, edition_id, session_id, selected_date_option_index
  ├── first_name, last_name, email, phone
  └── status (pending/confirmed/cancelled), notes, created_at
```

### Key Hooks
- `useEditionData(programmeKey)` - Fetch active edition + sessions for one programme
- `useMultipleEditionsData()` - Fetch all active editions (for /yoga page badges)

### API Routes
| Route | Method | Purpose |
|-------|--------|---------|
| `/api/yoga/[editionId]` | GET | Get edition details |
| `/api/yoga/[editionId]/register` | POST | Register participant |
| `/api/yoga/[editionId]/availability` | GET | Check spots availability |

### Registration Flow
1. User visits `/yoga` or `/[programmeKey]`
2. `useEditionData` fetches active edition from Supabase
3. Form displays available date options with remaining spots
4. On submit → POST to `/api/yoga/[editionId]/register`
5. Email confirmation sent via Resend

### Admin Dashboard
- **URL:** `/admin` (protected)
- **Features:** View registrations, manage editions, update status
- **Components:** `RegistrationCard`, `EditionManager`

## Translation Files
Location: `/locales/fr.json` and `/locales/en.json`
Hook: `useTranslation()` from `@/hooks/useTranslation`

**Translation Workflow:**
- French content is managed manually in `/locales/fr.json`
- English translations are handled automatically by the system
- Team only proposes content in French via Notion
- Developers implement FR changes; EN translation is automatic

## Notion Documentation Workflow

### Overview
Notion workspace "Transcendence Work (HABI)" serves as Content Operations Hub for managing site development.

**Full documentation:** See `docs/NOTION-STRUCTURE.md` for complete details.

### Hierarchical Structure

```
Transcendence Work (HABI)
└── 🌐 Site Web
    ├── 📊 Planification & Suivi
    │   ├── 🎯 Thèmes Stratégiques
    │   ├── 🔄 Changements à Implémenter
    │   ├── 💬 Observations & Feedback
    │   └── 📝 Contenus à Réviser
    │
    ├── 📄 Documentation Pages
    │   ├── 🏠 Homepage, 💼 Coaching, 🧘 Yoga
    │   ├── 🏢 Organisations, 📞 Contact
    │   └── 📚 Ressources, 🎓 Expertise
    │
    └── 📚 Guides & Références
        ├── 📑 Sections de Pages - Référence
        ├── 📋 Guide Workflow
        └── 📋 Guide Création Vues
```

### Key URLs

| Page | URL |
|------|-----|
| 🌐 Site Web | https://www.notion.so/2dd80303b08a8185a57cfe4ae7562fd2 |
| 📊 Planification | https://www.notion.so/2dd80303b08a81bdbcc3f9881563d9f3 |
| 📄 Documentation | https://www.notion.so/2dd80303b08a811bbd65f8d6d3df0d64 |
| 📚 Guides | https://www.notion.so/2dd80303b08a81a188e9e147b398f971 |

### Planning System

**Calendar-based (no Sprints):**
- Strategic organization via **🎯 Thèmes Stratégiques**
- Temporal planning via **Deadline** properties
- Full traceability: Observations → Changements → Contenus → Delivery

**8 Strategic Themes:**
SEO, UX & Conversion, Performance, Qualité Contenu, Nouvelles Features, Stabilité & Bugs, Dette Technique, Internationalisation

### Databases Summary

| Database | Columns | Key Relations |
|----------|---------|---------------|
| 🎯 Thèmes Stratégiques | 8 | Auto: Changements, Contenus |
| 🔄 Changements | 13 | Thème, Origine, Contenus Liés, Section |
| 💬 Observations | 10 | Changements Créés, Thème Suggéré, Section |
| 📝 Contenus | 13 | Thème, Changements Liés, Section, Deadline |
| 📑 Sections (Référence) | 5 | - |

### Traceability Pipeline

```
💬 Observation
   ↓ (Changements Créés)
🔄 Changement
   ↓ (Contenus Liés)
📝 Contenu
   ↓ (Statut tracking)
✅ Livraison
```

### Recommended Views (to create in Notion)

| View | Type | Configuration |
|------|------|---------------|
| 📅 Calendrier Deadlines | Calendar | By: Deadline |
| 🗓️ Roadmap | Timeline | By: Deadline, Group: Thème |
| 📥 Backlog par Thème | Board | Group: Thème |
| 🎯 Cette Semaine | Table | Filter: Deadline = This week |
| 📊 Ce Mois | Table | Filter: Deadline = This month |

### Key Principles

- **FR Content Only**: Team proposes only French content
- **No Manual Translation**: EN is automatic, don't manage in Notion
- **One Page per Entry**: Always select ONE page (prevents ambiguity)
- **Use Thèmes**: All work should be linked to a strategic theme
- **Use Deadlines**: Calendar-based planning, not sprints

## Footer Structure

### Colonnes
1. **Brand** - Logo + tagline
2. **Services** - Organisations, Programmes Yoga, Coaching
3. **À propos** - Mon parcours, Blog, Contact
4. **Certifications** - Coach & Team, Sadhguru Gurukulam, Corporate
5. **Contact** - Email, téléphone (+212 663 096 857), réseaux sociaux

### Liens légaux (bottom bar)
- Mentions Légales → `/mentions-legales`
- Confidentialité → `/confidentialite`
- CGV → `/cgv`

### Réseaux sociaux
- Spotify Podcast: https://open.spotify.com/show/3c1fH8hzdIRcFVwRGYQClR
- LinkedIn: https://www.linkedin.com/in/hajar-habi/

## File Structure
```
/app
  /(site)
    /page.tsx              - Homepage (centered, minimal hero)
    /coaching/page.tsx     - Coaching (split layout)
    /yoga/page.tsx         - Yoga programmes list + Sadhguru lineage
    /[programmeKey]/page.tsx - Pages dédiées programmes (dynamic)
    /contact/page.tsx      - Contact (split layout)
    /organisations/page.tsx - B2B services (split layout)
    /ressources/page.tsx   - Resources (split layout)
    /expertise/page.tsx    - Credentials page
    /mentions-legales/     - Legal notices
    /confidentialite/      - Privacy policy
    /cgv/                  - Terms of sale
    /not-found.tsx         - Custom 404 page
  /(admin)
    /admin/...             - Dashboard admin (registrations, editions)
  /api
    /yoga/[editionId]/     - API programmes (register, availability)
    /registrations/        - API gestion inscriptions

/components
  /sections/Hero.tsx     - Hero with split/centered/minimal modes
  /sections/Section.tsx
  /ui/Button.tsx
  /ui/Card.tsx
  /ui/CookieConsentBanner.tsx - RGPD cookie banner
  /forms/                - Contact forms, registration forms
  /admin/                - Admin dashboard components
  /analytics/ConditionalGA4.tsx - Conditional GA4 loader
  /seo/JsonLd.tsx        - JSON-LD wrapper component

/hooks
  /useEditionData.ts     - Fetch edition + sessions pour un programme
  /useMultipleEditionsData.ts - Fetch toutes les éditions actives
  /useConsentManager.ts  - Cookie consent state management

/lib
  /programmes-config.ts  - Configuration des 5 programmes yoga
  /supabase.ts           - Client Supabase
  /structured-data.ts    - JSON-LD schemas

/public/images
  /heroes/              - Hero section images
  /Reel/                - Real photos of Hajar
  /programmes/          - Programme-specific images

/locales
  /fr.json              - French translations
  /en.json              - English translations

/docs
  /COMMON-CSS-ISSUES.md - CSS troubleshooting guide (IMPORTANT!)
```

## Common Issues & Troubleshooting

### ⚠️ Vertical Text Rendering (Recurring Issue)
**Problem:** Text displays vertically (one letter per line) instead of horizontally.

**Cause:** Missing `globals.css` import in layout files.

**Solution:** Always import `globals.css` in any new layout that creates `<html>` tags:
```typescript
import '../globals.css'; // or './globals.css' depending on location
```

**Full Documentation:** See `/docs/COMMON-CSS-ISSUES.md` for:
- Root cause analysis
- Prevention checklist
- Best practices for layouts
- Historical occurrences

**Rule:** When creating a new layout file, ALWAYS:
1. Check if it creates `<html>` and `<body>` tags
2. If yes, import `globals.css` at the top (after font imports)
3. Test with a simple component before committing
