#!/bin/bash

# Script to make admin pages responsive
# Replaces AdminNav layout with AdminLayout

FILES=(
  "app/(admin)/admin/(protected)/editions/page.tsx"
  "app/(admin)/admin/(protected)/editions/[id]/page.tsx"
  "app/(admin)/admin/(protected)/yoga-individuel/page.tsx"
  "app/(admin)/admin/(protected)/yoga-sante/page.tsx"
  "app/(admin)/admin/(protected)/events/page.tsx"
  "app/(admin)/admin/(protected)/events/new/page.tsx"
  "app/(admin)/admin/(protected)/events/[eventId]/page.tsx"
  "app/(admin)/admin/(protected)/events/[eventId]/edit/page.tsx"
  "app/(admin)/admin/(protected)/coaching/page.tsx"
)

for FILE in "${FILES[@]}"; do
  if [ -f "$FILE" ]; then
    echo "Processing $FILE..."

    # 1. Replace AdminNav import with AdminLayout
    sed -i '' 's/import AdminNav from.*AdminNav.*/import AdminLayout from '\''@\/components\/admin\/AdminLayout'\'';/' "$FILE"

    # 2. Replace div wrapper start (multiline pattern approximation)
    # This is tricky with sed, so we'll use perl for multiline
    perl -i -0pe 's/<div className="flex h-screen overflow-hidden">\s*\{\/\* Sidebar \*\/\}\s*<div className="w-64 flex-shrink-0">\s*<AdminNav \/>\s*<\/div>\s*\{\/\* Main Content \*\/\}\s*<div className="flex-1 overflow-auto">\s*<div className="p-8">/<AdminLayout>\n      <div className="p-4 sm:p-6 md:p-8">/gs' "$FILE"

    # 3. Replace closing divs (find last occurrence of 3 closing divs before final closing brace)
    perl -i -0pe 's/(\s*)<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\);\s*\}$/\1<\/div>\n    <\/AdminLayout>\n  );\n}/gs' "$FILE"

    echo "  ✓ Updated $FILE"
  else
    echo "  ✗ File not found: $FILE"
  fi
done

echo ""
echo "Done! All admin pages updated with responsive layout."
