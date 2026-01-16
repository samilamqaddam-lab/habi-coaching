import { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import Section from '@/components/sections/Section'
import ArticleCard from '@/components/blog/ArticleCard'
import { client } from '@/lib/sanity'
import { articlesQuery, heroByPageQuery } from '@/lib/sanity.queries'

export const revalidate = 60 // Revalidate every minute

export const metadata: Metadata = {
  title: 'Blog - Articles & Inspirations',
  description: 'Articles sur le yoga, le coaching, le leadership et le bien-être au travail.',
  openGraph: {
    title: 'Blog - Articles & Inspirations | Transcendence Work',
    description: 'Articles sur le yoga, le coaching, le leadership et le bien-être au travail.',
    images: [
      {
        url: '/images/heroes/ressources-notebook-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog - Transcendence Work',
      },
    ],
  },
}

interface Article {
  _id: string
  title: string
  titleEn?: string
  slug: { current: string }
  excerpt?: string
  excerptEn?: string
  featuredImage?: {
    asset: { _ref: string }
    alt?: string
  }
  category?: string
  publishedAt?: string
  readTime?: number
  featured?: boolean
  author?: {
    name: string
    photo?: { asset: { _ref: string } }
  }
}

interface HeroData {
  title?: string
  subtitle?: string
  description?: string
  theme?: 'yoga' | 'coaching' | 'corporate' | 'default'
}

async function getArticles(): Promise<Article[]> {
  return await client.fetch(articlesQuery)
}

async function getHero(): Promise<HeroData | null> {
  return await client.fetch(heroByPageQuery, { page: 'ressources' })
}

export default async function BlogPage() {
  const [articles, hero] = await Promise.all([getArticles(), getHero()])

  const featuredArticle = articles.find((a) => a.featured)
  const regularArticles = articles.filter((a) => !a.featured || a._id !== featuredArticle?._id)

  return (
    <>
      <Hero
        subtitle="Blog"
        title={hero?.title || 'Ressources & Inspirations'}
        description={
          hero?.description ||
          'Explorez nos articles sur le yoga, le coaching, le leadership et le bien-être.'
        }
        primaryCTA={{
          text: 'Explorer les articles',
          href: '#articles',
        }}
        theme="default"
        compact
        centered
      />

      <Section background="beige" padding="lg" afterHero>
        <div id="articles" className="max-w-6xl mx-auto">
          {/* Featured Article */}
          {featuredArticle && (
            <div className="mb-16">
              <h2 className="text-sm font-medium text-terracotta uppercase tracking-wider mb-6">
                Article à la une
              </h2>
              <ArticleCard article={featuredArticle} featured />
            </div>
          )}

          {/* Articles Grid */}
          {regularArticles.length > 0 ? (
            <>
              <h2 className="text-sm font-medium text-terracotta uppercase tracking-wider mb-6">
                Tous les articles
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularArticles.map((article) => (
                  <ArticleCard key={article._id} article={article} />
                ))}
              </div>
            </>
          ) : (
            !featuredArticle && (
              <div className="text-center py-16">
                <p className="text-text-secondary text-lg">
                  Aucun article pour le moment. Revenez bientôt !
                </p>
              </div>
            )
          )}
        </div>
      </Section>
    </>
  )
}
