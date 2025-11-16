# Workflow Complet - Coaching Packages & Séances Uniques

## 💰 Tarification

### Séance Unique
- **Prix:** 510 DH
- **Durée:** 60 minutes
- **Pour:** Exploration, découverte, ou séance ponctuelle
- **Paiement:** Direct via Cal.com (Stripe intégré)

### Packages (Tarif Dégressif)

| Package | Prix Total | Prix/Séance | Réduction |
|---------|-----------|-------------|-----------|
| **Pack 3 séances** | 1400 DH | 467 DH | -8% |
| **Pack 6 séances** | 2500 DH | 417 DH | -18% |
| **Pack 12 séances** | 4500 DH | 375 DH | -26% |

---

## 🔧 Configuration Cal.com

### Event Type 1: Séance de Coaching Unique

**URL:** `https://cal.com/hajar-habi-tpufjt/seance-unique`

**Configuration:**
1. Va dans **Event Types** → **+ New Event Type**
2. Configure:
   - **Title:** `Séance de Coaching Unique`
   - **URL Slug:** `seance-unique`
   - **Duration:** 60 minutes
   - **Description:**
     ```
     Réservez une séance de coaching individuelle de 60 minutes avec Hajar.

     Cette séance peut servir à:
     • Explorer vos besoins et objectifs
     • Bénéficier d'un accompagnement ponctuel
     • Découvrir l'approche coaching holistique

     Certification: EMCC (European Mentoring & Coaching Council)
     Formation: Transformance Pro & Isha Foundation

     Format: Présentiel (Casablanca) ou Visio
     ```
   - **Price:** 510 DH
   - **Payment:** Connecte Stripe (aller dans Settings → Payments → Add Stripe)

3. **Questions personnalisées:**
   - Question 1: "Préférence de format"
     - Type: Select
     - Options:
       - Présentiel (Casablanca)
       - Visio (Zoom/Google Meet)

   - Question 2 (optionnelle): "Quel est votre objectif pour cette séance?"
     - Type: Text area
     - Optionnelle

