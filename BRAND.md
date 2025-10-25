# Brand Kit - Hajar Habi Coaching

Documentation complète de l'identité visuelle et des guidelines de design.

**Version:** 0.3 - Palettes Contextuelles (Sadhguru-Inspired)
**Dernière mise à jour:** 2025-01-25

---

## 🎨 Palette de Couleurs v0.3

### Couleurs Principales - Yoga & Spiritualité (Sadhguru-Inspired)

| Nom | Code Hex | RGB | Usage |
|-----|----------|-----|-------|
| **Golden Orange** | `#D4924F` | `rgb(212, 146, 79)` | **NOUVEAU** - CTAs yoga, accents solaires, highlights |
| **Golden Orange Dark** | `#B87A3D` | `rgb(184, 122, 61)` | Hover states orange, variation foncée |
| **Deep Earth** | `#3D3426` | `rgb(61, 52, 38)` | Backgrounds sombres (inspiré logo Sadhguru) |
| **Deep Earth Light** | `#5A4D3A` | `rgb(90, 77, 58)` | Variante claire du deep earth |

### Couleurs Coaching & Transformation

| Nom | Code Hex | RGB | Usage |
|-----|----------|-----|-------|
| **Mystic Mauve** | `#9F8AAA` | `rgb(159, 138, 170)` | **NOUVEAU** - Coaching, spiritualité, introspection |
| **Mystic Mauve Light** | `#C8BADB` | `rgb(200, 186, 219)` | Backgrounds coaching, lavande pâle |
| **Mystic Mauve Dark** | `#87738F` | `rgb(135, 115, 143)` | Hover states mauve |

### Couleurs Corporate & Professionnalisme

| Nom | Code Hex | RGB | Usage |
|-----|----------|-----|-------|
| **Morocco Blue** | `#2C4B5E` | `rgb(44, 75, 94)` | Corporate, icônes professionnelles |
| **Deep Blue** | `#1A3A4A` | `rgb(26, 58, 74)` | Titres principaux, texte important |
| **Sky Blue** | `#7BA0B4` | `rgb(123, 160, 180)` | Accents bleus, backgrounds légers |

### Couleurs Héritées (Compatibilité)

| Nom | Code Hex | RGB | Usage |
|-----|----------|-----|-------|
| **Desert Ocre** | `#C89F6F` | `rgb(200, 159, 111)` | Accents chaleureux alternatifs |
| **Desert Light** | `#E5D3B3` | `rgb(229, 211, 179)` | Backgrounds légers |
| **Dune Beige** | `#F5EFE7` | `rgb(245, 239, 231)` | Sections alternées (beige backgrounds) |
| **Terracotta** | `#C67B5C` | `rgb(198, 123, 92)` | Ancienne couleur (remplacée par golden-orange) |
| **Sage Green** | `#9DAE8D` | `rgb(157, 174, 141)` | Ancienne couleur (remplacée par mystic-mauve) |

### Couleurs Neutres

| Nom | Code Hex | RGB | Usage |
|-----|----------|-----|-------|
| **Warm White** | `#FDFBF7` | `rgb(253, 251, 247)` | Background principal du site |
| **Soft Gray** | `#E8E5E1` | `rgb(232, 229, 225)` | Bordures, séparateurs subtils |
| **Charcoal** | `#3A3A3A` | `rgb(58, 58, 58)` | Texte très foncé (alternatif) |
| **Text Primary** | `#2C2C2C` | `rgb(44, 44, 44)` | Texte principal du corps |
| **Text Secondary** | `#6B6B6B` | `rgb(107, 107, 107)` | Texte secondaire, descriptions |

---

## 🎭 Palettes Contextuelles par Page

### 📿 Page YOGA (/programmes) - Ambiance Sadhguru (Spirituelle & Solaire)

**Couleurs dominantes:**
- **Primary:** Golden Orange `#D4924F` - CTAs, icônes, prix, highlights
- **Secondary:** Mystic Mauve `#9F8AAA` - Touches subtiles, backgrounds
- **Earth:** Deep Earth `#3D3426` - (Potentiel pour futurs thèmes sombres)

**Application:**
```tsx
// Icons & Highlights
bg-golden-orange/10      icon: text-golden-orange
bg-mystic-mauve-light/10 (backgrounds alternés)

// Gradients
from-golden-orange/20 to-mystic-mauve/20

// CTAs & Prix
text-golden-orange (prix, badges, checkmarks)
```

**Ressenti:** Chaleur solaire, éveil spirituel, connexion à Sadhguru

---

### 💭 Page COACHING (/coaching) - Ambiance Transformation (Introspective & Chaleureuse)

**Couleurs dominantes:**
- **Primary:** Mystic Mauve `#9F8AAA` - CTAs, icônes, prix
- **Secondary:** Golden Orange `#D4924F` - Accents chaleureux (step 2)
- **Balance:** 60% Mauve / 40% Orange

**Application:**
```tsx
// Icons principales
bg-mystic-mauve/10       icon: text-mystic-mauve

// Step numbers (approche)
Step 1 & 3: bg-mystic-mauve/10 text-mystic-mauve
Step 2: bg-golden-orange/10 text-golden-orange (touche humaine)

// Backgrounds
bg-mystic-mauve-light/20 (sections CTA)
from-dune-beige to-mystic-mauve-light/20 (cartes testimonials)
```

