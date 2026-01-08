# /sanity-deploy - Deploy Sanity Studio

Deploy Sanity Studio and GraphQL API.

## Instructions

1. Verify Sanity CLI is available
2. Deploy the Sanity Studio
3. Deploy GraphQL API if schema changed
4. Verify deployment succeeded

## Commands

```bash
# Deploy Studio (if using standalone)
npx sanity deploy

# Deploy GraphQL API
npx sanity graphql deploy
```

## Notes

For this project, Sanity Studio is embedded in Next.js at `/studio` route.
Deploying to Vercel automatically deploys the studio.

To manually redeploy just the studio schema:
```bash
npx sanity deploy
```

## Verification

After deployment, verify at:
- Studio: https://transcendencework.com/studio
- API: https://czmpe9zr.api.sanity.io
