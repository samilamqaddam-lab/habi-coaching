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

export function getCourseSchema(course: {
  name: string
  description: string
  duration?: string
  price?: number
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.description,
    provider: {
      '@id': `${siteUrl}/#organization`,
    },
    instructor: {
      '@id': `${siteUrl}/#person`,
    },
    ...(course.image && { image: `${siteUrl}${course.image}` }),
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      location: {
        '@type': 'Place',
        name: 'Studio Shido Mind',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '36B boulevard d\'Anfa, 5ème étage, Appartement 54',
          addressLocality: 'Casablanca',
          addressCountry: 'MA',
        },
      },
    },
    ...(course.price && {
      offers: {
        '@type': 'Offer',
        price: course.price,
        priceCurrency: 'MAD',
        availability: 'https://schema.org/InStock',
      },
    }),
  }
}

export function getEventSchema(event: {
  name: string
  description: string
  startDate: string
  endDate?: string
  price?: number
  location?: string
  image?: string
  availableSpots?: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    ...(event.endDate && { endDate: event.endDate }),
    ...(event.image && { image: `${siteUrl}${event.image}` }),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: event.location || 'Studio Shido Mind',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '36B boulevard d\'Anfa',
        addressLocality: 'Casablanca',
        addressCountry: 'MA',
      },
    },
    organizer: {
      '@id': `${siteUrl}/#organization`,
    },
    performer: {
      '@id': `${siteUrl}/#person`,
    },
    ...(event.price !== undefined && {
      offers: {
        '@type': 'Offer',
        price: event.price,
        priceCurrency: 'MAD',
        availability: event.availableSpots && event.availableSpots > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/SoldOut',
        validFrom: new Date().toISOString(),
      },
    }),
  }
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
