# Plan: Espace Admin Scalable - Transcendence Work

**Date:** 2026-01-13
**Vision:** Espace admin modulaire et extensible pour gérer tous les aspects du site

---

## 🎯 Vision Globale

Créer un espace admin `/admin` qui sert de hub central pour:
- ✅ **Phase 1 (Actuelle):** Gestion des inscriptions Upa Yoga
- 🔮 **Phases Futures:** Éditions, contenu, emails, analytics, utilisateurs

**Principe Clé:** Architecture modulaire où chaque fonctionnalité est un module indépendant mais intégré.

---

## 📐 Architecture Proposée

### Structure des Dossiers

```
/app/admin/
├── layout.tsx                    # Layout admin avec auth + navigation
├── page.tsx                      # Dashboard overview (stats globales)
│
├── inscriptions/
│   ├── page.tsx                  # Liste des inscriptions
│   ├── [id]/
│   │   └── page.tsx              # Détail inscription individuelle
│   └── export/
│       └── route.ts              # API export CSV
│
├── editions/                     # 🔮 Future: Gestion des éditions
│   ├── page.tsx                  # Liste des éditions
│   ├── [id]/
│   │   └── page.tsx              # Modifier édition
│   └── nouvelle/
│       └── page.tsx              # Créer nouvelle édition
│
├── contenu/                      # 🔮 Future: Gestion contenu Sanity
│   ├── page.tsx                  # Overview contenu
│   ├── temoignages/
│   │   └── page.tsx              # Gérer témoignages
│   └── blog/
│       └── page.tsx              # Gérer articles blog
│
├── emails/                       # 🔮 Future: Envoi emails groupés
│   ├── page.tsx                  # Templates & historique
│   └── nouveau/
│       └── page.tsx              # Composer nouveau email
│
├── statistiques/                 # 🔮 Future: Analytics avancés
│   └── page.tsx                  # Dashboards & KPIs
│
└── parametres/                   # 🔮 Future: Settings globaux
    └── page.tsx                  # Configuration site

/components/admin/
├── AdminLayout.tsx               # Layout réutilisable
├── AdminNav.tsx                  # Navigation sidebar
├── AdminCard.tsx                 # Card style admin
├── DataTable.tsx                 # Table avec tri/filtre
├── ExportButton.tsx              # Bouton export CSV
├── StatsWidget.tsx               # Widget statistiques
├── SearchBar.tsx                 # Barre de recherche
└── StatusBadge.tsx               # Badge statut (pending/confirmed)

/lib/admin/
├── auth.ts                       # Logique authentification
├── permissions.ts                # Gestion permissions (future)
└── exports.ts                    # Logique export CSV/Excel
```

---

## 🏗️ Phase 1: Module Inscriptions (Priorité Actuelle)

### 1.1 Authentification Admin

**Approche Simple (démarrage):**
- Variable d'environnement `ADMIN_PASSWORD` dans `.env.local`
- Cookie de session après login
- Middleware Next.js pour protéger les routes `/admin/*`

**Route:** `/admin/login`

```typescript
// /app/admin/login/page.tsx
// Formulaire simple: mot de passe → cookie → redirect /admin
```

**Upgrade Path (futur):**
- NextAuth.js avec email/password
- Rôles (admin, editor, viewer)
- Multi-utilisateurs

### 1.2 Layout Admin Global

**Composant:** `/app/admin/layout.tsx`

**Features:**
- Sidebar navigation (collapsible sur mobile)
- Header avec logo + bouton logout
- Breadcrumbs
- Theme sombre/clair (optionnel)

```tsx
<AdminLayout>
  <AdminNav />
  <main>
    {children} // Page content (inscriptions, etc.)
  </main>
</AdminLayout>
```

### 1.3 Dashboard Overview

