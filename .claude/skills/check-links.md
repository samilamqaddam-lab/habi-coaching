# /check-links - Check for Broken Links

Scan the site for broken internal and external links.

## Instructions

### Phase 1: Extract Links

Scan all pages and components for:
- Internal links (`href="/..."`, `<Link href="...">`)
- External links (`href="https://..."`)
- Image sources (`src="/images/..."`)
- Asset references (PDFs, downloads)

### Phase 2: Categorize Links

```
Internal Routes:
  /, /coaching, /programmes, /organisations, /contact, /ressources, /expertise

External Links:
  https://isha.sadhguru.org (Isha Foundation)
  Social media links
  Partner websites

Assets:
  /images/**
  /documents/**
```

### Phase 3: Validate Each Link

For internal links:
- Check if route exists in `/app/` directory
- Verify page component exports default

For external links:
- HTTP HEAD request to check availability
- Note any 404, 500, or timeout errors

For assets:
- Check file exists in `/public/`

### Phase 4: Report

```
📊 Link Validation Report

✅ Valid Links: 45
❌ Broken Links: 3
⚠️ Slow Links: 2

BROKEN LINKS:
  ❌ /old-page (404)
     Found in: /components/Footer.tsx:25

  ❌ /images/missing-image.jpg
     Found in: /app/coaching/page.tsx:45

  ❌ https://expired-domain.com
     Found in: /locales/fr.json (home.partner.link)

SLOW EXTERNAL LINKS (>2s response):
  ⚠️ https://slow-api.example.com (3.2s)

REDIRECTS DETECTED:
  🔄 /yoga → /programmes (301)
```

### Phase 5: Fix Suggestions

For each broken link:
1. Suggest correct URL if typo detected
2. Recommend removal if page no longer exists
3. Update asset path if file was moved

## Files to Scan

```
/app/**/*.tsx
/components/**/*.tsx
/locales/*.json
```

## Link Patterns to Check

```typescript
// Next.js Link
<Link href="/path">

// Regular anchor
<a href="https://...">

// Button with href
<Button href="/path">

// Image sources
<Image src="/images/...">
src="/images/..."

// Translation file links
"link": "/path"
"href": "https://..."
```
