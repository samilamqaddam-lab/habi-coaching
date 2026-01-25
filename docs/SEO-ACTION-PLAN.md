# Plan d'Action SEO - Transcendence Work
**Marché cible:** Maroc (Casablanca)
**Objectif:** Indexation et positionnement sans modifier le contenu existant

---

## 🎯 Objectifs

- ✅ Indexer le site sur Google
- ✅ Apparaître dans les résultats pour "yoga casablanca", "coach casablanca", "conseil entreprise maroc"
- ✅ Optimiser le SEO local (Maroc)
- ✅ **AUCUN changement d'interface, texte, titre ou description**

---

## 📊 État Actuel (Audit)

| Critère | Score | Status |
|---------|-------|--------|
| Site indexé Google | 0% | ❌ NON INDEXÉ |
| Mots-clés Yoga | 42% | ⚠️ |
| Mots-clés Coaching | 13% | ❌ |
| Mots-clés Organisations | 14% | ❌ |
| SEO Local Maroc | 71% | ✅ |
| **Score Global** | **47%** | ⚠️ |

---

## 🚀 Phase 1: Indexation Technique (URGENT - 1 jour)

### 1.1 Créer robots.txt
**Fichier:** `/public/robots.txt`
**Action:** Autoriser tous les robots, référencer le sitemap
**Impact:** Permet l'indexation Google

```txt
User-agent: *
Allow: /

Sitemap: https://transcendencework.com/sitemap.xml
```

### 1.2 Vérifier sitemap.xml
**Fichier:** `/app/sitemap.ts` (existe déjà ✅)
**Action:** Vérifier qu'il génère bien toutes les URLs
**URLs critiques:**
- Homepage: `/`
- Yoga: `/yoga`
- Coaching: `/coaching`
- Organisations: `/organisations`
- Programmes: `/upa-yoga`, `/surya-kriya`, etc.
- Événements: `/evenements/[id]`

### 1.3 Configurer Google Search Console
**Action:**
1. Créer compte Google Search Console
2. Vérifier propriété du domaine (méthode DNS ou fichier HTML)
3. Soumettre sitemap: `https://transcendencework.com/sitemap.xml`
4. Demander indexation manuelle des pages critiques

**Résultat:** Site indexé sous 24-48h

---

## 🏪 Phase 2: SEO Local (URGENT - 2 jours)

### 2.1 Google My Business
**Action:**
1. Créer fiche Google My Business
2. Catégories:
   - Professeur de yoga
   - Coach professionnel
   - Consultant en entreprise
3. Adresse: Studio Shido Mind, 36 B boulevard d'Anfa, 5ème étage, Casablanca
4. Téléphone: +212 663 096 857
5. Site web: https://transcendencework.com
6. Horaires, photos, description

**Impact:** Apparition dans Google Maps + "Near me" searches

### 2.2 Ajouter Schema LocalBusiness amélioré
**Fichier:** `/lib/structured-data.ts` (existe déjà ✅)
**Action:** Vérifier/améliorer le schema LocalBusiness avec:
- Coordonnées GPS précises
- Heures d'ouverture
- Zones de service (Casablanca, Maroc)
- Types de paiement acceptés

**Résultat:** Rich snippets dans résultats Google

---

## 🔗 Phase 3: Optimisation On-Page (3 jours)

### 3.1 Améliorer metadata pages existantes
**Fichiers:** Tous les `page.tsx` avec metadata
**Action:** Sans changer les titres/descriptions visibles, optimiser les meta tags:

#### Page Yoga (`/yoga/page.tsx`)
```typescript
export const metadata: Metadata = {
  title: 'Programmes Yoga Casablanca | Hatha Yoga Classique Maroc',
  description: 'Cours de Hatha Yoga Classique à Casablanca. Professeure certifiée Sadhguru Gurukulam. Upa Yoga, Surya Kriya, Angamardana.',
  keywords: 'yoga casablanca, hatha yoga maroc, cours yoga casablanca, sadhguru gurukulam, upa yoga, surya kriya',
  openGraph: {
    title: 'Programmes Yoga Casablanca',
    description: 'Hatha Yoga Classique avec Hajar Habi',
    url: 'https://transcendencework.com/yoga',
    images: ['/images/heroes/sadhguru-hero.jpg'],
  }
}
```

