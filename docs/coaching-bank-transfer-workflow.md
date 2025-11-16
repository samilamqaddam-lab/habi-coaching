# Workflow Coaching - Paiement par Virement Bancaire

## 💰 Tarification

### Séance Unique
- **Prix:** 510 DH
- **Durée:** 60 minutes
- **Paiement:** Direct via Cal.com (Stripe intégré) OU virement bancaire
- **Pour:** Exploration, découverte, ou séance ponctuelle

### Packages (Tarif Dégressif)

| Package | Prix Total | Prix/Séance | Réduction |
|---------|-----------|-------------|-----------|
| **Pack 3 séances** | 1400 DH | 467 DH | -8% |
| **Pack 6 séances** | 2500 DH | 417 DH | -18% |
| **Pack 12 séances** | 4500 DH | 375 DH | -26% |

---

## 🔄 Workflow Complet (Version Simplifiée)

### Option 1: Client veut une Séance Unique

```
Client visite /coaching
   ↓
Clique "Réserver une séance"
   ↓
Modal s'ouvre → Choisit "Séance Unique - 510 DH"
   ↓
Redirigé vers Cal.com → Réserve créneau
   ↓
Paiement via Cal.com (Stripe) OU contact pour virement
   ↓
Séance confirmée
```

### Option 2: Client veut un Package (3, 6 ou 12 séances)

```
Client visite /coaching
   ↓
Clique "Réserver une séance"
   ↓
Modal s'ouvre → Choisit un package (ex: Pack 6 - 2500 DH)
   ↓
Clique "Réserver ce pack"
   ↓
Redirigé vers page /contact avec message pré-rempli:
   "Je souhaite réserver le Pack 6 Séances au tarif de 2500 DH"
   ↓
Client envoie le formulaire de contact
   ↓
Hajar reçoit la demande par email
   ↓
Hajar répond avec:
   • Informations bancaires pour le virement
   • RIB
   • Montant exact
   ↓
Client effectue le virement bancaire
   ↓
Hajar reçoit confirmation bancaire
   ↓
Hajar crée Private Link Cal.com avec usage limit:
   - Pack 3 → 3 bookings max
   - Pack 6 → 6 bookings max
   - Pack 12 → 12 bookings max
   ↓
Hajar envoie email au client avec:
   • Confirmation de paiement
   • Private Link Cal.com pour réserver les séances
   ↓
Client utilise le lien pour réserver ses X séances
```

**⏱️ Temps Hajar:** ~5 minutes par client (répondre email + créer Private Link)

---

## 📧 Templates Emails pour Hajar

### Template 1: Réponse à demande de package

**Objet:** Re: Demande Pack [X] Séances - Informations de Paiement

**Corps:**

Bonjour [Nom],

Merci pour votre intérêt pour le **Pack [X] Séances** !

## 💰 Informations de Paiement

**Montant à virer:** [Prix] DH

**Coordonnées bancaires:**
- Bénéficiaire: Hajar Habi
- Banque: [Nom de la banque]
- RIB: [XXX XXX XXXXXXXXXXXXXXXXXX XX]

## 📝 Référence du virement

Merci d'indiquer comme référence: **"Pack [X] - [Votre Nom]"**

## ⏭️ Prochaines étapes

