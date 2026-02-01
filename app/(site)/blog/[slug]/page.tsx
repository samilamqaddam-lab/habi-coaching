import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Section from '@/components/sections/Section';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { TagBadgeList } from '@/components/ui/TagBadge';
import type { Article } from '@/lib/types';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getArticle(slug: string): Promise<Article | null> {
  try {
    // Use appropriate URL based on environment
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ||
                    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    const response = await fetch(
      `${baseUrl}/api/articles/${slug}`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      console.error(`Article fetch failed: ${response.status} for slug: ${slug}`);
      return null;
    }

    const data = await response.json();
    return data.article;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

async function getRelatedArticles(currentId: string, tags?: string[]): Promise<Article[]> {
  try {
    const params = new URLSearchParams();
    if (tags && tags.length > 0) {
      tags.forEach((tag) => params.append('tags[]', tag));
    }
    params.set('limit', '3');

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ||
                    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    const response = await fetch(
      `${baseUrl}/api/articles?${params}`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) return [];

    const data = await response.json();
    return (data.articles || []).filter((a: Article) => a.id !== currentId);
  } catch (error) {
    console.error('Error fetching related articles:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: 'Article non trouvé | Transcendence Work',
    };
  }

  return {
    title: `${article.title} | Transcendence Work`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.published_at || article.created_at,
      authors: article.author_name ? [article.author_name] : undefined,
      images: article.featured_image_url ? [article.featured_image_url] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(article.id, article.tags);

  const formattedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : new Date(article.created_at).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

  return (
    <>
      {/* Hero Banner */}
      <div className="relative h-[50vh] min-h-[400px] bg-deep-blue">
        {article.featured_image_url && (
          <img
            src={article.featured_image_url}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/90 to-transparent" />

        <div className="relative h-full">
          <Container className="h-full flex flex-col justify-between py-8">
            {/* Back link */}
            <Link
              href="/ressources#actualites"
              className="text-warm-white/80 hover:text-warm-white flex items-center gap-2 transition-colors w-fit"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour aux actualités
            </Link>

            {/* Content at bottom */}
            <div className="pb-4">
              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mb-4">
                  <TagBadgeList tags={article.tags} limit={3} variant="dark" />
                </div>
              )}

              {/* Title */}
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-warm-white max-w-4xl">
                {article.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mt-6 text-warm-white/80">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium text-warm-white">{article.author_name}</p>
                  </div>
                </div>

                <span className="hidden md:block text-warm-white/40">|</span>

                <span>{formattedDate}</span>

                {article.read_time_minutes && (
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
                      {article.read_time_minutes} min de lecture
                    </span>
                  </>
                )}
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* Article Content */}
      <Section background="white" padding="lg">
        <div className="max-w-3xl mx-auto">
          {/* Content */}
          {article.content?.html && (
            <div
              className="prose prose-lg max-w-none article-content"
              dangerouslySetInnerHTML={{ __html: article.content.html }}
            />
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
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group bg-warm-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                >
                  {related.thumbnail_url && (
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={related.thumbnail_url}
                        alt={related.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-deep-blue group-hover:text-terracotta transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    {related.read_time_minutes && (
                      <p className="text-sm text-text-secondary mt-2">{related.read_time_minutes} min</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button variant="outline" href="/ressources#actualites">
                Voir tous les articles
              </Button>
            </div>
          </div>
        </Section>
      )}
    </>
  );
}

