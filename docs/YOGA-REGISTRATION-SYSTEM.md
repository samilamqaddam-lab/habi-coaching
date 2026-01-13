# Système d'Inscription Multi-Sessions pour Yoga

**Date:** 13 janvier 2026
**Projet:** Transcendence Work - Hajar Habi
**Feature:** Système d'inscription dynamique pour cours collectifs de yoga

---

## Vue d'ensemble

Ce système permet aux participants de s'inscrire à des **éditions de programmes de yoga** (exemple: Upa Yoga - Janvier 2026) qui sont composées de **3 sessions**, chacune offrant **2 options de dates**. Les participants choisissent **1 date par session** (total: 3 choix), avec une **limite de 10 personnes par date**.

### Caractéristiques principales

- ✅ **Gestion de capacité en temps réel** - Affichage des places restantes
- ✅ **Blocage automatique** - Les dates complètes deviennent non sélectionnables
- ✅ **Multi-sessions** - 3 sessions avec 2 dates chacune
- ✅ **Extensible** - Peut être étendu à d'autres programmes (Surya Kriya, etc.)
- ✅ **Notifications email** - Confirmation participant + notification admin
- ✅ **Base de données Supabase** - Backend serverless avec RLS

---

## Architecture

### Stack Technique

```
Frontend: Next.js 16 (App Router) + React 19 + TypeScript
Backend: Next.js API Routes
Database: Supabase (PostgreSQL)
Emails: Resend
Validation: Zod
```

### Structure de la Base de Données

```
programme_editions (1 édition = ex: "Upa Yoga - Janvier 2026")
    ↓
edition_sessions (3 sessions par édition)
    ↓
session_date_options (2 dates par session)
    ↓
registrations ←→ registration_date_choices (lien N-N)
```

**Vue calculée:** `date_availability` - Compte en temps réel:
- `current_count`: Nombre d'inscrits
- `remaining_spots`: Places restantes
- `is_full`: Boolean si complet

---

## Fichiers Créés/Modifiés

### 📁 Base de données

**`/scripts/supabase-migrations/001_create_yoga_registration_tables.sql`**
- Crée 5 tables + 1 vue
- RLS policies (public read, write-only registrations)
- Données d'exemple pour Upa Yoga Janvier 2026

### 📁 Backend (API Routes)

**`/lib/supabase.ts`**
- Client Supabase (public + admin)
- TypeScript interfaces pour toutes les tables
- Helper functions: `fetchEditionDetails()`, `registerForEdition()`

**`/app/api/programmes/[editionId]/route.ts`**
- `GET` - Récupère détails d'une édition avec sessions et dates
- Supporte lookup par UUID ou `programme_key`

**`/app/api/programmes/[editionId]/availability/route.ts`**
- `GET` - Retourne disponibilité en temps réel pour toutes les dates
- Format: `{ [dateOptionId]: { current: 5, max: 10, remaining: 5, is_full: false } }`

**`/app/api/programmes/[editionId]/register/route.ts`**
- `POST` - Enregistre une inscription avec validation Zod
- Vérifie capacité avant création
- Crée registration + date_choices en transaction
- Envoie emails (admin + participant)

### 📁 Frontend (Composants)

**`/components/programmes/SessionDatePicker.tsx`**
- Composant de sélection de dates multi-sessions
- Affiche disponibilité par date (badges "X places" / "COMPLET")
- Radio buttons avec refresh automatique toutes les 30s

**`/components/programmes/UpaYogaEditionCard.tsx`**
- Card affichant prochaine édition avec toutes les dates
- Bouton "S'inscrire à cette édition"
- Fetch data depuis API

**`/components/forms/EditionRegistrationForm.tsx`**
- Formulaire complet d'inscription
- Intègre SessionDatePicker
- Validation côté client + serveur
- États: loading, success, error

**`/components/forms/EditionRegistrationModal.tsx`**
- Modal wrapper pour EditionRegistrationForm
- Gestion ouverture/fermeture
- Prevent body scroll

