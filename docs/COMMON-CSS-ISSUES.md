# Common CSS Issues - Troubleshooting Guide

Ce guide documente les problèmes CSS récurrents rencontrés sur le projet et leurs solutions.

---

## 🔴 Problème: Texte Vertical (Lettre par Lettre)

### Symptômes
- Le texte s'affiche verticalement, une lettre par ligne
- Les composants semblent compressés ou déformés
- Les boutons et éléments UI ont une largeur extrêmement réduite
- Généralement observé lors de l'ajout de nouveaux layouts ou sections

### Exemple Visuel
```
T
r
a
n
s
c
e
n
d
e
n
c
e
W
o
r
k
```

Au lieu de: `TranscendenceWork`

### Cause Racine
**Le fichier `globals.css` n'est pas importé** dans le layout ou le composant.

Dans Next.js App Router, chaque layout peut définir ses propres styles. Si vous créez un nouveau layout sans importer `globals.css`, vous perdez:
- Tous les styles Tailwind CSS (directives `@tailwind`)
- Les variables CSS custom (`:root`)
- Les styles de base et de réinitialisation
- Les classes utility Tailwind

### Solution

#### Pour un Layout Root
Si vous créez un nouveau layout racine (avec balises `<html>` et `<body>`):

```typescript
// ❌ INCORRECT
import { Inter } from 'next/font/google';

export default function MyLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

```typescript
// ✅ CORRECT
import { Inter } from 'next/font/google';
import '../globals.css'; // ⬅️ AJOUTER CETTE LIGNE

export default function MyLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

#### Pour un Layout Imbriqué
Si votre layout n'est pas racine (pas de balises `<html>`), les styles devraient être hérités du layout parent, mais vous pouvez toujours importer `globals.css` pour garantir la disponibilité:

```typescript
import './relative/path/to/globals.css';
```

### Occurrences Historiques

| Date | Composant/Page | Commit Fix |
|------|----------------|------------|
| 2026-01-13 | `/app/admin/layout.tsx` | `95bb924` |
| [À remplir lors de futurs incidents] | | |

### Checklist de Prévention

Lors de la création d'un nouveau layout ou d'une nouvelle section isolée:

- [ ] Vérifier que `globals.css` est importé
- [ ] Tester le rendu visuel avant de commit
- [ ] Si le layout crée un nouveau `<html>`, l'import est **obligatoire**
- [ ] Si le layout est imbriqué, vérifier l'héritage des styles

---

## 🔴 Problème: Classes Tailwind Non Reconnues

### Symptômes
- Classes Tailwind présentes dans le code mais non appliquées
- Console browser affiche des warnings `Unknown at rule @tailwind`
- Le site s'affiche sans styles ou avec styles partiels

### Cause Racine
- `globals.css` manquant ou mal configuré
- Configuration Tailwind incorrecte dans `tailwind.config.ts`
- Ordre d'import CSS incorrect

### Solution

1. **Vérifier `globals.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

2. **Vérifier l'import dans le layout racine:**
```typescript
import './globals.css'; // Doit être avant tout autre import CSS
```

3. **Vérifier `tailwind.config.ts`:**
```typescript
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Tous les chemins de fichiers utilisant Tailwind
  ],
  // ...
}
```

---

## 🟡 Problème: Styles Conflictuels entre Layouts

### Symptômes
- Styles admin interfèrent avec styles site principal
- Variables CSS écrasées
- Comportement différent selon la page visitée

### Cause Racine
Multiple imports de `globals.css` avec des variables CSS différentes.

### Solution

**Option A: Layout Commun** (Recommandé)
Utiliser un seul layout racine et appliquer des variations via classes CSS:

```typescript
// app/layout.tsx (layout unique)
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

// app/admin/(protected)/layout.tsx (layout imbriqué)
export default function AdminLayout({ children }) {
  return (
    <div className="dark min-h-screen bg-slate-900">
      {children}
    </div>
  );
}
```

**Option B: Layouts Séparés** (Si nécessaire)
Créer des fichiers CSS séparés et les importer de façon isolée:

```
/app/globals.css          → Layout principal
/app/admin/admin.css      → Layout admin (importe globals.css + overrides)
```

---

## 🟢 Best Practices

### 1. Import Order
L'ordre d'import dans un layout est important:

```typescript
// 1. Fonts Next.js (génèrent du CSS)
import { Inter, Playfair_Display } from 'next/font/google';

// 2. Global CSS (TOUJOURS en premier après les fonts)
import './globals.css';

// 3. Component-specific CSS (si nécessaire)
import './custom.css';

// 4. React imports
import { ReactNode } from 'react';

// 5. Component imports
import Header from '@/components/Header';
```

### 2. Vérification Rapide
Avant de commit un nouveau layout, testez avec ce composant minimal:

```typescript
export default function TestPage() {
  return (
    <div className="p-4 bg-blue-500 text-white">
      <h1 className="text-2xl font-bold">Test Horizontal</h1>
      <p className="mt-2">Si ce texte est vertical, globals.css est manquant</p>
    </div>
  );
}
```

Si le texte apparaît vertical → `globals.css` n'est pas importé.

### 3. Dark Mode Admin
Pour un espace admin avec dark mode sans affecter le site principal:

```typescript
// app/admin/layout.tsx
import '../globals.css';

export default function AdminLayout({ children }) {
  return (
    <html lang="fr" className="dark">
      <body className="bg-slate-900 text-slate-100">
        {children}
      </body>
    </html>
  );
}
```

La classe `dark` active le mode sombre Tailwind pour tout l'arbre admin.

---

## 📚 Références

- [Next.js Layouts Documentation](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)
- [Tailwind CSS Setup](https://tailwindcss.com/docs/installation)
- [CLAUDE.md](../CLAUDE.md) - Project Memory

---

**Dernière mise à jour:** 2026-01-13
**Mainteneur:** Équipe Dev Transcendence Work
