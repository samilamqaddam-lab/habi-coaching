# Configuration Cal.com pour Coaching - Guide Étape par Étape

## ✅ Ce que tu as déjà
- Compte Cal.com créé
- Username: `hajar-habi-tpufjt`

## 🎯 Ce qu'on va configurer
- **2 Event Types Cal.com:**
  - Event 1: Séance Unique (510 DH, paiement direct via Cal.com)
  - Event 2: Séance de Coaching (gratuit, pour packages via Private Links)
- **Paiement packages:** Virement bancaire (simple, sans Stripe pour l'instant)
- Les 3 formules (Individuel, Carrière, Vie) restent sur le site comme exemples
- Intégration avec le site Hajar

---

## Étape 1: Se Connecter à Cal.com

1. Va sur https://app.cal.com (ou https://cal.com si c'est la version cloud)
2. Connecte-toi avec ton compte

---

## Étape 2: Vérifier/Configurer ton Username

**IMPORTANT**: Le site Hajar est configuré pour utiliser ton username Cal.com.

✅ **Ton username actuel**: `hajar-habi-tpufjt`

Tes URLs Cal.com seront:
- `https://cal.com/hajar-habi-tpufjt/coaching-individuel`
- `https://cal.com/hajar-habi-tpufjt/coaching-carriere`
- `https://cal.com/hajar-habi-tpufjt/coaching-vie`

---

## Étape 3: Configurer ton Profil

Dans **Settings** → **Profile**:

### Photo de profil
- Upload une photo professionnelle de Hajar

### Bio
Ajoute une courte bio (2-3 lignes), exemple:
```
Coach holistique certifiée EMCC et professeure de yoga traditionnelle.
20 ans d'expérience en entreprise, formée à Isha Foundation.
Accompagnement personnalisé pour votre transformation.
```

### Fuseau horaire
- Sélectionne: **Africa/Casablanca** (GMT+1)

### Disponibilités par défaut
- Va dans **Settings** → **Availability**
- Configure tes horaires de travail généraux:
  - Lundi à Vendredi: 9h00 - 18h00
  - (Tu pourras ajuster pour chaque type d'événement après)

---

## Étape 4: Créer les 2 Event Types pour Coaching

### 📌 Philosophie
- **Event Type 1 (Public):** Séance unique payante (510 DH) pour exploration ou coaching ponctuel
- **Event Type 2 (Privé):** Gratuit, pour clients ayant acheté un package (accès via Private Links seulement)

### Event Type 1: Séance de Coaching Unique (Payante)

1. Clique sur **Event Types** → **+ New Event Type**
2. Configure:

**Informations de base:**
- **Title**: `Séance de Coaching Unique`
- **URL Slug**: `seance-unique` ⚠️ **IMPORTANT: Exactement ce slug**
- **Description**:
  ```
  Réservez une séance de coaching individuelle de 60 minutes avec Hajar.

  Cette séance peut servir à:
  • Explorer vos besoins et objectifs
  • Bénéficier d'un accompagnement ponctuel sur une problématique
  • Découvrir l'approche coaching holistique

  💜 Certification: EMCC (European Mentoring & Coaching Council)
  🧘 Formation: Transformance Pro & Isha Foundation

  Prix: 510 DH
  Format: Présentiel (Casablanca) ou Visio
  ```

**Durée:**
- **Duration**: 60 minutes

**Prix & Paiement:**
- **Price**: 510 DH
- **Payment**: Connecte Stripe dans Settings → Payments
  - OU laisse option "Pay Later" si préfères virement bancaire

**Questions personnalisées:**

**Question 1:** "Préférence de format"
- Type: Select
- Options:
  - Présentiel (Casablanca)
  - Visio (Zoom/Google Meet)

**Question 2 (optionnelle):** "Quel est votre objectif pour cette séance?"
- Type: Text area
- Optionnelle

**Couleur:**
- Violet/Purple (#8B7AA8 - mystic-mauve)

3. **Save**

---

### Event Type 2: Séance de Coaching (Pour Packages - Gratuit)

1. Clique sur **Event Types** (dans la barre latérale)
2. Clique **+ New Event Type**
3. Configure:

**Informations de base:**
- **Title**: `Séance de Coaching`
- **URL Slug**: `seance-coaching` ⚠️ **IMPORTANT: Exactement ce slug**
- **Description**:
  ```
  Séance de coaching réservée aux clients ayant acheté un package.

  Utilisez le lien privé qui vous a été envoyé par email pour réserver vos séances.

  💜 Certification EMCC & Formation Isha Foundation
  Format: Présentiel (Casablanca) ou Visio
  ```

**Durée:**
- **Duration**: 60 minutes

**Prix:**
- **Gratuit** (0 DH)

**Disponibilités:**
- Configure tes disponibilités (ex: Lun-Ven 9h-18h)

**Questions personnalisées:**

**Question:** "Préférence de format"
- Type: Select
- Options:
  - Présentiel (Casablanca)
  - Visio (Zoom/Google Meet)

**Couleur:**
- Violet/Purple (#8B7AA8 - mystic-mauve)

4. **Save**

---

## Étape 5: Vérifier les URLs

Après avoir créé les 2 Event Types, vérifie que tu peux accéder à:

1. **Ton profil Cal.com**: `https://cal.com/hajar-habi-tpufjt`
2. **Event Séance Unique**: `https://cal.com/hajar-habi-tpufjt/seance-unique`
3. **Event Coaching (Packages)**: `https://cal.com/hajar-habi-tpufjt/seance-coaching`

Si les pages s'affichent correctement avec un calendrier, c'est parfait! ✅

### ✅ Avantages de cette approche:

- **Simple et flexible** - Séance unique pour exploration, packages pour accompagnement long terme
- **Pas de friction technique** - Virement bancaire simple (pas besoin de Stripe immédiatement)
- **Contrôle total** - Tu gères qui a accès aux séances via Private Links
- **Professionnel** - Tarifs dégressifs encouragent l'engagement sur du long terme
- **Évolutif** - Stripe peut être ajouté plus tard si besoin d'automatisation

---

## Étape 6: Intégration avec le Site Hajar

✅ **CONFIGURATION COMPLÉTÉE!**

L'intégration Cal.com a été configurée automatiquement:

### 6.1 Fichier .env.local créé

Le fichier `.env.local` contient maintenant:
```
NEXT_PUBLIC_CALCOM_USERNAME=hajar-habi-tpufjt
NEXT_PUBLIC_CALCOM_COACHING_SLUG=seance-coaching
```

### 6.2 Composants configurés

- `CoachingPackageModal.tsx` - Modal avec séance unique + packages
- Bouton "Réserver une séance" sur chaque card de coaching
- Packages redirigent vers /contact pour demande de virement

**Le site est prêt côté technique!** Il ne reste plus qu'à créer les 2 Event Types dans Cal.com.

---

## Étape 7: Personnalisation (Optionnel mais Recommandé)

### Branding Cal.com

Dans **Settings** → **Appearance**:

1. **Brand Color**: `#2C5F7C` (morocco-blue)
2. **Upload Logo**: Logo Hajar Habi
3. **Theme**: Light

### Notifications Email

Dans **Settings** → **Workflows**:
- Configure les emails de confirmation automatiques
- Personnalise le message de bienvenue

### Intégration Google Calendar

Dans **Settings** → **Calendars**:
1. Connecte ton Google Calendar
2. Active la synchronisation bidirectionnelle
3. Les rendez-vous Cal.com apparaîtront automatiquement dans Google Calendar

---

## ✅ Checklist Finale

Avant de tester l'intégration complète:

### Cal.com
- [ ] Event Type "Séance Unique" créé (slug: seance-unique, prix: 510 DH)
- [ ] Event Type "Séance de Coaching" créé (slug: seance-coaching, gratuit)
- [ ] Stripe connecté OU "Pay Later" activé pour Event Type 1
- [ ] Disponibilités configurées
- [ ] Questions personnalisées ajoutées
- [ ] Profil complété (photo, bio)
- [ ] Fuseau horaire: Africa/Casablanca

### Site Web
- [ ] Tester http://localhost:3000/coaching
- [ ] Cliquer "Réserver une séance" → Modal s'ouvre
- [ ] Tester "Séance Unique" → Redirige vers Cal.com
- [ ] Tester "Réserver ce pack" → Redirige vers /contact avec message pré-rempli

### Workflow
- [ ] Préparer template email avec informations bancaires (RIB, etc.)
- [ ] Préparer template email pour Private Links
- [ ] Créer tableau de suivi (optionnel mais recommandé)

---

## 🚀 Test du Workflow Complet

Une fois les 2 Event Types créés:

1. **Visiter** http://localhost:3000/coaching
2. **Cliquer** "Réserver une séance" sur n'importe quelle card
3. **Modal s'ouvre** avec:
   - Séance unique (510 DH) en haut
   - 3 packages en bas
4. **Tester "Séance Unique"**:
   - Clique → Redirige vers `https://cal.com/hajar-habi-tpufjt/seance-unique`
   - Réserve un créneau test
   - Vérifie email de confirmation
5. **Tester "Réserver ce pack"** (ex: Pack 6):
   - Clique → Redirige vers `/contact`
   - Formulaire pré-rempli avec demande de Pack 6
   - Envoie → Tu reçois email
   - Réponds avec template (informations bancaires)

**C'est prêt!** 🎉

Pour le workflow complet packages, consulte: `/docs/coaching-bank-transfer-workflow.md`

---

## ❓ Questions?

Si quelque chose n'est pas clair ou si tu rencontres un problème, dis-moi où tu en es et je t'aide! 😊
