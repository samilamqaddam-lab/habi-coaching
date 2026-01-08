# /build - Build and Verify

Build the Next.js application and check for TypeScript errors.

## Instructions

1. Run `npm run build` to build the application
2. Capture and analyze any TypeScript or build errors
3. If errors are found:
   - List all errors with file paths and line numbers
   - Offer to fix them automatically if possible
4. If build succeeds:
   - Report build success with bundle size summary
   - Check for any warnings that should be addressed

## Command

```bash
npm run build 2>&1
```

## On Success

Report:
- Build completed successfully
- Any warnings to review
- Bundle size if available

## On Failure

- List all errors with clear formatting
- Suggest fixes for common issues
- Offer to auto-fix TypeScript errors
