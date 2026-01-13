/**
 * Script de migration du contenu Homepage vers Sanity
 *
 * Ce script crée/met à jour le document homepageContent avec tout le contenu
 * des sections de la page d'accueil.
 *
 * IMPORTANT: Tous les items d'array DOIVENT avoir une propriété _key unique
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'czmpe9zr',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const homepageContent = {
  _id: 'homepageContent',
  _type: 'homepageContent',

  // ============================================
  // SECTION EXPERTISE
  // ============================================
  expertiseSection: {
    subtitle: 'Mon Expertise',
    subtitleEn: 'My Expertise',
    title: "L'Alliance Unique de Trois Mondes",
    titleEn: 'The Unique Alliance of Three Worlds',
    description: 'Une approche rare qui allie excellence professionnelle, rigueur du coaching certifié et profondeur des pratiques yogiques traditionnelles.',
    descriptionEn: 'A rare approach that combines professional excellence, rigor of certified coaching, and depth of traditional yogic practices.',
    cards: [
      {
        _key: 'card-corporate',
        _type: 'expertiseCard',
        title: 'Expérience Corporate & Conseil',
        titleEn: 'Corporate & Consulting Experience',
        highlight: '≃20 ans',
        highlightEn: '≃20 years',
        description: 'Parcours en entreprises marocaines et internationales et en cabinets de conseil, au service de la transformation RH, managériale et organisationnelle dans des contextes multiculturels et exigeants.',
        descriptionEn: 'Career in Moroccan and international companies and consulting firms, serving HR, managerial and organizational transformation in multicultural and demanding contexts.',
        icon: 'corporate',
        color: 'morocco-blue',
      },
      {
        _key: 'card-coaching',
        _type: 'expertiseCard',
        title: 'Coaching Professionnel',
        titleEn: 'Professional Coaching',
        highlight: 'Coach & Team – Transformance Pro',
        highlightEn: 'Coach & Team – Transformance Pro',
        description: 'Certification professionnelle supervisée par Vincent Lenhardt, référence européenne du coaching, pour un accompagnement rigoureux des individus, des équipes et des organisations.',
        descriptionEn: 'Professional certification supervised by Vincent Lenhardt, European coaching reference, for rigorous support of individuals, teams and organizations.',
        icon: 'coaching',
        color: 'mystic-mauve',
      },
      {
        _key: 'card-yoga',
        _type: 'expertiseCard',
        title: 'Hatha Yoga Classique',
        titleEn: 'Classical Hatha Yoga',
        highlight: 'Sadhguru Gurukulam',
        highlightEn: 'Sadhguru Gurukulam',
        description: 'Formation approfondie (1750h) à des outils yogiques ancestraux et à des technologies de bien-être éprouvées, permettant d\'affiner la perception, de développer la stabilité intérieure et de soutenir des processus de transformation durables.',
        descriptionEn: 'In-depth training (1750h) in ancestral yogic tools and proven wellbeing technologies, enabling refined perception, inner stability development and support for lasting transformation processes.',
        icon: 'yoga',
        color: 'golden-orange',
      },
    ],
  },

  // ============================================
  // SECTION À PROPOS
  // ============================================
  aboutSection: {
    badge: 'Mon Parcours',
    badgeEn: 'My Journey',
    title: 'Qui suis-je ?',
    titleEn: 'Who am I?',
    description: 'Près de 20 ans d\'expérience dans des directions RH de grands groupes internationaux, certifiée Coach & Team® (EMCC) et professeure de Hatha Yoga classique formée par Sadhguru. Je mets cette triple expertise au service de votre transformation.',
    descriptionEn: 'Nearly 20 years of experience in HR management for major international groups, certified Coach & Team® (EMCC) and classical Hatha Yoga teacher trained by Sadhguru. I put this triple expertise at the service of your transformation.',
    ctaText: 'Découvrir mon parcours complet',
    ctaTextEn: 'Discover my full journey',
  },

  // ============================================
  // SECTION SERVICES
  // ============================================
  servicesSection: {
    subtitle: 'Mes Services',
    subtitleEn: 'My Services',
    title: 'Comment Je Peux Vous Accompagner',
    titleEn: 'How I Can Support You',
    services: [
      {
        _key: 'service-orgs',
        _type: 'serviceCard',
        title: 'Pour les Organisations',
        titleEn: 'For Organizations',
        description: 'Accompagnement des transformations culturelles et managériales, développement du leadership et conception de programmes sur mesure pour des organisations en évolution.',
        descriptionEn: 'Support for cultural and managerial transformations, leadership development and design of customized programs for evolving organizations.',
        ctaText: 'Découvrir',
        ctaTextEn: 'Discover',
        link: '/organisations',
        icon: 'organisations',
        color: 'morocco-blue',
      },
      {
        _key: 'service-coaching',
        _type: 'serviceCard',
        title: 'Coaching Individuel',
        titleEn: 'Individual Coaching',
        description: 'Accompagnement individuel pour clarifier vos objectifs professionnels, traverser des périodes de transition, dépasser les obstacles et renforcer votre posture.',
        descriptionEn: 'Individual support to clarify your professional goals, navigate transition periods, overcome obstacles and strengthen your posture.',
        ctaText: 'Découvrir',
        ctaTextEn: 'Discover',
        link: '/coaching',
        icon: 'coaching',
        color: 'mystic-mauve',
      },
      {
        _key: 'service-yoga',
        _type: 'serviceCard',
        title: 'Yoga Classique & Programmes',
        titleEn: 'Classical Yoga & Programs',
        description: 'Programmes de Hatha Yoga classique, avec des formats adaptés aux entreprises, pour affiner la perception, renforcer la stabilité intérieure et soutenir des transformations individuelles et collectives.',
        descriptionEn: 'Classical Hatha Yoga programs, with formats adapted to businesses, to refine perception, strengthen inner stability and support individual and collective transformations.',
        ctaText: 'Découvrir',
        ctaTextEn: 'Discover',
        link: '/programmes',
        icon: 'yoga',
        color: 'golden-orange',
      },
    ],
  },

  // ============================================
  // SECTION CTA
  // ============================================
  ctaSection: {
    title: 'Prêt·e à Commencer Votre Transformation ?',
    titleEn: 'Ready to Start Your Transformation?',
    description: 'Que ce soit pour accompagner votre organisation ou pour votre besoin personnel (Coaching ou Yoga), réservons un moment d\'échange pour explorer comment nous pouvons travailler ensemble.',
    descriptionEn: 'Whether to support your organization or for your personal needs (Coaching or Yoga), let\'s book a moment to explore how we can work together.',
    primaryCTA: {
      text: 'Me contacter',
      textEn: 'Contact me',
      link: '/contact',
    },
    secondaryCTA: {
      text: 'Voir les programmes',
      textEn: 'View programs',
      link: '/programmes',
    },
  },
}

async function migrateHomepage() {
  try {
    console.log('╔════════════════════════════════════════════════════════════╗')
    console.log('║       MIGRATION HOMEPAGE VERS SANITY                       ║')
    console.log('╚════════════════════════════════════════════════════════════╝\n')

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
    console.log('  │ Section À propos: ✓                    │')
    console.log('  │ Section Services: 3 services           │')
    console.log('  │ Section CTA: 2 boutons                 │')
    console.log('  └─────────────────────────────────────────┘')
    console.log('\n✨ Migration terminée!')
    console.log('\n💡 Note: Tous les items ont des _key uniques pour éviter')
    console.log('   l\'erreur "Missing keys" dans Sanity Studio.')
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error)
    process.exit(1)
  }
}

migrateHomepage()
