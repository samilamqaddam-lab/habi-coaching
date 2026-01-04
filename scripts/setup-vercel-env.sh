#!/bin/bash

echo "🚀 Configuration des variables d'environnement Vercel"
echo "=================================================="
echo ""

# Check if vercel is logged in
if ! vercel whoami &> /dev/null; then
    echo "❌ Vous devez vous connecter à Vercel d'abord"
    echo "👉 Exécutez: vercel login"
    exit 1
fi

echo "✅ Connecté à Vercel"
echo ""

# Function to add environment variable to all environments
add_env() {
    local key=$1
    local value=$2

    echo "📝 Ajout de $key..."

    # Add to production
    echo "$value" | vercel env add "$key" production 2>&1 | grep -v "already exists" || true

    # Add to preview
    echo "$value" | vercel env add "$key" preview 2>&1 | grep -v "already exists" || true

    # Add to development
    echo "$value" | vercel env add "$key" development 2>&1 | grep -v "already exists" || true
}

echo "🔧 Ajout des variables Sanity..."
add_env "NEXT_PUBLIC_SANITY_PROJECT_ID" "czmpe9zr"
add_env "NEXT_PUBLIC_SANITY_DATASET" "production"
add_env "NEXT_PUBLIC_SANITY_API_VERSION" "2024-01-01"
add_env "SANITY_API_TOKEN" "skNdIdlqmFmALzAOABlVR9CaMBwHoisRLJJ17FrpY5yX9tXCVFvR4zJC8HIt49oSAxyjGNxpuJzUQXyFl6oBFldvG22fJhhoQpJM8Fv8xA3mvzjwyyBFlBygi0lBRz8wwD4y62xDNhGl2O5OeYUzTLXyCzx6hufKOcGFNWtCJ9kH0PgzBdPw"

echo ""
echo "📧 Ajout des variables Resend..."
add_env "RESEND_API_KEY" "re_SiBCYQ3p_KzL6s71KFWYLVovk6wF7CpbZ"

echo ""
echo "🔐 Ajout des variables Preview & Webhooks..."
add_env "SANITY_PREVIEW_SECRET" "transcendence-preview-2024"
add_env "SANITY_WEBHOOK_SECRET" "transcendence-webhook-2024"

echo ""
echo "=================================================="
echo "✅ Configuration terminée!"
echo ""
echo "📊 Résumé des variables ajoutées:"
echo "  - Sanity CMS (4 variables)"
echo "  - Resend Email (1 variable)"
echo "  - Preview & Webhooks (2 variables)"
echo ""
echo "🔄 Prochaines étapes:"
echo "  1. Redéployer: vercel --prod"
echo "  2. Ou attendre le prochain commit (auto-deploy)"
echo ""
