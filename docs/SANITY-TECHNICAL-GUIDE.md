# Documentation Technique Sanity - Transcendence Work

> **Pour Notion:** Copier ce contenu dans 📚 Guides & Références → Nouvelle page "Documentation Technique Sanity"

---

## Vue d'ensemble

### Architecture Contenu

```
┌─────────────────────────────────────────────────────────────┐
│                    SOURCES DE CONTENU                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐     ┌──────────────────┐              │
│  │  locales/*.json  │     │   Sanity CMS     │              │
│  │  (Source Code)   │     │   (Cloud)        │              │
│  └────────┬─────────┘     └────────┬─────────┘              │
│           │                        │                         │
│           ▼                        ▼                         │
│  ┌─────────────────────────────────────────────┐            │
│  │              Next.js Application             │            │
│  │  (Décide quelle source utiliser par section) │            │
│  └─────────────────────────────────────────────┘            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Priorité des Sources par Section

| Section Homepage | Source Principale | Fallback | Modifiable via Sanity? |
|------------------|-------------------|----------|------------------------|
| Hero | `locales/*.json` | - | ❌ Non |
| Expertise | `locales/*.json` via migration | Sanity | ⚠️ Écrasé par migration |
| **Qui suis-je?** | `locales/*.json` | Image Sanity | ❌ Non (texte) / ✅ Oui (image) |
| Services | `locales/*.json` via migration | Sanity | ⚠️ Écrasé par migration |
| CTA | `locales/*.json` via migration | Sanity | ⚠️ Écrasé par migration |
| Testimonials | Sanity | - | ✅ Oui |

---

## Problème: Rollback de Contenu lors des Migrations

### Le Problème

Lors de l'exécution de `npm run migrate:homepage`, le script **écrase** le contenu Sanity avec les valeurs des fichiers JSON. Si le contenu Sanity a été modifié manuellement, ces modifications sont **perdues**.

```
Avant migration:
  Sanity: "Nouveau texte modifié dans Sanity Studio"

Après migration:
  Sanity: "Ancien texte du fichier fr.json" ← Rollback!
```

### Solutions Implémentées

#### Solution 1: Source Unique (Recommandée)

**Principe:** Les fichiers `locales/*.json` sont la **source de vérité unique**.

**Workflow:**
1. Modifier le contenu dans `locales/fr.json`
2. Modifier la traduction dans `locales/en.json`
3. Commit & Push → Déploiement automatique Vercel
4. (Optionnel) Lancer `npm run migrate:homepage` pour sync Sanity

**Avantages:**
- Versionné dans Git
- Pas de risque de rollback
- Historique des modifications
- Review possible via PR

**Sections utilisant cette approche:**
- Hero (titre, description, CTAs)
- Section "Qui suis-je?" (badge, titre, description, CTA)

#### Solution 2: Sanity comme Source (avec précautions)

**Principe:** Sanity est la source de vérité, mais les migrations peuvent écraser.

**Workflow SÉCURISÉ:**
1. **AVANT** de modifier dans Sanity Studio:
   - Mettre à jour `locales/fr.json` avec le même contenu
   - Mettre à jour `locales/en.json` avec la traduction
2. Modifier dans Sanity Studio
3. Les deux sources sont synchronisées

**Workflow DANGEREUX (à éviter):**
1. ❌ Modifier uniquement dans Sanity Studio
2. ❌ Oublier de mettre à jour les fichiers JSON
3. ❌ Quelqu'un lance `npm run migrate:homepage`
4. ❌ Contenu Sanity écrasé → Perte des modifications

---

## Script de Migration: Fonctionnement

### Fichier: `/scripts/migrate-homepage-to-sanity.mjs`

```javascript
// Le script lit DYNAMIQUEMENT depuis les fichiers JSON
const frContent = JSON.parse(readFileSync('../locales/fr.json'))
const enContent = JSON.parse(readFileSync('../locales/en.json'))

// Puis ÉCRASE le document Sanity
await client.createOrReplace(homepageContent)
```

### Sections gérées par le script

| Section | Lecture depuis JSON | Peut écraser Sanity |
|---------|---------------------|---------------------|
| expertiseSection | ✅ `home.expertise.*` | ⚠️ Oui |
| aboutSection | ❌ Hardcodé dans script | ⚠️ Oui |
| servicesSection | ✅ `home.services.*` | ⚠️ Oui |
| ctaSection | ✅ `home.cta.*` | ⚠️ Oui |

### Commande

```bash
npm run migrate:homepage
```

**Quand l'utiliser:**
- Après modification de `fr.json` ou `en.json` (sections expertise, services, cta)
- Pour synchroniser Sanity avec les fichiers source
- Lors du setup initial

**Quand NE PAS l'utiliser:**
- Si du contenu important a été modifié directement dans Sanity
- Sans avoir vérifié que les fichiers JSON sont à jour

---

## Bonnes Pratiques

### Règle d'Or

> **Les fichiers `locales/*.json` sont la source de vérité.**
>
> Toute modification de contenu DOIT d'abord être faite dans les fichiers JSON, puis optionnellement synchronisée vers Sanity.

### Checklist Avant Migration

- [ ] Les fichiers `fr.json` et `en.json` contiennent le contenu souhaité
- [ ] Aucune modification importante en attente dans Sanity Studio
- [ ] Commit des fichiers JSON avant migration (pour pouvoir rollback si besoin)

### Workflow Recommandé pour Modifications

```
1. Modifier fr.json
       ↓
2. Modifier en.json (traduction)
       ↓
3. git add locales/*.json
       ↓
4. git commit -m "content: update [section]"
       ↓
5. git push → Déploiement Vercel
       ↓
6. (Optionnel) npm run migrate:homepage
```

---

## Structure des Fichiers JSON

### Section "Qui suis-je?" (home.about)

```json
// locales/fr.json
{
  "home": {
    "about": {
      "badge": "Mon Parcours",
      "title": "Qui suis-je ?",
      "description": "Près de 20 ans d'expérience en entreprises et cabinets de conseil, certifiée Coach & Team – Transformance Pro et professeure de Hatha Yoga Classique certifiée par Sadhguru Gurukulam. Je mets cette triple expertise au service de votre transformation.",
      "cta": "Découvrir mon parcours complet"
    }
  }
}
```

### Section Expertise (home.expertise)

```json
{
  "home": {
    "expertise": {
      "subtitle": "Mon Expertise",
      "title": "L'Alliance Unique de Trois Mondes",
      "description": "...",
      "corporate": {
        "title": "Expérience Corporate & Conseil",
        "years": "≃20 ans",
        "description": "..."
      },
      "coaching": {
        "title": "Coaching Professionnel",
        "certification": "Coach & Team – Transformance Pro",
        "description": "..."
      },
      "yoga": {
        "title": "Hatha Yoga Classique",
        "certification": "Sadhguru Gurukulam",
        "description": "..."
      }
    }
  }
}
```

---

## Nomenclatures Officielles

> **IMPORTANT:** Ces nomenclatures doivent être utilisées de manière cohérente dans TOUS les fichiers.

| Domaine | Nomenclature Officielle | NE PAS utiliser |
|---------|------------------------|-----------------|
| Corporate | Expérience Corporate & Conseil | "20 ans en entreprise" |
| Corporate | ≃20 ans | "20 ans", "20+" |
| Coaching | Coach & Team – Transformance Pro | "Coach & Team (EMCC)" |
| Yoga | Sadhguru Gurukulam | "Isha Foundation" (pour certification) |
| Yoga | Hatha Yoga Classique | "Hatha Yoga" seul |
| Yoga | certifiée par Sadhguru Gurukulam | "formée par Sadhguru" |

---

## Sanity Studio

### Accès
- **URL:** https://transcendencework.com/studio
- **Projet ID:** czmpe9zr
- **Dataset:** production

### Documents Principaux

| Document | ID | Contenu |
|----------|-----|---------|
| Homepage Content | `homepageContent` | Sections expertise, about, services, cta |
| Hero Sections | `heroSection-[page]` | Configuration hero par page |
| Testimonials | `testimonial-*` | Témoignages clients |

### Token API

Pour les migrations automatiques, un token avec permissions **Editor** ou **Deploy Studio** est requis.

**Configuration:** `.env.local`
```
SANITY_API_TOKEN=sk...
```

---

## Résumé Décisionnel

### Je veux modifier du texte sur la Homepage

```
Q: Quelle section?
│
├─► Hero, "Qui suis-je?"
│   → Modifier locales/fr.json + en.json
│   → Push → Déploiement auto
│
├─► Expertise, Services, CTA
│   → Modifier locales/fr.json + en.json
│   → Push → Déploiement auto
│   → (Optionnel) npm run migrate:homepage
│
└─► Testimonials
    → Modifier dans Sanity Studio
    → Sauvegarde → Visible immédiatement
```

### Je veux modifier une image

```
→ Modifier dans Sanity Studio
→ Uploader la nouvelle image
→ Sauvegarder → Visible après rebuild/revalidation
```

---

## Contacts & Ressources

- **Repository:** https://github.com/samilamqaddam-lab/habi-coaching.git
- **Sanity Manage:** https://www.sanity.io/manage/project/czmpe9zr
- **Documentation CLAUDE.md:** `/CLAUDE.md` (nomenclatures, design system)
