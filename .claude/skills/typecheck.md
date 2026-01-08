# /typecheck - TypeScript Type Checking

Run TypeScript type checking without building.

## Instructions

1. Run `npx tsc --noEmit` to check types
2. Parse and display any type errors found
3. Group errors by file for easier reading
4. Offer to fix simple type errors automatically

## Command

```bash
npx tsc --noEmit 2>&1
```

## Output Format

If errors found:
```
Found X type errors in Y files:

📁 path/to/file.tsx
  Line 10: Type 'string' is not assignable to type 'number'
  Line 25: Property 'foo' does not exist on type 'Bar'

📁 path/to/other.ts
  Line 5: ...
```

If no errors:
```
✅ No TypeScript errors found
```