**`/components/forms/index.ts`**
- Export des nouveaux composants

### 📁 UI Updates

**`/components/ui/FormInput.tsx`**
- Ajout prop `error?: string` pour afficher erreurs de validation
- Styling conditionnel (bordure rouge si erreur)

**`/app/programmes/ProgrammesContent.tsx`**
- Intégration de `UpaYogaEditionCard` dans section "Cours collectifs"
- Gestion du modal d'inscription
- État `isRegistrationModalOpen`

---

## Base de Données Supabase

### Tables

#### 1. `programme_editions`
Stocke les éditions de programmes (ex: "Upa Yoga - Janvier 2026")

```sql
id              UUID PRIMARY KEY
programme_key   TEXT            -- 'upa-yoga', 'surya-kriya'
title           TEXT            -- "Upa Yoga - Édition Janvier 2026"
title_en        TEXT            -- English title
start_date      DATE
max_capacity    INT DEFAULT 10
is_active       BOOLEAN DEFAULT true
created_at      TIMESTAMPTZ
```

#### 2. `edition_sessions`
Stocke les sessions d'une édition (ex: Session 1, 2, 3)

```sql
id              UUID PRIMARY KEY
edition_id      UUID REFERENCES programme_editions(id) ON DELETE CASCADE
session_number  INT
title           TEXT            -- "Session 1: Introduction"
title_en        TEXT
created_at      TIMESTAMPTZ
UNIQUE(edition_id, session_number)
```

#### 3. `session_date_options`
Stocke les options de dates pour chaque session

```sql
id              UUID PRIMARY KEY
session_id      UUID REFERENCES edition_sessions(id) ON DELETE CASCADE
date_time       TIMESTAMPTZ
location        TEXT DEFAULT 'Studio, Casablanca'
max_capacity    INT DEFAULT 10
created_at      TIMESTAMPTZ
```

#### 4. `registrations`
Stocke les inscriptions des participants

```sql
id              UUID PRIMARY KEY
edition_id      UUID REFERENCES programme_editions(id) ON DELETE CASCADE
first_name      TEXT NOT NULL
last_name       TEXT NOT NULL
email           TEXT NOT NULL
phone           TEXT NOT NULL
whatsapp        TEXT
consent         BOOLEAN DEFAULT true
message         TEXT
status          TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled'))
created_at      TIMESTAMPTZ
```

#### 5. `registration_date_choices`
Lie les inscriptions aux dates choisies (N-N)

```sql
id                UUID PRIMARY KEY
registration_id   UUID REFERENCES registrations(id) ON DELETE CASCADE
date_option_id    UUID REFERENCES session_date_options(id) ON DELETE CASCADE
created_at        TIMESTAMPTZ
UNIQUE(registration_id, date_option_id)
```

### Vue: `date_availability`

Calcule en temps réel la disponibilité pour chaque date:

```sql
CREATE OR REPLACE VIEW date_availability AS
SELECT
  sdo.id AS date_option_id,
  sdo.session_id,
  sdo.date_time,
  sdo.max_capacity,
  COALESCE(COUNT(rdc.id) FILTER (WHERE r.status != 'cancelled'), 0)::INT AS current_count,
  (sdo.max_capacity - COALESCE(COUNT(rdc.id) FILTER (WHERE r.status != 'cancelled'), 0))::INT AS remaining_spots,
  CASE
    WHEN COALESCE(COUNT(rdc.id) FILTER (WHERE r.status != 'cancelled'), 0) >= sdo.max_capacity
    THEN true
    ELSE false
  END AS is_full
FROM session_date_options sdo
LEFT JOIN registration_date_choices rdc ON sdo.id = rdc.date_option_id
LEFT JOIN registrations r ON rdc.registration_id = r.id
GROUP BY sdo.id, sdo.session_id, sdo.date_time, sdo.max_capacity;
```

### RLS Policies

