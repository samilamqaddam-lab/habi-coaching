# Backend Yoga System - Architecture Complète

> Documentation technique du système de gestion des cours yoga, événements et inscriptions.

**Dernière mise à jour:** 2026-01-21

---

## Vue d'Ensemble

Le système yoga de Transcendence Work comprend **deux sous-systèmes parallèles** qui coexistent sur la page `/yoga` :

| Système | Usage | Complexité |
|---------|-------|------------|
| **Événements Ponctuels** | Ateliers, introductions, sessions découverte | Simple (1 date fixe) |
| **Programmes/Éditions** | Cours collectifs réguliers (Upa Yoga, Surya Kriya...) | Complexe (multi-sessions) |

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              PAGE /yoga                                          │
│                                                                                  │
│  ┌─────────────────────────────────────┐  ┌─────────────────────────────────────┐│
│  │     SECTION ÉVÉNEMENTS              │  │     SECTION PROGRAMMES              ││
│  │     (Ateliers ponctuels)            │  │     (Cours réguliers)               ││
│  │                                     │  │                                     ││
│  │  useEventsData()                    │  │  useMultipleEditionsData()          ││
│  │       ↓                             │  │       ↓                             ││
│  │  /api/events                        │  │  /api/yoga/[key]                    ││
│  │       ↓                             │  │       ↓                             ││
│  │  yoga_events                        │  │  programme_editions                 ││
│  │  event_registrations                │  │  edition_sessions                   ││
│  │                                     │  │  session_date_options               ││
│  │                                     │  │  registrations                      ││
│  └─────────────────────────────────────┘  └─────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Système 1 : Événements Ponctuels

### Schéma de Données

```
yoga_events                    1 événement = 1 date fixe
├── id (uuid)                  Ex: "Atelier Stress Relief - 25 Jan 2026"
├── title (text)               Titre FR
├── title_en (text)            Titre EN (optionnel)
├── subtitle (text)            Sous-titre FR
├── subtitle_en (text)         Sous-titre EN
├── badge (text)               Badge affiché (ex: "Nouveau")
├── badge_en (text)            Badge EN
├── description (text)         Description FR
├── description_en (text)      Description EN
├── date_time (timestamptz)    📅 Date et heure uniques
├── duration_minutes (int)     Durée en minutes (défaut: 90)
├── location (text)            Nom du lieu
├── address (text)             Adresse complète
├── price (numeric)            Prix en MAD (null si gratuit)
├── max_capacity (int)         Places maximum (défaut: 15)
├── is_active (boolean)        Visible sur le site?
└── created_at (timestamptz)

event_registrations            Inscriptions aux événements
├── id (uuid)
├── event_id (uuid) ─────────► FK vers yoga_events
├── first_name (text)
├── last_name (text)
├── email (text)
├── phone (text)
├── status (text)              'pending' | 'confirmed' | 'cancelled'
├── payment_requested_at       Date de demande de paiement
├── notes (text)               Notes admin
└── created_at (timestamptz)

event_availability (VIEW)      Vue calculée automatiquement par trigger
├── event_id (uuid)
├── current_count (int)        Nombre d'inscrits (non annulés)
├── remaining_spots (int)      Places restantes
└── is_full (boolean)          max_capacity atteint?
```

### Architecture API

```
📁 app/api/
│
├── 📁 events/                          ← API PUBLIQUE
│   ├── route.ts                          GET: liste événements actifs + futurs
│   │
│   ├── 📁 [eventId]/
│   │   └── 📁 register/
│   │       └── route.ts                  POST: inscription publique
│   │
│   └── 📁 registrations/
│       └── 📁 [id]/
│           ├── route.ts                  PATCH: changer statut, DELETE: supprimer
│           └── 📁 payment-request/
│               └── route.ts              POST: envoyer email demande paiement
│
└── 📁 admin/events/                    ← API ADMIN (CRUD)
    ├── route.ts                          GET: liste avec stats, POST: créer
    └── 📁 [id]/
        └── route.ts                      GET: détails, PUT: modifier, DELETE: archiver/supprimer
```

### Architecture Pages

```
📁 app/(site)/yoga/
├── page.tsx                              Page principale
└── ProgrammesContent.tsx                 Affiche événements via useEventsData()

📁 app/(admin)/admin/(protected)/events/
├── page.tsx                              Liste événements + boutons CRUD
├── 📁 new/
│   └── page.tsx                          Formulaire création
└── 📁 [eventId]/
    ├── page.tsx                          Détail inscriptions (lecture)
    └── 📁 edit/
        └── page.tsx                      Formulaire édition
```

### Flux Inscription Publique

```
/yoga
    │
    └── useEventsData() ──► GET /api/events
                                   │
                                   ▼
                           Cartes événements
                                   │
                                   │ Click "S'inscrire"
                                   ▼
                           Formulaire inscription
                                   │
                                   └── POST /api/events/[eventId]/register
                                           │
                                           ├── Validation Zod
                                           ├── INSERT event_registrations
                                           ├── Email confirmation (Resend)
                                           └── Retourne { success, registrationId }
```

