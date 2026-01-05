#!/bin/bash

echo "🔧 Nettoyage et réajout des variables Sanity..."
echo ""

# Function to add environment variable properly (one at a time)
add_env_clean() {
    local key=$1
    local value=$2
    local env=$3

    echo "📝 Ajout de $key ($env)..."
    printf "%s" "$value" | vercel env add "$key" "$env" 2>&1 | grep -E "(Added|Error)" || true
}

# Clean project ID - ensure no extra characters
PROJECT_ID="czmpe9zr"
DATASET="production"
API_VERSION="2024-01-01"

echo "🔧 Ajout de NEXT_PUBLIC_SANITY_PROJECT_ID..."
add_env_clean "NEXT_PUBLIC_SANITY_PROJECT_ID" "$PROJECT_ID" "production"
add_env_clean "NEXT_PUBLIC_SANITY_PROJECT_ID" "$PROJECT_ID" "preview"
add_env_clean "NEXT_PUBLIC_SANITY_PROJECT_ID" "$PROJECT_ID" "development"

echo ""
echo "🔧 Ajout de NEXT_PUBLIC_SANITY_DATASET..."
add_env_clean "NEXT_PUBLIC_SANITY_DATASET" "$DATASET" "production"
add_env_clean "NEXT_PUBLIC_SANITY_DATASET" "$DATASET" "preview"
add_env_clean "NEXT_PUBLIC_SANITY_DATASET" "$DATASET" "development"

echo ""
echo "🔧 Ajout de NEXT_PUBLIC_SANITY_API_VERSION..."
add_env_clean "NEXT_PUBLIC_SANITY_API_VERSION" "$API_VERSION" "production"
add_env_clean "NEXT_PUBLIC_SANITY_API_VERSION" "$API_VERSION" "preview"
add_env_clean "NEXT_PUBLIC_SANITY_API_VERSION" "$API_VERSION" "development"

echo ""
echo "✅ Terminé! Variables ajoutées:"
echo "  - NEXT_PUBLIC_SANITY_PROJECT_ID = $PROJECT_ID"
echo "  - NEXT_PUBLIC_SANITY_DATASET = $DATASET"
echo "  - NEXT_PUBLIC_SANITY_API_VERSION = $API_VERSION"
echo ""
echo "Vérifiez avec: vercel env ls"