**Public (anon/authenticated):**
- ✅ **READ** sur `programme_editions`, `edition_sessions`, `session_date_options`
- ✅ **INSERT** sur `registrations`, `registration_date_choices`
- ❌ **NO READ** sur registrations (protection données personnelles)

**Service Role:**
- ✅ Full access (utilisé par API routes pour emails)

---

## Flow Utilisateur

### 1. Affichage de l'édition disponible

```
User visite /programmes
  ↓
UpaYogaEditionCard fetch GET /api/programmes/upa-yoga
  ↓
Affiche édition avec dates et disponibilité
```

### 2. Inscription

```
User clique "S'inscrire à cette édition"
  ↓
EditionRegistrationModal s'ouvre
  ↓
EditionRegistrationForm charge sessions et disponibilités
  ↓
SessionDatePicker affiche 3 sessions × 2 dates avec places restantes
  ↓
User remplit formulaire + choisit 3 dates
  ↓
POST /api/programmes/{editionId}/register
  ↓
Validation Zod → Vérification capacité → Création registration
  ↓
Envoi emails (Resend) → Confirmation participant + Notification admin
  ↓
Affichage message succès → Fermeture modal après 3s
```

### 3. Gestion de capacité

```
SessionDatePicker auto-refresh toutes les 30s
  ↓
GET /api/programmes/{editionId}/availability
  ↓
Update badges ("7 places" / "COMPLET")
  ↓
Disable dates complètes (is_full === true)
```

---

## API Endpoints

### `GET /api/programmes/[editionId]`

Récupère détails complets d'une édition.

**Request:**
```
GET /api/programmes/upa-yoga
GET /api/programmes/6939704d-d9c0-4eb1-bd46-e6ac841b9f63
```

**Response:**
```json
{
  "edition": {
    "id": "6939704d-...",
    "programme_key": "upa-yoga",
    "title": "Upa Yoga - Édition Janvier 2026",
    "start_date": "2026-01-25",
    "max_capacity": 10,
    "is_active": true
  },
  "sessions": [
    {
      "id": "ce7d92e7-...",
      "session_number": 1,
      "title": "Session 1: Introduction au Upa Yoga",
      "date_options": [
        {
          "id": "37b42f56-...",
          "date_time": "2026-01-25T10:00:00Z",
          "location": "Studio, Casablanca",
          "max_capacity": 10,
          "current_count": 0,
          "remaining_spots": 10,
          "is_full": false
        },
        { ... }
      ]
    },
    { ... }
  ]
}
```

### `GET /api/programmes/[editionId]/availability`

Récupère disponibilité en temps réel pour toutes les dates.

**Request:**
```
GET /api/programmes/upa-yoga/availability
```

**Response:**
```json
{
  "37b42f56-f817-4da7-bbfd-25f47e9ab0ec": {
    "current": 5,
    "max": 10,
    "remaining": 5,
    "is_full": false
  },
  "c0d7b097-506d-427c-83ab-a96987621e73": {
    "current": 10,
    "max": 10,
    "remaining": 0,
    "is_full": true
  },
  ...
}
```

### `POST /api/programmes/[editionId]/register`

Crée une nouvelle inscription avec choix de dates.

**Request:**
```json
{
  "firstName": "Ahmed",
  "lastName": "Bennani",
  "email": "ahmed@example.com",
  "phone": "+212612345678",
  "whatsapp": "+212612345678",
  "consent": true,
  "message": "Hâte de commencer !",
  "dateChoices": [
    "37b42f56-f817-4da7-bbfd-25f47e9ab0ec",
    "6aeb7bcb-2add-44ad-b53b-05678f4bfd2f",
    "77e69e9e-08af-4850-a8ac-8da70ee3505d"
  ]
}
```

**Response (Success):**
```json
{
  "success": true,
  "registrationId": "abc123...",
  "message": "Inscription enregistrée avec succès"
}
```

