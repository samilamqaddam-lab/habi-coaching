# Guide Complet d'Implémentation - Système de Réservation Cal.com

## 📋 Vue d'Ensemble

Ce guide détaille l'implémentation complète du système de réservation pour le site Hajar Habi, incluant:
- ✅ 3 types de cours yoga (Hatha, Restorative, Méditation)
- ✅ 3 formules coaching (Individuel, Carrière, Vie)
- ✅ Intégration Cal.com self-hosted
- ✅ Composants React réutilisables
- ✅ Interface utilisateur personnalisée

## 🎯 Ce qui a été fait

### 1. Composants Créés

#### `/components/booking/BookingWidget.tsx`
Widget flexible pour intégrer Cal.com dans le site avec 3 modes:
- **inline**: Widget iframe intégré dans la page
- **popup**: Modal qui s'ouvre au clic
- **redirect**: Redirection vers Cal.com

**Props:**
```typescript
interface BookingWidgetProps {
  type: 'hatha-yoga' | 'restorative-yoga' | 'meditation' |
        'coaching-individuel' | 'coaching-carriere' | 'coaching-vie';
  mode?: 'inline' | 'popup' | 'redirect';
  buttonText?: string;
  buttonVariant?: 'primary' | 'outline' | 'secondary';
  className?: string;
  height?: number;
}
```

#### `/components/booking/BookingModal.tsx`
Modal élégant avec le BookingWidget intégré, offrant une UX fluide sans quitter la page.

**Utilisation:**
```tsx
<BookingModal
  type="hatha-yoga"
  triggerText="Réserver"
  variant="primary"
  fullWidth
/>
```

### 2. Intégrations Pages

#### `/app/programmes/page.tsx` ✅
- Ajout de `bookingType` à chaque cours yoga
- Remplacement des boutons `/contact` par `BookingModal`
- 3 modals configurés: Hatha, Restorative, Méditation

#### `/app/coaching/page.tsx` ✅
- Ajout de `bookingType` à chaque formule coaching
- Remplacement des boutons `/contact` par `BookingModal`
- 3 modals configurés: Individuel, Carrière, Vie

### 3. Configuration

#### `.env.example`
Fichier créé avec variable `NEXT_PUBLIC_CALCOM_URL`

#### `/docs/calcom-setup.md`
Guide complet d'installation Cal.com avec:
- Installation PostgreSQL
- Configuration .env Cal.com
- Création des 6 Event Types
- Configuration emails (Resend)
- Branding personnalisé

## 🚀 Prochaines Étapes (À faire par toi)

### Étape 1: Installer et Configurer Cal.com Localement

**Durée estimée: 1-2 heures**

1. **Installer PostgreSQL**
```bash
brew install postgresql@14
brew services start postgresql@14
createdb calcom
```

2. **Cloner et Setup Cal.com**
```bash
cd ~/IOS
git clone https://github.com/calcom/cal.com.git
cd cal.com
yarn install
cp .env.example .env
```

3. **Configurer .env Cal.com**

Édite `~/IOS/cal.com/.env`:

```env
DATABASE_URL="postgresql://sami@localhost:5432/calcom"
NEXTAUTH_SECRET="GENERE_AVEC: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3001"
CALENDSO_ENCRYPTION_KEY="GENERE_AVEC: openssl rand -base64 24"
NEXT_PUBLIC_WEBAPP_URL="http://localhost:3001"

# Email avec Resend (gratuit 3000/mois)
EMAIL_FROM="noreply@hajar-habi.com"
EMAIL_SERVER_HOST="smtp.resend.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="resend"
EMAIL_SERVER_PASSWORD="re_VOTRE_API_KEY_RESEND"

# Désactiver telemetry
NEXT_TELEMETRY_DISABLED=1
```

4. **Migrer Database & Démarrer**
```bash
yarn workspace @calcom/prisma db-migrate
PORT=3001 yarn dev
```

Cal.com sera sur: http://localhost:3001

### Étape 2: Configuration Initiale Cal.com

**Durée estimée: 30 minutes**

1. **Créer compte admin**: http://localhost:3001/signup
   - Email: hajar@hajar-habi.com
   - Username: **hajar** (IMPORTANT: doit être exactement "hajar")

2. **Configurer profil**
   - Photo de profil
   - Bio courte
   - Fuseau horaire: **Africa/Casablanca**
   - Disponibilités par défaut (9h-18h Lun-Ven)

3. **Branding**
   - Settings → Appearance
   - Logo: Upload logo Hajar Habi
   - Couleur primaire: `#2C5F7C` (morocco-blue)
   - Couleur secondaire: `#E69D5B` (golden-orange)

### Étape 3: Créer les 6 Event Types

**Durée estimée: 1 heure**

Dans Cal.com, va dans "Event Types" → "New Event Type" et crée:

#### 1. Hatha Yoga
- **Slug**: `hatha-yoga` (IMPORTANT: exactement ce slug)
- **Durée**: 75 minutes
- **Prix**: 150 DH (ou MAD)
- **Disponibilités**:
  - Lundi: 18h00-19h15
  - Mercredi: 18h00-19h15
  - Vendredi: 18h00-19h15
