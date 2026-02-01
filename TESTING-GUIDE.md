# Guide de Test - Hub Ressources

## ✅ Build Réussi

Le projet compile sans erreurs TypeScript !

## 🗄️ Étape 1 : Exécuter les Migrations Supabase

**IMPORTANT** : Les migrations doivent être exécutées **AVANT** de tester l'application.

### Option A : Dashboard Supabase (Recommandé)

1. Aller sur **Supabase Dashboard** :
   ```
   https://supabase.com/dashboard/project/serlmuwwebjqxpwnybko/sql/new
   ```

2. **Copier-coller et exécuter** chaque migration **dans l'ordre** :

   **Migration 1** : Tags (avec seed de 16 tags)
   ```bash
   # Copier le contenu de :
   supabase/migrations/20260131_create_tags_table.sql
   ```

   **Migration 2** : Articles
   ```bash
   # Copier le contenu de :
   supabase/migrations/20260131_create_articles_table.sql
   ```

   **Migration 3** : Resources
   ```bash
   # Copier le contenu de :
   supabase/migrations/20260131_create_resources_table.sql
   ```

3. **Vérifier** que les tables existent :
   ```sql
   SELECT tablename FROM pg_tables
   WHERE schemaname = 'public'
   AND tablename IN ('tags', 'articles', 'resources');
   ```

   **Résultat attendu** : 3 lignes (tags, articles, resources)

4. **Vérifier les tags seed** :
   ```sql
   SELECT id, label, parent_id, category FROM tags ORDER BY parent_id NULLS FIRST, display_order;
   ```

   **Résultat attendu** : 16 lignes
   - 4 main tags (yoga, coaching-organisations, event-recap, news)
   - 12 sub-tags

## 🚀 Étape 2 : Lancer le Serveur de Développement

```bash
npm run dev
```

Le serveur démarre sur **http://localhost:3000**

## 🧪 Étape 3 : Tests Manuels

### Test 1 : Page Ressources (Nouveau Hub)

**URL** : http://localhost:3000/ressources

**Vérifications** :
- ✅ Hero s'affiche (split layout avec image)
- ✅ Section "Dernières Publications" (vide = OK, table articles vide)
- ✅ Section "Événements & Programmes Passés" (vide = OK, aucun événement passé)
- ✅ Section "Vidéos & Contenus Éducatifs" :
  - Sidebar filtres visible (tags hiérarchiques)
  - Message "Aucune ressource pour le moment" (normal, table vide)
- ✅ Section "Tous les Articles" (vide = OK)
- ✅ Section "Guides Gratuits" (affiche 3 guides depuis translations)
- ✅ Section "Newsletter" (formulaire visible)

### Test 2 : Admin Articles

**URL** : http://localhost:3000/admin/articles

**Login** :
- Password : `Enth0usi@st` (depuis .env.local)

**Vérifications** :
- ✅ Stats cards affichent 0/0/0/0
- ✅ Bouton "Nouvel Article" visible
- ✅ Message "Aucun article trouvé"

**Créer un article de test** :

1. Cliquer "Nouvel Article"
2. Remplir :
   - Titre (FR) : "Test Article Yoga"
   - Slug : (auto-généré) "test-article-yoga"
   - Extrait (FR) : "Ceci est un test d'article sur le yoga."
   - Tags : Sélectionner "Yoga" et "Upa Yoga"
   - Featured Image URL : `https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800`
   - ✅ Cocher "Publier l'article"
   - ✅ Cocher "Mettre en vedette"
3. Cliquer "Créer l'article"

**Résultat attendu** :
- Redirection vers `/admin/articles`
- Article visible dans la table
- Stats updated (1 total, 1 publié, 1 vedette)

### Test 3 : Admin Resources (Vidéo YouTube)

**URL** : http://localhost:3000/admin/resources

**Créer une ressource vidéo** :

