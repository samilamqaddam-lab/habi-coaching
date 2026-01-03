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
- Sadhguru presence on yoga page to honor the Isha Foundation lineage

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

### /programmes (Yoga)
- **Image:** `/images/heroes/sadhguru-hero.jpg`
- **Source:** Pexels - Traditional monk in meditation (orange robes)
- **Theme:** yoga (golden-orange accents)
- **Special Features:**
  - "By Sadhguru" badges on all yoga class cards
  - Isha Foundation lineage section with Sadhguru info
  - Link to isha.sadhguru.org

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
- Coach & Team (EMCC), Isha Foundation, 20 years corporate

## Sadhguru / Isha Foundation Integration

### Yoga Page Lineage Section
Added December 2024 - honors the source of Hajar's yoga training:
- Sadhguru info card with role "Fondateur de Isha Foundation"
- Training details: 21-week residential, 1750+ hours
- Global community: 150+ countries
- External link to official Isha Foundation website

### Translation Keys
```
programmes.designedBy: "Par Sadhguru" / "By Sadhguru"
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
- 20+ years corporate experience (not 10)
- Certification: Coach & Team with EMCC accreditation
- Isha Foundation Hatha Yoga Teacher (1750h training with Sadhguru)

### Design Rules
- Avoid duplicating Hajar's photo on same page
- Always maintain contrast between hero gradient and following section
- Balance Sadhguru presence with Hajar's content on yoga page

### Security
- React 19.2.2 and Next.js 16.0.10 (patched for CVE-2025-55182, CVE-2025-55183, CVE-2025-55184)

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

## File Structure
```
/app
  /page.tsx              - Homepage (centered, minimal hero)
  /coaching/page.tsx     - Coaching (split layout)
  /programmes/page.tsx   - Yoga + Sadhguru section (split layout)
  /contact/page.tsx      - Contact (split layout)
  /organisations/page.tsx - B2B services (split layout)
  /ressources/page.tsx   - Resources (split layout)
  /expertise/page.tsx    - Credentials page

/components
  /sections/Hero.tsx     - Hero with split/centered/minimal modes
  /sections/Section.tsx
  /ui/Button.tsx
  /ui/Card.tsx
  /forms/               - Contact forms, modals

/public/images
  /heroes/              - Hero section images
  /Reel/                - Real photos of Hajar
  /programmes/          - Programme-specific images

/locales
  /fr.json              - French translations
  /en.json              - English translations
```
