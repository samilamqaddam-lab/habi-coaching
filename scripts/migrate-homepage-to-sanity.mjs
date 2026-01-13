/**
 * Script de migration du contenu Homepage vers Sanity
 *
 * Ce script crée/met à jour le document homepageContent avec tout le contenu
 * des sections de la page d'accueil.
 *
 * IMPORTANT:
 * - Tous les items d'array DOIVENT avoir une propriété _key unique
 * - Le contenu est lu DYNAMIQUEMENT depuis fr.json et en.json (source of truth)
 * - La section "about" n'est pas dans fr.json, elle est gérée manuellement
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Lire les fichiers de traduction (SOURCE OF TRUTH)
const frContent = JSON.parse(readFileSync(join(__dirname, '../locales/fr.json'), 'utf-8'))
const enContent = JSON.parse(readFileSync(join(__dirname, '../locales/en.json'), 'utf-8'))

const client = createClient({
  projectId: 'czmpe9zr',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Construire le contenu depuis les fichiers de traduction
const homepageContent = {
  _id: 'homepageContent',
  _type: 'homepageContent',

  // ============================================
  // SECTION EXPERTISE (depuis home.expertise)
  // Structure: home.expertise.corporate, .coaching, .yoga (pas .cards)
  // ============================================
  expertiseSection: {
    subtitle: frContent.home.expertise.subtitle,
    subtitleEn: enContent.home.expertise.subtitle,
    title: frContent.home.expertise.title,
    titleEn: enContent.home.expertise.title,
    description: frContent.home.expertise.description,
    descriptionEn: enContent.home.expertise.description,
    cards: [
      {
        _key: 'card-corporate',
        _type: 'expertiseCard',
        title: frContent.home.expertise.corporate.title,
        titleEn: enContent.home.expertise.corporate.title,
        highlight: frContent.home.expertise.corporate.years,
        highlightEn: enContent.home.expertise.corporate.years,
        description: frContent.home.expertise.corporate.description,
        descriptionEn: enContent.home.expertise.corporate.description,
        icon: 'corporate',
        color: 'morocco-blue',
      },
      {
        _key: 'card-coaching',
        _type: 'expertiseCard',
        title: frContent.home.expertise.coaching.title,
        titleEn: enContent.home.expertise.coaching.title,
        highlight: frContent.home.expertise.coaching.certification,
        highlightEn: enContent.home.expertise.coaching.certification,
        description: frContent.home.expertise.coaching.description,
        descriptionEn: enContent.home.expertise.coaching.description,
        icon: 'coaching',
        color: 'mystic-mauve',
      },
      {
        _key: 'card-yoga',
        _type: 'expertiseCard',
        title: frContent.home.expertise.yoga.title,
        titleEn: enContent.home.expertise.yoga.title,
        highlight: frContent.home.expertise.yoga.certification,
        highlightEn: enContent.home.expertise.yoga.certification,
        description: frContent.home.expertise.yoga.description,
        descriptionEn: enContent.home.expertise.yoga.description,
        icon: 'yoga',
        color: 'golden-orange',
      },
    ],
  },

  // ============================================
  // SECTION À PROPOS
  // Note: Cette section n'existe pas dans fr.json
  // Le contenu est géré directement dans Sanity Studio
  // ============================================
  aboutSection: {
    badge: 'Mon Parcours',
    badgeEn: 'My Journey',
    title: 'Qui suis-je ?',
    titleEn: 'Who am I?',
    description: "Près de 20 ans d'expérience dans des directions RH de grands groupes internationaux, certifiée Coach & Team® (EMCC) et professeure de Hatha Yoga classique formée par Sadhguru. Je mets cette triple expertise au service de votre transformation.",
    descriptionEn: 'Nearly 20 years of experience in HR management for major international groups, certified Coach & Team® (EMCC) and classical Hatha Yoga teacher trained by Sadhguru. I put this triple expertise at the service of your transformation.',
    ctaText: 'Découvrir mon parcours complet',
    ctaTextEn: 'Discover my full journey',
  },

  // ============================================
  // SECTION SERVICES (depuis home.services)
  // Structure: home.services.organisations, .coaching, .yoga avec .cta
  // ============================================
  servicesSection: {
    subtitle: frContent.home.services.subtitle,
    subtitleEn: enContent.home.services.subtitle,
    title: frContent.home.services.title,
    titleEn: enContent.home.services.title,
    services: [
      {
        _key: 'service-orgs',
        _type: 'serviceCard',
        title: frContent.home.services.organisations.title,
        titleEn: enContent.home.services.organisations.title,
        description: frContent.home.services.organisations.description,
        descriptionEn: enContent.home.services.organisations.description,
        ctaText: frContent.home.services.organisations.cta,
        ctaTextEn: enContent.home.services.organisations.cta,
        link: '/organisations',
        icon: 'organisations',
        color: 'morocco-blue',
      },
      {
        _key: 'service-coaching',
        _type: 'serviceCard',
        title: frContent.home.services.coaching.title,
        titleEn: enContent.home.services.coaching.title,
        description: frContent.home.services.coaching.description,
        descriptionEn: enContent.home.services.coaching.description,
        ctaText: frContent.home.services.coaching.cta,
        ctaTextEn: enContent.home.services.coaching.cta,
        link: '/coaching',
        icon: 'coaching',
        color: 'mystic-mauve',
      },
      {
        _key: 'service-yoga',
        _type: 'serviceCard',
        title: frContent.home.services.yoga.title,
        titleEn: enContent.home.services.yoga.title,
        description: frContent.home.services.yoga.description,
        descriptionEn: enContent.home.services.yoga.description,
        ctaText: frContent.home.services.yoga.cta,
        ctaTextEn: enContent.home.services.yoga.cta,
        link: '/programmes',
        icon: 'yoga',
        color: 'golden-orange',
      },
    ],
  },

  // ============================================
  // SECTION CTA (depuis home.cta)
  // Structure: home.cta.primaryCTA et secondaryCTA sont des strings
  // ============================================
  ctaSection: {
    title: frContent.home.cta.title,
    titleEn: enContent.home.cta.title,
    description: frContent.home.cta.description,
    descriptionEn: enContent.home.cta.description,
    primaryCTA: {
      text: frContent.home.cta.primaryCTA,
      textEn: enContent.home.cta.primaryCTA,
      link: '/contact',
    },
    secondaryCTA: {
      text: frContent.home.cta.secondaryCTA,
      textEn: enContent.home.cta.secondaryCTA,
      link: '/programmes',
    },
  },
}

async function migrateHomepage() {
  try {
    console.log('╔════════════════════════════════════════════════════════════╗')
    console.log('║       MIGRATION HOMEPAGE VERS SANITY                       ║')
    console.log('╚════════════════════════════════════════════════════════════╝\n')

    console.log('📖 Contenu lu dynamiquement depuis:')
    console.log('   - locales/fr.json (expertise, services, cta)')
    console.log('   - locales/en.json (traductions)')
    console.log('   - Section "about" gérée dans Sanity Studio\n')

    // Check if already exists
    const existing = await client.fetch('*[_id == "homepageContent"][0]')

    if (existing) {
      console.log('⚠️  Le contenu homepage existe déjà')
      console.log('🔄 Mise à jour du contenu...')
      await client.createOrReplace(homepageContent)
      console.log('✅ Contenu mis à jour avec succès')
    } else {
      console.log('📝 Création du contenu...')
      await client.create(homepageContent)
      console.log('✅ Contenu créé avec succès')
    }

    console.log('\n📊 Résumé:')
    console.log('  ┌─────────────────────────────────────────┐')
    console.log('  │ Section Expertise: 3 cartes            │')
    console.log('  │ Section À propos: ✓ (depuis Sanity)    │')
    console.log('  │ Section Services: 3 services           │')
    console.log('  │ Section CTA: 2 boutons                 │')
    console.log('  └─────────────────────────────────────────┘')
    console.log('\n✨ Migration terminée!')
    console.log('\n💡 Workflow recommandé:')
    console.log('   1. Modifier le contenu dans locales/fr.json')
    console.log('   2. Lancer: npm run migrate:homepage')
    console.log('   3. Le contenu Sanity est automatiquement synchronisé')
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error)
    process.exit(1)
  }
}

migrateHomepage()
