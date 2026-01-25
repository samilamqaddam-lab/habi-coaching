# Instructions Configuration Google - Phase 1 Indexation

## ✅ Étapes Techniques Automatiques (Terminées)

- ✅ **robots.txt** - Existe et configuré correctement
- ✅ **sitemap.xml** - Généré dynamiquement via `/app/sitemap.ts`
- ✅ URLs incluses dans sitemap:
  - Pages principales (/, /yoga, /coaching, /organisations)
  - Programmes yoga dédiés (upa-yoga, surya-kriya, etc.)
  - Pages légales
  - Articles blog (Sanity)
  - Événements actifs (Supabase)

**Vérifier sitemap:** https://transcendencework.com/sitemap.xml

---

## 📋 Étapes Manuelles Requises (Votre Action)

### 1. Google Search Console (30 minutes)

#### A. Créer le compte
1. Aller sur: https://search.google.com/search-console
2. Se connecter avec compte Google (utilisez hajar@transcendencework.com si possible)
3. Cliquer sur "Ajouter une propriété"

#### B. Choisir le type de propriété
**Option recommandée:** Propriété de domaine (nécessite vérification DNS)
- Domaine: `transcendencework.com`
- Avantage: Couvre tous les sous-domaines et protocoles (http/https)

**Option alternative:** Préfixe d'URL (plus facile)
- URL: `https://transcendencework.com`
- Avantage: Configuration plus rapide

#### C. Vérifier la propriété

**Méthode 1: DNS (Recommandée pour "Propriété de domaine")**
1. Google vous donnera un enregistrement TXT
2. Aller dans votre hébergeur DNS (où est géré transcendencework.com)
3. Ajouter l'enregistrement TXT fourni
4. Attendre quelques minutes
5. Cliquer sur "Vérifier" dans Google Search Console

**Méthode 2: Balise HTML (Pour "Préfixe d'URL")**
1. Google vous donnera une balise meta
2. **Je peux l'ajouter automatiquement** - envoyez-moi la balise
3. Format: `<meta name="google-site-verification" content="VOTRE_CODE" />`

**Méthode 3: Vercel (Plus simple si domaine sur Vercel)**
1. Si domaine géré via Vercel, utilisez la méthode DNS via dashboard Vercel
2. Project Settings → Domains → Add TXT record

#### D. Soumettre le sitemap
1. Une fois vérifié, aller dans "Sitemaps" (menu gauche)
2. Ajouter: `https://transcendencework.com/sitemap.xml`
3. Cliquer sur "Envoyer"

#### E. Demander l'indexation
1. Aller dans "Inspection d'URL" (menu gauche)
2. Entrer chaque URL critique:
   - `https://transcendencework.com/`
   - `https://transcendencework.com/yoga`
   - `https://transcendencework.com/coaching`
   - `https://transcendencework.com/organisations`
3. Cliquer sur "Demander une indexation" pour chaque page

**Résultat attendu:** Indexation sous 24-48h

---

### 2. Google My Business (1 heure)

#### A. Créer le profil
1. Aller sur: https://business.google.com
2. Se connecter avec compte Google
3. Cliquer sur "Gérer maintenant"

#### B. Informations entreprise

**Nom de l'entreprise:**
```
Transcendence Work - Hajar Habi
```

**Catégorie principale:**
```
Professeur de yoga
```

**Catégories supplémentaires:**
```
- Coach professionnel
- Service de coaching
- Service de bien-être
```

**Adresse:**
```
Studio Shido Mind
36 B boulevard d'Anfa, 5ème étage, Appartement 54
Casablanca 20000
Maroc
```

**Zone de service:**
```
- Casablanca
- Rabat
- Grand Casablanca
- Maroc (services en ligne)
```

**Téléphone:**
```
+212 663 096 857
```

**Site web:**
```
https://transcendencework.com
```

**WhatsApp Business (optionnel):**
```
+212 663 096 857
```

#### C. Horaires

**Suggéré:**
```
Lundi - Vendredi: 09:00 - 18:00
Samedi: 10:00 - 14:00
Dimanche: Fermé
```

**OU**
```
Sur rendez-vous uniquement
```

