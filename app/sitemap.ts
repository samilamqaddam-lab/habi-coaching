import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'
import { articlesQuery, programmesQuery } from '@/lib/sanity.queries'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

const BASE_URL = 'https://transcendencework.com'

interface Article {
  slug: { current: string }
  publishedAt?: string
}

interface Programme {
  slug: { current: string }
}

// Programme yoga keys (pages dédiées)
const YOGA_PROGRAMMES = [
  'upa-yoga',
  'surya-kriya',
  'angamardana',
  'yogasanas',
  'surya-shakti',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages - Services principaux
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/coaching`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/yoga`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/organisations`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ressources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/expertise`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Pages légales
  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/confidentialite`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cgv`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Pages programmes yoga dédiées
  const yogaProgrammePages: MetadataRoute.Sitemap = YOGA_PROGRAMMES.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Fetch dynamic content from Sanity
  const [articles, programmes] = await Promise.all([
    client.fetch<Article[]>(articlesQuery).catch(() => [] as Article[]),
    client.fetch<Programme[]>(programmesQuery).catch(() => [] as Programme[]),
  ])

  // Article pages
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug.current}`,
    lastModified: article.publishedAt ? new Date(article.publishedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Fetch events from Supabase
  let eventPages: MetadataRoute.Sitemap = []
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data: events } = await supabase
        .from('yoga_events')
        .select('id, created_at')
        .eq('is_active', true)
        .gte('date_time', new Date().toISOString())

      if (events) {
        eventPages = events.map((event) => ({
          url: `${BASE_URL}/evenements/${event.id}`,
          lastModified: new Date(event.created_at),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }))
      }
    } catch (error) {
      console.error('Error fetching events for sitemap:', error)
    }
  }

  return [
    ...staticPages,
    ...yogaProgrammePages,
    ...legalPages,
    ...articlePages,
    ...eventPages,
  ]
}
