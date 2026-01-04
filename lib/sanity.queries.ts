import { groq } from 'next-sanity'

// Programmes queries
export const programmesQuery = groq`
  *[_type == "programme" && isPublished == true] | order(order asc) {
    _id,
    title,
    titleEn,
    slug,
    type,
    category,
    description,
    descriptionEn,
    image {
      asset->,
      alt
    },
    location,
    duration,
    schedule,
    dates,
    price,
    highlights,
    highlightsEn,
    spotsAvailable,
    maxParticipants,
    bySadhguru,
    instructor-> {
      name,
      photo
    }
  }
`

export const programmeBySlugQuery = groq`
  *[_type == "programme" && slug.current == $slug][0] {
    _id,
    title,
    titleEn,
    slug,
    type,
    category,
    description,
    descriptionEn,
    fullDescription,
    image {
      asset->,
      alt
    },
    location,
    duration,
    schedule,
    dates,
    price,
    highlights,
    highlightsEn,
    spotsAvailable,
    maxParticipants,
    bySadhguru,
    instructor-> {
      name,
      role,
      photo,
      bio
    }
  }
`

// Testimonials queries
export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    quote,
    quoteEn,
    author,
    initial,
    role,
    roleEn,
    image,
    serviceType,
    featured,
    rating
  }
`

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(order asc) {
    _id,
    quote,
    quoteEn,
    author,
    initial,
    role,
    roleEn,
    image,
    serviceType,
    rating
  }
`

// Hero sections query
export const heroByPageQuery = groq`
  *[_type == "heroSection" && page == $page][0] {
    _id,
    title,
    titleEn,
    titleLine2,
    titleLine2En,
    titleSuffix,
    titleSuffixEn,
    subtitle,
    subtitleEn,
    description,
    descriptionEn,
    primaryCTA,
    secondaryCTA,
    theme,
    layout,
    displayMode,
    splitImage {
      asset->,
      hotspot
    },
    backgroundImage
  }
`

// Articles queries
export const articlesQuery = groq`
  *[_type == "article" && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    title,
    titleEn,
    slug,
    excerpt,
    excerptEn,
    featuredImage {
      asset->,
      alt
    },
    category,
    publishedAt,
    readTime,
    featured,
    author-> {
      name,
      photo
    }
  }
`

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    titleEn,
    slug,
    excerpt,
    excerptEn,
    content,
    featuredImage {
      asset->,
      alt
    },
    category,
    publishedAt,
    readTime,
    featured,
    seo,
    author-> {
      name,
      role,
      photo,
      bio
    }
  }
`

export const featuredArticlesQuery = groq`
  *[_type == "article" && featured == true && defined(publishedAt)] | order(publishedAt desc)[0...3] {
    _id,
    title,
    titleEn,
    slug,
    excerpt,
    excerptEn,
    featuredImage {
      asset->,
      alt
    },
    category,
    publishedAt,
    readTime,
    author-> {
      name,
      photo
    }
  }
`

// Instructor query
export const instructorQuery = groq`
  *[_type == "instructor"][0] {
    _id,
    name,
    role,
    bio,
    photo {
      asset->,
      hotspot
    },
    specialties,
    certifications,
    experience
  }
`

// Site settings query
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    siteName,
    siteDescription,
    siteDescriptionEn,
    logo,
    socialLinks,
    contactEmail,
    contactPhone,
    address,
    calcomUsername
  }
`

// Homepage content query
export const homepageContentQuery = groq`
  *[_type == "homepageContent"][0] {
    _id,
    expertiseSection {
      subtitle,
      subtitleEn,
      title,
      titleEn,
      description,
      descriptionEn,
      cards[] {
        title,
        titleEn,
        highlight,
        highlightEn,
        description,
        descriptionEn,
        icon,
        color
      }
    },
    aboutSection {
      badge,
      badgeEn,
      title,
      titleEn,
      description,
      descriptionEn,
      ctaText,
      ctaTextEn,
      image {
        asset->,
        alt
      }
    },
    servicesSection {
      subtitle,
      subtitleEn,
      title,
      titleEn,
      services[] {
        title,
        titleEn,
        description,
        descriptionEn,
        ctaText,
        ctaTextEn,
        link,
        icon,
        color
      }
    },
    ctaSection {
      title,
      titleEn,
      description,
      descriptionEn,
      primaryCTA {
        text,
        textEn,
        link
      },
      secondaryCTA {
        text,
        textEn,
        link
      }
    }
  }
`
