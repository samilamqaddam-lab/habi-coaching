# Notion Structure - Transcendence Work

Documentation de l'architecture Notion pour la gestion du site web.

## Vue d'ensemble

L'espace Notion "Transcendence Work (HABI)" est dédié à la gestion et au développement du site web transcendencework.com.

**Objectifs :**
- Centraliser la planification du développement
- Assurer la traçabilité complète des changements
- Documenter chaque page et section du site
- Faciliter la collaboration entre équipe technique et contenu

---

## Architecture

```
Transcendence Work (HABI)
└── 🌐 Site Web
    ├── 📊 Planification & Suivi
    │   ├── 🎯 Thèmes Stratégiques
    │   ├── 🔄 Changements à Implémenter
    │   ├── 💬 Observations & Feedback
    │   └── 📝 Contenus à Réviser
    │
    ├── 📄 Documentation Pages
    │   ├── 🏠 Homepage (/)
    │   ├── 💼 Coaching (/coaching)
    │   ├── 🧘 Yoga (/programmes)
    │   ├── 🏢 Organisations (/organisations)
    │   ├── 📞 Contact (/contact)
    │   ├── 📚 Ressources (/ressources)
    │   └── 🎓 Expertise (/expertise)
    │
    └── 📚 Guides & Références
        ├── 📑 Sections de Pages - Référence
        ├── 📋 Guide Workflow
        └── 📋 Guide Création Vues
```

---

## Système de Planification

### Philosophie

**Calendar-based, pas Sprint-based :**
- Planification par deadlines plutôt que par cycles de sprints
- Plus simple et flexible pour une petite équipe
- Organisation stratégique via les Thèmes

### Flux de travail

```
💬 Observation
   ↓ (décision d'agir)
🔄 Changement
   ↓ (implémentation)
📝 Contenu (si applicable)
   ↓ (validation)
✅ Livraison
```

### Traçabilité complète

Chaque élément peut être tracé de l'idée initiale jusqu'à la livraison :
- **Origine** : D'où vient la demande (Observation liée)
- **Thème** : Catégorie stratégique (SEO, UX, Performance, etc.)
- **Deadline** : Date de livraison prévue
- **Statut** : État actuel dans le pipeline

---

## Bases de données

### 🎯 Thèmes Stratégiques

Organisation du travail par catégories business/techniques.

| Propriété | Type | Description |
|-----------|------|-------------|
| Nom | Title | Nom du thème |
| Icône | Text | Emoji représentatif |
| Priorité | Select | 🔴 Critique, 🟠 Haute, 🟡 Moyenne, 🟢 Basse |
| Statut | Select | Actif, En pause, Archivé |
| Objectif | Text | But stratégique |
| KPIs | Text | Métriques de succès |
| Owner | Text | Responsable |
| Description | Text | Détails |

**8 Thèmes définis :**
1. SEO & Référencement
2. UX & Conversion
3. Performance Web
4. Qualité Contenu
5. Nouvelles Features
6. Stabilité & Bugs
7. Dette Technique
8. Internationalisation

### 🔄 Changements à Implémenter

Backlog principal pour tous les changements (features, bugs, design, content).

| Propriété | Type | Description |
|-----------|------|-------------|
| Nom | Title | Description courte du changement |
| Page | Select | Page concernée (une seule) |
| Type | Select | Feature, Bug, Design, Content, Refactor |
| Priorité | Select | 🔴 Urgent, 🟠 Haute, 🟡 Moyenne, 🟢 Basse |
| Statut | Select | 📋 Backlog, 🚀 En cours, ⏸️ En attente, ✅ Terminé |
| Complexité | Select | Simple, Moyen, Complexe |
| Description | Text | Détails complets |
| Assigné | Text | Responsable |
| Deadline | Date | Date de livraison |
| Section | Relation | → Sections de Pages |
| Thème | Relation | → Thèmes Stratégiques |
| Origine | Relation | → Observations (source de la demande) |
| Contenus Liés | Relation | → Contenus à Réviser |

**Total : 13 propriétés**

### 💬 Observations & Feedback

Espace pour idées, suggestions, questions avant de créer des changements.

| Propriété | Type | Description |
|-----------|------|-------------|
| Nom | Title | Titre de l'observation |
| Page | Select | Page concernée |
| Type | Select | 💡 Idée, 🐛 Bug, ❓ Question, 📝 Feedback |
| Priorité | Select | Niveau d'importance |
| Statut | Select | 📝 Nouveau, 👀 En revue, ✅ Traité, ❌ Rejeté |
| Description | Text | Détails |
| Auteur | Text | Qui a soumis |
| Section | Relation | → Sections de Pages |
| Changements Créés | Relation | → Changements (actions décidées) |
| Thème Suggéré | Relation | → Thèmes Stratégiques |

**Total : 10 propriétés**

### 📝 Contenus à Réviser

Pipeline de révision du contenu (FR uniquement - EN automatique).