**Route:** `/admin` (page d'accueil admin)

**Contenu:**
- 📊 Stats cards: Total inscriptions, Places restantes, Taux remplissage
- 📈 Graphique: Inscriptions par jour
- 🔔 Notifications récentes
- 🔗 Quick links vers modules

**Exemple:**
```
┌─────────────────────────────────────────────────────┐
│ 🏠 Dashboard Admin - Transcendence Work             │
├─────────────────────────────────────────────────────┤
│                                                      │
│  📊 Stats Globales                                   │
│  ┌─────────────┬─────────────┬─────────────┐        │
│  │ 23          │ 37          │ 62%         │        │
│  │ Inscriptions│ Places      │ Taux        │        │
│  │             │ Restantes   │ Remplissage │        │
│  └─────────────┴─────────────┴─────────────┘        │
│                                                      │
│  📅 Dernières Inscriptions (7 jours)                │
│  [Graphique en barres]                               │
│                                                      │
│  🔗 Accès Rapide                                     │
│  [Inscriptions] [Éditions] [Statistiques]           │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### 1.4 Page Inscriptions

**Route:** `/admin/inscriptions`

**Features:**
- 📋 Table avec toutes les inscriptions
- 🔍 Recherche (nom, email)
- 🎯 Filtres:
  - Par édition (dropdown)
  - Par statut (pending/confirmed/cancelled)
  - Par date d'inscription (range picker)
- 📥 Export CSV (toutes ou filtrées)
- ↕️ Tri par colonnes (nom, date, statut)
- 📄 Pagination (20 par page)

**Colonnes Table:**
| Nom | Email | Téléphone | Sessions | Statut | Date | Actions |
|-----|-------|-----------|----------|--------|------|---------|
| Sami Test | sami@... | +212... | 3/3 ✓ | Confirmé | 13/01/26 | [Voir] [Modifier] |

**Actions par ligne:**
- 👁️ Voir détails
- ✏️ Modifier statut
- 📧 Renvoyer confirmation
- 🗑️ Supprimer (avec confirmation)

### 1.5 Page Détail Inscription

**Route:** `/admin/inscriptions/[id]`

**Contenu:**
```
┌─────────────────────────────────────────────────────┐
│ ← Retour aux inscriptions                           │
│                                                      │
│ Inscription #758b3e55                               │
│ Status: [Confirmé ▼]  [Sauvegarder]                │
│                                                      │
│ 👤 Informations Participant                         │
│ Nom: Sami Test                                      │
│ Email: sami@example.com                             │
│ Téléphone: +212612345678                            │
│ WhatsApp: +212612345678                             │
│ Consent: ✓ Oui                                      │
│                                                      │
│ 📅 Dates Sélectionnées                              │
│ Session 1: Vendredi 13 février, 19:00              │
│ Session 2: Samedi 21 février, 11:00                │
│ Session 3: Dimanche 1 mars, 11:00                  │
│                                                      │
│ 💬 Message du Participant                           │
│ "Test inscription avec vraies données"              │
│                                                      │
│ 📊 Métadonnées                                      │
│ Créé le: 13/01/2026 à 14:23                        │
│ Dernière modification: 13/01/2026 à 14:23          │
│                                                      │
│ 🛠️ Actions                                          │
│ [📧 Renvoyer Email] [🗑️ Supprimer]                 │
└─────────────────────────────────────────────────────┘
```

### 1.6 Export CSV

**Endpoint:** `GET /admin/inscriptions/export`

**Format CSV:**
```csv
Date Inscription,Nom,Prénom,Email,Téléphone,WhatsApp,Statut,Session 1,Session 2,Session 3,Message
13/01/2026,Test,Sami,sami@example.com,+212612345678,+212612345678,confirmed,Ven 13/02 19h,Sam 21/02 11h,Dim 01/03 11h,"Test inscription"
```

**Options:**
- Export toutes les inscriptions
- Export avec filtres actifs
- Format: CSV (Phase 1), Excel (Phase 2)

---

## 🎨 Design System Admin

### Palette Couleurs

**Mode Clair (par défaut):**
- Background: `#F9FAFB` (gray-50)
- Cards: `#FFFFFF`
- Primary: `#E0904D` (golden-orange) - Cohérent avec le site
- Text: `#111827` (gray-900)
- Border: `#E5E7EB` (gray-200)

**Mode Sombre (optionnel Phase 2):**
- Background: `#111827` (gray-900)
- Cards: `#1F2937` (gray-800)
- Primary: `#FB923C` (orange-400)
- Text: `#F9FAFB` (gray-50)
- Border: `#374151` (gray-700)

### Composants Réutilisables

**AdminCard:**
```tsx
<AdminCard title="Inscriptions Récentes" icon={UserIcon}>
  <DataTable data={inscriptions} />
</AdminCard>
```

**DataTable:**
- Tri par colonne
- Pagination
- Recherche inline
- Actions par ligne
- Responsive (scroll horizontal mobile)

**StatsWidget:**
```tsx
<StatsWidget
  title="Total Inscriptions"
  value={23}
  change={+5}
  changeType="increase"
  icon={UserGroupIcon}
/>
```

---

## 🔐 Sécurité & Permissions

### Phase 1: Authentification Simple

```bash
# .env.local
ADMIN_PASSWORD=votre_mot_de_passe_securise
ADMIN_SESSION_SECRET=random_secret_key_32_chars
```

**Middleware:** `/middleware.ts`
```typescript
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const session = request.cookies.get('admin-session');
    if (!session || !verifySession(session)) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
}
```

### Phase 2: Permissions Avancées (Future)

**Rôles:**
- `admin`: Accès complet
- `editor`: Gestion contenu + inscriptions
- `viewer`: Lecture seule

**Table Supabase:**
```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'viewer',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 📊 Modules Futurs (Phases 2-5)

### Phase 2: Gestion des Éditions

**Route:** `/admin/editions`

**Features:**
- Créer nouvelle édition (programme, dates, capacité)
- Modifier éditions existantes
- Activer/désactiver éditions
- Dupliquer édition (template)
- Vue calendrier des sessions

**Impact:** Permet de gérer les programmes sans toucher Supabase directement.

### Phase 3: Envoi d'Emails Groupés

**Route:** `/admin/emails`

**Features:**
- Templates d'emails prédéfinis
- Composer email custom
- Envoyer à tous les inscrits d'une édition
- Envoyer rappels automatiques (48h avant session)
- Historique emails envoyés

**Intégration:** Resend API

### Phase 4: Gestion du Contenu

**Route:** `/admin/contenu`

**Features:**
- Gérer témoignages (créer/modifier/supprimer)
- Gérer articles blog
- Preview avant publication
- Upload images

**Intégration:** Sanity CMS (déjà configuré)

### Phase 5: Analytics Avancés

**Route:** `/admin/statistiques`

**Features:**
- Graphiques inscriptions dans le temps
- Taux de conversion (visiteurs → inscrits)
- Sources de trafic
- Heatmaps dates populaires
- Export rapports PDF

**Intégration:** Vercel Analytics + données Supabase

---

## 🛠️ Stack Technique

### Frontend
- **Framework:** Next.js 16 App Router (déjà en place)
- **UI Components:** Headless UI ou shadcn/ui (pour composants admin)
- **Icons:** Heroicons (cohérent avec le site)
- **Charts:** Recharts ou Chart.js (pour graphiques)
- **Tables:** TanStack Table (tri/filtre/pagination)

### Backend
- **Database:** Supabase PostgreSQL (déjà configuré)
- **Auth:** Cookies + middleware Next.js (Phase 1)
- **API Routes:** Next.js App Router route handlers
- **Emails:** Resend (déjà configuré)

### Styling
- **CSS:** Tailwind CSS 4 (déjà en place)
- **Theme:** Cohérent avec le site principal
- **Responsive:** Mobile-first

---

## 📅 Plan d'Implémentation Phase 1

### Étape 1: Fondations (2-3h)

**Fichiers à créer:**
```
/app/admin/
  layout.tsx              # Layout avec auth check
  page.tsx                # Dashboard overview
  login/
    page.tsx              # Page login simple

/components/admin/
  AdminLayout.tsx         # Layout structure
  AdminNav.tsx            # Sidebar navigation
  AdminCard.tsx           # Card component

/lib/admin/
  auth.ts                 # Auth logic (verify password, session)

/middleware.ts            # Protect /admin routes
```

**Tâches:**
1. Créer structure dossiers `/admin`
2. Implémenter authentification simple (password + cookie)
3. Créer AdminLayout avec sidebar
4. Créer page dashboard overview basique
5. Ajouter middleware protection routes

### Étape 2: Module Inscriptions (3-4h)

**Fichiers à créer:**
```
/app/admin/inscriptions/
  page.tsx                # Liste inscriptions
  [id]/
    page.tsx              # Détail inscription
  export/
    route.ts              # API export CSV

/components/admin/
  DataTable.tsx           # Table réutilisable
  SearchBar.tsx           # Barre recherche
  StatusBadge.tsx         # Badge statut
  ExportButton.tsx        # Bouton export

/lib/admin/
  exports.ts              # Logic CSV export
  queries.ts              # Supabase queries réutilisables
```

**Tâches:**
1. Créer page liste inscriptions avec DataTable
2. Implémenter recherche + filtres (édition, statut, date)
3. Ajouter pagination (20 par page)
4. Créer page détail inscription
5. Implémenter export CSV
6. Ajouter actions (modifier statut, supprimer)

### Étape 3: Dashboard Overview (1-2h)

**Features:**
- Stats cards (total inscriptions, places restantes, taux)
- Liste dernières inscriptions (5 dernières)
- Quick links vers modules

### Étape 4: Tests & Polish (1h)

- Tester tous les filtres
- Vérifier responsive mobile
- Tester export CSV avec données réelles
- Vérifier sécurité (routes protégées)
- Polish UI/UX

**Total Phase 1:** 7-10 heures de développement

---

## 🔄 Évolutivité & Maintenance

### Principes d'Architecture

**1. Modularité:**
- Chaque module (inscriptions, éditions, etc.) est indépendant
- Composants admin réutilisables (`/components/admin`)
- Logique métier centralisée (`/lib/admin`)

**2. Separation of Concerns:**
- Frontend (React components) séparé de la logique
- API routes pour opérations sensibles
- Middleware pour auth centralisée

**3. Extensibilité:**
- Facile d'ajouter nouveaux modules (copier structure `inscriptions`)
- Navigation auto-générée depuis config
- Permissions préparées pour futur

**4. Performance:**
- Pagination obligatoire (pas de chargement 1000+ lignes)
- Caching des stats (Vercel KV ou React Query)
- Lazy loading des modules

### Configuration Centralisée

**Fichier:** `/lib/admin/config.ts`

```typescript
export const adminConfig = {
  modules: [
    {
      id: 'inscriptions',
      name: 'Inscriptions',
      icon: UserGroupIcon,
      href: '/admin/inscriptions',
      enabled: true,
    },
    {
      id: 'editions',
      name: 'Éditions',
      icon: CalendarIcon,
      href: '/admin/editions',
      enabled: false, // Phase 2
    },
    // ... autres modules
  ],
  pagination: {
    defaultPageSize: 20,
    pageSizeOptions: [10, 20, 50, 100],
  },
  exports: {
    maxRows: 10000,
    formats: ['csv', 'excel'], // excel Phase 2
  },
};
```

**Avantage:** Un seul endroit pour activer/désactiver modules.

---

## 🎯 Success Metrics Phase 1

### Objectifs Mesurables

1. **Performance:**
   - Page liste inscriptions charge en < 1s
   - Export CSV 100 inscriptions en < 2s

2. **UX:**
   - Admin peut trouver une inscription en < 10s (avec recherche)
   - Export CSV en 2 clics maximum
   - Responsive fonctionnel sur mobile

3. **Sécurité:**
   - Routes `/admin/*` 100% protégées
   - Session expire après 24h inactivité
   - Password haché (bcrypt ou argon2)

4. **Fiabilité:**
   - Zero erreurs sur opérations CRUD inscriptions
   - Export CSV toujours valide (pas de corruption)

---

## 💰 Coût & Ressources

### Phase 1 (Module Inscriptions)

**Coût Monétaire:** $0
- Utilise infrastructure existante (Vercel + Supabase)
- Pas de services tiers supplémentaires

**Coût Temps:** 7-10 heures développement

**Ressources Nécessaires:**
- Accès Supabase (déjà configuré)
- Variables d'environnement Vercel (déjà configuré)

### Phases Futures (Estimations)

- **Phase 2 (Éditions):** 6-8h
- **Phase 3 (Emails):** 4-6h
- **Phase 4 (Contenu):** 5-7h
- **Phase 5 (Analytics):** 8-10h

**Total estimé (toutes phases):** 30-40h

---

## 🚀 Prochaines Étapes

### Décision Requise

1. **Valider l'architecture proposée** - Structure dossiers, composants, modules
2. **Confirmer priorités Phase 1** - Dashboard overview + Module inscriptions
3. **Choisir UI library** - shadcn/ui (recommandé) vs Headless UI vs custom
4. **Définir mot de passe admin** - Pour l'auth simple Phase 1

### Implémentation

Une fois validé, je peux commencer l'implémentation:
1. **Étape 1:** Fondations (layout + auth) - 2-3h
2. **Étape 2:** Module inscriptions - 3-4h
3. **Étape 3:** Dashboard overview - 1-2h
4. **Étape 4:** Tests & polish - 1h

**Prêt à démarrer quand tu veux!** 🎯

---

## 📝 Notes Additionnelles

### Considérations Techniques

**Authentication:**
- Phase 1: Password unique partagé (simple)
- Phase 2: Multi-users avec NextAuth.js
- Pas de JWT (cookies httpOnly plus sécurisé)

**Rate Limiting:**
- Implémenter rate limiting sur API routes (Upstash Redis)
- Protéger contre brute force sur login

**Logging:**
- Logger toutes actions admin (qui a fait quoi quand)
- Table `admin_logs` dans Supabase

**Backup:**
- Export automatique hebdomadaire des inscriptions (S3 ou Vercel Blob)

### Questions Ouvertes

1. **UI Library:** Préfères-tu shadcn/ui (composants copiés) ou Headless UI (hooks) ?
2. **Mode Sombre:** Prioritaire Phase 1 ou Phase 2 ?
3. **Notifications:** Email notifications pour nouvelles inscriptions admin ?
4. **Mobile App:** Besoin d'une app mobile admin future (React Native) ?

---

**Prêt pour validation et implémentation!** 🚀
