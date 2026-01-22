# Transcendence Work - Architecture Documentation

**Project Name:** Hajar Habi - Transcendence Work
**Tech Stack:** Next.js 16.0.10 (App Router) | React 19.2.3 | TypeScript | Tailwind CSS 4
**Repository:** https://github.com/samilamqaddam-lab/habi-coaching.git
**Deployment:** Vercel (auto-deploy on main branch)
**Production URL:** https://www.transcendencework.com

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Frontend Structure](#2-frontend-structure)
3. [API Routes](#3-api-routes)
4. [Components](#4-components)
5. [Custom Hooks](#5-custom-hooks)
6. [Database Layer](#6-database-layer)
7. [Sanity CMS](#7-sanity-cms)
8. [Utilities & Libraries](#8-utilities--libraries)
9. [Configuration Files](#9-configuration-files)
10. [Environment Variables](#10-environment-variables)
11. [Authentication & Security](#11-authentication--security)
12. [Analytics & Compliance](#12-analytics--compliance)
13. [Directory Tree](#13-directory-tree)

---

## 1. Project Overview

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16.0.10 (App Router) |
| UI Library | React 19.2.3 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Database | Supabase (PostgreSQL) |
| CMS | Sanity |
| Email | Resend |
| Analytics | Vercel Analytics + GA4 |
| Deployment | Vercel |

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │  Site (/)   │  │ Admin (/admin)│  │ Studio      │              │
│  │  19 pages   │  │  14 pages   │  │ (Sanity)    │              │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘              │
│         │                │                │                      │
│  ┌──────┴────────────────┴────────────────┴──────┐              │
│  │              COMPONENTS (48)                   │              │
│  │  layout/ | sections/ | ui/ | forms/ | admin/  │              │
│  └──────────────────────┬────────────────────────┘              │
│                         │                                        │
│  ┌──────────────────────┴────────────────────────┐              │
│  │              HOOKS & CONTEXTS                  │              │
│  │  useTranslation | useEditionData | useEvents  │              │
│  └──────────────────────┬────────────────────────┘              │
└─────────────────────────┼────────────────────────────────────────┘
                          │
┌─────────────────────────┼────────────────────────────────────────┐
│                         │         API LAYER                      │
│  ┌──────────────────────┴────────────────────────┐              │
│  │              /api (31 routes)                  │              │
│  │  yoga/ | events/ | coaching/ | admin/ | ...   │              │
│  └──────────────────────┬────────────────────────┘              │
└─────────────────────────┼────────────────────────────────────────┘
                          │
┌─────────────────────────┼────────────────────────────────────────┐
│                    BACKEND SERVICES                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │  Supabase   │  │   Sanity    │  │   Resend    │              │
│  │ (PostgreSQL)│  │   (CMS)     │  │  (Email)    │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
└──────────────────────────────────────────────────────────────────┘
```

---

## 2. Frontend Structure

### 2.1 Site Pages (`app/(site)/`)

| Route | File | Purpose |
|-------|------|---------|
| `/` | `page.tsx` | Homepage |
| `/yoga` | `yoga/page.tsx` | Yoga programmes list |
| `/[programmeKey]` | `[programmeKey]/page.tsx` | Programme detail (dynamic) |
| `/evenements/[eventId]` | `evenements/[eventId]/page.tsx` | Event detail |
| `/coaching` | `coaching/page.tsx` | Coaching services |
| `/organisations` | `organisations/page.tsx` | B2B services |
| `/ressources` | `ressources/page.tsx` | Resources hub |
| `/expertise` | `expertise/page.tsx` | Credentials page |
| `/contact` | `contact/page.tsx` | Contact form |
| `/blog` | `blog/page.tsx` | Blog listing |
| `/blog/[slug]` | `blog/[slug]/page.tsx` | Blog article |
| `/mentions-legales` | `mentions-legales/page.tsx` | Legal notices |
| `/confidentialite` | `confidentialite/page.tsx` | Privacy policy |
| `/cgv` | `cgv/page.tsx` | Terms of service |

**Dynamic Programme Pages:**
- `/upa-yoga`
- `/surya-kriya`
- `/angamardana`
- `/yogasanas`
- `/surya-shakti`

### 2.2 Admin Pages (`app/(admin)/admin/(protected)/`)

| Route | Purpose |
|-------|---------|
| `/admin/login` | Authentication |
| `/admin/dashboard` | Registration overview |
| `/admin/dashboard/[editionId]` | Registrations by edition |
| `/admin/editions` | Manage programme editions |
| `/admin/editions/[id]` | Edit edition |
| `/admin/events` | Manage one-time events |
| `/admin/events/new` | Create event |
| `/admin/events/[eventId]` | View event registrations |
| `/admin/events/[eventId]/edit` | Edit event |
| `/admin/coaching` | Coaching requests |
| `/admin/yoga-individuel` | Individual yoga requests |

### 2.3 Layout Structure

```
app/(site)/layout.tsx
├── Imports: Header, Footer, LanguageProvider, Analytics
├── Fonts: Playfair Display + Inter
├── Metadata: SEO, OpenGraph, Twitter, geo-targeting
├── Includes: Vercel Analytics, Conditional GA4, Cookie Banner
└── Body: pt-20 (fixed header offset)

app/(admin)/admin/(protected)/layout.tsx
├── Authentication check (cookie-based)
├── Redirects to /admin/login if not authenticated
└── Dark theme (bg-slate-900)

app/(studio)/layout.tsx
└── Sanity CMS studio configuration
```

---

## 3. API Routes

### 3.1 Yoga/Programmes API

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/yoga/[editionId]` | GET | Get edition with sessions & availability |
| `/api/yoga/[editionId]/register` | POST | Register for an edition |
| `/api/yoga/[editionId]/availability` | GET | Check date availability |
| `/api/yoga/interest` | POST | Submit programme interest |

### 3.2 Events API

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/events` | GET | List active events with availability |
| `/api/events/[eventId]` | GET | Get single event details |
| `/api/events/[eventId]/register` | POST | Register for an event |

### 3.3 Coaching API

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/coaching/packages` | GET | List coaching packages |
| `/api/coaching/register` | POST | Register for coaching |
| `/api/coaching/requests` | GET/POST | List/create coaching requests |
| `/api/coaching/requests/[id]` | GET/PUT | View/update request |

### 3.4 Admin API

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/admin/auth/login` | POST | Admin login |
| `/api/admin/auth/logout` | POST | Admin logout |
| `/api/admin/editions` | GET/POST | List/create editions |
| `/api/admin/editions/[id]` | GET/PUT/DELETE | CRUD operations |
| `/api/admin/events` | GET/POST | List/create events |
| `/api/admin/events/[id]` | GET/PUT/DELETE | CRUD operations |

### 3.5 Utility API

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/contact` | POST | Email contact form |
| `/api/revalidate` | POST | On-demand ISR revalidation |
| `/api/draft` | POST | Enable Sanity preview |

---

## 4. Components

### 4.1 Layout Components (`/components/layout/`)

```
Header.tsx          - Fixed navigation bar with language toggle
Footer.tsx          - 5-column footer with legal links
LanguageToggle.tsx  - FR/EN switcher
WhatsAppButton.tsx  - Floating WhatsApp button
```

### 4.2 Section Components (`/components/sections/`)

```
Hero.tsx
├── Props: title, subtitle, description, CTAs
├── Themes: yoga | coaching | corporate | default
├── Modes: minimal | compact | splitLayout
└── Height variants based on page type

Section.tsx         - Content section wrapper
TestimonialsSection.tsx - Featured testimonials display
```

### 4.3 UI Components (`/components/ui/`)

```
Button.tsx          - Multi-variant button (primary/secondary/outline)
Card.tsx            - Content card container
Container.tsx       - Max-width wrapper
FormInput.tsx       - Unified form field component
CookieConsentBanner.tsx - RGPD cookie consent
Accordion.tsx       - Collapsible sections
```

### 4.4 Form Components (`/components/forms/`)

```
EditionRegistrationForm.tsx    - Collective yoga registration
EditionRegistrationModal.tsx   - Modal wrapper for registration
PrivateYogaRequestForm.tsx     - Individual yoga session request
CoachingRegistrationForm.tsx   - Coaching enquiry form
```

### 4.5 Yoga Components (`/components/yoga/`)

```
EventCard.tsx           - One-time event card
FeaturedEventCard.tsx   - Large featured event display
```

### 4.6 Admin Components (`/components/admin/`)

```
EventForm.tsx              - Create/edit events
EventRegistrationCard.tsx  - Event registration display
RegistrationCard.tsx       - Edition registration display
SessionBuilder.tsx         - Create/edit sessions
CoachingRequestCard.tsx    - Coaching inquiry card
DateOptionPicker.tsx       - Calendar date selection
```

### 4.7 SEO Components (`/components/seo/`)

```
JsonLd.tsx - JSON-LD structured data wrapper
```

---

## 5. Custom Hooks

### useTranslation

```typescript
const { locale, setLocale, t } = useTranslation()
// t('home.hero.title') - Nested key support
// Reads from /locales/fr.json or /locales/en.json
```

### useEditionData

```typescript
const { editions, selectedEdition, selectEdition, isLoading } = useEditionData(programmeKey)
// Fetches edition data from /api/yoga/[programmeKey]
```

### useEventsData

```typescript
const { events, hasActiveEvents, isLoading } = useEventsData()
// Fetches active events from /api/events
```

### useConsentManager

```typescript
const { consent, acceptConsent, rejectConsent } = useConsentManager()
// Manages cookie consent state
// Values: 'pending' | 'accepted' | 'rejected'
```

---

## 6. Database Layer

### 6.1 Supabase Tables

**Yoga/Programmes System:**

```sql
programme_editions
├── id (uuid, PK)
├── programme_key (text)
├── title / title_en (text)
├── start_date (date)
├── max_capacity (int)
├── is_active (boolean)
└── edition_type ('collective' | 'individual' | 'event')

edition_sessions
├── id (uuid, PK)
├── edition_id (FK → programme_editions)
├── session_number (int)
├── title / title_en (text)
└── duration_minutes (int)

session_date_options
├── id (uuid, PK)
├── session_id (FK → edition_sessions)
├── date_time (timestamptz)
├── end_time (timestamptz)
├── location (text)
└── max_capacity (int)

registrations
├── id (uuid, PK)
├── edition_id (FK → programme_editions)
├── first_name, last_name, email, phone (text)
├── status ('pending' | 'confirmed' | 'cancelled')
└── created_at (timestamptz)

registration_date_choices
├── id (uuid, PK)
├── registration_id (FK → registrations)
└── date_option_id (FK → session_date_options)
```

**One-Time Events System:**

```sql
yoga_events
├── id (uuid, PK)
├── title / title_en (text)
├── subtitle / subtitle_en (text)
├── description / description_en (text)
├── date_time (timestamptz)
├── duration_minutes (int)
├── location, address (text)
├── price (numeric)
├── max_capacity (int)
├── image_url (text)
├── is_active (boolean)
└── created_at (timestamptz)

event_registrations
├── id (uuid, PK)
├── event_id (FK → yoga_events)
├── first_name, last_name, email, phone (text)
├── status ('pending' | 'confirmed' | 'cancelled')
└── created_at (timestamptz)
```

### 6.2 Views

```sql
date_availability     - Calculates remaining spots per date_option
event_availability    - Calculates remaining spots per event
```

---

## 7. Sanity CMS

### 7.1 Configuration

| Setting | Value |
|---------|-------|
| Project ID | `czmpe9zr` |
| Dataset | `production` |
| Studio URL | `/studio` |

### 7.2 Content Schemas

```
/sanity/schemas/
├── article.ts           - Blog articles
├── blockContent.ts      - Rich text blocks
├── heroSection.ts       - Per-page hero configs
├── homepageContent.ts   - Homepage sections
├── programme.ts         - Programme definitions
├── testimonial.ts       - Client testimonials
├── instructor.ts        - Instructor profile
└── siteSettings.ts      - Global site config
```

### 7.3 GROQ Queries (`/lib/sanity.queries.ts`)

```typescript
getProgrammes()           // All published programmes
getProgrammeBySlug(slug)  // Single programme
getTestimonials()         // All testimonials
getFeaturedTestimonials() // Featured only
getArticles()             // All blog posts
getArticleBySlug(slug)    // Single article
getHomepageContent()      // Homepage sections
```

---

## 8. Utilities & Libraries

### 8.1 Structured Data (`/lib/structured-data.ts`)

```typescript
organizationSchema    // LocalBusiness with coordinates
personSchema          // Hajar Habi credentials
websiteSchema         // Multilingual site info
getCourseSchema()     // Course structured data
getEventSchema()      // Event structured data
getBreadcrumbSchema() // Breadcrumb navigation
getFaqSchema()        // FAQ structured data
getServiceSchema()    // Service offerings
```

### 8.2 Price Utilities (`/lib/price-utils.ts`)

```typescript
formatPrice(amount, currency)        // Format for display
formatDuration(minutes)              // Format duration
calculateEditionPrice(totalMinutes)  // 150 DH/hour
```

### 8.3 Programme Config (`/lib/programmes-config.ts`)

```typescript
PROGRAMMES_CONFIG: {
  'upa-yoga': { name, icon, supportsEditions, defaultCapacity, theme }
  'surya-kriya': { ... }
  'angamardana': { ... }
  'yogasanas': { ... }
  'surya-shakti': { ... }
}

getProgrammeConfig(key)       // Single config
getProgrammesWithEditions()   // Editable programmes
```

---

## 9. Configuration Files

### next.config.ts

```typescript
{
  images: {
    remotePatterns: [
      { hostname: 'images.pexels.com' },
      { hostname: 'cdn.sanity.io' }
    ]
  },
  redirects: [
    { source: '/programmes', destination: '/yoga', permanent: true }
  ]
}
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "paths": { "@/*": ["./*"] }
  }
}
```

---

## 10. Environment Variables

### Required

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=czmpe9zr
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk...

# Email
RESEND_API_KEY=re_...

# Analytics
NEXT_PUBLIC_GA_ID=G-Z5XGDJYXGV
```

---

## 11. Authentication & Security

### Admin Authentication

- **Method:** Cookie-based session
- **Cookie:** `admin-session = 'authenticated'`
- **Protected routes:** All `/admin/(protected)/*` pages
- **Redirect:** Unauthenticated users → `/admin/login`

### Data Security

- Supabase RLS (Row Level Security) enabled
- Browser client respects RLS policies
- Server client bypasses RLS for admin operations

---

## 12. Analytics & Compliance

### Vercel Analytics

- Automatically integrated
- No cookies required
- Always active

### Google Analytics 4

- ID: `G-Z5XGDJYXGV`
- Conditional loading based on consent
- Component: `/components/analytics/ConditionalGA4.tsx`

### Cookie Consent (RGPD)

```typescript
localStorage: 'transcendence_consent'
Values: 'pending' | 'accepted' | 'rejected'
```

---

## 13. Directory Tree

```
/Users/sami/IOS/Hajar/
├── app/
│   ├── (site)/              # Public pages (19)
│   ├── (admin)/             # Admin pages (14)
│   ├── (studio)/            # Sanity Studio
│   ├── api/                 # API routes (31)
│   ├── globals.css          # Global styles
│   ├── robots.ts            # robots.txt
│   └── sitemap.ts           # sitemap.xml
├── components/
│   ├── admin/               # Admin UI
│   ├── analytics/           # Analytics wrappers
│   ├── forms/               # Registration forms
│   ├── layout/              # Header, Footer
│   ├── sections/            # Hero, Testimonials
│   ├── seo/                 # JsonLd
│   ├── ui/                  # Base components
│   └── yoga/                # Yoga-specific
├── contexts/
│   └── LanguageContext.tsx  # i18n provider
├── hooks/
│   ├── useEditionData.ts
│   ├── useEventsData.ts
│   ├── useTranslation.ts
│   └── useConsentManager.ts
├── lib/
│   ├── supabase.ts          # Database client
│   ├── sanity.ts            # CMS client
│   ├── sanity.queries.ts    # GROQ queries
│   ├── programmes-config.ts # Programme definitions
│   ├── structured-data.ts   # JSON-LD schemas
│   └── price-utils.ts       # Pricing functions
├── locales/
│   ├── fr.json              # French (source)
│   └── en.json              # English
├── public/
│   └── images/              # Static assets
├── sanity/
│   ├── schemas/             # Content types (16)
│   └── sanity.config.ts     # CMS config
├── docs/                    # Documentation
├── scripts/                 # Build scripts
├── next.config.ts           # Next.js config
├── tsconfig.json            # TypeScript config
├── package.json             # Dependencies
└── CLAUDE.md                # Project instructions
```

---

## Key Files Summary

| Directory | Count | Purpose |
|-----------|-------|---------|
| `/app/(site)` | 19 pages | Public website |
| `/app/(admin)` | 14 pages | Admin dashboard |
| `/app/api` | 31 routes | Backend APIs |
| `/components` | 48 components | Reusable UI |
| `/hooks` | 5 hooks | Custom logic |
| `/lib` | 8 files | Utilities |
| `/sanity/schemas` | 16 schemas | CMS content types |
| `/locales` | 2 files | Translations (FR/EN) |

---

**Documentation Generated:** January 22, 2026
**Version:** Production (Next.js 16.0.10)
