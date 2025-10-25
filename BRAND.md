# Brand Kit - Hajar Habi Coaching

Documentation complète de l'identité visuelle et des guidelines de design.

---

## 🎨 Palette de Couleurs

### Couleurs Principales - Palette Marocaine

| Nom | Code Hex | RGB | Usage |
|-----|----------|-----|-------|
| **Desert Ocre** | `#C89F6F` | `rgb(200, 159, 111)` | Accents chaleureux, éléments décoratifs |
| **Desert Light** | `#E5D3B3` | `rgb(229, 211, 179)` | Backgrounds légers, hover states |
| **Dune Beige** | `#F5EFE7` | `rgb(245, 239, 231)` | Sections alternées (beige backgrounds) |
| **Terracotta** | `#C67B5C` | `rgb(198, 123, 92)` | CTA principal coaching, highlights |
| **Terracotta Dark** | `#A05F45` | `rgb(160, 95, 69)` | Hover states terracotta, texte sur fond clair |

### Couleurs Yoga & Nature

| Nom | Code Hex | RGB | Usage |
|-----|----------|-----|-------|
| **Sage Green** | `#9DAE8D` | `rgb(157, 174, 141)` | Sections yoga, éléments naturels |
| **Sage Light** | `#C9D5BE` | `rgb(201, 213, 190)` | Backgrounds sage, états hover |

### Couleurs Corporate

| Nom | Code Hex | RGB | Usage |
|-----|----------|-----|-------|
| **Morocco Blue** | `#2C4B5E` | `rgb(44, 75, 94)` | Éléments corporate, icônes professionnelles |
| **Deep Blue** | `#1A3A4A` | `rgb(26, 58, 74)` | Titres principaux, texte important |
| **Sky Blue** | `#7BA0B4` | `rgb(123, 160, 180)` | Accents bleus, liens secondaires |

### Couleurs Neutres

| Nom | Code Hex | RGB | Usage |
|-----|----------|-----|-------|
| **Warm White** | `#FDFBF7` | `rgb(253, 251, 247)` | Background principal du site |
| **Soft Gray** | `#E8E5E1` | `rgb(232, 229, 225)` | Bordures, séparateurs subtils |
| **Charcoal** | `#3A3A3A` | `rgb(58, 58, 58)` | Texte très foncé (alternatif) |
| **Text Primary** | `#2C2C2C` | `rgb(44, 44, 44)` | Texte principal du corps |
| **Text Secondary** | `#6B6B6B` | `rgb(107, 107, 107)` | Texte secondaire, descriptions |

---

## ✍️ Typographie

### Polices

| Usage | Police | Poids | Fallback |
|-------|--------|-------|----------|
| **Titres** | Playfair Display | 400, 700 | serif |
| **Corps** | Inter | 400, 500, 600, 700 | system-ui, sans-serif |

### Hiérarchie Typographique

```css
/* Titres */
Hero H1: text-4xl md:text-6xl (font-heading, font-bold)
Section H2: text-3xl md:text-4xl (font-heading, font-bold)
Card H3: text-2xl (font-heading, font-bold)
Sous-titre H4: text-xl (font-heading, font-bold)

/* Corps de texte */
Paragraphe large: text-lg (leading-relaxed)
Paragraphe normal: text-base (leading-relaxed)
Texte secondaire: text-sm (leading-relaxed)
Petits textes: text-xs
```

---

## 📐 Espacements

### System d'Espacement

| Variable | Valeur | Usage |
|----------|--------|-------|
| `spacing-xs` | 0.5rem (8px) | Petits gaps, padding interne |
| `spacing-sm` | 1rem (16px) | Espacement standard entre éléments |
| `spacing-md` | 2rem (32px) | Espacement entre sections internes |
| `spacing-lg` | 4rem (64px) | Padding de sections majeures |
| `spacing-xl` | 6rem (96px) | Grandes séparations verticales |
| `spacing-2xl` | 8rem (128px) | Séparations maximum entre sections |

### Padding de Composants

```css
Card padding-sm: 1rem
Card padding-md: 1.5rem
Card padding-lg: 2rem

Section padding: py-16 (spacing-lg)
Section padding-lg: py-24 (spacing-xl)
```

