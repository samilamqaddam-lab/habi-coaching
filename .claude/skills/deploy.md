# /deploy - Quick Deploy to Production

Commit changes and push to GitHub for automatic Vercel deployment.

## Arguments

- `message` (optional): Custom commit message. If not provided, will generate one based on changes.

## Instructions

1. Run `git status` to see all changes
2. Run `git diff` to understand what changed
3. If no changes, inform user and exit
4. Generate a descriptive commit message based on changes (or use provided message)
5. Stage all changes with `git add .`
6. Commit with the message (include Co-Authored-By footer)
7. Push to origin main
8. Confirm deployment triggered on Vercel

## Commit Message Format

```
<type>: <short description>

<detailed changes if needed>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

Types: feat, fix, refactor, style, docs, chore, perf

## Security Checks

Before committing, verify:
- No `.env` files or secrets in staged changes
- No API keys or tokens in code
- No credentials in configuration files

If security issues found, STOP and warn the user.