### Flux Admin CRUD

```
/admin/events
    │
    ├── GET /api/admin/events ─────────► Liste tous événements + stats
    │
    ├── [Nouvel Événement] ─────────────► /admin/events/new
    │       │
    │       └── POST /api/admin/events ─► INSERT yoga_events
    │
    ├── [Modifier] ─────────────────────► /admin/events/[id]/edit
    │       │
    │       └── PUT /api/admin/events/[id] ─► UPDATE yoga_events
    │
    ├── [Archiver] ─────────────────────► PUT { isActive: false }
    │
    └── [Supprimer] ────────────────────► DELETE /api/admin/events/[id]?hard=true
                                                │
                                                ├── DELETE event_registrations
                                                └── DELETE yoga_events
```

---

## Système 2 : Programmes avec Éditions

### Schéma de Données

```
programme_editions             1 édition = 1 cycle de cours complet
├── id (uuid)                  Ex: "Upa Yoga - Janvier 2026"
├── programme_key (text) ─────► 'upa-yoga', 'surya-kriya', 'angamardana', etc.
├── edition_type (text)        'collective' | 'individual' | 'event'
├── title (text)               Titre FR
├── title_en (text)            Titre EN
├── start_date (date)          Date de début
├── max_capacity (int)         Capacité globale
├── is_active (boolean)        Visible sur le site?
├── sessions_mandatory (bool)  Toutes sessions obligatoires?
└── created_at (timestamptz)

edition_sessions               1 édition = N sessions
├── id (uuid)                  Ex: "Session 1", "Session 2"
├── edition_id (uuid) ────────► FK vers programme_editions
├── session_number (int)       1, 2, 3...
├── title (text)               Titre FR
├── title_en (text)            Titre EN
├── duration_minutes (int)     Durée de la session
└── created_at (timestamptz)

session_date_options           1 session = N options de créneaux
├── id (uuid)                  Ex: "Samedi 10h" ou "Dimanche 14h"
├── session_id (uuid) ────────► FK vers edition_sessions
├── date_time (timestamptz)    Date/heure de début
├── end_time (timestamptz)     Heure de fin
├── location (text)            Lieu
├── max_capacity (int)         Places pour ce créneau
└── created_at (timestamptz)

registrations                  Inscriptions à une édition
├── id (uuid)
├── edition_id (uuid) ────────► FK vers programme_editions
├── first_name (text)
├── last_name (text)
├── email (text)
├── phone (text)
├── whatsapp (text)
├── consent (boolean)
├── message (text)
├── status (text)              'pending' | 'confirmed' | 'cancelled'
└── created_at (timestamptz)

registration_date_choices      Choix de créneaux par inscription
├── id (uuid)
├── registration_id (uuid) ───► FK vers registrations
├── date_option_id (uuid) ────► FK vers session_date_options
└── created_at (timestamptz)

date_availability (VIEW)       Vue calculée automatiquement
├── date_option_id (uuid)
├── session_id (uuid)
├── date_time (timestamptz)
├── max_capacity (int)
├── current_count (int)
├── remaining_spots (int)
└── is_full (boolean)
```

### Relations Hiérarchiques

```
programme_editions (1)
    │
    └──► edition_sessions (N)
              │
              └──► session_date_options (N)
                        │
                        └──► registration_date_choices (N) ◄── registrations
```

**Exemple concret:**
```
Upa Yoga - Janvier 2026 (édition)
├── Session 1: Introduction
│   ├── Samedi 18 Jan 10h-12h (8 places)
│   └── Dimanche 19 Jan 14h-16h (8 places)
└── Session 2: Pratique complète
    ├── Samedi 25 Jan 10h-12h (8 places)
    └── Dimanche 26 Jan 14h-16h (8 places)

→ L'utilisateur choisit 1 créneau par session lors de l'inscription
```

### Architecture API

```
📁 app/api/
│
├── 📁 yoga/                            ← API PUBLIQUE
│   ├── 📁 [editionId]/
│   │   ├── route.ts                      GET: détails édition + sessions + dispo
│   │   ├── 📁 register/
│   │   │   └── route.ts                  POST: inscription avec choix de dates
│   │   └── 📁 availability/
│   │       └── route.ts                  GET: disponibilité temps réel
│   │
│   └── 📁 interest/
│       └── route.ts                      POST: manifester intérêt (sans édition active)
│
├── 📁 registrations/                   ← API ADMIN (inscriptions)
│   └── 📁 [registrationId]/
│       ├── route.ts                      GET/DELETE inscription
│       ├── 📁 status/
│       │   └── route.ts                  PATCH: changer statut
│       └── 📁 payment-request/
│           └── route.ts                  POST: envoyer email paiement
│
└── 📁 admin/editions/                  ← API ADMIN (CRUD éditions)
    ├── route.ts                          GET: liste, POST: créer
    └── 📁 [id]/
        └── route.ts                      GET: détails, PUT: modifier, DELETE: archiver
```

