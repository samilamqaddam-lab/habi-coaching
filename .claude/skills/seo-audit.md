# /seo-audit - SEO Audit

Comprehensive SEO audit for all pages.

## Instructions

### Phase 1: Technical SEO

Check each page for:

1. **Meta Tags**
   - `<title>` (50-60 chars, unique per page)
   - `<meta name="description">` (150-160 chars)
   - `<meta name="keywords">` (if used)
   - Open Graph tags (og:title, og:description, og:image)
   - Twitter Card tags

2. **Structure**
   - Single `<h1>` per page
   - Proper heading hierarchy (h1 → h2 → h3)
   - Semantic HTML (`<main>`, `<article>`, `<section>`)

3. **Technical**
   - Canonical URLs
   - Robots.txt configuration
   - Sitemap.xml presence
   - Mobile-friendly viewport
   - SSL/HTTPS

### Phase 2: Content SEO

Analyze:
- Keyword usage in titles and headings
- Alt text on images
- Internal linking structure
- Content length and quality
- Language/locale tags

### Phase 3: Page-by-Page Report

```
📊 SEO Audit Report

🏠 HOMEPAGE (/)
   Title: "Hajar Habi | Coach & Yoga Teacher" ✅ (42 chars)
   Description: "Coach certifiée accompagnant..." ✅ (155 chars)
   H1: "Croissance Consciente & Transformation" ✅
   Images with alt: 5/5 ✅
   Internal links: 8 ✅
   OG Image: ✅
   Score: 95/100

💼 COACHING (/coaching)
   Title: "Coaching Individuel | Hajar Habi" ✅
   Description: ⚠️ Too short (89 chars)
   H1: ✅
   Images with alt: 3/3 ✅
   Score: 88/100

🧘 YOGA (/programmes)
   Title: ✅
   Description: ✅
   H1: ✅
   ⚠️ Missing OG image specific to yoga
   Score: 90/100

📞 CONTACT (/contact)
   Title: ✅
   Description: ✅
   ⚠️ No structured data for local business
   Score: 85/100
```

### Phase 4: Global Checks

```
🌐 SITE-WIDE SEO

robots.txt: ✅ Present and valid
sitemap.xml: ✅ 7 URLs indexed
SSL Certificate: ✅ Valid
Mobile Friendly: ✅
Page Speed: 🟡 See /lighthouse
Structured Data: ⚠️ Missing Organization schema
Internationalization: ✅ FR/EN with hreflang

KEYWORD ANALYSIS:
Primary: "coach holistique", "yoga teacher", "transformation"
Secondary: "leadership", "bien-être", "Isha Foundation"
```

### Phase 5: Recommendations

Prioritized action items:
1. 🔴 Critical (blocks indexing)
2. 🟡 Important (affects rankings)
3. 🟢 Nice to have (minor improvements)

## Files to Check

```
/app/layout.tsx         - Global meta tags
/app/*/page.tsx         - Page-specific meta
/public/robots.txt      - Crawler rules
/public/sitemap.xml     - URL index
/components/SEO.tsx     - SEO component (if exists)
```

## Schema.org Recommendations

For this coaching/yoga site:
- Organization
- Person (Hajar Habi)
- Service (Coaching, Yoga)
- LocalBusiness (if physical location)
- Course (for yoga programs)
- Review (testimonials)
