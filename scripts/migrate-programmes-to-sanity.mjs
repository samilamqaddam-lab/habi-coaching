#!/usr/bin/env node
/**
 * Migration Script: Programmes (Yoga) Page Content to Sanity
 *
 * This script migrates all content from the Programmes page to Sanity CMS.
 * Due to its complexity, this is a separate migration script.
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'czmpe9zr',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Programmes Page Content
const programmesPageContent = {
  _id: 'programmesPageContent',
  _type: 'programmesPageContent',

  // ============================================
  // HERO SECTION
  // ============================================
  heroSection: {
    subtitle: 'Hatha Yoga Classique & Retraites',
    subtitleEn: 'Classical Hatha Yoga & Retreats',
    title: 'Accompagnez votre transformation intérieure par le Hatha Yoga Classique structuré par Sadhguru',
    titleEn: 'Transform Yourself Through Classical Hatha Yoga Structured by Sadhguru',
    paragraphs: [
      {
        _key: 'para1',
        _type: 'heroParagraph',
        title: 'Une Science Millénaire',
        titleEn: 'An Ancient Science',
        text: 'Le Hatha Yoga Classique est une science complète préservée dans sa forme la plus pure. C\'est un processus profond d\'alignement du corps, du mental et de l\'énergie vers un potentiel supérieur, transmis avec précision à travers les siècles.',
        textEn: 'Classical Hatha Yoga is a complete science preserved in its purest form. It is a profound process of aligning body, mind and energy towards a higher potential, transmitted with precision through the centuries.',
      },
      {
        _key: 'para2',
        _type: 'heroParagraph',
        title: 'L\'Enseignement de Sadhguru',
        titleEn: 'Sadhguru\'s Teaching',
        text: 'Ces pratiques ancestrales ont été structurées et transmises par Sadhguru, maître spirituel contemporain et fondateur de la Isha Foundation, permettant leur accessibilité tout en préservant leur authenticité et leur puissance transformationnelle.',
        textEn: 'These ancestral practices have been structured and transmitted by Sadhguru, contemporary spiritual master and founder of Isha Foundation, making them accessible while preserving their authenticity and transformational power.',
      },
      {
        _key: 'para3',
        _type: 'heroParagraph',
        title: 'Mon Approche',
        titleEn: 'My Approach',
        text: 'Je partage ces enseignements avec gratitude et humilité, offrant un cadre fidèle à cette tradition millénaire pour que chacun puisse en faire l\'expérience directe et découvrir son propre chemin vers l\'équilibre intérieur.',
        textEn: 'I share these teachings with gratitude and humility, offering a framework faithful to this ancient tradition so that everyone can experience it directly and discover their own path to inner balance.',
      },
    ],
    ctas: [
      {
        _key: 'cta1',
        _type: 'heroCta',
        text: 'Réserver un cours individuel',
        textEn: 'Book a private session',
        link: '/contact',
      },
      {
        _key: 'cta2',
        _type: 'heroCta',
        text: 'Nous rejoindre sur le tapis',
        textEn: 'Join us on the mat',
        subtitle: '(Cours collectifs)',
        subtitleEn: '(Group classes)',
        link: '#cours-collectifs',
      },
      {
        _key: 'cta3',
        _type: 'heroCta',
        text: 'Découvrir nos programmes santé et bien-être',
        textEn: 'Discover our health and wellbeing programs',
        link: '#programmes-sante',
      },
    ],
  },

  // ============================================
  // REGULAR CLASSES SECTION
  // ============================================
  regularClassesSection: {
    subtitle: 'Cours Collectifs',
    subtitleEn: 'Group Classes',
    title: 'Rejoignez-Nous sur le Tapis',
    titleEn: 'Join Us on the Mat',
    autonomyNote: 'Ces programmes, structurés par Sadhguru, sont conçus pour rendre chaque participant·e autonome : à l\'issue de chaque programme, les pratiques peuvent être poursuivies de manière indépendante, chez soi, en toute autonomie.',
    autonomyNoteEn: 'These programs, structured by Sadhguru, are designed to make each participant autonomous: upon completion of each program, practices can be continued independently at home, with full autonomy.',
    classes: [
      {
        _key: 'upaYoga',
        _type: 'yogaClass',
        title: 'Upa Yoga',
        titleEn: 'Upa Yoga',
        subtitle: 'Yoga de base pour le corps, l\'énergie et la vitalité',
        subtitleEn: 'Foundation yoga for body, energy and vitality',
        description: 'Upa Yoga est un ensemble simple mais puissant de 10 pratiques qui activent les articulations, les muscles et le système énergétique, apportant aisance et stabilité à l\'ensemble du corps.',
        descriptionEn: 'Upa Yoga is a simple yet powerful set of 10 practices that activate joints, muscles and the energy system, bringing ease and stability to the entire body.',
        benefits: [
          { _key: 'b1', _type: 'benefitItem', text: 'Aide à relâcher les tensions physiques et la fatigue', textEn: 'Helps release physical tension and fatigue' },
          { _key: 'b2', _type: 'benefitItem', text: 'Contribue au renforcement des articulations et des muscles', textEn: 'Strengthens joints and muscles' },
          { _key: 'b3', _type: 'benefitItem', text: 'Redonne vitalité et mobilité au corps après des périodes d\'inactivité', textEn: 'Restores vitality and mobility to the body after periods of inactivity' },
        ],
        schedule: 'Dates à venir (février et mars 2026)',
        scheduleEn: 'Upcoming dates (February and March 2026)',
        duration: '3 sessions d\'1h',
        durationEn: '3 sessions of 1h',
        location: 'Shido Mind Studio Casablanca',
        locationEn: 'Shido Mind Studio Casablanca',
        attendance: 'La présence à toutes les sessions est obligatoire',
        attendanceEn: 'Attendance at all sessions is mandatory',
        price: '450 DH',
        priceEn: '450 DH',
      },
      {
        _key: 'suryaKriya',
        _type: 'yogaClass',
        title: 'Surya Kriya',
        titleEn: 'Surya Kriya',
        subtitle: 'Pratique yogique complète pour la vitalité et la clarté intérieure',
        subtitleEn: 'Complete yogic practice for vitality and inner clarity',
        description: 'Surya Kriya est une pratique yogique complète en 21 étapes, issue d\'une tradition ancienne, conçue pour soutenir la santé et le bien-être intérieur.',
        descriptionEn: 'Surya Kriya is a complete 21-step yogic practice from an ancient tradition, designed to support health and inner wellbeing.',
        benefits: [
          { _key: 'b1', _type: 'benefitItem', text: 'Développe la clarté mentale et la capacité de concentration', textEn: 'Develops mental clarity and concentration capacity' },
          { _key: 'b2', _type: 'benefitItem', text: 'Soutient la vitalité du corps et l\'équilibre hormonal', textEn: 'Supports body vitality and hormonal balance' },
          { _key: 'b3', _type: 'benefitItem', text: 'Harmonise le corps, le mental et le système énergétique', textEn: 'Harmonizes body, mind and energy system' },
          { _key: 'b4', _type: 'benefitItem', text: 'Favorise un état méditatif et soutient l\'expérience de calme intérieur et de joie', textEn: 'Fosters a meditative state and supports the experience of inner calm and joy' },
        ],
        schedule: 'Dates à venir',
        scheduleEn: 'Upcoming dates',
        duration: '3 sessions de 2h',
        durationEn: '3 sessions of 2h',
        location: 'À définir',
        locationEn: 'To be determined',
        attendance: 'La présence à toutes les sessions est obligatoire',
        attendanceEn: 'Attendance at all sessions is mandatory',
        price: '900 DH',
        priceEn: '900 DH',
      },
      {
        _key: 'suryaShakti',
        _type: 'yogaClass',
        title: 'Surya Shakti',
        titleEn: 'Surya Shakti',
        subtitle: 'Pratique dynamique pour la force, l\'endurance et l\'énergie',
        subtitleEn: 'Dynamic practice for strength, endurance and energy',
        description: 'Surya Shakti est une pratique conçue pour activer et renforcer l\'énergie du corps. Ce processus en 18 étapes contribue à renforcer les ligaments qui maintiennent la structure squelettique et musculaire.',
        descriptionEn: 'Surya Shakti is a practice designed to activate and strengthen the body\'s energy. This 18-step process helps strengthen the ligaments that hold the skeletal and muscular structure.',
        benefits: [
          { _key: 'b1', _type: 'benefitItem', text: 'Améliore la forme physique et le bien-être global', textEn: 'Improves physical fitness and overall wellbeing' },
          { _key: 'b2', _type: 'benefitItem', text: 'Renforce les tendons et les ligaments', textEn: 'Strengthens tendons and ligaments' },
          { _key: 'b3', _type: 'benefitItem', text: 'Augmente la force physique et l\'endurance', textEn: 'Increases physical strength and endurance' },
          { _key: 'b4', _type: 'benefitItem', text: 'Prépare le corps pour accéder à des niveaux d\'énergie plus élevés', textEn: 'Prepares the body to access higher levels of energy' },
        ],
        schedule: 'Dates à venir',
        scheduleEn: 'Upcoming dates',
        duration: '3 sessions d\'1h30',
        durationEn: '3 sessions of 1h30',
        location: 'À définir',
        locationEn: 'To be determined',
        attendance: 'La présence à toutes les sessions est obligatoire',
        attendanceEn: 'Attendance at all sessions is mandatory',
        price: '675 DH',
        priceEn: '675 DH',
      },
      {
        _key: 'angamardana',
        _type: 'yogaClass',
        title: 'Angamardana',
        titleEn: 'Angamardana',
        subtitle: 'Pratique dynamique pour la force, la mobilité et la condition physique',
        subtitleEn: 'Dynamic practice for strength, mobility and fitness',
        description: 'Angamardana est une série de 31 processus dynamiques, issus du yoga, conçus pour revitaliser le corps et développer une condition physique optimale. Le terme Angamardana signifie acquérir une maîtrise complète des membres, des organes et des différentes parties du corps. Cette pratique ne nécessite aucun équipement de fitness.',
        descriptionEn: 'Angamardana is a series of 31 dynamic yogic processes designed to revitalize the body and develop optimal physical fitness. The term Angamardana means gaining complete mastery of limbs, organs and different body parts. This practice requires no fitness equipment.',
        benefits: [
          { _key: 'b1', _type: 'benefitItem', text: 'Renforce la colonne vertébrale ainsi que les systèmes squelettique et musculaire', textEn: 'Strengthens the spine as well as skeletal and muscular systems' },
          { _key: 'b2', _type: 'benefitItem', text: 'Développe la force physique, la condition physique et la ténacité', textEn: 'Develops physical strength, fitness and tenacity' },
          { _key: 'b3', _type: 'benefitItem', text: 'Revitalise le corps, apportant une sensation de légèreté et de liberté dans le mouvement', textEn: 'Revitalizes the body, bringing a sense of lightness and freedom in movement' },
          { _key: 'b4', _type: 'benefitItem', text: 'Prépare le corps à la pratique du Hatha Yoga', textEn: 'Prepares the body for Hatha Yoga practice' },
          { _key: 'b5', _type: 'benefitItem', text: 'Revitalise l\'ensemble du corps, notamment les muscles, la circulation sanguine ainsi que les systèmes squelettique et nerveux', textEn: 'Revitalizes the entire body, including muscles, blood circulation as well as skeletal and nervous systems' },
          { _key: 'b6', _type: 'benefitItem', text: 'Peut aider avec la perte de poids', textEn: 'Can assist with weight loss' },
        ],
        schedule: 'Dates à venir',
        scheduleEn: 'Upcoming dates',
        duration: '4 sessions de 2h45',
        durationEn: '4 sessions of 2h45',
        location: 'À définir',
        locationEn: 'To be determined',
        attendance: 'La présence à toutes les sessions est obligatoire',
        attendanceEn: 'Attendance at all sessions is mandatory',
        price: '1650 DH',
        priceEn: '1650 DH',
      },
      {
        _key: 'yogasanas',
        _type: 'yogaClass',
        title: 'Yogasanas',
        titleEn: 'Yogasanas',
        subtitle: 'Postures de yoga pour l\'alignement intérieur et l\'harmonie',
        subtitleEn: 'Yoga postures for inner alignment and harmony',
        description: 'Les yogasanas sont un ensemble de postures puissantes permettant d\'élever la conscience et de manipuler les énergies du corps. Les yogasanas sont une manière d\'aligner le système intérieur et de l\'ajuster à la géométrie céleste, afin d\'entrer en résonance avec l\'existence.',
        descriptionEn: 'Yogasanas are a set of powerful postures to elevate consciousness and manipulate the body\'s energies. Yogasanas are a way to align the inner system and adjust it to celestial geometry, to resonate with existence.',
        benefits: [
          { _key: 'b1', _type: 'benefitItem', text: 'Soutien dans le soulagement de certaines maladies chroniques', textEn: 'Support in relieving certain chronic illnesses' },
          { _key: 'b2', _type: 'benefitItem', text: 'Évolution du corps et du mental vers un potentiel plus élevé', textEn: 'Evolution of body and mind towards higher potential' },
          { _key: 'b3', _type: 'benefitItem', text: 'Stabilisation du corps, du mental et du système énergétique', textEn: 'Stabilization of body, mind and energy system' },
          { _key: 'b4', _type: 'benefitItem', text: 'Ralentissement du processus de vieillissement', textEn: 'Slowing down the aging process' },
        ],
        schedule: 'Dates à venir',
        scheduleEn: 'Upcoming dates',
        duration: '4 sessions de 2h30',
        durationEn: '4 sessions of 2h30',
        location: 'À définir',
        locationEn: 'To be determined',
        attendance: 'La présence à toutes les sessions est obligatoire',
        attendanceEn: 'Attendance at all sessions is mandatory',
        price: '1500 DH',
        priceEn: '1500 DH',
      },
    ],
    trialClass: {
      title: 'Cours d\'essai gratuit',
      titleEn: 'Free Trial Class',
      description: 'Nouveau·elle au yoga ? Venez essayer votre premier cours gratuitement, sans engagement.',
      descriptionEn: 'New to yoga? Come try your first class for free, no commitment.',
      buttonText: 'Réserver mon cours d\'essai',
      buttonTextEn: 'Book My Trial Class',
    },
  },

  // ============================================
  // OTHER PROGRAMS SECTION (Health & Wellbeing)
  // ============================================
  otherProgramsSection: {
    subtitle: 'Autres programmes',
    subtitleEn: 'Other Programs',
    title: 'Pour la santé et le bien-être',
    titleEn: 'For Health and Wellbeing',
    intro: 'Des parcours guidés alliant yoga, pranayama, méditation et chants traditionnels, conçus pour accompagner votre santé et votre bien-être de manière holistique.',
    introEn: 'Guided pathways combining yoga, pranayama, meditation and traditional chants, designed to support your health and wellbeing holistically.',
    disclaimer: 'Ces programmes s\'inspirent des orientations de Sadhguru et de la tradition yogique Isha, mais sont dispensés par Hajar Habi de manière indépendante.',
    disclaimerEn: 'These programs are inspired by Sadhguru\'s guidance and the Isha yogic tradition, but are delivered independently by Hajar Habi.',
    medicalWarning: 'Ces programmes ne se substituent en aucun cas à un avis médical, un diagnostic ou un traitement. Ils constituent un soutien complémentaire au bien-être global.',
    medicalWarningEn: 'These programs do not substitute medical advice, diagnosis or treatment. They provide complementary support for overall wellbeing.',
    healthProgram: {
      title: 'Yoga pour la Santé',
      titleEn: 'Yoga for Health',
      intro: 'Ces programmes de yoga pour la santé proposent un accompagnement adapté et personnalisé pour soutenir votre bien-être face à diverses problématiques de santé, dans une approche complémentaire et respectueuse de votre parcours médical.',
      introEn: 'These yoga for health programs offer adapted and personalized support for your wellbeing in relation to various health concerns, with a complementary approach that respects your medical journey.',
      ctaButton: 'Demander une orientation',
      ctaButtonEn: 'Request guidance',
      ctaSubtext: 'Un échange pour comprendre vos attentes et vous proposer un cadre adapté.',
      ctaSubtextEn: 'A conversation to understand your needs and suggest an adapted framework.',
      disclaimer: 'Ces programmes s\'inscrivent dans une démarche de soutien au bien-être global et ne remplacent en aucun cas un avis ou un traitement médical.',
      disclaimerEn: 'These programs are part of a holistic wellbeing approach and do not replace medical advice or treatment.',
    },
    wellbeingProgram: {
      title: 'Yoga pour le Bien-être',
      titleEn: 'Yoga for Wellbeing',
      intro: 'Ces programmes de yoga pour le bien-être sont conçus pour accompagner votre équilibre global, votre vitalité et votre épanouissement personnel à travers des pratiques yogiques adaptées à vos besoins et aspirations.',
      introEn: 'These yoga for wellbeing programs are designed to support your overall balance, vitality and personal fulfillment through yogic practices adapted to your needs and aspirations.',
      note: 'Les programmes présentés ci-dessous constituent des orientations générales. Chaque parcours est ajusté en fonction de vos besoins, priorités et capacités lors d\'une séance de prise de contact.',
      noteEn: 'The programs presented below are general orientations. Each journey is adjusted based on your needs, priorities and capacities during an initial consultation.',
      ctaButton: 'Discuter de mes besoins',
      ctaButtonEn: 'Discuss my needs',
      ctaSubtext: 'Un premier échange pour vous orienter, sans engagement.',
      ctaSubtextEn: 'An initial conversation to guide you, without commitment.',
      durationNote: 'La durée des programmes peut varier de quelques heures à plusieurs semaines. Les modalités, le rythme et les pratiques sont toujours discutés lors d\'une séance de prise de contact, puis ajustés en fonction des besoins, des priorités et des capacités de chaque personne.',
      durationNoteEn: 'Program duration can vary from a few hours to several weeks. Modalities, rhythm and practices are always discussed during an initial consultation, then adjusted based on individual needs, priorities and capacities.',
    },
  },

  // ============================================
  // LINEAGE SECTION
  // ============================================
  lineageSection: {
    subtitle: 'Lignée & Tradition',
    subtitleEn: 'Lineage & Tradition',
    title: 'Dans la Lignée de Sadhguru',
    titleEn: 'In the Lineage of Sadhguru',
    intro: 'Tous les enseignements de yoga proposés sont issus de la tradition du Classical Hatha Yoga, transmis par Sadhguru à travers Isha Foundation. Une lignée millénaire préservée dans sa pureté et son authenticité.',
    introEn: 'All yoga teachings offered are rooted in the Classical Hatha Yoga tradition, transmitted by Sadhguru through Isha Foundation. An ancient lineage preserved in its purity and authenticity.',
    sadhguru: {
      title: 'Sadhguru',
      titleEn: 'Sadhguru',
      role: 'Fondateur de Isha Foundation',
      roleEn: 'Founder of Isha Foundation',
      description: 'Yogi, mystique et visionnaire, Sadhguru a consacré sa vie à rendre le yoga accessible à tous dans sa forme la plus pure. Son programme de formation de professeurs est reconnu mondialement pour son authenticité et sa rigueur.',
      descriptionEn: 'Yogi, mystic and visionary, Sadhguru has dedicated his life to making yoga accessible to all in its purest form. His teacher training program is globally recognized for its authenticity and rigor.',
      linkText: 'Découvrir Isha Foundation',
      linkTextEn: 'Discover Isha Foundation',
      linkUrl: 'https://isha.sadhguru.org',
    },
    cards: [
      {
        _key: 'training',
        _type: 'lineageCard',
        icon: 'training',
        title: 'Formation Certifiée Isha',
        titleEn: 'Isha Certified Training',
        description: 'Formation résidentielle intensive de 21 semaines au centre Isha Yoga en Inde, sous la guidance directe de Sadhguru.',
        descriptionEn: 'Intensive 21-week residential training at the Isha Yoga Center in India, under Sadhguru\'s direct guidance.',
      },
      {
        _key: 'hours',
        _type: 'lineageCard',
        icon: 'hours',
        title: '1750+ Heures de Formation',
        titleEn: '1750+ Hours of Training',
        description: 'Une immersion complète dans les pratiques yogiques : asanas, pranayama, kriyas, méditation et philosophie yogique.',
        descriptionEn: 'A complete immersion in yogic practices: asanas, pranayama, kriyas, meditation and yogic philosophy.',
      },
      {
        _key: 'global',
        _type: 'lineageCard',
        icon: 'global',
        title: 'Communauté Mondiale',
        titleEn: 'Global Community',
        description: 'Isha Foundation est présente dans plus de 150 pays, avec des millions de pratiquants bénéficiant de ces enseignements transformateurs.',
        descriptionEn: 'Isha Foundation is present in over 150 countries, with millions of practitioners benefiting from these transformative teachings.',
      },
    ],
  },

  // ============================================
  // PHILOSOPHY SECTION
  // ============================================
  philosophySection: {
    subtitle: 'Ma Philosophie',
    subtitleEn: 'My Philosophy',
    title: 'Le Yoga Comme Chemin de Transformation',
    titleEn: 'Yoga as a Path of Transformation',
    intro: 'Pour moi, le yoga est bien plus qu\'une pratique physique. C\'est un chemin de transformation profonde qui touche tous les aspects de notre être - corps, mental, cœur et esprit.',
    introEn: 'For me, yoga is much more than a physical practice. It\'s a path of deep transformation that touches all aspects of our being - body, mind, heart and spirit.',
    points: [
      {
        _key: 'tradition',
        _type: 'philosophyPoint',
        title: 'Tradition Authentique',
        titleEn: 'Authentic Tradition',
        description: 'Formée dans la lignée traditionnelle du Hatha Yoga, j\'enseigne les pratiques dans leur forme authentique, respectueuse de la sagesse ancestrale.',
        descriptionEn: 'Trained in the traditional lineage of Hatha Yoga, I teach practices in their authentic form, respectful of ancestral wisdom.',
      },
      {
        _key: 'inclusive',
        _type: 'philosophyPoint',
        title: 'Approche Inclusive',
        titleEn: 'Inclusive Approach',
        description: 'Le yoga est pour tous les corps et tous les âges. J\'adapte la pratique à chaque personne avec bienveillance et respect.',
        descriptionEn: 'Yoga is for all bodies and all ages. I adapt the practice to each person with kindness and respect.',
      },
      {
        _key: 'beyond',
        _type: 'philosophyPoint',
        title: 'Au-delà du Physique',
        titleEn: 'Beyond the Physical',
        description: 'Nous explorons les dimensions subtiles du yoga : pranayama, méditation, philosophie yogique et pratiques contemplatives.',
        descriptionEn: 'The yoga I teach goes beyond postures. We explore breathing, meditation and yogic philosophy.',
      },
      {
        _key: 'smallGroups',
        _type: 'philosophyPoint',
        title: 'Petits Groupes',
        titleEn: 'Small Groups',
        description: 'Maximum 12 personnes par cours pour garantir un accompagnement personnalisé et créer une vraie communauté de pratique.',
        descriptionEn: 'I teach in small groups (max 12 people) to maintain quality of teaching and individual attention.',
      },
    ],
  },

  // ============================================
  // CUSTOM PROGRAMS SECTION
  // ============================================
  customSection: {
    subtitle: 'Programme Personnalisé',
    subtitleEn: 'Personalized Program',
    title: 'Créons Ensemble Votre Expérience',
    titleEn: 'Let\'s Create Your Experience Together',
    description: 'Vous souhaitez un programme sur-mesure pour votre groupe, votre équipe ou une occasion spéciale ? Nous concevons des expériences uniques adaptées à vos besoins.',
    descriptionEn: 'Would you like a custom program for your group, your team or a special occasion? We design unique experiences adapted to your needs.',
    features: [
      {
        _key: 'groups',
        _type: 'customFeature',
        title: 'Groupes privés',
        titleEn: 'Private groups',
        description: 'À partir de 6 personnes',
        descriptionEn: 'From 6 people',
      },
      {
        _key: 'locations',
        _type: 'customFeature',
        title: 'Lieux uniques',
        titleEn: 'Unique locations',
        description: 'Riads, désert, montagnes, océan',
        descriptionEn: 'Riads, desert, mountains, ocean',
      },
      {
        _key: 'personalized',
        _type: 'customFeature',
        title: '100% personnalisé',
        titleEn: '100% personalized',
        description: 'Contenu adapté à vos besoins',
        descriptionEn: 'Content adapted to your needs',
      },
    ],
    buttonText: 'Demander un programme sur-mesure',
    buttonTextEn: 'Request a Custom Program',
  },

  // ============================================
  // CTA SECTION
  // ============================================
  ctaSection: {
    title: 'Prêt·e à Commencer ?',
    titleEn: 'Ready to Begin?',
    description: 'Réservez votre cours d\'essai gratuit ou contactez-nous pour toute question sur nos cours et programmes.',
    descriptionEn: 'Book your free trial class or contact us for any questions about our classes and programs.',
    primaryCtaText: 'Cours d\'essai gratuit',
    primaryCtaTextEn: 'Free Trial Class',
    secondaryCtaText: 'Demander des informations',
    secondaryCtaTextEn: 'Request Information',
  },
}

async function migrate() {
  console.log('==========================================')
  console.log('MIGRATION: Programmes (Yoga) Page Content')
  console.log('==========================================\n')

  if (!process.env.SANITY_API_TOKEN) {
    console.error('Error: SANITY_API_TOKEN environment variable is required')
    console.log('\nUsage: SANITY_API_TOKEN=your_token node scripts/migrate-programmes-to-sanity.mjs')
    process.exit(1)
  }

  try {
    console.log('Migrating programmesPageContent...')
    const result = await client.createOrReplace(programmesPageContent)
    console.log(`  Created/Updated: ${result._id}`)
    console.log(`  Sections: Hero, Regular Classes (5 courses), Other Programs, Lineage, Philosophy, Custom, CTA`)

    console.log('\n==========================================')
    console.log('MIGRATION COMPLETE!')
    console.log('==========================================')
    console.log('\nOpen Sanity Studio to verify:')
    console.log('  npm run sanity:dev')
    console.log('  or visit https://transcendencework.com/studio')

  } catch (error) {
    console.error('\nMigration failed:', error.message)
    if (error.response) {
      console.error('Response:', error.response.body)
    }
    process.exit(1)
  }
}

migrate()
