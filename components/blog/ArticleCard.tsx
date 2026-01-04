import Image from 'next/image'
import Link from 'next/link'
import { imagePresets } from '@/lib/sanity.image'

interface ArticleCardProps {
  article: {
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
    author?: {
      name: string
      photo?: { asset: { _ref: string } }
    }
  }
  locale?: string
  featured?: boolean
}

const categoryLabels: Record<string, { fr: string; en: string }> = {
  wellness: { fr: 'Bien-être', en: 'Wellness' },
  yoga: { fr: 'Yoga', en: 'Yoga' },
  coaching: { fr: 'Coaching', en: 'Coaching' },
  leadership: { fr: 'Leadership', en: 'Leadership' },
  'personal-growth': { fr: 'Développement personnel', en: 'Personal Growth' },
}

export default function ArticleCard({ article, locale = 'fr', featured = false }: ArticleCardProps) {
  const title = locale === 'en' && article.titleEn ? article.titleEn : article.title
  const excerpt = locale === 'en' && article.excerptEn ? article.excerptEn : article.excerpt
  const categoryLabel = article.category
    ? categoryLabels[article.category]?.[locale as 'fr' | 'en'] || article.category
    : null

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <Link href={`/blog/${article.slug.current}`} className="group block h-full">
      <article
        className={`bg-warm-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col ${
          featured ? 'md:flex-row' : ''
        }`}
      >
        {/* Image */}
        {article.featuredImage?.asset && (
          <div
            className={`relative overflow-hidden ${
              featured ? 'md:w-1/2 h-64 md:h-auto' : 'h-48'
            }`}
          >
            <Image
              src={imagePresets.card(article.featuredImage).url()}
              alt={article.featuredImage.alt || title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {categoryLabel && (
              <span className="absolute top-4 left-4 bg-terracotta text-warm-white text-xs font-medium px-3 py-1 rounded-full">
                {categoryLabel}
              </span>
            )}
          </div>
        )}

        {/* Content */}
        <div className={`p-6 flex flex-col flex-grow ${featured ? 'md:w-1/2 md:p-8' : ''}`}>
          <h3
            className={`font-heading font-bold text-deep-blue group-hover:text-terracotta transition-colors ${
              featured ? 'text-2xl md:text-3xl mb-4' : 'text-xl mb-3'
            }`}
          >
            {title}
          </h3>

          {excerpt && (
            <p className={`text-text-secondary flex-grow ${featured ? 'text-base mb-6' : 'text-sm mb-4 line-clamp-2'}`}>
              {excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center justify-between text-sm text-text-secondary mt-auto pt-4 border-t border-soft-gray/30">
            <div className="flex items-center gap-4">
              {formattedDate && <span>{formattedDate}</span>}
              {article.readTime && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {article.readTime} min
                </span>
              )}
            </div>

            {article.author && (
              <span className="text-xs">
                {locale === 'fr' ? 'Par' : 'By'} {article.author.name}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
