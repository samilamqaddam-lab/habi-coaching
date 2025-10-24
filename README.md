# HABI - Plateforme de Coaching & Yoga

Site web professionnel pour Hajar Habi, experte en coaching organisationnel et pratiques yogiques traditionnelles.

## 🎨 Design & Identité

### Palette de Couleurs Marocaine
- **Ocre du désert** : `#C89F6F` - Chaleur et authenticité
- **Beige des dunes** : `#F5EFE7` - Douceur et respiration
- **Terre cuite** : `#C67B5C` - Énergie et action
- **Vert sauge** : `#9DAE8D` - Sérénité et équilibre
- **Bleu marocain** : `#2C4B5E` - Profondeur et conscience

### Typographie
- **Titres** : Playfair Display - Élégance et tradition
- **Texte** : Inter - Clarté et modernité

## 🌐 Structure du Site

### Pages Principales
1. **Accueil** (`/`) - Présentation et double offre (organisations/individuels)
2. **Pour les Organisations** (`/organisations`) - Services B2B avec formulaire de devis
3. **Programmes** (`/programmes`) - Retraites et formations avec système de réservation
4. **Coaching** (`/coaching`) - Accompagnement individuel personnalisé
5. **Yoga** (`/yoga`) - Cours réguliers et pratiques traditionnelles
6. **Ressources** (`/ressources`) - Articles, guides gratuits et témoignages
7. **Contact** (`/contact`) - Formulaire de contact et FAQ

## 🚀 Démarrage Rapide

### Installation
```bash
npm install
```

### Développement
```bash
npm run dev
```
Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Build Production
```bash
npm run build
npm start
```

## 🛠 Technologies

- **Framework** : Next.js 16 (App Router)
- **Styling** : Tailwind CSS v4
- **Language** : TypeScript
- **Fonts** : Google Fonts (Playfair Display, Inter)
- **Icons** : Heroicons (SVG)

## 📁 Architecture

```
/app
  ├── page.tsx              # Page d'accueil
  ├── layout.tsx            # Layout global avec Header/Footer
  ├── organisations/        # Page organisations
  ├── programmes/          # Page programmes et retraites
  ├── coaching/            # Page coaching individuel
  ├── yoga/                # Page pratiques yogiques
  ├── ressources/          # Page ressources et blog
  └── contact/             # Page contact

/components
  ├── layout/
  │   ├── Header.tsx       # Navigation principale
  │   └── Footer.tsx       # Footer avec liens
  ├── sections/
  │   ├── Hero.tsx         # Sections hero
  │   └── Section.tsx      # Sections réutilisables
  └── ui/
      ├── Button.tsx       # Boutons stylisés
      ├── Card.tsx         # Cartes de contenu
      ├── Container.tsx    # Container responsive
      └── FormInput.tsx    # Champs de formulaire
```

## 🎯 Fonctionnalités Clés

### Pour les Visiteurs
- ✅ Navigation intuitive et fluide
- ✅ Design responsive (mobile-first)
- ✅ Formulaires de contact et réservation
- ✅ Découverte des programmes disponibles
- ✅ Ressources gratuites à télécharger

### Design
- ✅ Palette marocaine authentique
- ✅ Transitions douces et naturelles
- ✅ Espaces généreux pour la respiration visuelle
- ✅ Typographie hiérarchisée

## 📝 Prochaines Étapes

### Phase 2 - Fonctionnalités Avancées
- [ ] Système de réservation en ligne (Calendly, etc.)
- [ ] Blog dynamique avec CMS
- [ ] Galerie photos des retraites
- [ ] Newsletter automatisée
- [ ] Paiement en ligne (Stripe)

## 📄 License

Propriété de Hajar Habi - Tous droits réservés.

---

Développé avec ❤️ pour créer un espace digital qui respire authenticité et transformation.