#### D. Description (160 caractères max)

**Option 1:**
```
Coaching holistique & Hatha Yoga Classique à Casablanca. Coach certifiée Transformance Pro & Sadhguru Gurukulam. ≃20 ans expérience corporate.
```

**Option 2:**
```
Coach professionnel & professeure de yoga à Casablanca. Accompagnement individuel et entreprises. Formation certifiée internationale.
```

#### E. Photos à ajouter

**Depuis `/public/images/Reel/`:**
1. Photo profil: `Hajar.jpg` (portrait Hajar)
2. Photo couverture: `IMG_4078.jpeg` (lieu de retraite)
3. Photos services:
   - Photos de sessions yoga (si disponibles)
   - Espace de travail/studio

**Formats:**
- Photo de profil: Carré, 720x720 minimum
- Photo de couverture: 1080x608 minimum

#### F. Attributs à cocher
- ✅ Accessible aux personnes en fauteuil roulant (si applicable)
- ✅ Propose des cours en ligne
- ✅ Femmes entrepreneuses
- ✅ Rendez-vous obligatoire

#### G. Services à lister

**Yoga:**
- Upa Yoga
- Surya Kriya
- Angamardana
- Yogasanas
- Surya Shakti

**Coaching:**
- Coaching individuel
- Coaching professionnel
- Coaching d'équipe
- Accompagnement dirigeants

**Organisations:**
- Formation entreprise
- Team building
- Transformation organisationnelle

**Prix:** (optionnel, peut mettre "Variable" ou prix à partir de)

#### H. Vérification du profil

Google enverra une carte postale à l'adresse avec un code de vérification.
**Délai:** 5-14 jours

**Alternative:** Vérification par téléphone (parfois disponible)

#### I. Post inaugural (après vérification)

**Exemple:**
```
🧘‍♀️ Bienvenue chez Transcendence Work !

Coaching holistique & Hatha Yoga Classique à Casablanca.

✨ Coaching individuel et entreprises
🧘‍♀️ Programmes yoga traditionnels (certifiée Sadhguru Gurukulam)
💼 ≃20 ans expérience corporate & conseil

📍 Studio Shido Mind, Boulevard d'Anfa
📞 +212 663 096 857
🌐 transcendencework.com

#Casablanca #Yoga #Coaching #BienEtre #Maroc
```

---

### 3. Vérifications Post-Configuration

#### A. Tester les URLs
- [ ] https://transcendencework.com/robots.txt → doit afficher le fichier
- [ ] https://transcendencework.com/sitemap.xml → doit afficher XML avec toutes les URLs

#### B. Google Rich Results Test
1. Aller sur: https://search.google.com/test/rich-results
2. Tester ces URLs:
   - `https://transcendencework.com/`
   - `https://transcendencework.com/yoga`
   - `https://transcendencework.com/coaching`
3. Vérifier que les données structurées sont détectées

#### C. Monitoring (après 48h)
1. Google Search Console → "Couverture" → Vérifier pages indexées
2. Google Search Console → "Performances" → Suivre impressions/clics
3. Google My Business → Insights → Suivre vues/actions

---

## 📧 Si Besoin d'Aide Technique

**Pour ajouter la balise Google verification:**
Envoyez-moi le code fourni par Google, je l'ajouterai dans le layout.

**Format:**
```html
<meta name="google-site-verification" content="XXXXXXXXX" />
```

**Pour configurer DNS:**
Accès au dashboard de votre hébergeur DNS requis (OVH, Namecheap, Vercel, etc.)

---

## ✅ Checklist Phase 1

- [x] robots.txt créé ✅
- [x] sitemap.xml fonctionnel ✅
- [ ] Google Search Console configuré
- [ ] Sitemap soumis à GSC
- [ ] Pages principales indexées demandées
- [ ] Google My Business créé
- [ ] Photos ajoutées à GMB
- [ ] Profil GMB vérifié

**Une fois ces étapes terminées, le site sera indexable et visible sur Google Maps.**

---

## 🚀 Prochaine Étape

Après Phase 1 complétée → **Phase 2: Optimisation Metadata** (modifications code que je peux faire)