4. **Couleur:** Violet/Purple (#8B7AA8)

5. **Save**

---

### Event Type 2: Séance de Coaching (Pour Packages)

**URL:** Non publique - Seulement via Private Links

**Configuration:**
1. **Event Types** → **+ New Event Type**
2. Configure:
   - **Title:** `Séance de Coaching`
   - **URL Slug:** `seance-coaching`
   - **Duration:** 60 minutes
   - **Description:**
     ```
     Séance de coaching réservée aux clients ayant acheté un package.

     Utilisez le lien privé qui vous a été envoyé par email pour réserver vos séances.

     Format: Présentiel (Casablanca) ou Visio
     ```
   - **Price:** Gratuit (FREE)
   - **Disable public booking** (si option disponible)

3. **Questions:**
   - Question: "Préférence de format"
     - Options: Présentiel / Visio

4. **Couleur:** Violet/Purple (#8B7AA8)

5. **Save**

---

## 💳 Configuration Stripe Payment Links

### Prérequis
1. Compte Stripe actif
2. Va sur: https://dashboard.stripe.com/payment-links

### Créer les 3 Payment Links:

#### Payment Link 1: Pack 3 Séances

1. Clique **+ New payment link**
2. Configure:
   - **Product name:** Pack 3 Séances de Coaching
   - **Price:** 1400 DH (14.00 MAD si pas d'option DH, ajuster selon devise)
   - **Description:**
     ```
     Pack de 3 séances de coaching individuel (60 min chacune)

     • Prix: 1400 DH (467 DH/séance)
     • Économie de 8% vs séances individuelles
     • Valable 3 mois après achat

     Après paiement, vous recevrez un lien privé pour réserver vos 3 séances aux créneaux de votre choix.
     ```
   - **Collect customer information:**
     - ✅ Email
     - ✅ Name
     - ✅ Phone number

3. **Save** → Copie le lien généré
4. **Note le lien:** `https://buy.stripe.com/...pack3`

#### Payment Link 2: Pack 6 Séances

Même processus:
- **Product:** Pack 6 Séances de Coaching
- **Price:** 2500 DH
- **Description:** Pack de 6 séances (417 DH/séance, -18%)
- **Note:** `https://buy.stripe.com/...pack6`

#### Payment Link 3: Pack 12 Séances

- **Product:** Pack 12 Séances de Coaching
- **Price:** 4500 DH
- **Description:** Pack de 12 séances (375 DH/séance, -26%)
- **Note:** `https://buy.stripe.com/...pack12`

---

## 📧 Workflow: Quand un Client Achète un Package

### Étape 1: Client paie via Stripe Payment Link

Tu recevras un email de Stripe avec:
- Nom du client
- Email du client
- Package acheté (3, 6 ou 12 séances)

### Étape 2: Créer Private Link Cal.com

1. Va dans **Event Types**
2. Sélectionne **"Séance de Coaching"** (Event Type 2)
3. Clique sur **"Advanced Settings"** ou cherche **"Private Links"**
4. Clique **"+ Create Private Link"**
5. Configure:
   - **Link name** (pour toi): "Pack X séances - [Nom Client]"
   - **Expires after:** 3 / 6 / 12 bookings (selon le pack)
   - **Optionnel - Expires on:** Date +3 mois (ex: 2025-05-15)
6. **Save**
7. **Copie le lien généré:** `https://cal.com/hajar-habi-tpufjt/seance-coaching?secret=abc123`

**⏱️ Temps total:** ~2 minutes

### Étape 3: Envoyer Email au Client

Utilise ce template:

---

**Objet:** ✅ Votre Pack [X] Séances de Coaching - Lien de Réservation

**Corps:**

Bonjour [Nom],

Merci d'avoir réservé votre **Pack [X] Séances de Coaching** !

## 📅 Réservez vos séances

Utilisez ce lien privé pour réserver vos [X] séances aux créneaux de votre choix:

**[Coller le Private Link Cal.com ici]**

Ce lien vous permet de réserver exactement **[X] séances de 60 minutes** chacune.

## ℹ️ Informations importantes

- ✅ Séances valables pendant **3 mois** (jusqu'au [Date])
- ✅ Format: Présentiel (Casablanca) ou Visio (au choix à chaque réservation)
- ✅ Vous pouvez réserver vos séances au fur et à mesure (pas besoin de tout réserver maintenant)
- ✅ Le lien expirera automatiquement après votre [X]ème réservation

## 📞 Questions?

N'hésitez pas à me contacter directement:
- Email: [email de Hajar]
- Téléphone: [téléphone de Hajar]

Au plaisir de vous accompagner dans votre transformation!

Hajar Habi
Coach Holistique Certifiée EMCC
Professeure de Yoga Isha Foundation

---

### Étape 4: Suivi (Optionnel)

Crée un tableau simple (Google Sheets ou Notion) pour suivre:

| Date Achat | Nom Client | Email | Package | Séances Restantes | Lien Cal.com | Date Expiration |
|------------|-----------|-------|---------|-------------------|--------------|-----------------|
| 2025-01-15 | Marie D. | marie@... | Pack 6 | 4/6 | link123 | 2025-04-15 |

---

## 🌐 Intégration sur le Site Web

### Modifications à faire:

**Page /coaching:**
- Les 3 cards restent (Coaching Individuel, Carrière, Vie)
- Chaque card a un bouton "Réserver une séance"
- Le bouton ouvre une **modal** ou **page dédiée** qui propose:

**Modal de Sélection:**

```
┌─────────────────────────────────────────────┐
│  Choisissez votre formule                   │
├─────────────────────────────────────────────┤
│                                             │
│  🔹 Séance Unique - 510 DH                  │
│     60 min pour explorer ou séance unique   │
│     [Réserver maintenant →]                 │
│                                             │
│  ────────── OU ──────────                   │
│                                             │
│  📦 PACKAGES (Tarifs Dégressifs)            │
│                                             │
│  ✅ Pack 3 Séances - 1400 DH                │
│     467 DH/séance · Économie de 8%          │
│     [Acheter le pack →]                     │
│                                             │
│  ✅ Pack 6 Séances - 2500 DH                │
│     417 DH/séance · Économie de 18%         │
│     [Acheter le pack →]                     │
│                                             │
│  ✅ Pack 12 Séances - 4500 DH               │
│     375 DH/séance · Économie de 26%         │
│     [Acheter le pack →]                     │
│                                             │
└─────────────────────────────────────────────┘
```

**Boutons:**
- "Réserver maintenant" (Séance Unique) → `https://cal.com/hajar-habi-tpufjt/seance-unique`
- "Acheter le pack" → Stripe Payment Links respectifs

---

## ✅ Checklist de Configuration

### Cal.com
- [ ] Event Type "Séance Unique" créé avec paiement Stripe
- [ ] Event Type "Séance de Coaching" créé (gratuit, pour packages)
- [ ] Stripe connecté à Cal.com
- [ ] Disponibilités configurées

### Stripe
- [ ] Compte Stripe actif
- [ ] Payment Link Pack 3 créé et lien copié
- [ ] Payment Link Pack 6 créé et lien copié
- [ ] Payment Link Pack 12 créé et lien copié
- [ ] Email de confirmation Stripe configuré

### Site Web
- [ ] Modal/Page de sélection de formule créée
- [ ] Boutons liés aux bons liens (Cal.com + Stripe)
- [ ] Textes et prix mis à jour

### Process
- [ ] Template email pour Private Links prêt
- [ ] Tableau de suivi créé (Google Sheets/Notion)
- [ ] Process documenté et testé

---

## 🚀 Prochaine Étape: Automatisation (Phase 2)

Quand le volume augmente (10+ packages/mois), on pourra automatiser:

1. **Stripe Webhook** → Notification automatique
2. **Cal.com API** → Création automatique de Private Link
3. **Resend/SendGrid** → Email automatique avec le lien

**Temps de dev:** ~2-3 heures
**Temps économisé:** ~2 min/client → 20+ min/mois

Pour l'instant, **2 minutes par client est totalement acceptable** avec Option A.
