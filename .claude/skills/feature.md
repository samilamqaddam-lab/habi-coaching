# /feature - Create Feature Branch

Create a new Git Flow feature branch from develop (or main if no develop).

## Arguments

- `name` (required): Feature name (will be prefixed with `feature/`)

## Instructions

1. Validate the feature name (lowercase, hyphens only, no spaces)
2. Check current branch and stash any uncommitted changes
3. Fetch latest from origin
4. Create and checkout new branch: `feature/<name>`
5. Push branch to origin with tracking

## Command Sequence

```bash
# Validate and create
git fetch origin
git checkout main
git pull origin main
git checkout -b feature/<name>
git push -u origin feature/<name>
```

## Output

```
✅ Created feature branch: feature/<name>
   Base: main (up to date)
   Tracking: origin/feature/<name>

Ready to start development!
```

## Naming Convention

- Use lowercase letters and hyphens
- Be descriptive but concise
- Examples: `feature/add-dark-mode`, `feature/improve-hero-section`