| Propriété | Type | Description |
|-----------|------|-------------|
| Nom | Title | Identification du contenu |
| Page | Select | Page concernée |
| Type | Select | Texte, Image, Vidéo, Meta |
| Contenu FR actuel | Text | Contenu existant |
| Proposition FR | Text | Nouveau contenu proposé |
| Raison | Text | Justification du changement |
| Statut | Select | 📝 Proposé, 👀 En revue, ✅ Approuvé, 🚀 Publié |
| Priorité | Select | Niveau d'importance |
| Assigné | Text | Responsable |
| Section | Relation | → Sections de Pages |
| Thème | Relation | → Thèmes Stratégiques |
| Deadline | Date | Date de publication |
| Changements Liés | Relation | → Changements |

**Total : 13 propriétés**

### 📑 Sections de Pages - Référence

Liste de référence des 42 sections du site.

| Propriété | Type | Description |
|-----------|------|-------------|
| Name | Title | "PageName - SectionName" |
| Page | Select | Page parente |
| Type | Select | Hero, Section Contenu, CTA |
| Ancre ID | Text | ID HTML (#section-id) |
| Description | Text | Description de la section |

**Convention de nommage :** Toutes les sections préfixées par le nom de page pour filtrage rapide.
- Exemple : "Yoga - Lignée Sadhguru", "Homepage - Qui suis-je?"

---

## Vues recommandées

### Pour 🔄 Changements à Implémenter

| Vue | Type | Configuration |
|-----|------|---------------|
| 📅 Calendrier Deadlines | Calendar | By: Deadline, Filter: Statut ≠ Terminé |
| 🗓️ Roadmap | Timeline | By: Deadline, Group: Thème |
| 📥 Backlog par Thème | Board | Group: Thème, Sort: Priorité desc |
| 🎯 Cette Semaine | Table | Filter: Deadline = This week |
| 📊 Ce Mois | Table | Filter: Deadline = This month, Group: Thème |

### Pour 📝 Contenus à Réviser

| Vue | Type | Configuration |
|-----|------|---------------|
| 📅 Calendrier Contenus | Calendar | By: Deadline |
| 📥 Par Thème | Board | Group: Thème |
| 🎯 À Réviser Cette Semaine | Table | Filter: Deadline = This week |

---

## Workflow équipe

### Contenu (non-technique)

1. **Observer** : Ajouter une entrée dans 💬 Observations
2. **Attendre** : L'équipe technique revoit et décide
3. **Proposer** : Si contenu, ajouter dans 📝 Contenus à Réviser
4. **Valider** : Statut passe à "Approuvé"
5. **Publier** : Équipe technique implémente

### Technique (développeurs)

1. **Trier** : Revoir les Observations, créer des Changements
2. **Planifier** : Assigner Thème, Deadline, Priorité
3. **Implémenter** : Statut "En cours"
4. **Livrer** : Push, update Notion, Statut "Terminé"

### Règles importantes

- **FR uniquement** : L'équipe ne propose que du contenu français
- **EN automatique** : La traduction anglaise est gérée par le système
- **Une page par entrée** : Toujours sélectionner UNE seule page
- **Thème obligatoire** : Tout changement doit avoir un thème stratégique

---

## Liens Notion

| Page | URL |
|------|-----|
| 🌐 Site Web | https://www.notion.so/2dd80303b08a8185a57cfe4ae7562fd2 |
| 📊 Planification & Suivi | https://www.notion.so/2dd80303b08a81bdbcc3f9881563d9f3 |
| 📄 Documentation Pages | https://www.notion.so/2dd80303b08a811bbd65f8d6d3df0d64 |
| 📚 Guides & Références | https://www.notion.so/2dd80303b08a81a188e9e147b398f971 |
| 🎯 Thèmes Stratégiques | https://www.notion.so/4d9202c510b14be8863f2d87df26acb7 |
| 🔄 Changements | https://www.notion.so/23c59d19991b4b19918974f87ecaa1ca |
| 💬 Observations | https://www.notion.so/984490df7bae4830a503ad43b857c518 |
| 📝 Contenus | https://www.notion.so/4c4ce18317394b4ca2817029f7418154 |

---

## Historique

| Date | Changement |
|------|------------|
| 2026-01-03 | Création architecture Thèmes Stratégiques |
| 2026-01-03 | Ajout relations traçabilité (Origine, Contenus Liés, etc.) |
| 2026-01-03 | Simplification : suppression Sprints → Calendar-based |
| 2026-01-03 | Réorganisation hiérarchique sous 🌐 Site Web |
| 2026-01-03 | Création Guide Création Vues |

---

## Maintenance

### Mises à jour régulières

- **Après chaque déploiement** : Mettre à jour les statuts dans Changements
- **Hebdomadaire** : Revoir les Observations non traitées
- **Mensuel** : Archiver les éléments terminés, revoir les priorités

### Synchronisation avec le code

Le fichier `CLAUDE.md` à la racine du projet contient également une section Notion qui doit rester synchronisée avec cette documentation.