**Response (Error - Capacity):**
```json
{
  "error": "Date complète",
  "dateOptionId": "37b42f56-..."
}
```

---

## Variables d'Environnement

### Local (.env.local)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://serlmuwwebjqxpwnybko.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Resend (pour emails)
RESEND_API_KEY=re_...
```

### Vercel Production

**Ajouter via Vercel Web UI** (Settings → Environment Variables):

```
NEXT_PUBLIC_SUPABASE_URL=https://serlmuwwebjqxpwnybko.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
RESEND_API_KEY=re_...
```

⚠️ **IMPORTANT:** Utiliser Web UI, pas `vercel env add` (risque de caractères `\n`)

---

## Tests Manuels

### Checklist de Test

- [ ] **Affichage édition** - Card s'affiche avec dates correctes
- [ ] **Disponibilité initiale** - Toutes les dates montrent "10 places"
- [ ] **Sélection multi-dates** - Peut choisir 1 date par session
- [ ] **Validation formulaire** - Messages d'erreur si champs vides
- [ ] **Soumission réussie** - Message de succès + modal se ferme
- [ ] **Email admin** - Hajar reçoit notification
- [ ] **Email participant** - Confirmation envoyée
- [ ] **Décompte places** - Après inscription, places diminuent
- [ ] **Date complète** - À 10 inscriptions, badge "COMPLET" + disabled
- [ ] **Inscription impossible** - Erreur si date complète sélectionnée
- [ ] **Auto-refresh** - Disponibilité se met à jour toutes les 30s

### Scénario de Test de Capacité

1. Créer 10 inscriptions pour la date "25 janv. 10h00"
2. Vérifier badge "COMPLET" sur cette date
3. Vérifier date devient non-sélectionnable
4. Tenter inscription avec cette date → Erreur "Date complète"
5. Vérifier autres dates toujours disponibles

---

## Maintenance & Administration

### Créer une Nouvelle Édition

**Via MCP Supabase ou SQL Editor:**

```sql
-- 1. Créer édition
INSERT INTO programme_editions (programme_key, title, title_en, start_date)
VALUES ('upa-yoga', 'Upa Yoga - Mars 2026', 'Upa Yoga - March 2026', '2026-03-15')
RETURNING id;

-- 2. Créer sessions (utiliser ID retourné)
INSERT INTO edition_sessions (edition_id, session_number, title, title_en)
VALUES
  ('{edition_id}', 1, 'Session 1: Introduction', 'Session 1: Introduction'),
  ('{edition_id}', 2, 'Session 2: Pratiques', 'Session 2: Practices'),
  ('{edition_id}', 3, 'Session 3: Intégration', 'Session 3: Integration')
RETURNING id, session_number;

-- 3. Créer dates (utiliser session IDs)
INSERT INTO session_date_options (session_id, date_time, location)
VALUES
  ('{session1_id}', '2026-03-15 10:00:00+00', 'Studio, Casablanca'),
  ('{session1_id}', '2026-03-16 10:00:00+00', 'Studio, Casablanca'),
  -- ... répéter pour sessions 2 et 3
```

### Désactiver une Édition

```sql
UPDATE programme_editions
SET is_active = false
WHERE id = '{edition_id}';
```

### Voir Inscriptions par Édition

```sql
SELECT
  r.first_name,
  r.last_name,
  r.email,
  r.status,
  r.created_at,
  array_agg(sdo.date_time ORDER BY es.session_number) as chosen_dates
