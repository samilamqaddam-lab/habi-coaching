# /status - Project Status Overview

Show Git status and Vercel deployment status.

## Instructions

1. **Git Status**:
   - Current branch
   - Uncommitted changes (staged/unstaged)
   - Commits ahead/behind origin
   - Recent commits (last 5)

2. **Vercel Status**:
   - Check latest deployment via `vercel ls` or GitHub API
   - Show deployment URL and status
   - Any failed deployments

3. **Dev Server Status**:
   - Check if localhost:3001 is running
   - Show any running Next.js processes

## Commands

```bash
# Git status
git status
git log --oneline -5

# Check dev server
lsof -ti:3001

# Vercel (if CLI available)
vercel ls --limit 3 2>/dev/null || echo "Vercel CLI not configured"
```

## Output Format

```
📊 Project Status: Hajar Habi Coaching

🔀 Git:
   Branch: main
   Status: Clean / X modified files
   Last commit: <hash> <message> (<time ago>)

🚀 Vercel:
   Latest: ✅ Ready (2 min ago)
   URL: https://transcendencework.com

💻 Dev Server:
   localhost:3001: Running / Not running
```
