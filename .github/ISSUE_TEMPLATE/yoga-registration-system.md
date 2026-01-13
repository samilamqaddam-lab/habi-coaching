---
name: Système d'Inscription Multi-Sessions Yoga
about: Feature complète - Système d'inscription dynamique pour cours collectifs
title: "[FEATURE] Système d'inscription multi-sessions pour programmes de yoga"
labels: enhancement, backend, frontend, database
assignees: ''
---

# 🧘 Système d'Inscription Multi-Sessions pour Yoga

**Statut:** ✅ **Implémenté** (13 janvier 2026)
**Documentation:** [`/docs/YOGA-REGISTRATION-SYSTEM.md`](/docs/YOGA-REGISTRATION-SYSTEM.md)

---

## 📋 Objectif

Remplacer le système d'inscription statique actuel par un système dynamique permettant:
- Inscription à des éditions de programmes (ex: Upa Yoga - Janvier 2026)
- 3 sessions par édition, chacune avec 2 options de dates
- Participants choisissent 1 date par session (3 choix total)
- Limite de 10 personnes par date
- Affichage places restantes en temps réel
- Blocage automatique des dates complètes

---

## ✅ Plan d'Implémentation

### Phase 1: Infrastructure Backend

- [x] **Créer projet Supabase**
  - [x] Projet créé: `serlmuwwebjqxpwnybko`
  - [x] URL: `https://serlmuwwebjqxpwnybko.supabase.co`

- [x] **Migration SQL - Base de données**
  - [x] Table `programme_editions` (éditions de programmes)
  - [x] Table `edition_sessions` (3 sessions par édition)
  - [x] Table `session_date_options` (2 dates par session)
  - [x] Table `registrations` (inscriptions participants)
  - [x] Table `registration_date_choices` (liaison N-N)
  - [x] Vue `date_availability` (calcul temps réel disponibilité)
  - [x] RLS policies (public read, write-only registrations)
  - [x] Indexes pour performance

- [x] **Client Supabase**
  - [x] Fichier `/lib/supabase.ts`
  - [x] TypeScript interfaces pour toutes les tables
  - [x] Helpers: `fetchEditionDetails()`, `registerForEdition()`

### Phase 2: API Routes (Backend)

- [x] **GET `/api/programmes/[editionId]`**
  - [x] Récupère détails édition avec sessions et dates
  - [x] Supporte lookup par UUID ou `programme_key`
  - [x] Inclut disponibilité (join avec vue `date_availability`)

- [x] **GET `/api/programmes/[editionId]/availability`**
  - [x] Retourne disponibilité temps réel pour toutes dates
  - [x] Format: `{ [dateOptionId]: { current, max, remaining, is_full } }`

- [x] **POST `/api/programmes/[editionId]/register`**
  - [x] Validation Zod des données formulaire
  - [x] Vérification capacité avant création
  - [x] Création registration + date_choices en transaction
  - [x] Envoi email confirmation (Resend)
  - [x] Envoi email notification admin

### Phase 3: Composants Frontend

- [x] **SessionDatePicker**
  - [x] Fichier `/components/programmes/SessionDatePicker.tsx`
  - [x] Affichage 3 sessions × 2 dates
  - [x] Radio buttons pour sélection
  - [x] Badges disponibilité ("X places" / "COMPLET")
  - [x] Disable dates complètes
  - [x] Auto-refresh toutes les 30s

- [x] **UpaYogaEditionCard**
  - [x] Fichier `/components/programmes/UpaYogaEditionCard.tsx`
  - [x] Card affichant prochaine édition
  - [x] Fetch data depuis API
  - [x] Bouton "S'inscrire à cette édition"

- [x] **EditionRegistrationForm**
  - [x] Fichier `/components/forms/EditionRegistrationForm.tsx`
  - [x] Formulaire complet (nom, email, phone, whatsapp, RGPD)
  - [x] Intégration SessionDatePicker
  - [x] Validation côté client
  - [x] Gestion états (loading, success, error)
  - [x] Soumission API

- [x] **EditionRegistrationModal**
  - [x] Fichier `/components/forms/EditionRegistrationModal.tsx`
  - [x] Modal wrapper pour formulaire
  - [x] Prevent body scroll

- [x] **UI Updates**
  - [x] `FormInput.tsx` - Ajout prop `error` pour messages validation
  - [x] Export nouveaux composants dans `/components/forms/index.ts`

### Phase 4: Intégration Page /programmes

- [x] **ProgrammesContent.tsx**
  - [x] Import `UpaYogaEditionCard` et `EditionRegistrationModal`
  - [x] Ajout card dans section "Cours collectifs"
  - [x] Gestion état modal (`isRegistrationModalOpen`)
  - [x] Wiring bouton → modal

### Phase 5: Configuration & Déploiement