1. Effectuez le virement bancaire
2. Envoyez-moi une confirmation (capture d'écran ou reçu) par email ou WhatsApp
3. Je vous enverrai un lien privé pour réserver vos [X] séances aux créneaux de votre choix

## ℹ️ Informations importantes

- ✅ Séances valables pendant **3 mois** après paiement
- ✅ Format: Présentiel (Casablanca) ou Visio (au choix à chaque réservation)
- ✅ Vous pourrez réserver vos séances au fur et à mesure

N'hésitez pas si vous avez des questions!

Cordialement,
Hajar Habi
Coach Holistique Certifiée EMCC
Professeure de Yoga Isha Foundation

📞 [Téléphone]
📧 [Email]

---

### Template 2: Envoi du Private Link après paiement

**Objet:** ✅ Paiement confirmé - Lien de Réservation Pack [X] Séances

**Corps:**

Bonjour [Nom],

Votre paiement de **[Prix] DH** pour le Pack [X] Séances est bien reçu. Merci!

## 📅 Réservez vos séances

Utilisez ce lien privé pour réserver vos [X] séances aux créneaux de votre choix:

**[Coller le Private Link Cal.com ici]**

Ce lien vous permet de réserver exactement **[X] séances de 60 minutes** chacune.

## ℹ️ Informations importantes

- ✅ Séances valables jusqu'au **[Date +3 mois]**
- ✅ Format: Présentiel (Casablanca) ou Visio (au choix à chaque réservation)
- ✅ Vous pouvez réserver vos séances au fur et à mesure (pas besoin de tout réserver maintenant)
- ✅ Le lien expirera automatiquement après votre [X]ème réservation

## 🎯 Comment utiliser le lien

1. Cliquez sur le lien ci-dessus
2. Sélectionnez votre créneau préféré dans le calendrier
3. Choisissez le format (Présentiel ou Visio)
4. Confirmez votre réservation
5. Vous recevrez un email de confirmation avec le lien de visio (si applicable)

## 📞 Questions?

N'hésitez pas à me contacter:
- Email: [email]
- Téléphone/WhatsApp: [téléphone]

Au plaisir de vous accompagner dans votre transformation!

Hajar Habi
Coach Holistique Certifiée EMCC
Professeure de Yoga Isha Foundation

---

## 🔧 Configuration Cal.com

### Event Type 1: Séance de Coaching Unique

**Dans Cal.com:**
1. Event Types → + New Event Type
2. Configure:
   - **Title:** Séance de Coaching Unique
   - **URL Slug:** `seance-unique`
   - **Duration:** 60 minutes
   - **Price:** 510 DH
   - **Payment:** Stripe (ou laisser option "Pay Later")

### Event Type 2: Séance de Coaching (Pour Packages)

**Dans Cal.com:**
1. Event Types → + New Event Type
2. Configure:
   - **Title:** Séance de Coaching
   - **URL Slug:** `seance-coaching`
   - **Duration:** 60 minutes
   - **Price:** Gratuit
   - **Disable public booking**

---

## 📋 Process: Créer un Private Link Cal.com

Quand un client a payé un package:

1. Va dans **Event Types**
2. Sélectionne **"Séance de Coaching"**
3. Advanced Settings → **Private Links**
4. **+ Create Private Link**
5. Configure:
   - **Link name:** "Pack [X] - [Nom Client] - [Date]"
   - **Expires after:** [X] bookings (3, 6 ou 12)
   - **Expires on:** [Date +3 mois]
6. **Save**
7. **Copie le lien généré**
8. Envoie au client via email (Template 2)

**⏱️ Temps:** ~2 minutes

---

## 📊 Suivi des Paiements (Optionnel)

Crée un tableau simple (Google Sheets ou Notion):

| Date Demande | Nom | Email | Package | Prix | Statut Paiement | Date Paiement | Lien Cal.com | Séances Restantes | Expiration |
|--------------|-----|-------|---------|------|-----------------|---------------|--------------|-------------------|------------|
| 2025-01-15 | Marie D. | marie@... | Pack 6 | 2500 DH | ✅ Payé | 2025-01-16 | link123 | 4/6 | 2025-04-16 |
| 2025-01-18 | Ahmed K. | ahmed@... | Pack 3 | 1400 DH | ⏳ En attente | - | - | - | - |

---

## ✅ Checklist Complète

### Configuration Initiale
- [ ] Event Type "Séance Unique" créé dans Cal.com
- [ ] Event Type "Séance de Coaching" créé dans Cal.com (gratuit)
- [ ] Informations bancaires prêtes (RIB, etc.)
- [ ] Templates emails sauvegardés
- [ ] Tableau de suivi créé (optionnel)

### Pour Chaque Nouveau Client Package
- [ ] Recevoir demande via formulaire contact
- [ ] Envoyer Template 1 (informations bancaires)
- [ ] Recevoir confirmation de virement
- [ ] Créer Private Link Cal.com avec usage limit
- [ ] Envoyer Template 2 (lien de réservation)
- [ ] Noter dans tableau de suivi

---

## 🚀 Migration Future vers Stripe (Optionnel)

Quand tu voudras automatiser avec Stripe:

1. Créer compte Stripe
2. Créer 3 Payment Links (Pack 3, 6, 12)
3. Ajouter les liens dans `.env.local`:
   ```
   NEXT_PUBLIC_STRIPE_PACK_3=https://buy.stripe.com/...
   NEXT_PUBLIC_STRIPE_PACK_6=https://buy.stripe.com/...
   NEXT_PUBLIC_STRIPE_PACK_12=https://buy.stripe.com/...
   ```
4. Optionnel: Automatiser création Private Link via Stripe Webhooks

**Pour l'instant, le workflow virement bancaire est simple et efficace!**