#### Page Coaching (`/coaching/page.tsx`)
```typescript
export const metadata: Metadata = {
  title: 'Coach Professionnel Casablanca | Coaching Individuel Maroc',
  description: 'Coach certifiée Transformance Pro (EMCC) à Casablanca. Accompagnement individuel en développement personnel et professionnel.',
  keywords: 'coach casablanca, coaching maroc, coach professionnel casablanca, développement personnel',
  openGraph: {
    title: 'Coaching Professionnel Casablanca',
    description: 'Accompagnement par Hajar Habi',
    url: 'https://transcendencework.com/coaching',
  }
}
```

#### Page Organisations (`/organisations/page.tsx`)
```typescript
export const metadata: Metadata = {
  title: 'Conseil Entreprise Casablanca | Coaching Équipe Maroc',
  description: '≃20 ans expérience corporate & conseil. Formation équipe, coaching dirigeants, transformation organisationnelle au Maroc.',
  keywords: 'conseil entreprise casablanca, consultant organisation maroc, coaching équipe, team building maroc',
  openGraph: {
    title: 'Conseil & Accompagnement Organisations',
    description: 'Expertise corporate à Casablanca',
    url: 'https://transcendencework.com/organisations',
  }
}
```

### 3.2 Ajouter balises canonical
**Fichiers:** Tous les layouts
**Action:** Ajouter URL canonique pour éviter duplicate content

```typescript
export const metadata: Metadata = {
  // ...
  alternates: {
    canonical: 'https://transcendencework.com/[route]',
  }
}
```

### 3.3 Optimiser les images
**Action:**
- Ajouter `alt` descriptifs avec mots-clés
- Exemple: `alt="Cours Hatha Yoga Casablanca avec Hajar Habi"`
- Vérifier que toutes les images ont `width`, `height` (performance)

---

## 📝 Phase 4: Contenu Programmatique (5 jours)

### 4.1 Pages FAQ par service
**Fichiers à créer:**
- `/app/(site)/yoga/faq/page.tsx`
- `/app/(site)/coaching/faq/page.tsx`
- `/app/(site)/organisations/faq/page.tsx`

**Contenu:** Questions fréquentes avec mots-clés naturels
**Exemple Yoga FAQ:**
- "Où se déroulent les cours de yoga à Casablanca ?"
- "Quelle est la différence entre Upa Yoga et Surya Kriya ?"
- "Comment s'inscrire aux programmes de yoga ?"

**Schema:** Utiliser `getFaqSchema()` existant

### 4.2 Blog SEO (optionnel)
**Dossier:** `/app/(site)/blog` (existe déjà ✅)
**Action:** Planifier articles avec mots-clés:
- "Les bienfaits du Hatha Yoga à Casablanca"
- "Comment choisir son coach professionnel au Maroc"
- "Transformation organisationnelle : guide pour entreprises marocaines"

**Fréquence:** 1 article/mois minimum

---

## 🌐 Phase 5: Off-Page SEO (7 jours)

### 5.1 Annuaires marocains
**Action:** Inscrire le site sur:
- Pages Jaunes Maroc (pj.ma)
- Avito Pro
- Maroc.ma
- Expat.com Morocco
- Clubs.ma (pour yoga)

### 5.2 Réseaux sociaux
**Déjà fait:** LinkedIn, Spotify ✅
**Action:** Optimiser profils avec:
- Lien vers site web
- Mots-clés dans descriptions
- Localisation: Casablanca, Maroc

### 5.3 Backlinks locaux
**Action:** Rechercher partenariats:
- Studios yoga Casablanca (échanges liens)
- Associations coaching Maroc
- Blogs développement personnel marocains

---

## ⚡ Phase 6: Performance & Technical SEO (3 jours)

### 6.1 Core Web Vitals
**Action:** Optimiser via Vercel Analytics (déjà installé ✅)
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

### 6.2 Données structurées complètes
**Fichier:** `/lib/structured-data.ts`
**Action:** Ajouter schemas manquants:
- `Course` schema pour programmes yoga
- `Review` schema pour témoignages
- `Event` schema pour événements/ateliers

### 6.3 Hreflang tags
**Fichier:** Layouts
**Action:** Déclarer versions FR/EN
```typescript
alternates: {
  languages: {
    'fr': 'https://transcendencework.com',
    'en': 'https://transcendencework.com/en',
  }
}
```

---

