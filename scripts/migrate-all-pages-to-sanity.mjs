/**
 * Script de migration du contenu de TOUTES les pages vers Sanity
 *
 * Ce script crée/met à jour les documents de contenu pour chaque page:
 * - coachingPageContent
 * - expertisePageContent
 * - organisationsPageContent
 * - programmesPageContent
 * - contactPageContent
 * - ressourcesPageContent
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

// ============================================
// COACHING PAGE CONTENT
// ============================================
const coachingContent = {
  _id: 'coachingPageContent',
  _type: 'coachingPageContent',

  heroSection: {
    subtitle: 'Coaching Individuel',
    subtitleEn: 'Individual Coaching',
    title: 'Définissez le Succès Selon Vos Termes',
    titleEn: 'Define Success on Your Terms',
    description: 'Un accompagnement certifié Coach & Team (accréditation EMCC) qui allie rigueur du coaching professionnel et profondeur des pratiques contemplatives. Pour une transformation qui respecte votre rythme et vos limites.',
    descriptionEn: 'A Coach & Team certified support (EMCC accreditation) that combines the rigor of professional coaching with the depth of contemplative practices. For a transformation that respects your rhythm and limits.',
    primaryCtaText: 'Réserver une session découverte',
    primaryCtaTextEn: 'Book a discovery session',
    secondaryCtaText: 'En savoir plus',
    secondaryCtaTextEn: 'Learn more',
  },

  servicesSection: {
    subtitle: 'Mes Services',
    subtitleEn: 'My Services',
    title: 'Un Accompagnement Adapté à Vos Besoins',
    titleEn: 'Support Adapted to Your Needs',
    services: [
      {
        _key: 'service-individual',
        _type: 'coachingServiceCard',
        title: 'Coaching Individuel',
        titleEn: 'Individual Coaching',
        description: 'Un accompagnement personnalisé pour explorer vos défis, clarifier votre vision et naviguer votre parcours professionnel selon vos propres termes.',
        descriptionEn: 'Personalized support to explore your challenges, clarify your vision and navigate your professional journey on your own terms.',
        duration: '60-90 min',
        durationEn: '60-90 min',
        format: 'En personne ou en ligne',
        formatEn: 'In person or online',
        price: 'À partir de 150€/session',
        priceEn: 'From €150/session',
      },
      {
        _key: 'service-career',
        _type: 'coachingServiceCard',
        title: 'Coaching de Carrière',
        titleEn: 'Career Coaching',
        description: 'Orientation professionnelle, transitions de carrière (ascendantes, latérales ou réflexives), et développement de leadership pour les cadres et entrepreneurs.',
        descriptionEn: 'Professional orientation, career transitions (ascending, lateral or reflective), and leadership development for executives and entrepreneurs.',
        duration: 'Programme 3-6 mois',
        durationEn: '3-6 month program',
        format: 'Sessions bi-mensuelles',
        formatEn: 'Bi-monthly sessions',
        price: 'Programme personnalisé',
        priceEn: 'Customized program',
      },
      {
        _key: 'service-life',
        _type: 'coachingServiceCard',
        title: 'Coaching de Vie',
        titleEn: 'Life Coaching',
        description: 'Transformation personnelle profonde, intégration harmonieuse travail-vie, prévention du burnout et alignement avec vos valeurs.',
        descriptionEn: 'Deep personal transformation, harmonious work-life integration, burnout prevention and alignment with your values.',
        duration: 'Programme flexible',
        durationEn: 'Flexible program',
        format: 'En personne ou en ligne',
        formatEn: 'In person or online',
        price: 'À partir de 600€/mois',
        priceEn: 'From €600/month',
      },
    ],
  },

  approachSection: {
    subtitle: 'Mon Approche',
    subtitleEn: 'My Approach',
    title: 'Coaching Intégratif & Contemplatif',
    titleEn: 'Integrative & Contemplative Coaching',
    description: 'Mon approche unique combine l\'efficacité du coaching professionnel avec la profondeur des pratiques contemplatives.',
    descriptionEn: 'My unique approach combines the effectiveness of professional coaching with the depth of contemplative practices.',
    steps: [
      {
        _key: 'step-1',
        _type: 'approachStep',
        title: 'Clarification & Exploration',
        titleEn: 'Clarification & Exploration',
        description: 'Nous explorons ensemble vos aspirations, vos défis et vos schémas pour créer une vision claire de votre chemin.',
        descriptionEn: 'We explore together your aspirations, challenges and patterns to create a clear vision of your path.',
      },
      {
        _key: 'step-2',
        _type: 'approachStep',
        title: 'Transformation Intérieure',
        titleEn: 'Inner Transformation',
        description: 'À travers des pratiques contemplatives et des outils de coaching, nous activons votre potentiel de transformation.',
        descriptionEn: 'Through contemplative practices and coaching tools, we activate your transformation potential.',
      },
      {
        _key: 'step-3',
        _type: 'approachStep',
        title: 'Action & Ancrage',
        titleEn: 'Action & Anchoring',
        description: 'Nous traduisons vos insights en actions concrètes et créons des pratiques pour ancrer durablement les changements.',
        descriptionEn: 'We translate your insights into concrete actions and create practices to sustainably anchor changes.',
      },
    ],
    testimonial: {
      quote: 'Hajar a cette capacité rare de créer un espace à la fois professionnel et profondément humain. Son approche m\'a permis non seulement de clarifier ma vision professionnelle, mais aussi de me reconnecter à ce qui compte vraiment pour moi.',
      quoteEn: 'Hajar has this rare ability to create a space that is both professional and deeply human. Her approach allowed me not only to clarify my professional vision, but also to reconnect with what really matters to me.',
      author: 'Sophie, Directrice Marketing',
      authorEn: 'Sophie, Marketing Director',
    },
  },

  ctaSection: {
    title: 'Commençons Votre Voyage',
    titleEn: 'Let\'s Start Your Journey',
    description: 'La première session est une session découverte gratuite de 30 minutes pour explorer vos besoins et voir si nous sommes alignés pour travailler ensemble.',
    descriptionEn: 'The first session is a free 30-minute discovery session to explore your needs and see if we are aligned to work together.',
    buttonText: 'Réserver ma session découverte gratuite',
    buttonTextEn: 'Book my free discovery session',
  },
}

// ============================================
// EXPERTISE PAGE CONTENT
// ============================================
const expertiseContent = {
  _id: 'expertisePageContent',
  _type: 'expertisePageContent',

  heroSection: {
    subtitle: 'Parcours & Expertise',
    subtitleEn: 'Background & Expertise',
    title: 'Une Alliance Rare au Service de Votre Transformation',
    titleEn: 'A Rare Alliance at the Service of Your Transformation',
    description: 'Découvrez le parcours qui me permet d\'accompagner les organisations et les individus avec une approche unique, alliant excellence professionnelle et technologies de bien-être éprouvées.',
    descriptionEn: 'Discover the journey that allows me to support organizations and individuals with a unique approach, combining professional excellence and proven wellness technologies.',
    primaryCtaText: 'Me contacter',
    primaryCtaTextEn: 'Contact me',
  },

  storySection: {
    subtitle: 'Mon Histoire',
    subtitleEn: 'My Story',
    title: 'L\'Alliance de Deux Mondes',
    titleEn: 'The Alliance of Two Worlds',
    paragraph1: 'Je m\'appelle Hajar Habi.',
    paragraph1En: 'My name is Hajar Habi.',
    paragraph2: 'Je suis lauréate de l\'École Nationale de Commerce et de Gestion de Settat (2007), Coach professionnelle certifiée par Transformance Pro, sous la supervision de Vincent Lenhardt, en collaboration avec UM6P – Africa Business School (2024), et Professeure de Hatha Yoga Classique certifiée par Sadhguru Gurukulam (2025).',
    paragraph2En: 'I am a graduate of the National School of Commerce and Management of Settat (2007), a professional coach certified by Transformance Pro, under the supervision of Vincent Lenhardt, in collaboration with UM6P – Africa Business School (2024), and a Classical Hatha Yoga Teacher certified by Sadhguru Gurukulam (2025).',
    paragraph3: 'Pendant près de vingt ans, j\'ai accompagné des entreprises au Maroc et à l\'international dans leurs projets de transformation en tant qu\'experte en développement des compétences puis en tant que Manager RH. Mon travail s\'est toujours appuyé sur des approches centrées sur l\'humain, avec un focus particulier sur le développement de l\'engagement des équipes et la création d\'environnements de travail inclusifs, favorisant l\'épanouissement des potentiels et une performance durable.',
    paragraph3En: 'For nearly twenty years, I have supported companies in Morocco and internationally in their transformation projects as a skills development expert and then as an HR Manager. My work has always relied on people-centered approaches, with a particular focus on developing team engagement and creating inclusive work environments that foster the development of potential and sustainable performance.',
    paragraph4: 'Formée au coaching des individus, des équipes et des organisations, je vous accompagne aujourd\'hui dans des contextes de transformation qu\'elle soit culturelle, opérationnelle ou organisationnelle, que vous soyez leader ou acteur·ice du changement, afin de développer clarté, discernement et capacité à agir avec justesse, même dans des environnements complexes et exigeants.',
    paragraph4En: 'Trained in coaching individuals, teams and organizations, I now support you in transformation contexts whether cultural, operational or organizational, whether you are a leader or change agent, to develop clarity, discernment and the ability to act with precision, even in complex and demanding environments.',
    paragraph5: 'J\'aime concevoir des accompagnements sur mesure et innovants, qui laissent de la place à l\'expérimentation, à l\'intelligence collective et à l\'émergence de nouvelles possibilités de collaboration et de mise en œuvre.',
    paragraph5En: 'I like to design customized and innovative support that leaves room for experimentation, collective intelligence and the emergence of new possibilities for collaboration and implementation.',
    paragraph6: 'Ma pratique du Hatha Yoga Classique, nourrie par une immersion prolongée dans un ashram en Inde, est désormais pleinement intégrée à mon approche d\'accompagnement. Ayant moi-même expérimenté ces outils et les ayant intégrés dans ma vie quotidienne, je les considère comme essentiels pour toute personne ou organisation qui souhaite, au-delà du développement et de la performance, affiner sa perception du monde, gagner en clarté et sortir d\'un mode de fonctionnement souvent basé sur la réaction à un environnement subi et la peur de l\'inconnu, pour aller vers un leadership et un mode de vie fondés sur l\'action consciente et la responsabilité.',
    paragraph6En: 'My practice of Classical Hatha Yoga, nourished by a prolonged immersion in an ashram in India, is now fully integrated into my support approach. Having myself experienced these tools and integrated them into my daily life, I consider them essential for any person or organization that wishes, beyond development and performance, to refine their perception of the world, gain clarity and move away from a mode of operation often based on reaction to an environment suffered and fear of the unknown, towards leadership and a lifestyle based on conscious action and responsibility.',
  },

  certificationsSection: {
    subtitle: 'Certifications & Formations',
    subtitleEn: 'Certifications & Training',
    title: 'Des Formations d\'Excellence Internationale',
    titleEn: 'International Excellence Training',
    coaching: {
      title: 'Coach Professionnelle Certifiée',
      titleEn: 'Certified Professional Coach',
      subtitle: 'Coach & Team – Transformance Pro',
      subtitleEn: 'Coach & Team – Transformance Pro',
      trainingTitle: 'Formation',
      trainingTitleEn: 'Training',
      trainingItems: [
        { _key: 'ct-1', text: '1 an de formation intensive', textEn: '1 year of intensive training' },
        { _key: 'ct-2', text: 'Méthodologie Coach & Team (école pionnière depuis 1988)', textEn: 'Coach & Team methodology (pioneer school since 1988)' },
        { _key: 'ct-3', text: 'Standard européen du coaching professionnel', textEn: 'European standard of professional coaching' },
      ],
      expertiseTitle: 'Expertise',
      expertiseTitleEn: 'Expertise',
      expertiseItems: [
        { _key: 'ce-1', text: 'Coaching individuel et de carrière', textEn: 'Individual and career coaching' },
        { _key: 'ce-2', text: 'Coaching d\'équipe et facilitation', textEn: 'Team coaching and facilitation' },
        { _key: 'ce-3', text: 'Accompagnement des dirigeants', textEn: 'Executive coaching' },
        { _key: 'ce-4', text: 'Transformation organisationnelle', textEn: 'Organizational transformation' },
      ],
    },
    yoga: {
      title: 'Professeure de Yoga Certifiée',
      titleEn: 'Certified Yoga Teacher',
      subtitle: 'Sadhguru Gurukulam – Classical Hatha Yoga',
      subtitleEn: 'Sadhguru Gurukulam – Classical Hatha Yoga',
      trainingTitle: 'Formation',
      trainingTitleEn: 'Training',
      trainingItems: [
        { _key: 'yt-1', text: '21 semaines résidentielles en Inde (1750 heures)', textEn: '21 residential weeks in India (1750 hours)' },
        { _key: 'yt-2', text: 'Isha Yoga Center, Coimbatore, Tamil Nadu', textEn: 'Isha Yoga Center, Coimbatore, Tamil Nadu' },
        { _key: 'yt-3', text: 'Programme structuré par Sadhguru', textEn: 'Program structured by Sadhguru' },
        { _key: 'yt-4', text: 'Classical Hatha Yoga (tradition authentique)', textEn: 'Classical Hatha Yoga (authentic tradition)' },
        { _key: 'yt-5', text: 'Membre d\'une communauté mondiale (1800 enseignant·e·s, 84 pays)', textEn: 'Member of a global community (1800 teachers, 84 countries)' },
      ],
      teachingsTitle: 'Enseignements',
      teachingsTitleEn: 'Teachings',
      teachingsItems: [
        { _key: 'ye-1', text: 'Asanas, Pranayama, Kriyas, Bandhas', textEn: 'Asanas, Pranayama, Kriyas, Bandhas' },
        { _key: 'ye-2', text: 'Méditation et mode de vie yogique', textEn: 'Meditation and yogic lifestyle' },
        { _key: 'ye-3', text: 'Mantra Yoga & Nada Yoga', textEn: 'Mantra Yoga & Nada Yoga' },
        { _key: 'ye-4', text: '+70 modules d\'enseignements maîtrisés', textEn: '+70 mastered teaching modules' },
      ],
    },
  },

  experienceSection: {
    subtitle: 'Expérience',
    subtitleEn: 'Experience',
    title: '20 Ans au Service des Organisations',
    titleEn: '20 Years at the Service of Organizations',
    description: 'Deux décennies d\'expérience auprès d\'organisations nationales et internationales dans les domaines de la transformation, de la stratégie et des ressources humaines.',
    descriptionEn: 'Two decades of experience with national and international organizations in the fields of transformation, strategy and human resources.',
    areas: [
      {
        _key: 'area-transformation',
        _type: 'experienceArea',
        title: 'Transformation Organisationnelle',
        titleEn: 'Organizational Transformation',
        description: 'Accompagnement de projets de transformation culturelle et structurelle dans des contextes complexes',
        descriptionEn: 'Support for cultural and structural transformation projects in complex contexts',
      },
      {
        _key: 'area-strategy',
        _type: 'experienceArea',
        title: 'Stratégie d\'Entreprise',
        titleEn: 'Business Strategy',
        description: 'Participation à l\'élaboration et au déploiement de stratégies RH alignées avec les enjeux business',
        descriptionEn: 'Participation in the development and deployment of HR strategies aligned with business issues',
      },
      {
        _key: 'area-hr',
        _type: 'experienceArea',
        title: 'Ressources Humaines',
        titleEn: 'Human Resources',
        description: 'Développement des talents, leadership, gestion du changement et cohésion d\'équipe',
        descriptionEn: 'Talent development, leadership, change management and team cohesion',
      },
    ],
  },

  philosophySection: {
    subtitle: 'Ma Philosophie',
    subtitleEn: 'My Philosophy',
    title: 'Pourquoi Cette Alliance Unique',
    titleEn: 'Why This Unique Alliance',
    paragraph1: 'Le monde du travail et le monde intérieur ne sont pas séparés. Transformer l\'un sans l\'autre crée déséquilibre et frustrations. Les transformer ensemble crée alignement et plénitude.',
    paragraph1En: 'The world of work and the inner world are not separate. Transforming one without the other creates imbalance and frustration. Transforming them together creates alignment and fulfillment.',
    paragraph2: 'Mon approche repose sur la conviction que <strong>l\'excellence professionnelle et le bien-être ne sont pas opposés</strong>. Ils se nourrissent mutuellement quand on sait créer les conditions justes.',
    paragraph2En: 'My approach is based on the conviction that <strong>professional excellence and well-being are not opposed</strong>. They feed each other when we know how to create the right conditions.',
    paragraph3: 'Les pratiques de hatha yoga classique notamment renforcent notre perception du monde qui nous entoure et nous procurent plus de clarté et de stabilité physique, mentale et émotionnelle pour prendre les meilleures décisions.',
    paragraph3En: 'Classical hatha yoga practices in particular strengthen our perception of the world around us and provide us with more clarity and physical, mental and emotional stability to make the best decisions.',
    paragraph4: 'C\'est cette alliance que j\'ai incarnée dans ma propre vie. Et c\'est cette alliance que j\'accompagne chez mes clients - qu\'ils soient des organisations ou des individus.',
    paragraph4En: 'It is this alliance that I have embodied in my own life. And it is this alliance that I support in my clients - whether they are organizations or individuals.',
  },

  ctaSection: {
    title: 'Travaillons Ensemble',
    titleEn: 'Let\'s Work Together',
    description: 'Que vous soyez une organisation ou un individu, explorons comment mon expertise peut servir votre transformation.',
    descriptionEn: 'Whether you are an organization or an individual, let\'s explore how my expertise can serve your transformation.',
    cta1Text: 'Services pour les organisations',
    cta1TextEn: 'Services for organizations',
    cta2Text: 'Coaching individuel',
    cta2TextEn: 'Individual coaching',
    cta3Text: 'Hatha Yoga Classique',
    cta3TextEn: 'Classical Hatha Yoga',
  },
}

// ============================================
// ORGANISATIONS PAGE CONTENT
// ============================================
const organisationsContent = {
  _id: 'organisationsPageContent',
  _type: 'organisationsPageContent',

  heroSection: {
    subtitle: 'Pour les Organisations',
    subtitleEn: 'For Organizations',
    title: 'Transformer Durablement Votre Organisation',
    titleEn: 'Sustainably Transform Your Organization',
    description: 'Un accompagnement qui allie excellence opérationnelle et dimension humaine profonde. Une approche éprouvée qui réconcilie performance et bien-être.',
    descriptionEn: 'Support that combines operational excellence and deep human dimension. A proven approach that reconciles performance and well-being.',
    primaryCtaText: 'Demander un devis',
    primaryCtaTextEn: 'Request a quote',
    secondaryCtaText: 'Nos programmes',
    secondaryCtaTextEn: 'Our programs',
  },

  servicesSection: {
    subtitle: 'Nos Services',
    subtitleEn: 'Our Services',
    title: 'Accompagnement Organisationnel',
    titleEn: 'Organizational Support',
    description: 'Des interventions adaptées à vos besoins, de la facilitation ponctuelle au programme de transformation complet.',
    descriptionEn: 'Interventions adapted to your needs, from one-time facilitation to complete transformation program.',
    services: [
      {
        _key: 'org-transformation',
        _type: 'orgServiceCard',
        title: 'Transformation Organisationnelle',
        titleEn: 'Organizational Transformation',
        description: 'Accompagnement global de votre organisation vers une culture de présence, collaboration et performance durable.',
        descriptionEn: 'Comprehensive support of your organization towards a culture of presence, collaboration and sustainable performance.',
        icon: 'transformation',
        color: 'morocco-blue',
        features: [
          { _key: 'tf-1', text: 'Diagnostic et co-création', textEn: 'Diagnosis and co-creation' },
          { _key: 'tf-2', text: 'Facilitation stratégique', textEn: 'Strategic facilitation' },
          { _key: 'tf-3', text: 'Conduite du changement', textEn: 'Change management' },
        ],
      },
      {
        _key: 'org-leadership',
        _type: 'orgServiceCard',
        title: 'Leadership Conscient',
        titleEn: 'Conscious Leadership',
        description: 'Développement du leadership à tous les niveaux, ancré dans la conscience de soi, l\'intelligence collective et des limites saines pour une performance durable.',
        descriptionEn: 'Leadership development at all levels, rooted in self-awareness, collective intelligence and healthy boundaries for sustainable performance.',
        icon: 'leadership',
        color: 'mystic-mauve',
        features: [
          { _key: 'lf-1', text: 'Coaching de dirigeants', textEn: 'Executive coaching' },
          { _key: 'lf-2', text: 'Séminaires leadership', textEn: 'Leadership seminars' },
          { _key: 'lf-3', text: 'Développement d\'équipes', textEn: 'Team development' },
        ],
      },
      {
        _key: 'org-retreats',
        _type: 'orgServiceCard',
        title: 'Retraites Corporates',
        titleEn: 'Corporate Retreats',
        description: 'Retraites sur-mesure au Maroc pour ressourcer vos équipes et renforcer la cohésion dans un cadre inspirant.',
        descriptionEn: 'Customized retreats in Morocco to rejuvenate your teams and strengthen cohesion in an inspiring setting.',
        icon: 'retreats',
        color: 'golden-orange',
        features: [
          { _key: 'rf-1', text: 'Séminaires stratégiques', textEn: 'Strategic seminars' },
          { _key: 'rf-2', text: 'Team building authentique', textEn: 'Authentic team building' },
          { _key: 'rf-3', text: 'Reconnexion & ressourcement', textEn: 'Reconnection & rejuvenation' },
        ],
      },
    ],
  },

  quoteSection: {
    subtitle: 'Demander un Devis',
    subtitleEn: 'Request a Quote',
    title: 'Discutons de Votre Projet',
    titleEn: 'Let\'s Discuss Your Project',
    description: 'Remplissez ce formulaire pour que nous puissions comprendre vos besoins et vous proposer un accompagnement sur-mesure.',
    descriptionEn: 'Fill out this form so we can understand your needs and offer you customized support.',
  },

  formLabels: {
    firstName: 'Prénom',
    firstNameEn: 'First Name',
    lastName: 'Nom',
    lastNameEn: 'Last Name',
    email: 'Email professionnel',
    emailEn: 'Professional Email',
    phone: 'Téléphone',
    phoneEn: 'Phone',
    organization: 'Nom de l\'organisation',
    organizationEn: 'Organization Name',
    size: 'Taille de l\'organisation',
    sizeEn: 'Organization Size',
    service: 'Type d\'accompagnement souhaité',
    serviceEn: 'Type of Support Desired',
    message: 'Décrivez votre projet',
    messageEn: 'Describe your project',
    submit: 'Envoyer ma demande',
    submitEn: 'Send my request',
    responseTime: 'Nous vous répondrons sous 48h pour planifier un premier échange.',
    responseTimeEn: 'We will respond within 48 hours to schedule an initial discussion.',
  },

  ctaSection: {
    title: 'Vous préférez en discuter directement ?',
    titleEn: 'Prefer to discuss it directly?',
    description: 'Réservez un appel découverte de 30 minutes pour explorer comment nous pouvons collaborer.',
    descriptionEn: 'Book a 30-minute discovery call to explore how we can collaborate.',
    buttonText: 'Réserver un appel',
    buttonTextEn: 'Book a call',
  },
}

// ============================================
// CONTACT PAGE CONTENT
// ============================================
const contactContent = {
  _id: 'contactPageContent',
  _type: 'contactPageContent',

  heroSection: {
    subtitle: 'Contact',
    subtitleEn: 'Contact',
    title: 'Entrons en Connexion',
    titleEn: 'Let\'s Connect',
    description: 'Que vous soyez une organisation, un·e professionnel·le ou un particulier, je suis là pour répondre à vos questions et explorer comment je peux vous accompagner.',
    descriptionEn: 'Whether you are an organization, a professional or an individual, I am here to answer your questions and explore how I can support you.',
    primaryCtaText: 'Me contacter',
    primaryCtaTextEn: 'Contact me',
  },

  methodsSection: {
    subtitle: 'Moyens de Contact',
    subtitleEn: 'Contact Methods',
    title: 'Entrer en Contact',
    titleEn: 'Get in Touch',
    email: 'hajar.habi@transcendencework.com',
    phone: '+212 6 00 00 00 00',
    phoneLabel: 'Téléphone',
    phoneLabelEn: 'Phone',
    linkedinUrl: 'https://www.linkedin.com/in/hajarhabi/',
    linkedinLabel: 'Voir mon profil LinkedIn',
    linkedinLabelEn: 'View my LinkedIn profile',
  },

  formSection: {
    subtitle: 'Formulaire de Contact',
    subtitleEn: 'Contact Form',
    title: 'Envoyez-Moi un Message',
    titleEn: 'Send Me a Message',
    description: 'Remplissez ce formulaire et je vous répondrai sous 48h.',
    descriptionEn: 'Fill out this form and I will respond within 48 hours.',
    firstNameLabel: 'Prénom',
    firstNameLabelEn: 'First Name',
    lastNameLabel: 'Nom',
    lastNameLabelEn: 'Last Name',
    emailLabel: 'Email',
    emailLabelEn: 'Email',
    phoneLabel: 'Téléphone',
    phoneLabelEn: 'Phone',
    organizationLabel: 'Organisation',
    organizationLabelEn: 'Organization',
    functionLabel: 'Fonction',
    functionLabelEn: 'Position',
    cityLabel: 'Ville',
    cityLabelEn: 'City',
    interestLabel: 'Je m\'intéresse à',
    interestLabelEn: 'I am interested in',
    messageLabel: 'Votre message',
    messageLabelEn: 'Your message',
    consentText: 'J\'accepte que mes données personnelles soient utilisées pour me recontacter concernant ma demande. Elles ne seront jamais partagées avec des tiers.',
    consentTextEn: 'I agree that my personal data may be used to contact me regarding my request. They will never be shared with third parties.',
    submitButton: 'Envoyer mon message',
    submitButtonEn: 'Send my message',
    responseTime: 'Vous recevrez une réponse sous 48h maximum.',
    responseTimeEn: 'You will receive a response within 48 hours.',
  },

  faqSection: {
    subtitle: 'Questions Fréquentes',
    subtitleEn: 'Frequently Asked Questions',
    title: 'Vous Vous Demandez...',
    titleEn: 'You May Wonder...',
    questions: [
      {
        _key: 'faq-1',
        _type: 'faqItem',
        question: 'Proposez-vous des sessions en ligne ?',
        questionEn: 'Do you offer online sessions?',
        answer: 'Oui ! La plupart de mes services sont disponibles en ligne via Zoom ou en personne à Casablanca. Les retraites se déroulent au Maroc dans des lieux inspirants.',
        answerEn: 'Yes! Most of my services are available online via Zoom or in person in Casablanca. Retreats take place in Morocco in inspiring locations.',
      },
      {
        _key: 'faq-2',
        _type: 'faqItem',
        question: 'Combien de temps dure un accompagnement ?',
        questionEn: 'How long does coaching last?',
        answer: 'Cela dépend de vos besoins. Un coaching peut être ponctuel (1-2 sessions) ou s\'étaler sur 3-6 mois. Nous en discutons ensemble lors de la session découverte pour trouver ce qui vous convient le mieux.',
        answerEn: 'It depends on your needs. Coaching can be one-time (1-2 sessions) or spread over 3-6 months. We discuss it together during the discovery session to find what suits you best.',
      },
      {
        _key: 'faq-3',
        _type: 'faqItem',
        question: 'Dois-je avoir de l\'expérience en yoga pour participer aux cours ?',
        questionEn: 'Do I need yoga experience to participate in classes?',
        answer: 'Pas du tout ! Mes cours sont ouverts à tous les niveaux, des débutants complets aux pratiquants expérimentés. Je propose même un cours d\'essai gratuit pour les nouveaux au yoga.',
        answerEn: 'Not at all! My classes are open to all levels, from complete beginners to experienced practitioners. I even offer a free trial class for those new to yoga.',
      },
      {
        _key: 'faq-4',
        _type: 'faqItem',
        question: 'Comment se passe la première session découverte ?',
        questionEn: 'How does the first discovery session work?',
        answer: 'C\'est une conversation gratuite de 30 minutes (en ligne ou en personne) pour faire connaissance, comprendre vos besoins et voir si nous sommes alignés pour travailler ensemble. Sans pression, juste une conversation honnête.',
        answerEn: 'It\'s a free 30-minute conversation (online or in person) to get to know each other, understand your needs and see if we are aligned to work together. No pressure, just an honest conversation.',
      },
    ],
  },

  socialSection: {
    title: 'Suivez-Moi sur les Réseaux',
    titleEn: 'Follow Me on Social Media',
    description: 'Inspirations quotidiennes, coulisses des retraites et pratiques guidées.',
    descriptionEn: 'Daily inspirations, behind-the-scenes of retreats and guided practices.',
    networks: [
      {
        _key: 'social-linkedin',
        _type: 'socialItem',
        platform: 'linkedin',
        url: 'https://www.linkedin.com/in/hajarhabi/',
        label: 'Hajar Habi',
      },
      {
        _key: 'social-instagram',
        _type: 'socialItem',
        platform: 'instagram',
        url: 'https://www.instagram.com/hajarhabi/',
        label: '@hajarhabi',
      },
    ],
  },
}

// ============================================
// RESSOURCES PAGE CONTENT
// ============================================
const ressourcesContent = {
  _id: 'ressourcesPageContent',
  _type: 'ressourcesPageContent',

  heroSection: {
    subtitle: 'Ressources',
    subtitleEn: 'Resources',
    title: 'Inspirations & Outils Gratuits',
    titleEn: 'Inspirations & Free Tools',
    description: 'Articles, guides pratiques et ressources pour approfondir votre chemin de transformation personnelle et professionnelle.',
    descriptionEn: 'Articles, practical guides and resources to deepen your path of personal and professional transformation.',
    primaryCtaText: 'Explorer les ressources',
    primaryCtaTextEn: 'Explore resources',
  },

  blogSection: {
    subtitle: 'Blog',
    subtitleEn: 'Blog',
    title: 'Articles & Réflexions',
    titleEn: 'Articles & Reflections',
    description: 'Inspirations, pratiques et réflexions sur le yoga, le coaching et la transformation.',
    descriptionEn: 'Inspirations, practices and reflections on yoga, coaching and transformation.',
    readArticleText: 'Lire l\'article →',
    readArticleTextEn: 'Read article →',
    viewAllText: 'Voir tous les articles',
    viewAllTextEn: 'View all articles',
  },

  guidesSection: {
    subtitle: 'Téléchargements Gratuits',
    subtitleEn: 'Free Downloads',
    title: 'Guides & E-books',
    titleEn: 'Guides & E-books',
    description: 'Des ressources pratiques à télécharger pour approfondir votre pratique.',
    descriptionEn: 'Practical resources to download to deepen your practice.',
    guides: [
      {
        _key: 'guide-meditation',
        _type: 'guideItem',
        title: 'Guide : Méditation pour Débutants',
        titleEn: 'Guide: Meditation for Beginners',
        description: 'Un guide complet de 20 pages pour commencer la méditation en douceur, avec des exercices pratiques.',
        descriptionEn: 'A complete 20-page guide to start meditation gently, with practical exercises.',
        pages: '20 pages',
        pagesEn: '20 pages',
      },
      {
        _key: 'guide-contemplative',
        _type: 'guideItem',
        title: 'E-book : 7 Jours de Pratiques Contemplatives',
        titleEn: 'E-book: 7 Days of Contemplative Practices',
        description: 'Un programme de 7 jours avec des pratiques guidées pour vous reconnecter à vous-même.',
        descriptionEn: 'A 7-day program with guided practices to reconnect with yourself.',
        pages: '35 pages',
        pagesEn: '35 pages',
      },
      {
        _key: 'guide-retreat',
        _type: 'guideItem',
        title: 'Check-list : Préparer Sa Retraite Yoga',
        titleEn: 'Checklist: Preparing Your Yoga Retreat',
        description: 'Tout ce dont vous avez besoin pour préparer sereinement votre première retraite de yoga.',
        descriptionEn: 'Everything you need to peacefully prepare for your first yoga retreat.',
        pages: '5 pages',
        pagesEn: '5 pages',
      },
    ],
    downloadButtonText: 'Télécharger gratuitement',
    downloadButtonTextEn: 'Download for free',
  },

  testimonialsSection: {
    subtitle: 'Témoignages',
    subtitleEn: 'Testimonials',
    title: 'Ce Que Disent Mes Clients',
    titleEn: 'What My Clients Say',
    description: 'Découvrez les retours d\'expérience de personnes qui ont transformé leur vie professionnelle et personnelle.',
    descriptionEn: 'Discover the feedback from people who have transformed their professional and personal lives.',
  },

  newsletterSection: {
    title: 'Restez Inspiré·e',
    titleEn: 'Stay Inspired',
    description: 'Inscrivez-vous à ma newsletter mensuelle pour recevoir des inspirations, des pratiques guidées et les actualités des prochains programmes.',
    descriptionEn: 'Subscribe to my monthly newsletter to receive inspirations, guided practices and news about upcoming programs.',
    placeholder: 'Votre email',
    placeholderEn: 'Your email',
    submitText: 'S\'inscrire',
    submitTextEn: 'Subscribe',
    disclaimer: 'Pas de spam. Désabonnement possible à tout moment.',
    disclaimerEn: 'No spam. Unsubscribe at any time.',
  },
}

// ============================================
// MIGRATION FUNCTIONS
// ============================================

async function migrateDocument(doc, name) {
  const existing = await client.fetch(`*[_id == "${doc._id}"][0]`)

  if (existing) {
    console.log(`  ⚠️  ${name} existe déjà, mise à jour...`)
    await client.createOrReplace(doc)
    console.log(`  ✅ ${name} mis à jour`)
  } else {
    console.log(`  📝 Création ${name}...`)
    await client.create(doc)
    console.log(`  ✅ ${name} créé`)
  }
}

async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗')
  console.log('║     MIGRATION DE TOUTES LES PAGES VERS SANITY              ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  try {
    console.log('📄 Page Coaching:')
    await migrateDocument(coachingContent, 'Coaching')

    console.log('\n📄 Page Expertise:')
    await migrateDocument(expertiseContent, 'Expertise')

    console.log('\n📄 Page Organisations:')
    await migrateDocument(organisationsContent, 'Organisations')

    console.log('\n📄 Page Contact:')
    await migrateDocument(contactContent, 'Contact')

    console.log('\n📄 Page Ressources:')
    await migrateDocument(ressourcesContent, 'Ressources')

    console.log('\n╔════════════════════════════════════════════════════════════╗')
    console.log('║                    MIGRATION TERMINÉE                      ║')
    console.log('╚════════════════════════════════════════════════════════════╝')
    console.log('\n📊 Résumé:')
    console.log('  ┌─────────────────────────────────────────┐')
    console.log('  │ ✅ Page Coaching                        │')
    console.log('  │ ✅ Page Expertise                       │')
    console.log('  │ ✅ Page Organisations                   │')
    console.log('  │ ✅ Page Contact                         │')
    console.log('  │ ✅ Page Ressources                      │')
    console.log('  └─────────────────────────────────────────┘')
    console.log('\n💡 Note: La page Programmes (Yoga) nécessite une')
    console.log('   migration séparée en raison de sa complexité.')
    console.log('\n🔄 Rechargez Sanity Studio pour voir les changements.')

  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error)
    process.exit(1)
  }
}

main()
