// Sanity Types for TypeScript

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface SanityPrice {
  amount: number
  currency: 'EUR' | 'MAD' | 'USD'
  unit: 'session' | 'month' | 'total' | 'person'
  note?: string
}

export interface SanityDates {
  start: string
  end: string
}

export interface Programme {
  _id: string
  title: string
  titleEn?: string
  slug: { current: string }
  type: 'class' | 'retreat' | 'workshop' | 'training'
  category: 'yoga' | 'coaching' | 'corporate'
  description: string
  descriptionEn?: string
  image?: SanityImage
  location?: string
  duration: string
  schedule?: string
  dates?: SanityDates
  price: SanityPrice
  highlights?: string[]
  highlightsEn?: string[]
  spotsAvailable?: number
  maxParticipants?: number
  bySadhguru: boolean
  isPublished: boolean
  order: number
  instructor?: {
    name: string
    photo?: SanityImage
  }
}

export interface Testimonial {
  _id: string
  quote: string
  quoteEn?: string
  author: string
  initial: string
  role: string
  roleEn?: string
  image?: SanityImage
  serviceType: 'yoga' | 'coaching' | 'retreat' | 'corporate'
  featured: boolean
  rating: number
  order: number
}

export interface Instructor {
  _id: string
  name: string
  role: string
  bio?: string
  photo?: SanityImage
  specialties: string[]
  certifications: Array<{
    title: string
    organization: string
    year: number
  }>
  experience: number
}

export interface HeroSection {
  _id: string
  page: string
  title: string
  titleEn?: string
  titleLine2?: string
  titleLine2En?: string
  titleSuffix?: string
  titleSuffixEn?: string
  subtitle?: string
  subtitleEn?: string
  description: string
  descriptionEn?: string
  primaryCTA?: {
    text: string
    textEn?: string
    href: string
  }
  secondaryCTA?: {
    text: string
    textEn?: string
    href: string
  }
  theme: 'yoga' | 'coaching' | 'corporate' | 'default'
  layout: 'centered' | 'split'
  displayMode: 'minimal' | 'compact' | 'default'
  splitImage?: SanityImage
  backgroundImage?: SanityImage
}

export interface Article {
  _id: string
  title: string
  titleEn?: string
  slug: { current: string }
  excerpt: string
  excerptEn?: string
  content?: unknown[] // Block content
  featuredImage?: SanityImage
  category: string
  publishedAt: string
  readTime: number
  featured: boolean
  author?: {
    name: string
    photo?: SanityImage
  }
}
