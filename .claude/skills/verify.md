# /verify - Comprehensive Code Verification

Thorough verification of all code for best practices, efficiency, and security.

## Instructions

Perform a complete audit of recent changes and overall code quality.

### Phase 1: Recent Changes Analysis

1. **Git History Review**
   ```bash
   git log --oneline -10
   git diff HEAD~5 --stat
   ```

2. **Identify Modified Files**
   - List all files changed in recent commits
   - Focus verification on these files first

### Phase 2: Code Quality Checks

For each modified file, verify:

#### A. TypeScript/JavaScript Best Practices

- [ ] Proper TypeScript types (no `any` unless justified)
- [ ] Consistent naming conventions (camelCase, PascalCase)
- [ ] No unused variables or imports
- [ ] Proper error handling (try/catch, error boundaries)
- [ ] No console.log statements in production code
- [ ] Async/await used correctly (no floating promises)
- [ ] Props properly typed for React components
- [ ] Hooks follow rules (dependencies, order)

#### B. React/Next.js Best Practices

- [ ] Components are properly memoized where needed
- [ ] Keys provided for list items
- [ ] No inline function definitions in JSX (performance)
- [ ] Image components use Next.js `<Image>` with proper sizing
- [ ] Links use Next.js `<Link>` component
- [ ] Server vs Client components correctly designated ('use client')
- [ ] Metadata properly exported for SEO
- [ ] Loading and error states handled

#### C. CSS/Tailwind Best Practices

- [ ] No conflicting classes
- [ ] Responsive design (mobile-first)
- [ ] Consistent spacing scale
- [ ] Theme colors used (not hardcoded hex)
- [ ] Dark mode considerations (if applicable)
- [ ] No unused CSS classes
- [ ] Accessibility (focus states, contrast)

#### D. Performance

- [ ] No N+1 queries or unnecessary re-renders
- [ ] Large lists are virtualized
- [ ] Images are lazy-loaded appropriately
- [ ] Bundle size not unnecessarily increased
- [ ] No blocking operations on main thread
- [ ] Proper caching strategies

### Phase 3: Security Audit

#### A. OWASP Top 10 Checks

1. **Injection Prevention**
   - [ ] No string concatenation for queries
   - [ ] User input sanitized before use
   - [ ] Parameterized queries for database

2. **Authentication/Authorization**
   - [ ] Sensitive routes protected
   - [ ] Tokens handled securely
   - [ ] No credentials in code

3. **XSS Prevention**
   - [ ] No `dangerouslySetInnerHTML` without sanitization
   - [ ] User content escaped in output
   - [ ] CSP headers configured

4. **Sensitive Data Exposure**
   - [ ] No secrets in source code
   - [ ] No API keys committed
   - [ ] Environment variables used correctly
   - [ ] .env files in .gitignore

5. **Security Headers**
   - [ ] HTTPS enforced
   - [ ] Proper CORS configuration
   - [ ] Security headers set (X-Frame-Options, etc.)

#### B. Dependency Security

```bash
npm audit
```

- [ ] No high/critical vulnerabilities
- [ ] Dependencies up to date
- [ ] No deprecated packages

### Phase 4: Efficiency Review

#### A. Code Duplication

- [ ] No copy-pasted code blocks
- [ ] Shared logic extracted to utilities
- [ ] Components properly abstracted

#### B. File Organization

- [ ] Files in correct directories
- [ ] Consistent naming patterns
- [ ] No orphaned files

#### C. Import Efficiency

- [ ] No circular dependencies
- [ ] Tree-shaking friendly imports
- [ ] Barrel exports used appropriately

### Phase 5: Project-Specific Checks

For Hajar Habi Coaching site:

#### A. Content Consistency

- [ ] All pages use translation system (`t()`)
- [ ] No hardcoded French/English strings
- [ ] Sanity content properly typed

#### B. Design System

- [ ] Theme colors: yoga, coaching, corporate, default
- [ ] Hero component used correctly per page
- [ ] Consistent spacing and typography

#### C. Image Handling

- [ ] All hero images exist in `/public/images/heroes/`
- [ ] Images properly optimized (<500KB)
- [ ] Alt text provided

### Phase 6: Verification Report

```
📊 COMPREHENSIVE VERIFICATION REPORT
====================================

🔍 Scope: Last 5 commits (X files modified)
📅 Date: [current date]

📁 FILES REVIEWED:
   - app/HomeContent.tsx
   - components/sections/Hero.tsx
   - app/globals.css
   - [other modified files]

✅ CODE QUALITY
   TypeScript: 100% typed, no 'any'
   React: Hooks rules followed
   Tailwind: Theme colors used consistently
   Score: 95/100

🔒 SECURITY
   Secrets: None exposed ✅
   Dependencies: 0 vulnerabilities ✅
   XSS: Protected ✅
   CSRF: N/A (static site)
   Score: 100/100

⚡ PERFORMANCE
   Bundle size: No increase
   Images: Properly optimized
   Lazy loading: Implemented
   Score: 90/100

📋 BEST PRACTICES
   File organization: ✅
   Naming conventions: ✅
   Code duplication: None found ✅
   Score: 95/100

🎯 PROJECT-SPECIFIC
   Translations: All using t() ✅
   Design system: Consistent ✅
   Sanity integration: Properly typed ✅
   Score: 100/100

═══════════════════════════════════
OVERALL SCORE: 96/100 ✅ EXCELLENT
═══════════════════════════════════

🟢 PASSED: 45 checks
🟡 WARNINGS: 2
🔴 ISSUES: 0

WARNINGS:
1. Consider memoizing HeroContent component for performance
2. Image /heroes/contact.jpg could be further compressed

RECOMMENDATIONS:
1. Add error boundary to root layout
2. Consider implementing ISR for blog posts
3. Add structured data for better SEO
```

### Phase 7: Auto-Fix Options

If issues found, offer to:
1. Fix TypeScript errors
2. Remove unused imports/variables
3. Add missing types
4. Optimize images
5. Update vulnerable dependencies

## Verification Checklist Summary

```
□ TypeScript types correct
□ No security vulnerabilities
□ No secrets in code
□ Performance optimized
□ Accessibility standards met
□ SEO best practices followed
□ Code properly organized
□ Tests pass (if applicable)
□ Build succeeds
□ No console errors
```
