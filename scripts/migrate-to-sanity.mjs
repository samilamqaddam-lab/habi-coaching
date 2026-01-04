/**
 * Migration script: JSON content → Sanity CMS
 * Run with: node scripts/migrate-to-sanity.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'czmpe9zr',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// ============================================
// INSTRUCTOR (Hajar)
// ============================================
const instructor = {
  _type: 'instructor',
  _id: 'instructor-hajar',
  name: 'Hajar Habi',
  role: 'Coach Holistique & Professeure de Hatha Yoga',
  specialties: [
    'Coaching individuel',
    'Coaching d\'équipe',
    'Transformation organisationnelle',
    'Hatha Yoga Classique',
    'Méditation',
    'Leadership conscient'
  ],
  experience: 20,
  certifications: [
    {
      _type: 'object',
      _key: 'cert-1',
      title: 'Coach & Team',
      organization: 'Transformance Pro (EMCC)',
      year: 2024,
    },
    {
      _type: 'object',
      _key: 'cert-2',
      title: 'Classical Hatha Yoga Teacher',
      organization: 'Sadhguru Gurukulam - Isha Foundation',
      year: 2025,
    },
    {
      _type: 'object',
      _key: 'cert-3',
      title: 'Diplôme ENCG',
      organization: 'École Nationale de Commerce et de Gestion de Settat',
      year: 2007,
    },
  ],
}

// ============================================
// PROGRAMMES
// ============================================
const programmes = [
  // Regular Classes
  {
    _type: 'programme',
    _id: 'programme-hatha',
    title: 'Hatha Yoga Traditionnel',
    titleEn: 'Traditional Hatha Yoga',
    slug: { _type: 'slug', current: 'hatha-yoga-traditionnel' },
    type: 'class',
    category: 'yoga',
    description: 'Pratique classique du yoga avec un focus sur les asanas (postures), pranayama (respiration) et méditation. Pour tous niveaux.',
    descriptionEn: 'Classical yoga practice focusing on asanas (postures), pranayama (breathing) and meditation. All levels welcome.',
    schedule: 'Mardis & Jeudis 18h30',
    duration: '90 min',
    price: { amount: 20, currency: 'EUR', unit: 'session', note: 'ou 70€/mois' },
    bySadhguru: true,
    isPublished: true,
    order: 1,
    instructor: { _type: 'reference', _ref: 'instructor-hajar' },
  },
  {
    _type: 'programme',
    _id: 'programme-restorative',
    title: 'Yoga Restauratif',
    titleEn: 'Restorative Yoga',
    slug: { _type: 'slug', current: 'yoga-restauratif' },
    type: 'class',
    category: 'yoga',
    description: 'Pratique douce et profondément relaxante avec des postures tenues longuement. Idéal pour la récupération et la gestion du stress.',
    descriptionEn: 'Gentle and deeply relaxing practice with long-held postures. Ideal for recovery and stress management.',
    schedule: 'Samedis 10h00',
    duration: '75 min',
    price: { amount: 25, currency: 'EUR', unit: 'session' },
    bySadhguru: true,
    isPublished: true,
    order: 2,
    instructor: { _type: 'reference', _ref: 'instructor-hajar' },
  },
  {
    _type: 'programme',
    _id: 'programme-meditation',
    title: 'Méditation & Pranayama',
    titleEn: 'Meditation & Pranayama',
    slug: { _type: 'slug', current: 'meditation-pranayama' },
    type: 'class',
    category: 'yoga',
    description: 'Sessions dédiées aux techniques de respiration yogique et à la méditation guidée. Tous niveaux, débutants bienvenus.',
    descriptionEn: 'Sessions dedicated to yogic breathing techniques and guided meditation. All levels, beginners welcome.',
    schedule: 'Dimanches 9h00',
    duration: '60 min',
    price: { amount: 15, currency: 'EUR', unit: 'session', note: 'ou 50€/mois' },
    bySadhguru: true,
    isPublished: true,
    order: 3,
    instructor: { _type: 'reference', _ref: 'instructor-hajar' },
  },
  // Retreats
  {
    _type: 'programme',
    _id: 'programme-retreat-atlas',
    title: 'Retraite Yoga & Méditation dans l\'Atlas',
    titleEn: 'Yoga & Meditation Retreat in the Atlas',
    slug: { _type: 'slug', current: 'retraite-atlas' },
    type: 'retreat',
    category: 'yoga',
    description: 'Immersion totale dans la pratique yogique traditionnelle au cœur des montagnes de l\'Atlas. Yoga, méditation, randonnées contemplatives et cuisine locale.',
    descriptionEn: 'Total immersion in traditional yogic practice in the heart of the Atlas mountains. Yoga, meditation, contemplative hikes and local cuisine.',
    location: 'Vallée de l\'Ourika, Maroc',
    duration: '5 jours / 4 nuits',
    dates: { start: '2025-05-15', end: '2025-05-19' },
    price: { amount: 890, currency: 'EUR', unit: 'person' },
    highlights: [
      'Pratiques de yoga quotidiennes',
      'Méditation guidée',
      'Randonnées dans l\'Atlas',
      'Hébergement en éco-lodge',
      'Cuisine marocaine bio'
    ],
    highlightsEn: [
      'Daily yoga practices',
      'Guided meditation',
      'Hikes in the Atlas',
      'Eco-lodge accommodation',
      'Organic Moroccan cuisine'
    ],
    bySadhguru: true,
    isPublished: true,
    order: 10,
    instructor: { _type: 'reference', _ref: 'instructor-hajar' },
  },
  {
    _type: 'programme',
    _id: 'programme-retreat-silence',
    title: 'Retraite Silence & Contemplation',
    titleEn: 'Silence & Contemplation Retreat',
    slug: { _type: 'slug', current: 'retraite-silence' },
    type: 'retreat',
    category: 'yoga',
    description: 'Une retraite en silence au bord de l\'océan Atlantique. Méditation profonde, pratiques yogiques, et temps de contemplation face à la mer.',
    descriptionEn: 'A silent retreat by the Atlantic Ocean. Deep meditation, yogic practices, and contemplation time facing the sea.',
    location: 'Essaouira, Maroc',
    duration: '7 jours / 6 nuits',
    dates: { start: '2025-09-20', end: '2025-09-26' },
    price: { amount: 1200, currency: 'EUR', unit: 'person' },
    highlights: [
      'Noble silence',
      'Méditation intensive',
      'Yoga restauratif',
      'Vue sur l\'océan',
      'Accompagnement personnalisé'
    ],
    highlightsEn: [
      'Noble silence',
      'Intensive meditation',
      'Restorative yoga',
      'Ocean view',
      'Personalized guidance'
    ],
    bySadhguru: true,
    isPublished: true,
    order: 11,
    instructor: { _type: 'reference', _ref: 'instructor-hajar' },
  },
  // Workshops
  {
    _type: 'programme',
    _id: 'programme-workshop-leadership',
    title: 'Atelier Leadership Conscient',
    titleEn: 'Conscious Leadership Workshop',
    slug: { _type: 'slug', current: 'atelier-leadership-conscient' },
    type: 'workshop',
    category: 'coaching',
    description: 'Un atelier intensif pour développer votre leadership authentique, alliant pratiques contemplatives et outils de facilitation organisationnelle.',
    descriptionEn: 'An intensive workshop to develop your authentic leadership, combining contemplative practices and organizational facilitation tools.',
    location: 'Casablanca, Maroc',
    duration: '2 jours',
    dates: { start: '2025-06-10', end: '2025-06-11' },
    price: { amount: 450, currency: 'EUR', unit: 'person' },
    highlights: [
      'Connaissance de soi',
      'Intelligence émotionnelle',
      'Communication consciente',
      'Pratiques de présence',
      'Outils de facilitation'
    ],
    highlightsEn: [
      'Self-awareness',
      'Emotional intelligence',
      'Conscious communication',
      'Presence practices',
      'Facilitation tools'
    ],
    bySadhguru: false,
    isPublished: true,
    order: 20,
    instructor: { _type: 'reference', _ref: 'instructor-hajar' },
  },
  {
    _type: 'programme',
    _id: 'programme-workshop-balance',
    title: 'Atelier Équilibre & Limites Saines',
    titleEn: 'Balance & Healthy Boundaries Workshop',
    slug: { _type: 'slug', current: 'atelier-equilibre-limites' },
    type: 'workshop',
    category: 'coaching',
    description: 'Un atelier pratique pour créer un équilibre durable entre vie professionnelle et personnelle. Apprenez à poser des limites saines sans culpabilité et à prévenir le burnout.',
    descriptionEn: 'A practical workshop to create lasting work-life balance. Learn to set healthy boundaries without guilt and prevent burnout.',
    location: 'Casablanca, Maroc',
    duration: '2 jours',
    dates: { start: '2025-07-15', end: '2025-07-16' },
    price: { amount: 350, currency: 'EUR', unit: 'person' },
    highlights: [
      'Clarification de vos valeurs',
      'Techniques de boundaries',
      'Yoga & méditation anti-stress',
      'Prévention du burnout',
      'Pratiques quotidiennes concrètes'
    ],
    highlightsEn: [
      'Values clarification',
      'Boundary techniques',
      'Stress-relief yoga & meditation',
      'Burnout prevention',
      'Concrete daily practices'
    ],
    bySadhguru: false,
    isPublished: true,
    order: 21,
    instructor: { _type: 'reference', _ref: 'instructor-hajar' },
  },
  // Training
  {
    _type: 'programme',
    _id: 'programme-training-philosophy',
    title: 'Formation Yoga & Philosophie',
    titleEn: 'Yoga & Philosophy Training',
    slug: { _type: 'slug', current: 'formation-yoga-philosophie' },
    type: 'training',
    category: 'yoga',
    description: 'Formation approfondie aux fondamentaux du yoga traditionnel : asanas, pranayama, méditation et philosophie yogique.',
    descriptionEn: 'In-depth training in traditional yoga fundamentals: asanas, pranayama, meditation and yogic philosophy.',
    location: 'Marrakech, Maroc',
    duration: '10 jours',
    dates: { start: '2025-11-01', end: '2025-11-10' },
    price: { amount: 1890, currency: 'EUR', unit: 'person' },
    highlights: [
      'Enseignements traditionnels',
      'Pratique quotidienne intensive',
      'Philosophie du yoga',
      'Manuel de formation',
      'Certificat de participation'
    ],
    highlightsEn: [
      'Traditional teachings',
      'Daily intensive practice',
      'Yoga philosophy',
      'Training manual',
      'Certificate of participation'
    ],
    bySadhguru: true,
    isPublished: true,
    order: 30,
    instructor: { _type: 'reference', _ref: 'instructor-hajar' },
  },
]

// ============================================
// TESTIMONIALS
// ============================================
const testimonials = [
  {
    _type: 'testimonial',
    _id: 'testimonial-marie',
    quote: 'L\'accompagnement de Hajar a transformé notre équipe de direction. Son approche unique qui mêle facilitation professionnelle et pratiques contemplatives a créé un espace de confiance et de collaboration que je n\'avais jamais vu auparavant.',
    quoteEn: 'Hajar\'s guidance transformed our leadership team. Her unique approach combining professional facilitation and contemplative practices created a space of trust and collaboration I had never seen before.',
    author: 'Marie L.',
    initial: 'M',
    role: 'DRH, Groupe Tech',
    roleEn: 'HR Director, Tech Group',
    serviceType: 'corporate',
    featured: true,
    rating: 5,
    order: 1,
  },
  {
    _type: 'testimonial',
    _id: 'testimonial-ahmed',
    quote: 'La retraite dans l\'Atlas a été un tournant dans ma vie. Hajar crée un espace de présence et d\'authenticité rare. J\'ai pu me reconnecter à mes valeurs profondes et clarifier ma vision professionnelle.',
    quoteEn: 'The retreat in the Atlas was a turning point in my life. Hajar creates a rare space of presence and authenticity. I was able to reconnect with my deep values and clarify my professional vision.',
    author: 'Ahmed K.',
    initial: 'A',
    role: 'Entrepreneur',
    roleEn: 'Entrepreneur',
    serviceType: 'retreat',
    featured: true,
    rating: 5,
    order: 2,
  },
  {
    _type: 'testimonial',
    _id: 'testimonial-sophie',
    quote: 'Les cours de yoga de Hajar vont bien au-delà du physique. Elle transmet le yoga dans sa dimension la plus profonde, avec une authenticité et une bienveillance qui touchent le cœur. Chaque cours est une invitation à se retrouver.',
    quoteEn: 'Hajar\'s yoga classes go far beyond the physical. She transmits yoga in its deepest dimension, with an authenticity and kindness that touch the heart. Each class is an invitation to find yourself.',
    author: 'Sophie D.',
    initial: 'S',
    role: 'Coach Indépendante',
    roleEn: 'Independent Coach',
    serviceType: 'yoga',
    featured: true,
    rating: 5,
    order: 3,
  },
  {
    _type: 'testimonial',
    _id: 'testimonial-youssef',
    quote: 'Le coaching de Hajar m\'a permis de transformer mon style de leadership. Elle a su m\'accompagner avec justesse entre exigence professionnelle et développement personnel. Un vrai game-changer pour ma carrière.',
    quoteEn: 'Hajar\'s coaching helped me transform my leadership style. She knew how to guide me with precision between professional demands and personal development. A real game-changer for my career.',
    author: 'Youssef M.',
    initial: 'Y',
    role: 'Directeur Général',
    roleEn: 'CEO',
    serviceType: 'coaching',
    featured: true,
    rating: 5,
    order: 4,
  },
]

// ============================================
// MIGRATION
// ============================================
async function migrate() {
  console.log('🚀 Starting migration to Sanity...\n')

  // 1. Create Instructor
  console.log('👤 Creating Instructor (Hajar)...')
  try {
    const result = await client.createOrReplace(instructor)
    console.log(`   ✅ Created: ${result.name}`)
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`)
  }

  // 2. Create Programmes
  console.log('\n📚 Creating Programmes...')
  for (const programme of programmes) {
    try {
      const result = await client.createOrReplace(programme)
      console.log(`   ✅ Created: ${result.title}`)
    } catch (error) {
      console.log(`   ❌ Error creating ${programme.title}: ${error.message}`)
    }
  }

  // 3. Create Testimonials
  console.log('\n💬 Creating Testimonials...')
  for (const testimonial of testimonials) {
    try {
      const result = await client.createOrReplace(testimonial)
      console.log(`   ✅ Created: ${result.author}`)
    } catch (error) {
      console.log(`   ❌ Error creating ${testimonial.author}: ${error.message}`)
    }
  }

  console.log('\n✨ Migration complete!')
  console.log(`
Summary:
- 1 Instructor
- ${programmes.length} Programmes
- ${testimonials.length} Testimonials

Go to http://localhost:3000/studio to see the content!
`)
}

migrate().catch(console.error)