## 📈 Phase 7: Monitoring & Ajustements (Continu)

### 7.1 Outils de suivi
- Google Search Console (positions, clics, impressions)
- Google Analytics 4 (déjà installé ✅)
- Vercel Analytics (déjà installé ✅)
- Script audit SEO: `npm run seo:audit` (weekly)

### 7.2 KPIs à suivre
| Métrique | Objectif 1 mois | Objectif 3 mois |
|----------|----------------|----------------|
| Pages indexées | 15+ | 30+ |
| Position "yoga casablanca" | Top 20 | Top 10 |
| Position "coach casablanca" | Top 20 | Top 10 |
| Trafic organique/mois | 50 visites | 200 visites |
| Google My Business vues | 100+ | 500+ |

### 7.3 Ajustements mensuels
- Analyser requêtes Search Console
- Identifier nouveaux mots-clés à cibler
- Créer contenu basé sur search intent
- Améliorer pages avec faible CTR

---

## 📋 Checklist de Déploiement

### Semaine 1: Indexation
- [ ] Créer `robots.txt`
- [ ] Vérifier `sitemap.xml`
- [ ] Configurer Google Search Console
- [ ] Soumettre sitemap
- [ ] Demander indexation pages principales
- [ ] Créer Google My Business

### Semaine 2: On-Page
- [ ] Optimiser metadata Yoga
- [ ] Optimiser metadata Coaching
- [ ] Optimiser metadata Organisations
- [ ] Ajouter balises canonical
- [ ] Optimiser alt images
- [ ] Tester structured data (Google Rich Results Test)

### Semaine 3: Contenu
- [ ] Créer page FAQ Yoga
- [ ] Créer page FAQ Coaching
- [ ] Créer page FAQ Organisations
- [ ] Planifier calendrier blog (optionnel)
- [ ] Ajouter schemas Course, Review, Event

### Semaine 4: Off-Page
- [ ] Inscrire annuaires (5 min)
- [ ] Optimiser profils sociaux
- [ ] Contacter 3 partenaires potentiels
- [ ] Demander avis clients Google

### Mensuel: Monitoring
- [ ] Analyser Search Console
- [ ] Vérifier positions mots-clés
- [ ] Run `npm run seo:audit`
- [ ] Ajuster stratégie selon données

---

## 🎯 Résultats Attendus

### Court Terme (1 mois)
- ✅ Site indexé sur Google
- ✅ Apparition dans Google Maps
- ✅ 15+ pages indexées
- ✅ Premières visites organiques

### Moyen Terme (3 mois)
- ✅ Top 20 pour "yoga casablanca"
- ✅ Top 20 pour "coach casablanca"
- ✅ 200+ visites organiques/mois
- ✅ 5+ demandes de contact/mois via SEO

### Long Terme (6 mois)
- ✅ Top 10 pour mots-clés principaux
- ✅ 500+ visites organiques/mois
- ✅ 15+ demandes de contact/mois
- ✅ Autorité de domaine établie

---

## ⚠️ Contraintes Respectées

✅ **AUCUN changement d'interface**
✅ **AUCUN changement de texte visible**
✅ **AUCUN changement de titre H1/H2**
✅ **AUCUN changement de description visible**

**Modifications uniquement:**
- Meta tags (`<title>`, `<meta description>`, OpenGraph)
- Fichiers techniques (robots.txt, sitemap)
- Données structurées (invisibles pour utilisateur)
- Nouvelles pages (FAQ, blog) - optionnel
- Inscriptions annuaires externes

---

## 💰 Coût Estimé

| Action | Coût | Temps |
|--------|------|-------|
| Développement technique | 0 MAD | 5 jours |
| Google Search Console | 0 MAD | 30 min |
| Google My Business | 0 MAD | 1 heure |
| Inscriptions annuaires | 0 MAD | 2 heures |
| **TOTAL** | **0 MAD** | **6 jours** |

**Uniquement du temps de développement - aucun coût financier.**

---

## 🚀 Prochaines Étapes Immédiates

1. **Valider ce plan** ✓
2. **Créer robots.txt** (5 min)
3. **Vérifier sitemap** (10 min)
4. **Configurer Google Search Console** (30 min)
5. **Créer Google My Business** (1h)
6. **Optimiser metadata pages** (2h)
7. **Commit & Deploy** (5 min)

**Prêt à démarrer Phase 1 ?**
