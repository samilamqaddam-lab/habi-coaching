const siteUrl = 'https://www.transcendencework.com'

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteUrl}/#organization`,
  name: 'Transcendence Work',
  alternateName: 'Hajar Habi - Coaching & Yoga',
  description: 'Coaching professionnel et yoga traditionnel à Casablanca. Accompagnement individuel et transformation des organisations.',
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  image: `${siteUrl}/images/Reel/hajar-professional.jpg`,
  email: 'contact@transcendencework.com',
  telephone: '+212663096857',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Casablanca',
    addressCountry: 'MA',
  },
  priceRange: '$$',
  areaServed: {
    '@type': 'Country',
    name: 'Morocco',
  },
  sameAs: [
    'https://www.linkedin.com/in/hajar-habi/',
    'https://open.spotify.com/show/3c1fH8hzdIRcFVwRGYQClR',
  ],
}

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteUrl}/#person`,
  name: 'Hajar Habi',
  jobTitle: ['Coach Professionnelle', 'Professeure de Hatha Yoga'],
  description: 'Experte en coaching professionnel et pratiques yogiques traditionnelles avec ≃20 ans d\'expérience corporate.',
  image: `${siteUrl}/images/Reel/hajar-professional.jpg`,
  url: siteUrl,
  worksFor: {
    '@id': `${siteUrl}/#organization`,
  },
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Coach & Team - Transformance Pro',
      credentialCategory: 'Professional Certification',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Hatha Yoga Classique - Sadhguru Gurukulam',
      credentialCategory: 'Professional Certification',
      educationalLevel: '1750 heures de formation',
    },
  ],
  knowsAbout: [
    'Coaching professionnel',
    'Hatha Yoga',
    'Transformation personnelle',
    'Leadership',
  ],
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: 'Transcendence Work',
  description: 'Coaching professionnel et yoga traditionnel par Hajar Habi',
  inLanguage: ['fr', 'en'],
  publisher: {
    '@id': `${siteUrl}/#organization`,
  },
}

export function getFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function getServiceSchema(service: {
  name: string
  description: string
  provider?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@id': `${siteUrl}/#organization`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Morocco',
    },
  }
}
