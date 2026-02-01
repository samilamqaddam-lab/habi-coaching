# 🚀 Quick Start - Test du Hub Ressources

## ✅ Status Actuel

- ✅ **Build réussi** (pas d'erreurs TypeScript)
- ✅ **Serveur lancé** sur http://localhost:3000
- ⏸️ **Migrations Supabase** à exécuter (prérequis)

---

## 🔥 Démarrage Rapide (3 étapes)

### 1️⃣ Exécuter les Migrations Supabase (5 min)

**Ouvrir** : https://supabase.com/dashboard/project/serlmuwwebjqxpwnybko/sql/new

**Copier-coller et exécuter dans l'ordre** :

<details>
<summary>📄 Migration 1 : Tags (cliquer pour voir)</summary>

```bash
# Copier le contenu complet de :
supabase/migrations/20260131_create_tags_table.sql
```

Cliquer **Run** dans Supabase SQL Editor
</details>

<details>
<summary>📄 Migration 2 : Articles (cliquer pour voir)</summary>

```bash
# Copier le contenu complet de :
supabase/migrations/20260131_create_articles_table.sql
```

Cliquer **Run**
</details>

<details>
<summary>📄 Migration 3 : Resources (cliquer pour voir)</summary>

```bash
# Copier le contenu complet de :
supabase/migrations/20260131_create_resources_table.sql
```

Cliquer **Run**
</details>

**✅ Vérifier** que les tables existent :
```sql
SELECT tablename FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('tags', 'articles', 'resources');
```
Résultat attendu : **3 lignes**

---

### 2️⃣ Tester la Page Ressources (2 min)

**Ouvrir** : http://localhost:3000/ressources

**Vérifier** :
- ✅ Page charge sans erreur
- ✅ 7 sections visibles :
  1. Hero (image + texte)
  2. Actualités (vide = normal)
  3. Événements Passés (vide = normal)
  4. Vidéos avec sidebar filtres (vide = normal)
  5. Archive Articles (vide = normal)
  6. Guides Gratuits (3 cartes)
  7. Newsletter (formulaire)

---

### 3️⃣ Créer du Contenu via Admin (10 min)

#### A. Créer un Article

1. **Ouvrir** : http://localhost:3000/admin/articles
2. **Login** : Password = `Enth0usi@st`
3. **Cliquer** "Nouvel Article"
4. **Remplir** :
   ```
   Titre (FR)    : Introduction au Hatha Yoga
   Slug          : (auto) introduction-au-hatha-yoga
   Extrait (FR)  : Découvrez les bienfaits du Hatha Yoga classique
   Tags          : ☑️ Yoga, ☑️ Upa Yoga
   Featured Img  : https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800
   ☑️ Publier    : Coché
   ☑️ Vedette    : Coché
   ```
5. **Cliquer** "Créer l'article"

#### B. Créer une Ressource Vidéo

1. **Ouvrir** : http://localhost:3000/admin/resources
2. **Cliquer** "Nouvelle Ressource"
3. **Sélectionner** : 🎥 Vidéo YouTube
4. **Remplir** :
   ```
   Titre (FR)    : Pratique Upa Yoga - 15 min
   URL YouTube   : https://www.youtube.com/watch?v=dQw4w9WgXcQ
   Description   : Session courte de Upa Yoga pour débutants
   Tags          : ☑️ Yoga, ☑️ Upa Yoga
   Durée         : 15 (minutes)
   ☑️ Vedette    : Coché
   ```
5. **Cliquer** "Créer la ressource"

---

### 4️⃣ Vérifier le Résultat (2 min)

**Retourner** : http://localhost:3000/ressources

**Résultat attendu** :
- ✅ **Section Actualités** : 1 article visible avec tags
- ✅ **Section Vidéos** : 1 vidéo YouTube visible
  - Thumbnail auto-générée
  - Tags affichés
  - Cliquer ▶️ → Player YouTube s'affiche

**Tester les filtres** :
1. Dans section Vidéos, ouvrir sidebar filtres
2. Cliquer "Yoga" → Sub-tags apparaissent
3. Cocher "Upa Yoga" → Vidéo reste visible (tag match)
4. Cliquer "Réinitialiser" → Tout réapparaît

---

## 🎯 Test Complet Réussi Si...

- ✅ Page /ressources charge sans erreur
- ✅ Admin peut créer article (apparaît dans liste)
- ✅ Admin peut créer vidéo YouTube (thumbnail auto)
- ✅ Article featured apparaît dans section Actualités
- ✅ Vidéo apparaît dans section Vidéos & Contenus
- ✅ Filtres tags fonctionnent (multi-select)
- ✅ YouTube player embed fonctionne (click-to-play)

---

## 📚 Documentation Complète

- **Tests détaillés** : `TESTING-GUIDE.md`
- **Récapitulatif technique** : `IMPLEMENTATION-SUMMARY.md`
- **Migrations SQL** : `supabase/migrations/README.md`

---

## 🐛 Problème ?

**La page ne charge pas** :
- Vérifier que serveur tourne : http://localhost:3000
- Check console browser (F12) pour erreurs

**Filtres vides** :
- Vérifier migration tags exécutée : `SELECT COUNT(*) FROM tags;` → devrait retourner 16

**Thumbnail YouTube manquante** :
- Normal si vidéo privée
- Utiliser vidéo publique ou unlisted

---

## 🚀 Prochaine Étape : Deploy

Une fois les tests validés localement :

```bash
git add .
git commit -m "feat: complete resources hub with admin interface"
git push
```

Vercel déploiera automatiquement ! 🎉

---

**Temps total estimé** : ~20 minutes (migrations + tests + création contenu)