FROM registrations r
JOIN registration_date_choices rdc ON r.id = rdc.registration_id
JOIN session_date_options sdo ON rdc.date_option_id = sdo.id
JOIN edition_sessions es ON sdo.session_id = es.id
WHERE r.edition_id = '{edition_id}'
GROUP BY r.id
ORDER BY r.created_at DESC;
```

### Annuler une Inscription

```sql
UPDATE registrations
SET status = 'cancelled'
WHERE id = '{registration_id}';
```

**Note:** Les places se libèrent automatiquement grâce à la vue `date_availability` qui filtre `WHERE r.status != 'cancelled'`.

---

## Extensibilité

### Ajouter d'autres programmes (Surya Kriya, etc.)

Le système est **agnostique du type de programme**. Pour ajouter Surya Kriya:

1. **Créer édition** avec `programme_key = 'surya-kriya'`
2. **Créer component** `SuryaKriyaEditionCard.tsx` (similaire à `UpaYogaEditionCard`)
3. **Intégrer** dans `ProgrammesContent.tsx`
4. **Réutiliser** les mêmes composants: `EditionRegistrationForm`, `SessionDatePicker`

### Modifier nombre de sessions/dates

Le système supporte:
- **N sessions** par édition (actuellement 3)
- **M dates** par session (actuellement 2)

Simplement créer les sessions/dates en base → tout s'adapte automatiquement.

---

## Sécurité

### RLS (Row Level Security)

- ✅ **Public read** sur données éditions/sessions/dates
- ❌ **No public read** sur registrations (RGPD)
- ✅ **Service role** utilisé par API pour emails

### Validation

- **Client-side:** React state + validation basique
- **Server-side:** Zod schema validation
- **Database:** CHECK constraints sur status

### Protection Données

- Emails stockés en base (pas de PII exposure publique)
- RLS empêche lecture des inscriptions par autres participants
- Service role key stockée en env variable (jamais exposée client)

---

## Performance

### Optimisations

- **View `date_availability`:** Précalculée par PostgreSQL (pas de count côté client)
- **Indexes:** Sur edition_id, session_id, email, status
- **Auto-refresh intelligent:** 30s seulement (pas en temps réel)
- **Cascade deletes:** Cleanup automatique si édition supprimée

### Cache Strategy

- **Static:** Page `/programmes` (ISR 1min)
- **Dynamic:** API routes (pas de cache)
- **Client:** Availability refresh toutes les 30s

---

## Prochaines Étapes (Optionnel)

### Phase 2 - Améliorations UX

- [ ] Notifications push (places qui se libèrent)
- [ ] Liste d'attente automatique
- [ ] Paiement en ligne (Stripe/PayPal)
- [ ] Calendrier interactif (vue mensuelle)
- [ ] Export CSV des inscriptions

### Phase 3 - Admin Dashboard

- [ ] Interface admin Supabase custom
- [ ] Gestion éditions via UI (pas SQL)
- [ ] Stats en temps réel (taux de remplissage)
- [ ] Export participant lists

---

## Résolution de Problèmes

### Erreur "Missing NEXT_PUBLIC_SUPABASE_URL"

**Cause:** Variables d'environnement non chargées.

**Solution:**
1. Vérifier `.env.local` contient bien les variables
2. Redémarrer le serveur dev (`npm run dev`)
3. Vérifier pas de `\n` dans les valeurs

### Dates ne se bloquent pas à 10 inscriptions

**Vérifier:**
1. Vue `date_availability` existe: `SELECT * FROM date_availability;`
2. Statut inscriptions pas "cancelled"
3. `max_capacity` bien à 10 dans `session_date_options`

### Emails ne s'envoient pas

**Vérifier:**
1. `RESEND_API_KEY` dans `.env.local`
2. Domaine vérifié sur Resend.com
3. Logs API: `console.log` dans `/register/route.ts`

### Inscription échoue avec "Date complète"

**Attendu:** C'est le comportement voulu si date à capacité max.

**Débugger:**
```sql
SELECT * FROM date_availability WHERE date_option_id = '{failing_date_id}';
```

---

## Références

- **Supabase Docs:** https://supabase.com/docs
- **Next.js API Routes:** https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- **Zod Validation:** https://zod.dev
- **Resend Emails:** https://resend.com/docs

---

**Auteur:** Claude (Sonnet 4.5)
**Contact Support:** Sami (sami@transcendencework.com)
**Dernière mise à jour:** 13 janvier 2026
