# Configuration Variables Vercel

## Méthode 1: Script automatique (RECOMMANDÉ)

### Étapes:

1. **Se connecter à Vercel:**
```bash
vercel login
```

2. **Exécuter le script:**
```bash
./scripts/setup-vercel-env.sh
```

3. **Redéployer:**
```bash
vercel --prod
```

---

## Méthode 2: Commandes manuelles

Si tu préfères ajouter les variables une par une:

```bash
# Se connecter
vercel login

# Variables Sanity (publiques)
echo "czmpe9zr" | vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID production preview development
echo "production" | vercel env add NEXT_PUBLIC_SANITY_DATASET production preview development
echo "2024-01-01" | vercel env add NEXT_PUBLIC_SANITY_API_VERSION production preview development

# Token Sanity (privé)
echo "skNdIdlqmFmALzAOABlVR9CaMBwHoisRLJJ17FrpY5yX9tXCVFvR4zJC8HIt49oSAxyjGNxpuJzUQXyFl6oBFldvG22fJhhoQpJM8Fv8xA3mvzjwyyBFlBygi0lBRz8wwD4y62xDNhGl2O5OeYUzTLXyCzx6hufKOcGFNWtCJ9kH0PgzBdPw" | vercel env add SANITY_API_TOKEN production preview development

# Resend
echo "re_SiBCYQ3p_KzL6s71KFWYLVovk6wF7CpbZ" | vercel env add RESEND_API_KEY production preview development

# Preview & Webhooks
echo "transcendence-preview-2024" | vercel env add SANITY_PREVIEW_SECRET production preview development
echo "transcendence-webhook-2024" | vercel env add SANITY_WEBHOOK_SECRET production preview development

# Redéployer
vercel --prod
```

---

## Méthode 3: Interface Web Vercel

Si tu préfères l'interface graphique:

1. Aller sur https://vercel.com
2. Projet → Settings → Environment Variables
3. Ajouter chaque variable:

| Variable | Valeur | Env |
|----------|--------|-----|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `czmpe9zr` | All |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | All |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-01-01` | All |
| `SANITY_API_TOKEN` | `skNdI...` | All |
| `RESEND_API_KEY` | `re_SiB...` | All |
| `SANITY_PREVIEW_SECRET` | `transcendence-preview-2024` | All |
| `SANITY_WEBHOOK_SECRET` | `transcendence-webhook-2024` | All |

4. Redéployer depuis l'interface

---

## Vérification

Après configuration, vérifie que tout fonctionne:

```bash
# Vérifier les variables
vercel env ls

# Tester le build local
npm run build

# Redéployer en production
vercel --prod
```

---

## Dépannage

**Erreur "Configuration must contain projectId"**
→ Les variables `NEXT_PUBLIC_SANITY_*` ne sont pas définies

**Erreur au runtime sur /studio**
→ Vérifier que `SANITY_API_TOKEN` est bien configuré

**Les variables ne sont pas prises en compte**
→ Forcer un redéploiement: `vercel --force`