- [x] **Variables d'environnement**
  - [x] Ajout dans `.env.local`:
    - `NEXT_PUBLIC_SUPABASE_URL`
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] **TODO:** Ajout dans Vercel (via Web UI)

- [x] **Données d'exemple**
  - [x] Édition "Upa Yoga - Janvier 2026"
  - [x] 3 sessions avec dates (25-26 janv, 1-2 fév, 8-9 fév)
  - [x] Capacité 10 personnes par date

### Phase 6: Tests & Validation

- [ ] **Tests manuels**
  - [ ] Affichage carte édition sur `/programmes`
  - [ ] Ouverture modal inscription
  - [ ] Affichage disponibilité initiale (10 places)
  - [ ] Sélection multi-dates (1 par session)
  - [ ] Validation formulaire
  - [ ] Soumission réussie
  - [ ] Réception email admin
  - [ ] Réception email participant
  - [ ] Décompte places après inscription
  - [ ] Blocage date à 10 inscriptions
  - [ ] Erreur si tentative inscription date complète
  - [ ] Auto-refresh disponibilité (30s)

- [ ] **Test de capacité (scénario complet)**
  - [ ] Créer 10 inscriptions pour date "25 janv. 10h"
  - [ ] Vérifier badge "COMPLET"
  - [ ] Vérifier date disabled
  - [ ] Tenter 11ème inscription → erreur "Date complète"
  - [ ] Vérifier autres dates toujours disponibles

### Phase 7: Documentation

- [x] **Documentation technique**
  - [x] Fichier `/docs/YOGA-REGISTRATION-SYSTEM.md`
  - [x] Architecture système
  - [x] Schéma base de données
  - [x] API endpoints
  - [x] Flow utilisateur
  - [x] Guide maintenance
  - [x] Troubleshooting

- [x] **GitHub Issue**
  - [x] Checklist implémentation (ce fichier)
  - [x] Template `.github/ISSUE_TEMPLATE/`

---

## 🗂️ Fichiers Créés

### Backend
- `lib/supabase.ts` ✅
- `app/api/programmes/[editionId]/route.ts` ✅
- `app/api/programmes/[editionId]/availability/route.ts` ✅
- `app/api/programmes/[editionId]/register/route.ts` ✅

### Frontend
- `components/programmes/SessionDatePicker.tsx` ✅
- `components/programmes/UpaYogaEditionCard.tsx` ✅
- `components/forms/EditionRegistrationForm.tsx` ✅
- `components/forms/EditionRegistrationModal.tsx` ✅

### Database
- `scripts/supabase-migrations/001_create_yoga_registration_tables.sql` ✅

### Documentation
- `docs/YOGA-REGISTRATION-SYSTEM.md` ✅
- `.github/ISSUE_TEMPLATE/yoga-registration-system.md` ✅

### Updates
- `components/forms/index.ts` ✅
- `components/ui/FormInput.tsx` ✅
- `app/programmes/ProgrammesContent.tsx` ✅
- `.env.local` ✅

---

## 📊 Métriques de Succès

- ✅ Build Next.js compile sans erreurs
- ✅ Migration SQL appliquée avec succès
- ✅ 5 tables + 1 vue créées dans Supabase
- ✅ Données exemple insérées (1 édition, 3 sessions, 6 dates)
- ⏳ Page `/programmes` affiche carte édition
- ⏳ Inscription complète fonctionne
- ⏳ Emails envoyés (admin + participant)
- ⏳ Disponibilité se met à jour en temps réel
- ⏳ Dates se bloquent à capacité max

---

## 🚀 Prochaines Étapes (Post-MVP)

### Améliorations UX
- [ ] Notifications push (places libérées)
- [ ] Liste d'attente automatique
- [ ] Paiement en ligne (Stripe)
- [ ] Export CSV inscriptions
- [ ] Calendrier interactif

### Admin Dashboard
- [ ] Interface admin custom
- [ ] Gestion éditions via UI (pas SQL)
- [ ] Stats temps réel (taux remplissage)

### Extensibilité
- [ ] Support Surya Kriya
- [ ] Support Surya Shakti
- [ ] Support Angamardana
- [ ] Support Yogasanas

---

## 🔗 Références

- **Documentation complète:** [`/docs/YOGA-REGISTRATION-SYSTEM.md`](/docs/YOGA-REGISTRATION-SYSTEM.md)
- **Supabase Project:** https://supabase.com/dashboard/project/serlmuwwebjqxpwnybko
- **Dev Server:** http://localhost:3002/programmes

---

## 📝 Notes

**Implémentation:** 13 janvier 2026
**Développeur:** Claude (Sonnet 4.5) + Sami
**Timeline:** 2-4 semaines (estimé initialement) → **1 session** (réalisé)
**Status:** ✅ Implémentation terminée, en attente tests E2E