**Ressenti:** Introspection profonde, transformation douce, chaleur humaine

---

### 🏢 Page ORGANISATIONS (/organisations) - Ambiance Corporate (Professionnelle & Humaine)

**Couleurs dominantes:**
- **Primary:** Morocco Blue `#2C4B5E` - Icônes, éléments corporate
- **Secondary:** Golden Orange `#D4924F` - CTAs, humanisation
- **Accent:** Sky Blue `#7BA0B4` - Backgrounds légers

**Application:**
```tsx
// Icons services
Card 1 (Transformation): bg-morocco-blue/10 text-morocco-blue
Card 2 (Leadership): bg-golden-orange/10 text-golden-orange (humanité)
Card 3 (Retreats): bg-morocco-blue/10 text-morocco-blue

// Backgrounds
bg-sky-blue/10 (section CTA)

// CTAs
Golden orange (apporte chaleur au monde corporate)
```

**Ressenti:** Professionnalisme solide + chaleur humaine grâce à l'orange

---

## 🔘 Boutons (Button Component)

| Variant | Background | Text | Hover BG | Border |
|---------|-----------|------|----------|--------|
| **Primary** | Golden Orange `#D4924F` | Warm White `#FDFBF7` | Golden Orange Dark `#B87A3D` | - |
| **Secondary** | Mystic Mauve `#9F8AAA` | Warm White `#FDFBF7` | Mystic Mauve Dark `#87738F` | - |
| **Outline** | Transparent | Deep Blue `#1A3A4A` | Deep Blue `#1A3A4A` (bg) + Warm White (text) | Deep Blue 2px |
| **Text** | Transparent | Morocco Blue `#2C4B5E` | Deep Blue `#1A3A4A` | - |

---

## 🖼️ Backgrounds de Section

| Type | Couleur Tailwind | Code Hex | Usage |
|------|------------------|----------|-------|
| Default | `bg-warm-white` | `#FDFBF7` | Background principal |
| Beige | `bg-dune-beige` | `#F5EFE7` | Sections alternées neutres |
| Sage (legacy) | `bg-sage-light/20` | `#C9D5BE` (20%) | Ancienne version |
| **Mauve** | `bg-mystic-mauve-light/20` | `#C8BADB` (20%) | **NOUVEAU** - Sections coaching/yoga |
| **Sky Blue** | `bg-sky-blue/10` | `#7BA0B4` (10%) | **NOUVEAU** - Sections corporate |

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
Card H3: text-2xl (font-heading, font-bold)  ← Plus grand que highlights
Card Highlight: text-xl (font-bold)           ← Highlights (prix, certifications)
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

## 🎨 Dégradés

```css
/* Yoga - Orange doré + Mauve */
from-golden-orange/20 to-mystic-mauve/20

/* Coaching - Beige + Mauve */
from-dune-beige to-mystic-mauve-light/20

/* Corporate - (À définir si besoin) */
from-morocco-blue/10 to-sky-blue/10
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
// Services cards & Expertise cards
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
hover:text-golden-orange transition-colors (yoga)
hover:text-mystic-mauve transition-colors (coaching)
hover:text-deep-blue transition-colors (corporate)
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

- [ ] Couleur adaptée au contexte (Yoga=Orange, Coaching=Mauve, Corporate=Blue)
- [ ] Hiérarchie typographique: Titre (text-2xl) > Highlight (text-xl) > Description (text-sm)
- [ ] Espacement cohérent avec le system (xs/sm/md/lg/xl/2xl)
- [ ] Responsive (mobile-first, breakpoints md/lg)
- [ ] Hover states pour éléments interactifs
- [ ] Contraste suffisant pour accessibilité (WCAG AA minimum)
- [ ] Font smoothing activé pour textes élégants
- [ ] Transitions douces (0.3s ease)
- [ ] Icons background: couleur primaire avec opacity /10
- [ ] Icons: couleur primaire pleine

---

## 🔄 Migration v0.2 → v0.3

**Changements majeurs:**

1. **Terracotta → Golden Orange** (inspiré logo Sadhguru)
   - `#C67B5C` → `#D4924F`
   - Plus chaud, plus doré, plus vibrant

2. **Sage Green → Mystic Mauve** (coaching/spiritualité)
   - `#9DAE8D` → `#9F8AAA`
   - Représente introspection, transformation, spiritualité

3. **Boutons Primary** maintenant Golden Orange (vs Terracotta)
4. **Boutons Secondary** maintenant Mystic Mauve (vs Sage)
5. **Backgrounds** ajout de `mystic-mauve-light` et `sky-blue-light`

**Avantages:**
- Cohérence avec identité Yoga (Sadhguru)
- Différenciation claire des 3 domaines (Yoga/Coaching/Corporate)
- Chaleur solaire du golden orange vs aspect terne du terracotta
- Dimension spirituelle du mauve vs aspect naturel fade du sage

---

## 🔗 Ressources

- **Production:** https://habi-coaching.vercel.app
- **Repository:** https://github.com/samilamqaddam-lab/habi-coaching
- **Logo inspiration:** Sadhguru Foundation (golden orange + deep earth)

---

**Maintenu par:** Sami Lamqaddam
**Contact:** [À définir]
