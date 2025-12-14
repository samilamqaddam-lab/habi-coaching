# Hajar Habi - Coaching Website Project Memory

## Project Overview
Professional coaching website for Hajar Habi - Holistic Coach & Traditional Yoga Teacher.

**Tech Stack:**
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- i18n with JSON locale files (fr.json, en.json)

## Design System

### Theme Colors
- `yoga`: golden-orange
- `coaching`: mystic-mauve
- `corporate`: morocco-blue
- `default`: dune-beige/golden-orange

### Key Design Principles
- NO background images on Hero sections - preserve color gradient flow
- Split layout (text left, image right) for internal pages
- Centered layout for Homepage (Hajar's photo appears in "Qui suis-je?" section below)
- Images should be situational, symbolic - avoid showing faces unless it's Hajar herself

## Hero Component - Split Layout

Added in December 2024. New props:
```tsx
splitLayout?: boolean;  // Activates split layout with image on right
splitImage?: string;    // Image path for split layout
endWithWhite?: boolean; // Force gradient to end white (homepage only)
```

### Split Layout Implementation
- Grid: `lg:grid-cols-2 gap-12 lg:gap-16`
- Text on left (order-2 lg:order-1), Image on right (order-1 lg:order-2)
- Image container: `aspect-[4/5] lg:aspect-[3/4]`, rounded-3xl, shadow-2xl
- Decorative blur elements with theme colors
- Hover scale effect on image

## Pages Using Split Layout

### /programmes (Yoga)
- Image: `/images/heroes/yoga-nature-hero.jpg`
- Theme: yoga (golden-orange accents)

### /coaching
- Image: `/images/heroes/coaching-path-hero.jpg`
- Source: Pexels - "Tunnel de feuillage menant vers la lumiere"
- Theme: coaching (mystic-mauve accents)
- Symbolism: Path through transformation toward light/clarity

### /organisations
- Image: `/images/heroes/organisations-meeting-room-hero.jpg`
- Source: Unsplash (Adrien Olichon) - Glass walled meeting room with table and chairs
- Theme: corporate (morocco-blue accents)
- Symbolism: Professional corporate environment, modern business setting

### /ressources
- Image: `/images/heroes/ressources-notebook-hero.jpg`
- Source: Pexels (Ann poan) - Notebook with candle and mug
- Theme: default
- Symbolism: Learning, reflection, personal development resources

### /contact
- Image: `/images/heroes/contact-coffee-cups-hero.jpg`
- Source: Pexels (Hilal Cavus) - Two coffee cups on wooden table
- Theme: default
- Symbolism: Invitation to conversation, warmth, connection

### /page (Homepage)
- **NO split layout** - keeps centered hero
- Reason: Hajar's photo already in "Qui suis-je?" section (line 140)
- Uses `endWithWhite` prop for contrast with following beige section

## Real Photos Available
Location: `/public/images/Reel/`
- `Hajar.jpg` - Main portrait (used in Homepage "Qui suis-je?")
- Other real photos for testimonials and about sections

## Important Corrections Made
- Hero description should mention 20 years corporate experience (not 10)
- Certification: Coach & Team with EMCC accreditation
- Avoid duplicating Hajar's photo on same page
- Always maintain contrast between hero gradient and following section

## Translation Keys
Translations in `/locales/fr.json` and `/locales/en.json`
Use `useTranslation()` hook from `@/hooks/useTranslation`

## File Structure
```
/app
  /coaching/page.tsx     - Coaching page with split layout
  /programmes/page.tsx   - Yoga programs with split layout
  /page.tsx              - Homepage (centered hero)
  /contact/page.tsx      - Contact page with split layout
  /organisations/page.tsx - B2B services with split layout
  /ressources/page.tsx   - Resources page with split layout
  /expertise/page.tsx

/components
  /sections/Hero.tsx     - Main hero component with split/centered modes
  /sections/Section.tsx
  /ui/Button.tsx
  /ui/Card.tsx

/public/images
  /heroes/               - Hero section images
  /Reel/                 - Real photos of Hajar
```
