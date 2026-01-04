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

  // Expertise Section
  expertiseSection: {
    subtitle: 'Mon Expertise',
    subtitleEn: 'My Expertise',
    title: 'Un parcours unique au service de votre transformation',
    titleEn: 'A unique journey to serve your transformation',
    description: 'Trois domaines d\'excellence complémentaires pour un accompagnement holistique.',
    descriptionEn: 'Three complementary areas of excellence for holistic support.',
    cards: [
      {
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
        title: 'Coach Certifiée',
        titleEn: 'Certified Coach',
        highlight: 'Coach & Team® EMCC',
        highlightEn: 'Coach & Team® EMCC',
        description: 'Accompagnement individuel et collectif avec certification européenne reconnue.',
        descriptionEn: 'Individual and team coaching with recognized European certification.',
        icon: 'coaching',
        color: 'mystic-mauve',
      },
      {
        title: 'Yoga Traditionnel',
        titleEn: 'Traditional Yoga',
        highlight: 'Isha Foundation',
        highlightEn: 'Isha Foundation',
        description: 'Professeure de Hatha Yoga classique formée par Sadhguru (1750h).',
        descriptionEn: 'Classical Hatha Yoga teacher trained by Sadhguru (1750h).',
        icon: 'yoga',
        color: 'golden-orange',
      },
    ],
  },

  // About Section
  aboutSection: {
    badge: 'Mon Parcours',
    badgeEn: 'My Journey',
    title: 'Qui suis-je ?',
    titleEn: 'Who am I?',
    description: 'Près de 20 ans d\'expérience corporate, certifiée Coach & Team® et professeure de Hatha Yoga classique. Découvrez mon parcours et mes qualifications complètes.',
    descriptionEn: 'Nearly 20 years of corporate experience, certified Coach & Team® and classical Hatha Yoga teacher. Discover my complete journey and qualifications.',
    ctaText: 'Découvrir mon parcours',
    ctaTextEn: 'Discover my journey',
  },

  // Services Section
  servicesSection: {
    subtitle: 'Mes Services',
    subtitleEn: 'My Services',
    title: 'Des solutions adaptées à vos besoins',
    titleEn: 'Solutions adapted to your needs',
    services: [
      {
        title: 'Pour les Organisations',
        titleEn: 'For Organizations',
        description: 'Transformation culturelle, développement du leadership et bien-être au travail. Des programmes sur mesure pour vos équipes.',
        descriptionEn: 'Cultural transformation, leadership development and workplace wellness. Customized programs for your teams.',
        ctaText: 'En savoir plus',
        ctaTextEn: 'Learn more',
        link: '/organisations',
        icon: 'organisations',
        color: 'morocco-blue',
      },
      {
        title: 'Coaching Individuel',
        titleEn: 'Individual Coaching',
        description: 'Accompagnement personnalisé pour clarifier vos objectifs, surmonter les obstacles et libérer votre potentiel.',
        descriptionEn: 'Personalized support to clarify your goals, overcome obstacles and unleash your potential.',
        ctaText: 'Découvrir',
        ctaTextEn: 'Discover',
        link: '/coaching',
        icon: 'coaching',
        color: 'mystic-mauve',
      },
      {
        title: 'Yoga & Programmes',
        titleEn: 'Yoga & Programs',
        description: 'Hatha Yoga classique, retraites et ateliers pour approfondir votre pratique et transformer votre énergie.',
        descriptionEn: 'Classical Hatha Yoga, retreats and workshops to deepen your practice and transform your energy.',
        ctaText: 'Voir les programmes',
        ctaTextEn: 'View programs',
        link: '/programmes',
        icon: 'yoga',
        color: 'golden-orange',
      },
    ],
  },

  // CTA Section
  ctaSection: {
    title: 'Prêt·e à commencer votre transformation ?',
    titleEn: 'Ready to start your transformation?',
    description: 'Que vous cherchiez un accompagnement pour vous-même ou votre organisation, je suis là pour vous guider.',
    descriptionEn: 'Whether you are looking for support for yourself or your organization, I am here to guide you.',
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
    console.log('🏠 Migration du contenu de la homepage vers Sanity...')

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
    console.log('  - Section Expertise: 3 cartes')
    console.log('  - Section À propos: 1 section')
    console.log('  - Section Services: 3 services')
    console.log('  - Section CTA: 1 CTA finale')
    console.log('\n✨ Migration terminée!')
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error)
    process.exit(1)
  }
}

migrateHomepage()