---

## 🎯 Usage des Couleurs par Contexte

### Homepage - Section Expertise

| Élément | Couleur | Code |
|---------|---------|------|
| Corporate - Icône | Morocco Blue | `#2C4B5E` |
| Corporate - Highlight | Morocco Blue | `#2C4B5E` |
| Coaching - Icône | Terracotta | `#C67B5C` |
| Coaching - Highlight | Terracotta | `#C67B5C` |
| Yoga - Icône | Sage Green | `#9DAE8D` |
| Yoga - Highlight | Sage Green | `#9DAE8D` |

### Boutons (Components)

| Variant | Background | Text | Hover BG | Border |
|---------|-----------|------|----------|--------|
| **Primary** | Terracotta `#C67B5C` | Warm White `#FDFBF7` | Terracotta Dark `#A05F45` | - |
| **Outline** | Transparent | Deep Blue `#1A3A4A` | Dune Beige `#F5EFE7` | Deep Blue |
| **Text** | Transparent | Morocco Blue `#2C4B5E` | Dune Beige `#F5EFE7` | - |

### Backgrounds de Section

| Type | Couleur | Code |
|------|---------|------|
| Default | Warm White | `#FDFBF7` |
| Beige | Dune Beige | `#F5EFE7` |
| Sage | Sage Light | `#C9D5BE` |

---

## 🖼️ Cards & Composants

### Card Variants

```tsx
// Padding options
padding="sm"  // 1rem
padding="md"  // 1.5rem
padding="lg"  // 2rem

// Hover effect
hover={true}  // Ajoute transform et shadow au survol
```

### Icônes - Background Circles

| Contexte | Background | Opacité | Icône |
|----------|-----------|---------|-------|
| Corporate | Morocco Blue | 10% | Morocco Blue |
| Coaching | Terracotta | 10% | Terracotta |
| Yoga | Sage Green | 20% | Sage Green |

---

## 🎨 Dégradés

```css
/* Placeholder d'images articles */
from-terracotta/10 to-sage/10

/* Effet glassmorphism (si utilisé) */
backdrop-blur-sm bg-white/80
```

---

## 📱 Breakpoints Responsive

```css
sm: 640px   // Petits mobiles → tablettes
md: 768px   // Tablettes
lg: 1024px  // Desktop standard
xl: 1280px  // Large desktop
2xl: 1536px // Extra large
```

### Grids Responsive

```tsx
// Services cards
grid md:grid-cols-2 lg:grid-cols-3

// Expertise cards
grid md:grid-cols-2 lg:grid-cols-3

// Témoignages
grid lg:grid-cols-2
```

---

## 🎭 Effets & Transitions

### Hover States

```css
/* Boutons */
transition: background-color 0.3s ease, transform 0.3s ease

/* Cards avec hover */
hover:shadow-lg hover:-translate-y-1 transition-all

/* Liens texte */
hover:text-terracotta transition-colors
```

### Animations

```css
/* Smooth scroll */
scroll-behavior: smooth

/* Font smoothing */
-webkit-font-smoothing: antialiased
-moz-osx-font-smoothing: grayscale
```

---

## 📋 Checklist Design

Lors de la création de nouveaux composants, vérifier:

- [ ] Couleur respecte le contexte (Corporate=Blue, Coaching=Terracotta, Yoga=Sage)
- [ ] Hiérarchie typographique correcte (titre > highlight > description)
- [ ] Espacement cohérent avec le system (xs/sm/md/lg/xl/2xl)
- [ ] Responsive (mobile-first, breakpoints md/lg)
- [ ] Hover states pour éléments interactifs
- [ ] Contraste suffisant pour accessibilité
- [ ] Font smoothing activé pour textes élégants
- [ ] Transitions douces (0.3s ease)

---

## 🔄 Mise à Jour

Pour modifier les couleurs globalement:

1. Éditer `/app/globals.css` - section `:root`
2. Les variables CSS se propagent automatiquement via Tailwind
3. Rebuild avec `npm run build` pour vérifier
4. Tester sur toutes les pages principales

---

**Version:** 1.0
**Dernière mise à jour:** 2025-01-25
**Maintenu par:** Sami Lamqaddam