### Architecture Pages

```
📁 app/(site)/
├── 📁 yoga/
│   ├── page.tsx                          Liste programmes avec badges
│   └── ProgrammesContent.tsx             useMultipleEditionsData()
│
└── 📁 [programmeKey]/                  ← Pages dédiées par programme
    ├── page.tsx                          Metadata SEO
    └── ProgrammePageContent.tsx          Détails + formulaire inscription

📁 app/(admin)/admin/(protected)/
├── 📁 editions/
│   ├── page.tsx                          Liste éditions
│   └── 📁 [id]/
│       └── page.tsx                      Détail édition
│
└── 📁 dashboard/
    ├── page.tsx                          Vue globale inscriptions
    └── 📁 [editionId]/
        └── page.tsx                      Inscriptions par édition
```

### Flux Inscription Publique

```
/yoga
    │
    └── useMultipleEditionsData() ──► GET /api/yoga/[key] (parallèle)
                                            │
                                            ▼
                                    Cartes programmes avec badges
                                            │
                                            │ Click programme
                                            ▼
/[programmeKey]  (ex: /upa-yoga)
    │
    └── useEditionData() ──► GET /api/yoga/[editionId]
                                   │
                                   ▼
                           Détails + formulaire avec choix dates
                                   │
                                   └── POST /api/yoga/[editionId]/register
                                           │
                                           ├── Validation Zod
                                           ├── Vérification disponibilité
                                           ├── INSERT registrations
                                           ├── INSERT registration_date_choices
                                           ├── Email confirmation (Resend)
                                           └── Retourne { success, registrationId }
```

---

## Programmes Configurés

Fichier: `lib/programmes-config.ts`

| Programme Key | Nom | Supports Editions | Capacité |
|---------------|-----|-------------------|----------|
| `upa-yoga` | Upa Yoga | ✅ | 10 |
| `surya-kriya` | Surya Kriya | ✅ | 10 |
| `angamardana` | Angamardana | ✅ | 10 |
| `yogasanas` | Yogasanas | ✅ | 10 |
| `surya-shakti` | Surya Shakti | ✅ | 10 |
| `bhuta-shuddhi` | Bhuta Shuddhi | ❌ | 10 |

---

## Hooks Disponibles

### useEventsData()
```typescript
// Fetch événements ponctuels actifs
const { events, isLoading, error, hasActiveEvents } = useEventsData();
```

### useEditionData(programmeKey)
```typescript
// Fetch édition active pour un programme
const { edition, sessions, isLoading, error } = useEditionData('upa-yoga');
```

### useMultipleEditionsData(programmeKeys[])
```typescript
// Fetch éditions pour plusieurs programmes en parallèle
const editionsMap = useMultipleEditionsData(['upa-yoga', 'surya-kriya']);
// editionsMap['upa-yoga'].edition, editionsMap['upa-yoga'].sessions, etc.
```

---

## Composants Admin

| Composant | Fichier | Usage |
|-----------|---------|-------|
| `EventForm` | `components/admin/EventForm.tsx` | Formulaire création/édition événement |
| `EventRegistrationCard` | `components/admin/EventRegistrationCard.tsx` | Carte inscription événement |
| `RegistrationCard` | `components/admin/RegistrationCard.tsx` | Carte inscription programme |
| `SessionBuilder` | `components/admin/SessionBuilder.tsx` | Constructeur sessions édition |
| `DateOptionPicker` | `components/admin/DateOptionPicker.tsx` | Sélecteur options dates |

---

## Comparaison des Deux Systèmes

| Aspect | Événements | Programmes/Éditions |
|--------|------------|---------------------|
| **Tables Supabase** | 2 + 1 vue | 5 + 1 vue |
| **Choix utilisateur** | Aucun (date fixe) | Choix créneau par session |
| **Pages dédiées** | Non | Oui (`/upa-yoga`, etc.) |
| **Récurrence** | Ponctuel | Cyclique (éditions) |
| **Admin CRUD complet** | ✅ Oui | ✅ Oui |
| **Exemple** | "Atelier 25 Jan 18h" | "Upa Yoga Jan 2026" (2 sessions × 2 créneaux) |

---

## Migration SQL

Le fichier de migration pour le système événements:
`scripts/supabase-migrations/004_events_system.sql`

Contient:
- Création table `yoga_events`
- Création table `event_registrations`
- Vue `event_availability`
- Triggers de mise à jour automatique
- Politiques RLS

---

## Sécurité

- **API publiques** (`/api/events`, `/api/yoga`) : Lecture seule + inscription
- **API admin** (`/api/admin/*`) : Protégées par authentification session
- **RLS Supabase** : Politiques définies par table
- **Validation** : Zod côté serveur pour toutes les mutations
