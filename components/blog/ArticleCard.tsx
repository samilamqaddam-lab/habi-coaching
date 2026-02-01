import Link from 'next/link';
import { TagBadgeList } from '@/components/ui/TagBadge';
import type { Article } from '@/lib/types';

interface ArticleCardProps {
  article: Article;
  locale?: string;
  featured?: boolean;
}

export default function ArticleCard({ article, locale = 'fr', featured = false }: ArticleCardProps) {
  const formattedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : new Date(article.created_at).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

  // Use thumbnail_url or featured_image_url as fallback
  const imageUrl = article.thumbnail_url || article.featured_image_url;

  return (
    <Link href={`/blog/${article.slug}`} className="group block h-full">
      <article
        className={`bg-warm-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col ${
          featured ? 'md:flex-row' : ''
        }`}
      >
        {/* Image */}
        {imageUrl && (
          <div
            className={`relative overflow-hidden ${
              featured ? 'md:w-1/2 h-64 md:h-auto' : 'h-48'
            }`}
          >
            <img
              src={imageUrl}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {article.tags && article.tags.length > 0 && (
              <div className="absolute top-4 left-4">
                <TagBadgeList tags={[article.tags[0]]} limit={1} size="sm" />
              </div>
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
            {article.title}
          </h3>

          {article.excerpt && (
            <p className={`text-text-secondary flex-grow ${featured ? 'text-base mb-6' : 'text-sm mb-4 line-clamp-2'}`}>
              {article.excerpt}
            </p>
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mb-4">
              <TagBadgeList tags={article.tags} limit={3} size="sm" />
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center justify-between text-sm text-text-secondary mt-auto pt-4 border-t border-soft-gray/30">
            <div className="flex items-center gap-4">
              <span>{formattedDate}</span>
              {article.read_time_minutes && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {article.read_time_minutes} min
                </span>
              )}
            </div>

            <span className="text-xs">
              {locale === 'fr' ? 'Par' : 'By'} {article.author_name}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
