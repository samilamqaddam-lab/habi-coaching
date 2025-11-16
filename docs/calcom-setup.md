# Guide d'Installation Cal.com Self-Hosted

## Prérequis
- Node.js 18+ ✅ (déjà installé)
- PostgreSQL 14+ (à installer)
- Yarn (package manager)

## Étape 1: Installation PostgreSQL

```bash
# macOS avec Homebrew
brew install postgresql@14
brew services start postgresql@14

# Créer database pour Cal.com
createdb calcom
```

## Étape 2: Clone et Setup Cal.com

```bash
# Dans un répertoire séparé (pas dans le projet Hajar)
cd ~/IOS
git clone https://github.com/calcom/cal.com.git
cd cal.com

# Installer dépendances
yarn install

# Copier fichier environnement
cp .env.example .env
```

## Étape 3: Configuration .env

Éditer `cal.com/.env` avec ces valeurs:

```env
# Database
DATABASE_URL="postgresql://sami@localhost:5432/calcom"

# Next Auth
NEXTAUTH_SECRET="votre-secret-genere-ici" # Générer avec: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3001"

# Calendrier
CALENDSO_ENCRYPTION_KEY="votre-encryption-key" # Générer avec: openssl rand -base64 24

# Email (utiliser Resend)
EMAIL_FROM="noreply@hajar-habi.com"
EMAIL_SERVER_HOST="smtp.resend.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="resend"
EMAIL_SERVER_PASSWORD="re_votre_api_key" # Obtenir sur resend.com

# App URL
NEXT_PUBLIC_WEBAPP_URL="http://localhost:3001"

# Désactiver Stripe pour tests locaux (activer plus tard)
STRIPE_PRIVATE_KEY=""
STRIPE_CLIENT_ID=""
STRIPE_WEBHOOK_SECRET=""

# Désactiver telemetry
NEXT_TELEMETRY_DISABLED=1
```

## Étape 4: Migration Database

```bash
yarn workspace @calcom/prisma db-migrate
yarn workspace @calcom/prisma db-seed
```

## Étape 5: Lancer Cal.com

```bash
# Port 3001 pour ne pas conflit avec Next.js (3000)
PORT=3001 yarn dev
```

Cal.com sera accessible sur: http://localhost:3001

## Étape 6: Configuration Initiale UI

1. Créer compte admin: http://localhost:3001/signup
   - Email: hajar@hajar-habi.com
   - Nom: Hajar Habi
   - Username: hajar

2. Configurer profil:
   - Photo de profil
   - Bio courte
   - Fuseau horaire: Africa/Casablanca
   - Disponibilités par défaut

## Étape 7: Créer Event Types (Types d'Événements)

### Pour Yoga (3 types)

#### 1. Hatha Yoga
- Durée: 75 minutes
- Prix: 150 DH
- Disponibilités: Lundi, Mercredi, Vendredi (18h-19h15)
- Description: "Cours de Hatha Yoga traditionnel alliant postures, respiration et méditation"
- Couleur: #E69D5B (golden-orange)

#### 2. Restorative Yoga
- Durée: 60 minutes
- Prix: 120 DH
- Disponibilités: Mardi, Jeudi (19h-20h)
- Description: "Yoga restauratif pour la détente profonde et la régénération"
- Couleur: #E69D5B (golden-orange)

#### 3. Méditation
- Durée: 45 minutes
- Prix: 100 DH
- Disponibilités: Samedi (10h-10h45)
- Description: "Pratique de méditation guidée pour cultiver la présence"
- Couleur: #E69D5B (golden-orange)

### Pour Coaching (3 formules)

#### 1. Coaching Individuel
- Durée: 60 minutes (session)
- Prix: 2500 DH (forfait 6 sessions)
- Disponibilités: Flexible (Lun-Ven 9h-18h)
- Description: "Coaching personnalisé pour votre développement personnel"
- Couleur: #8B7AA8 (mystic-mauve)
- Note: "Forfait de 6 sessions à réserver en une fois"

#### 2. Coaching Carrière
- Durée: 90 minutes (session)
- Prix: 4500 DH (forfait 8 sessions)
- Disponibilités: Flexible (Lun-Ven 9h-18h)
- Description: "Accompagnement professionnel pour votre transition de carrière"
- Couleur: #8B7AA8 (mystic-mauve)

#### 3. Coaching Vie
- Durée: 60 minutes (session)
- Prix: 5000 DH (forfait 12 sessions)
- Disponibilités: Flexible (Lun-Ven 9h-18h)
- Description: "Transformation holistique pour aligner votre vie avec vos valeurs"
- Couleur: #8B7AA8 (mystic-mauve)

## Étape 8: Configuration Paiements (Plus tard)

Quand prêt pour production:
1. Créer compte Stripe Morocco
2. Obtenir API keys
3. Ajouter à .env
4. Activer paiements dans chaque Event Type

## Étape 9: Branding Personnalisé

Dans Cal.com settings:
- Logo: Upload logo Hajar Habi
- Couleur primaire: #2C5F7C (morocco-blue)
- Couleur secondaire: #E69D5B (golden-orange)
- Favicon personnalisé

## URLs des Event Types (après création)

Ces URLs seront utilisées dans le site Habi:
- Hatha Yoga: `http://localhost:3001/hajar/hatha-yoga`
- Restorative: `http://localhost:3001/hajar/restorative-yoga`
- Méditation: `http://localhost:3001/hajar/meditation`
- Coaching Individuel: `http://localhost:3001/hajar/coaching-individuel`
- Coaching Carrière: `http://localhost:3001/hajar/coaching-carriere`
- Coaching Vie: `http://localhost:3001/hajar/coaching-vie`

## Production Deployment (Vercel - Plus tard)

Cal.com peut être déployé sur Vercel avec:
- PostgreSQL sur Supabase (gratuit jusqu'à 500MB)
- Coût estimé: $0-5/mois selon usage
