import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText, PortableTextBlock } from '@portabletext/react'
import Section from '@/components/sections/Section'
import Button from '@/components/ui/Button'
import { client } from '@/lib/sanity'
import { articleBySlugQuery, articlesQuery } from '@/lib/sanity.queries'
import { imagePresets } from '@/lib/sanity.image'
import { portableTextComponents } from '@/components/blog/PortableTextComponents'

export const revalidate = 60

interface Article {
  _id: string
  title: string
  titleEn?: string
  slug: { current: string }
  excerpt?: string
  excerptEn?: string
  content?: PortableTextBlock[]
  featuredImage?: {
    asset: { _ref: string }
    alt?: string
  }
  category?: string
  publishedAt?: string
  readTime?: number
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
  author?: {
    name: string
    role?: string
    photo?: { asset: { _ref: string } }
    bio?: string
  }
}

interface PageProps {
  params: Promise<{ slug: string }>
}

const categoryLabels: Record<string, string> = {
  wellness: 'Bien-être',
  yoga: 'Yoga',
  coaching: 'Coaching',
  leadership: 'Leadership',
  'personal-growth': 'Développement personnel',
}

async function getArticle(slug: string): Promise<Article | null> {
  return await client.fetch(articleBySlugQuery, { slug })
}

async function getRelatedArticles(currentId: string, category?: string): Promise<Article[]> {
  const articles = await client.fetch(articlesQuery)
  return articles
    .filter((a: Article) => a._id !== currentId)
    .filter((a: Article) => !category || a.category === category)
    .slice(0, 3)
}

export async function generateStaticParams() {
  const articles = await client.fetch(articlesQuery)
  return articles.map((article: Article) => ({
    slug: article.slug.current,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return {
      title: 'Article non trouvé | Transcendence Work',
    }
  }

  return {
    title: article.seo?.metaTitle || `${article.title} | Transcendence Work`,
    description: article.seo?.metaDescription || article.excerpt,
    keywords: article.seo?.keywords,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: article.author?.name ? [article.author.name] : undefined,
      images: article.featuredImage?.asset
        ? [imagePresets.blogFeatured(article.featuredImage).url()]
        : undefined,
    },
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = await getRelatedArticles(article._id, article.category)

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <>
      {/* Hero Banner */}
      <div className="relative h-[50vh] min-h-[400px] bg-deep-blue">
        {article.featuredImage?.asset && (
          <Image
            src={imagePresets.hero(article.featuredImage).url()}
            alt={article.featuredImage.alt || article.title}
            fill
            className="object-cover opacity-40"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/90 to-transparent" />

        <div className="relative h-full container-custom flex flex-col justify-end pb-12">
          {/* Back link */}
          <Link
            href="/blog"
            className="absolute top-8 left-0 text-warm-white/80 hover:text-warm-white flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour au blog
          </Link>

          {/* Category */}
          {article.category && (
            <span className="inline-block bg-terracotta text-warm-white text-sm font-medium px-4 py-1 rounded-full mb-4 w-fit">
              {categoryLabels[article.category] || article.category}
            </span>
          )}

          {/* Title */}
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-warm-white max-w-4xl">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mt-6 text-warm-white/80">
            {article.author && (
              <div className="flex items-center gap-3">
                {article.author.photo?.asset && (
                  <Image
                    src={imagePresets.avatar(article.author.photo).url()}
                    alt={article.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium text-warm-white">{article.author.name}</p>
                  {article.author.role && <p className="text-sm">{article.author.role}</p>}
                </div>
              </div>
            )}

            <span className="hidden md:block text-warm-white/40">|</span>

            {formattedDate && <span>{formattedDate}</span>}

            {article.readTime && (
              <>
                <span className="text-warm-white/40">|</span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {article.readTime} min de lecture
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <Section background="white" padding="lg">
        <div className="max-w-3xl mx-auto">
          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-xl text-text-secondary leading-relaxed mb-12 font-medium">
              {article.excerpt}
            </p>
          )}

          {/* Content */}
          {article.content && (
            <div className="prose prose-lg max-w-none">
              <PortableText value={article.content} components={portableTextComponents} />
            </div>
          )}

          {/* Author Bio */}
          {article.author?.bio && (
            <div className="mt-16 pt-8 border-t border-soft-gray/30">
              <div className="flex items-start gap-6 bg-dune-beige/20 rounded-2xl p-6">
                {article.author.photo?.asset && (
                  <Image
                    src={imagePresets.avatar(article.author.photo).url()}
                    alt={article.author.name}
                    width={80}
                    height={80}
                    className="rounded-full flex-shrink-0"
                  />
                )}
                <div>
                  <p className="text-sm text-terracotta font-medium mb-1">À propos de l&apos;auteur</p>
                  <h4 className="font-heading text-xl font-bold text-deep-blue mb-2">
                    {article.author.name}
                  </h4>
                  <p className="text-text-secondary">{article.author.bio}</p>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 text-center bg-gradient-to-r from-terracotta/10 to-sage/10 rounded-2xl p-8">
            <h3 className="font-heading text-2xl font-bold text-deep-blue mb-3">
              Cet article vous a inspiré ?
            </h3>
            <p className="text-text-secondary mb-6">
              Découvrez comment le coaching et le yoga peuvent transformer votre quotidien.
            </p>
            <Button variant="primary" href="/contact">
              Prendre rendez-vous
            </Button>
          </div>
        </div>
      </Section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <Section background="beige" padding="lg">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-deep-blue mb-8 text-center">
              Articles similaires
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((related) => (
                <Link
                  key={related._id}
                  href={`/blog/${related.slug.current}`}
                  className="group bg-warm-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                >
                  {related.featuredImage?.asset && (
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={imagePresets.thumbnail(related.featuredImage).url()}
                        alt={related.featuredImage.alt || related.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-deep-blue group-hover:text-terracotta transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    {related.readTime && (
                      <p className="text-sm text-text-secondary mt-2">{related.readTime} min</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button variant="outline" href="/blog">
                Voir tous les articles
              </Button>
            </div>
          </div>
        </Section>
      )}
    </>
  )
}