- **Description**: "Cours de Hatha Yoga traditionnel alliant postures, respiration et méditation"
- **Couleur**: Orange (#E69D5B)
- **Lieu**: À définir (adresse studio ou en ligne)

#### 2. Restorative Yoga
- **Slug**: `restorative-yoga`
- **Durée**: 60 minutes
- **Prix**: 120 DH
- **Disponibilités**:
  - Mardi: 19h00-20h00
  - Jeudi: 19h00-20h00
- **Description**: "Yoga restauratif pour la détente profonde et la régénération"
- **Couleur**: Orange (#E69D5B)

#### 3. Méditation
- **Slug**: `meditation`
- **Durée**: 45 minutes
- **Prix**: 100 DH
- **Disponibilités**:
  - Samedi: 10h00-10h45
- **Description**: "Pratique de méditation guidée pour cultiver la présence"
- **Couleur**: Orange (#E69D5B)

#### 4. Coaching Individuel
- **Slug**: `coaching-individuel`
- **Durée**: 60 minutes
- **Prix**: 2500 DH (forfait 6 sessions - à préciser dans description)
- **Disponibilités**: Flexible (Lun-Ven 9h-18h)
- **Description**: "Coaching personnalisé pour votre développement personnel. Forfait de 6 sessions à réserver en une fois."
- **Couleur**: Violet (#8B7AA8)
- **Options**:
  - Ajouter question: "Format préféré: Présentiel ou Visio ?"

#### 5. Coaching Carrière
- **Slug**: `coaching-carriere`
- **Durée**: 90 minutes
- **Prix**: 4500 DH (forfait 8 sessions)
- **Disponibilités**: Flexible (Lun-Ven 9h-18h)
- **Description**: "Accompagnement professionnel pour votre transition de carrière. Forfait de 8 sessions."
- **Couleur**: Violet (#8B7AA8)

#### 6. Coaching Vie
- **Slug**: `coaching-vie`
- **Durée**: 60 minutes
- **Prix**: 5000 DH (forfait 12 sessions)
- **Disponibilités**: Flexible (Lun-Ven 9h-18h)
- **Description**: "Transformation holistique pour aligner votre vie avec vos valeurs. Forfait de 12 sessions."
- **Couleur**: Violet (#8B7AA8)

### Étape 4: Configuration Site Habi

**Durée estimée: 5 minutes**

1. **Créer fichier .env.local**

Dans `/Users/sami/IOS/Hajar/`, crée `.env.local`:
```env
NEXT_PUBLIC_CALCOM_URL=http://localhost:3001
```

2. **Redémarrer Next.js**
```bash
cd /Users/sami/IOS/Hajar
npm run dev
```

### Étape 5: Test End-to-End

**Durée estimée: 30 minutes**

1. **Ouvre le site Habi**: http://localhost:3000/programmes

2. **Teste chaque cours yoga**:
   - Clique sur "Réserver" pour Hatha → Modal s'ouvre ✅
   - Sélectionne date/heure → Vérifie disponibilités ✅
   - Remplis formulaire → Vérifie validation ✅
   - Complète réservation → Vérifie email confirmation ✅

3. **Teste chaque formule coaching**: http://localhost:3000/coaching
   - Même processus pour les 3 formules

4. **Problèmes possibles**:
   - **Modal vide**: Vérifie que Cal.com tourne sur port 3001
   - **Event non trouvé**: Vérifie les slugs dans Cal.com (doivent être exacts)
   - **Username invalide**: Vérifie que le username Cal.com est "hajar"

## 📊 Configuration Paiements (Plus tard)

Pour activer les paiements via Stripe:

1. **Créer compte Stripe Morocco**: https://dashboard.stripe.com

2. **Obtenir API Keys**:
   - Dashboard → Developers → API Keys
   - Copier "Secret key" et "Publishable key"

3. **Ajouter à Cal.com .env**:
```env
STRIPE_PRIVATE_KEY="sk_test_..."
STRIPE_CLIENT_ID="ca_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

4. **Configurer webhooks**:
   - Stripe Dashboard → Developers → Webhooks
   - Add endpoint: `http://localhost:3001/api/integrations/stripepayment/webhook`
   - Events: `checkout.session.completed`, `payment_intent.succeeded`

5. **Activer paiements dans Event Types**:
   - Éditer chaque Event Type
   - Onglet "Advanced" → "Require payment"
   - Sélectionner Stripe

## 🚀 Déploiement Production

### Option 1: Cal.com Cloud (Recommandé - Simple)

**Coût**: $12/mois/utilisateur

1. **S'inscrire**: https://cal.com/signup
2. **Créer les 6 Event Types** (même config que local)
3. **Mettre à jour .env.local Habi**:
```env
NEXT_PUBLIC_CALCOM_URL=https://cal.com
```

**Avantages**:
- Pas de maintenance
- Uptime garanti
- Support officiel

**Inconvénients**:
- $144/an
- Moins de contrôle

### Option 2: Self-hosted sur Vercel (Gratuit - Technique)

**Coût**: ~$0-5/mois (database Supabase)

1. **Database PostgreSQL**:
   - Créer database sur Supabase (gratuit 500MB)
   - Copier connection string

2. **Déployer Cal.com sur Vercel**:
```bash
cd ~/IOS/cal.com
vercel --prod
```

3. **Configurer variables environnement Vercel**:
   - Toutes les variables du .env local
   - `DATABASE_URL` avec Supabase connection string

4. **Domaine personnalisé** (optionnel):
   - Acheter domaine: `cal.hajar-habi.com`
   - Configurer DNS vers Vercel

5. **Mettre à jour .env.local Habi**:
```env
NEXT_PUBLIC_CALCOM_URL=https://cal.hajar-habi.com
```

**Avantages**:
- Gratuit ou très peu cher
- Contrôle total
- Données propriétaires

**Inconvénients**:
- Maintenance nécessaire
- Support limité

## 🎨 Customisation Avancée (Optionnel)

### Personnaliser le Widget Cal.com

Dans `/components/booking/BookingWidget.tsx`, ligne 99:

```tsx
data-cal-config='{
  "theme": "light",
  "styles": {
    "branding": {
      "brandColor": "#2C5F7C",
      "lightColor": "#F5F3F0",
      "lighterColor": "#FDFCFA"
    }
  },
  "hideEventTypeDetails": false,
  "layout": "month_view"
}'
```

Options disponibles:
- `theme`: "light" | "dark" | "auto"
- `layout`: "month_view" | "week_view" | "column_view"
- `hideEventTypeDetails`: true pour cacher détails

### Ajouter Google Calendar Sync

1. **Cal.com Settings** → Integrations → Google Calendar
2. **Connecter compte Google** de Hajar
3. **Choisir calendrier** principal pour sync
4. **Événements créés** apparaîtront automatiquement dans Google Calendar

### Notifications Email Personnalisées

Dans Cal.com:
1. Settings → Workflows
2. Créer workflow "Après réservation"
3. Personnaliser template email avec:
   - Logo Hajar Habi
   - Message personnalisé
   - Instructions pré-cours (pour yoga)

## 📝 Checklist Finale

Avant de considérer la feature terminée:

- [ ] Cal.com installé et tourne sur port 3001
- [ ] 6 Event Types créés avec slugs corrects
- [ ] Username Cal.com = "hajar"
- [ ] Emails Resend configurés et testés
- [ ] Branding Cal.com (logo + couleurs)
- [ ] .env.local Habi créé avec NEXT_PUBLIC_CALCOM_URL
- [ ] Test réservation Hatha Yoga complète
- [ ] Test réservation Restorative Yoga complète
- [ ] Test réservation Méditation complète
- [ ] Test réservation Coaching Individuel complète
- [ ] Test réservation Coaching Carrière complète
- [ ] Test réservation Coaching Vie complète
- [ ] Emails de confirmation reçus
- [ ] Modals s'ouvrent correctement
- [ ] UI cohérente avec design Habi
- [ ] Paiements Stripe configurés (optionnel)
- [ ] Google Calendar sync (optionnel)
- [ ] Déploiement production planifié

## 🆘 Troubleshooting

### Le modal est vide
**Cause**: Cal.com ne tourne pas ou URL incorrecte
**Solution**:
```bash
cd ~/IOS/cal.com
PORT=3001 yarn dev
```
Vérifie `.env.local` Habi a `NEXT_PUBLIC_CALCOM_URL=http://localhost:3001`

### "Event type not found"
**Cause**: Slug incorrect ou username incorrect
**Solution**: Vérifie que:
- Username Cal.com = "hajar"
- Slug Event Type = exactement celui dans `BookingWidget.tsx`
- URL finale = `http://localhost:3001/hajar/hatha-yoga`

### Pas d'email de confirmation
**Cause**: Resend API key invalide ou email non configuré
**Solution**:
- Vérifie Resend dashboard: https://resend.com/emails
- Teste email avec Cal.com test event

### Widget ne charge pas (loading infini)
**Cause**: Script Cal.com embed bloqué ou pas chargé
**Solution**: Ouvre console navigateur (F12) et vérifie erreurs JavaScript

## 📞 Support

- **Cal.com Docs**: https://cal.com/docs
- **Cal.com GitHub**: https://github.com/calcom/cal.com
- **Resend Docs**: https://resend.com/docs
- **Supabase Docs**: https://supabase.com/docs

---

## 🎉 Résultat Final

Une fois tout configuré, voici ce que les utilisateurs verront:

1. **Page Yoga**: 3 boutons "Réserver" élégants
2. **Clic sur bouton** → Modal s'ouvre avec calendrier Cal.com intégré
3. **Sélection date/heure** → Formulaire pré-rempli
4. **Validation** → Email confirmation automatique
5. **Événement ajouté** au calendrier Google de Hajar
6. **Paiement** (si Stripe activé) sécurisé et direct

**UX fluide, professionnelle, sans quitter le site Habi!** ✨
