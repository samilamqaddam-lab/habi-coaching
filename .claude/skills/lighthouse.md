# /lighthouse - Lighthouse Performance Audit

Run Google Lighthouse audit on the site.

## Arguments

- `url` (optional): Specific URL to audit (default: homepage)
- `type` (optional): `desktop` or `mobile` (default: both)

## Instructions

### Phase 1: Run Audit

Use Lighthouse CLI or Chrome DevTools MCP:

```bash
# If Lighthouse CLI available
npx lighthouse https://transcendencework.com --output=json --output=html

# Or for local
npx lighthouse http://localhost:3001 --output=json
```

### Phase 2: Parse Results

Extract scores for:
- **Performance** (target: >90)
- **Accessibility** (target: >95)
- **Best Practices** (target: >90)
- **SEO** (target: >95)

### Phase 3: Report

```
📊 Lighthouse Audit: transcendencework.com

📱 Mobile Scores:
   ⚡ Performance:    85/100 🟡
   ♿ Accessibility:  98/100 ✅
   ✨ Best Practices: 92/100 ✅
   🔍 SEO:           100/100 ✅

💻 Desktop Scores:
   ⚡ Performance:    94/100 ✅
   ♿ Accessibility:  98/100 ✅
   ✨ Best Practices: 92/100 ✅
   🔍 SEO:           100/100 ✅

🔴 Critical Issues:
   - LCP (Largest Contentful Paint): 3.2s (target <2.5s)
   - CLS (Cumulative Layout Shift): 0.15 (target <0.1)

🟡 Opportunities:
   - Reduce unused JavaScript (-450KB)
   - Serve images in next-gen formats
   - Preconnect to required origins

🟢 Passed Audits: 45/52
```

### Phase 4: Actionable Fixes

For each issue, provide:
1. What the problem is
2. Which files/components are affected
3. How to fix it
4. Expected improvement

## Key Metrics Explained

| Metric | Target | Impact |
|--------|--------|--------|
| FCP (First Contentful Paint) | <1.8s | User perceives loading |
| LCP (Largest Contentful Paint) | <2.5s | Main content visible |
| TBT (Total Blocking Time) | <200ms | Interactivity delay |
| CLS (Cumulative Layout Shift) | <0.1 | Visual stability |

## URLs to Audit

- Homepage: https://transcendencework.com
- Coaching: https://transcendencework.com/coaching
- Yoga: https://transcendencework.com/programmes
- Contact: https://transcendencework.com/contact
