/**
 * Create Hero sections for all pages in Sanity
 * Run with: SANITY_API_TOKEN=xxx node scripts/create-hero-sections.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'czmpe9zr',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Hero sections content from fr.json translations
const heroSections = [
  {
    _type: 'heroSection',
    page: 'home',
    title: 'Croissance Consciente',
    titleEn: 'Conscious Growth',
    titleLine2: '& Transformation',
    titleLine2En: '& Transformation',
    titleSuffix: '— Individus & Organisations',
    titleSuffixEn: '— Individuals & Organizations',
    description: 'Coach certifiée et professeure de Hatha Yoga classique, j\'accompagne individus et organisations vers l\'excellence et l\'équilibre intérieur.',
    descriptionEn: 'Certified coach and classical Hatha Yoga teacher, I guide individuals and organizations toward excellence and inner balance.',
    primaryCTA: {
      text: 'Découvrir mes services',
      textEn: 'Discover my services',
      href: '#services',
    },
    secondaryCTA: {
      text: 'Me contacter',
      textEn: 'Contact me',
      href: '/contact',
    },
    theme: 'default',
    layout: 'centered',
    displayMode: 'minimal',
  },
  {
    _type: 'heroSection',
    page: 'programmes',
    title: 'Yoga Traditionnel',
    titleEn: 'Traditional Yoga',
    subtitle: 'Hatha Yoga Classique par Sadhguru',
    subtitleEn: 'Classical Hatha Yoga by Sadhguru',
    description: 'Découvrez le Hatha Yoga dans sa forme la plus pure, transmis par la lignée de Sadhguru et Isha Foundation. Des pratiques ancestrales pour transformer votre vie.',
    descriptionEn: 'Discover Hatha Yoga in its purest form, transmitted through the lineage of Sadhguru and Isha Foundation. Ancient practices to transform your life.',
    primaryCTA: {
      text: 'Voir les programmes',
      textEn: 'View programs',
      href: '#programmes',
    },
    secondaryCTA: {
      text: 'Prendre rendez-vous',
      textEn: 'Book appointment',
      href: '/contact',
    },
    theme: 'yoga',
    layout: 'split',
    displayMode: 'compact',
  },
  {
    _type: 'heroSection',
    page: 'coaching',
    title: 'Coaching Holistique',
    titleEn: 'Holistic Coaching',
    subtitle: 'Accompagnement personnalisé',
    subtitleEn: 'Personalized guidance',
    description: 'Un accompagnement sur mesure pour révéler votre plein potentiel. Coaching individuel, professionnel et de vie, avec une approche intégrative alliant corps et esprit.',
    descriptionEn: 'Tailored guidance to reveal your full potential. Individual, professional, and life coaching with an integrative approach combining body and mind.',
    primaryCTA: {
      text: 'Découvrir le coaching',
      textEn: 'Discover coaching',
      href: '#services',
    },
    secondaryCTA: {
      text: 'Réserver une séance',
      textEn: 'Book a session',
      href: '/contact',
    },
    theme: 'coaching',
    layout: 'split',
    displayMode: 'compact',
  },
  {
    _type: 'heroSection',
    page: 'organisations',
    title: 'Solutions Entreprise',
    titleEn: 'Corporate Solutions',
    subtitle: 'Accompagnement sur mesure',
    subtitleEn: 'Tailored support',
    description: 'Des programmes adaptés aux besoins de votre organisation : coaching d\'équipe, ateliers bien-être, formations leadership et accompagnement du changement.',
    descriptionEn: 'Programs adapted to your organization\'s needs: team coaching, wellness workshops, leadership training, and change management support.',
    primaryCTA: {
      text: 'Nos solutions',
      textEn: 'Our solutions',
      href: '#services',
    },
    secondaryCTA: {
      text: 'Demander un devis',
      textEn: 'Request a quote',
      href: '/contact',
    },
    theme: 'corporate',
    layout: 'split',
    displayMode: 'compact',
  },
  {
    _type: 'heroSection',
    page: 'ressources',
    title: 'Ressources',
    titleEn: 'Resources',
    subtitle: 'Articles & Guides',
    subtitleEn: 'Articles & Guides',
    description: 'Explorez nos articles, guides pratiques et ressources pour approfondir votre pratique et votre développement personnel.',
    descriptionEn: 'Explore our articles, practical guides and resources to deepen your practice and personal development.',
    primaryCTA: {
      text: 'Voir les articles',
      textEn: 'View articles',
      href: '#articles',
    },
    theme: 'default',
    layout: 'split',
    displayMode: 'compact',
  },
  {
    _type: 'heroSection',
    page: 'contact',
    title: 'Contact',
    titleEn: 'Contact',
    subtitle: 'Échangeons ensemble',
    subtitleEn: 'Let\'s connect',
    description: 'Une question, un projet ? Je suis à votre écoute pour discuter de vos besoins et vous accompagner dans votre parcours.',
    descriptionEn: 'A question or a project? I\'m here to discuss your needs and support you on your journey.',
    primaryCTA: {
      text: 'Envoyer un message',
      textEn: 'Send a message',
      href: '#contact-form',
    },
    theme: 'default',
    layout: 'split',
    displayMode: 'compact',
  },
  {
    _type: 'heroSection',
    page: 'expertise',
    title: 'Mon Expertise',
    titleEn: 'My Expertise',
    subtitle: 'Parcours & Certifications',
    subtitleEn: 'Journey & Certifications',
    description: 'Près de 20 ans d\'expérience corporate, certifiée Coach & Team® avec accréditation EMCC, et professeure de Hatha Yoga classique formée par Isha Foundation.',
    descriptionEn: 'Nearly 20 years of corporate experience, Coach & Team® certified with EMCC accreditation, and classical Hatha Yoga teacher trained by Isha Foundation.',
    primaryCTA: {
      text: 'Voir mes certifications',
      textEn: 'View my certifications',
      href: '#certifications',
    },
    theme: 'default',
    layout: 'split',
    displayMode: 'compact',
  },
]

async function createHeroSections() {
  console.log('🚀 Creating Hero sections in Sanity...\n')

  for (const hero of heroSections) {
    try {
      // Check if hero for this page already exists
      const existing = await client.fetch(
        `*[_type == "heroSection" && page == $page][0]`,
        { page: hero.page }
      )

      if (existing) {
        console.log(`   ⏭️  Hero for "${hero.page}" already exists, skipping`)
        continue
      }

      const result = await client.create(hero)
      console.log(`   ✅ Created Hero for: ${hero.page}`)
    } catch (error) {
      console.log(`   ❌ Error creating Hero for ${hero.page}: ${error.message}`)
    }
  }

  console.log('\n✨ Hero sections creation complete!')
}

createHeroSections().catch(console.error)
