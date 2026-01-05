#!/bin/bash

set -e

echo "🧹 Nettoyage complet des variables Vercel Sanity..."
echo "=================================================="
echo ""

# Liste des variables à nettoyer
VARS=(
    "NEXT_PUBLIC_SANITY_PROJECT_ID"
    "NEXT_PUBLIC_SANITY_DATASET"
    "NEXT_PUBLIC_SANITY_API_VERSION"
    "SANITY_API_TOKEN"
    "SANITY_PREVIEW_SECRET"
    "SANITY_WEBHOOK_SECRET"
)

ENVS=("production" "preview" "development")

echo "Étape 1: Suppression des variables existantes..."
for var in "${VARS[@]}"; do
    echo "  🗑️  Suppression de $var..."
    for env in "${ENVS[@]}"; do
        vercel env rm "$var" "$env" --yes 2>/dev/null || true
    done
done

echo ""
echo "Étape 2: Réajout des variables (proprement, sans \\n)..."
echo ""

# Function to add env var without newline
add_clean() {
    local key="$1"
    local value="$2"

    for env in "${ENVS[@]}"; do
        echo "  📝 $key → $env"
        printf "%s" "$value" | vercel env add "$key" "$env" 2>&1 | grep -E "(Added|already)" || true
    done
}

# Ajout des variables
add_clean "NEXT_PUBLIC_SANITY_PROJECT_ID" "czmpe9zr"
add_clean "NEXT_PUBLIC_SANITY_DATASET" "production"
add_clean "NEXT_PUBLIC_SANITY_API_VERSION" "2024-01-01"
add_clean "SANITY_API_TOKEN" "skNdIdlqmFmALzAOABlVR9CaMBwHoisRLJJ17FrpY5yX9tXCVFvR4zJC8HIt49oSAxyjGNxpuJzUQXyFl6oBFldvG22fJhhoQpJM8Fv8xA3mvzjwyyBFlBygi0lBRz8wwD4y62xDNhGl2O5OeYUzTLXyCzx6hufKOcGFNWtCJ9kH0PgzBdPw"
add_clean "SANITY_PREVIEW_SECRET" "transcendence-preview-2024"
add_clean "SANITY_WEBHOOK_SECRET" "transcendence-webhook-2024"

echo ""
echo "=================================================="
echo "✅ Nettoyage terminé!"
echo ""
echo "📋 Vérification:"
vercel env pull .env.vercel.check 2>/dev/null
echo ""
echo "Valeurs téléchargées:"
grep "SANITY" .env.vercel.check | head -3
echo ""
echo "🔄 Prochaine étape: Redéployer via GitHub"
echo "   git commit --allow-empty -m 'chore: trigger redeploy' && git push"
