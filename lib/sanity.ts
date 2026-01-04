import { createClient } from '@sanity/client'
import {
  programmesQuery,
  programmeBySlugQuery,
  testimonialsQuery,
  featuredTestimonialsQuery,
  instructorQuery,
  heroByPageQuery,
  articlesQuery,
  articleBySlugQuery,
  featuredArticlesQuery,
  siteSettingsQuery,
} from './sanity.queries'
import type {
  Programme,
  Testimonial,
  Instructor,
  HeroSection,
  Article,
} from './sanity.types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
})

// Client with write access (for preview/mutations)
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Helper to check if Sanity is configured
export const isSanityConfigured = () => {
  return !!projectId
}

// ============================================
// FETCH FUNCTIONS
// ============================================

// Programmes
export async function getProgrammes(): Promise<Programme[]> {
  return client.fetch(programmesQuery)
}

export async function getProgrammesByType(type: Programme['type']): Promise<Programme[]> {
  const allProgrammes = await getProgrammes()
  return allProgrammes.filter((p) => p.type === type)
}

export async function getProgrammeBySlug(slug: string): Promise<Programme | null> {
  return client.fetch(programmeBySlugQuery, { slug })
}

// Testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch(testimonialsQuery)
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  return client.fetch(featuredTestimonialsQuery)
}

// Instructor
export async function getInstructor(): Promise<Instructor | null> {
  return client.fetch(instructorQuery)
}

// Hero Sections
export async function getHeroByPage(page: string): Promise<HeroSection | null> {
  return client.fetch(heroByPageQuery, { page })
}

// Articles
export async function getArticles(): Promise<Article[]> {
  return client.fetch(articlesQuery)
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return client.fetch(articleBySlugQuery, { slug })
}

export async function getFeaturedArticles(): Promise<Article[]> {
  return client.fetch(featuredArticlesQuery)
}

// Site Settings
export async function getSiteSettings() {
  return client.fetch(siteSettingsQuery)
}
