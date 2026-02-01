import { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import Section from '@/components/sections/Section'
import ArticleCard from '@/components/blog/ArticleCard'
import type { Article } from '@/lib/types'

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

async function getArticles(): Promise<Article[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/articles?limit=50`, {
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      console.error('Failed to fetch articles:', response.status)
      return []
    }

    const data = await response.json()
    return data.articles || []
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

export default async function BlogPage() {
  const articles = await getArticles()

  const featuredArticle = articles.find((a) => a.featured)
  const regularArticles = articles.filter((a) => !a.featured || a.id !== featuredArticle?.id)

  return (
    <>
      <Hero
        subtitle="Blog"
        title="Ressources & Inspirations"
        description="Explorez nos articles sur le yoga, le coaching, le leadership et le bien-être."
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
              <ArticleCard article={featuredArticle} locale="fr" featured />
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
                  <ArticleCard key={article.id} article={article} locale="fr" />
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
