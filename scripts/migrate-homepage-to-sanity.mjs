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
    title: "L'alliance unique de trois mondes",
    titleEn: 'The unique alliance of three worlds',
    description: 'Un parcours atypique au croisement du monde corporate, du développement personnel et des pratiques ancestrales de transformation.',
    descriptionEn: 'An atypical journey at the crossroads of the corporate world, personal development and ancestral transformation practices.',
    cards: [
      {
        _key: 'card-corporate',
        _type: 'expertiseCard',
        title: 'Expérience Corporate',
        titleEn: 'Corporate Experience',
        highlight: '20+ ans',
        highlightEn: '20+ years',
        description: 'Direction RH et transformation organisationnelle dans des environnements internationaux complexes.',
        descriptionEn: 'HR management and organizational transformation in complex international environments.',
        icon: 'corporate',
        color: 'morocco-blue',
      },
      {
        _key: 'card-coaching',
        _type: 'expertiseCard',
        title: 'Coach Certifiée',
        titleEn: 'Certified Coach',
        highlight: 'Coach & Team® EMCC',
        highlightEn: 'Coach & Team® EMCC',
        description: 'Accompagnement individuel et collectif avec certification européenne reconnue (EMCC).',
        descriptionEn: 'Individual and team coaching with recognized European certification (EMCC).',
        icon: 'coaching',
        color: 'mystic-mauve',
      },
      {
        _key: 'card-yoga',
        _type: 'expertiseCard',
        title: 'Yoga Traditionnel',
        titleEn: 'Traditional Yoga',
        highlight: 'Isha Foundation',
        highlightEn: 'Isha Foundation',
        description: 'Professeure de Hatha Yoga classique formée par Sadhguru (1750h de formation intensive).',
        descriptionEn: 'Classical Hatha Yoga teacher trained by Sadhguru (1750h intensive training).',
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
    title: 'Des solutions sur mesure pour chaque besoin',
    titleEn: 'Tailored solutions for every need',
    services: [
      {
        _key: 'service-orgs',
        _type: 'serviceCard',
        title: 'Pour les Organisations',
        titleEn: 'For Organizations',
        description: 'Transformation culturelle, développement du leadership, cohésion d\'équipe et bien-être au travail. Des programmes sur mesure pour faire évoluer vos équipes et votre culture.',
        descriptionEn: 'Cultural transformation, leadership development, team cohesion and workplace wellness. Customized programs to evolve your teams and culture.',
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
        description: 'Accompagnement personnalisé pour clarifier vos objectifs, traverser des transitions, dépasser vos blocages et libérer votre plein potentiel.',
        descriptionEn: 'Personalized support to clarify your goals, navigate transitions, overcome blocks and unleash your full potential.',
        ctaText: 'En savoir plus',
        ctaTextEn: 'Learn more',
        link: '/coaching',
        icon: 'coaching',
        color: 'mystic-mauve',
      },
      {
        _key: 'service-yoga',
        _type: 'serviceCard',
        title: 'Yoga & Programmes',
        titleEn: 'Yoga & Programs',
        description: 'Hatha Yoga classique par Sadhguru, retraites et ateliers pour approfondir votre pratique, transformer votre énergie et révéler votre potentiel intérieur.',
        descriptionEn: 'Classical Hatha Yoga by Sadhguru, retreats and workshops to deepen your practice, transform your energy and reveal your inner potential.',
        ctaText: 'Voir les programmes',
        ctaTextEn: 'View programs',
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
    title: 'Prêt·e à commencer votre transformation ?',
    titleEn: 'Ready to start your transformation?',
    description: 'Que vous cherchiez un accompagnement pour vous-même ou pour votre organisation, je suis là pour vous guider vers une transformation durable et authentique.',
    descriptionEn: 'Whether you are looking for support for yourself or your organization, I am here to guide you towards a lasting and authentic transformation.',
    primaryCTA: {
      text: 'Prendre rendez-vous',
      textEn: 'Book an appointment',
      link: '/contact',
    },
    secondaryCTA: {
      text: 'Découvrir les programmes',
      textEn: 'Discover programs',
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