1. Cliquer "Nouvelle Ressource"
2. Sélectionner type : **Vidéo YouTube** 🎥
3. Remplir :
   - Titre (FR) : "Introduction Upa Yoga"
   - URL YouTube : `https://www.youtube.com/watch?v=dQw4w9WgXcQ` (exemple)
   - Description (FR) : "Vidéo d'introduction au Upa Yoga"
   - Tags : Sélectionner "Yoga" et "Upa Yoga"
   - Durée : 15 (minutes)
   - ✅ Cocher "Mettre en vedette"
4. Cliquer "Créer la ressource"

**Résultat attendu** :
- Redirection vers `/admin/resources`
- Ressource visible avec thumbnail YouTube auto-extraite
- Type affiché : 🎥 Vidéo
- Tags visibles

### Test 4 : Vérifier Page Ressources avec Données

**URL** : http://localhost:3000/ressources

**Résultat attendu** :
- Section "Dernières Publications" : 1 article visible (featured)
- Section "Vidéos & Contenus Éducatifs" : 1 vidéo visible
  - Cliquer sur un tag dans le filtre
  - Vidéo filtrée correctement
  - Cliquer sur Play ▶️
  - YouTube player s'affiche

### Test 5 : Tag Filtering

Dans section "Vidéos & Contenus Éducatifs" :

1. Ouvrir sidebar filtres
2. Cliquer sur "Yoga" (main tag)
   - Sub-tags s'affichent (upa-yoga, surya-kriya, etc.)
3. Cocher "Upa Yoga"
   - Vidéo filtrée (si tag correspond)
4. Cliquer "Réinitialiser"
   - Toutes vidéos réaffichées

## 🐛 Problèmes Courants

### Migration Failed

**Symptôme** : Erreur SQL lors de l'exécution
**Solution** :
- Vérifier que les migrations sont exécutées **dans l'ordre**
- Vérifier qu'elles n'ont pas déjà été exécutées (tables déjà existantes)
- Si besoin, drop tables et recommencer :
  ```sql
  DROP TABLE IF EXISTS resources CASCADE;
  DROP TABLE IF EXISTS articles CASCADE;
  DROP TABLE IF EXISTS tags CASCADE;
  ```

### Tags Not Loading

**Symptôme** : Filtres vides ou erreur console
**Solution** :
- Vérifier que migration `create_tags_table.sql` a bien exécuté le seed
- Check console browser pour erreurs API
- Vérifier `/api/tags` retourne bien 16 tags

### YouTube Thumbnail Not Showing

**Symptôme** : Thumbnail manquante pour vidéo
**Solution** :
- Vérifier que l'URL YouTube est valide
- L'API extrait automatiquement `video_id` et génère thumbnail URL
- Si vidéo privée, thumbnail pourrait ne pas être accessible

## 📊 Résumé Attendu Après Tests

Après avoir créé 1 article et 1 vidéo :

**`/ressources`** :
- ✅ 1 article featured dans "Dernières Publications"
- ✅ 1 vidéo YouTube dans "Vidéos & Contenus Éducatifs"
- ✅ Filtres tags fonctionnent
- ✅ YouTube player embed au clic

**`/admin/articles`** :
- ✅ 1 article dans liste
- ✅ Stats : 1/1/0/1
- ✅ Modification/Suppression fonctionnent

**`/admin/resources`** :
- ✅ 1 ressource dans liste
- ✅ Stats : 1/1/0/1
- ✅ Thumbnail YouTube visible
- ✅ Modification/Suppression fonctionnent

## 🎯 Next Steps

Une fois les tests validés :

1. **Seed plus de données** (optionnel)
   - Ajouter 3-4 articles variés
   - Ajouter 5-6 vidéos YouTube réelles
   - Tester filtres avec plus de données

2. **Deploy sur Vercel**
   ```bash
   git add .
   git commit -m "feat: complete resources hub with admin interface"
   git push
   ```

3. **Migration Sanity** (optionnel)
   - Déconnecter articles de Sanity
   - Voir tâche #11

## 🆘 Support

En cas de problème, vérifier :
- Console browser (F12) pour erreurs JS
- Terminal serveur pour erreurs API
- Supabase Dashboard > Logs pour erreurs DB
