'use client';

import { useState } from 'react';
import InnerEngineeringHighlight from '@/components/sections/InnerEngineeringHighlight';
import Section from '@/components/sections/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { TagBadgeList } from '@/components/ui/TagBadge';
import ArticleCard from '@/components/blog/ArticleCard';
import ResourceCard from '@/components/resources/ResourceCard';
import PastEventCard from '@/components/resources/PastEventCard';
import ResourceFilters from '@/components/resources/ResourceFilters';
import { useTranslation } from '@/hooks/useTranslation';
import { useArticles } from '@/hooks/useArticles';
import { useResources } from '@/hooks/useResources';
import { usePastEvents } from '@/hooks/usePastEvents';

/**
 * Ressources Page Content
 * Complete content hub with:
 * 1. Inner Engineering Highlight (replaces Hero)
 * 2. Actualités (Featured Articles)
 * 3. Video Resources with Filters
 * 4. Past Events & Programmes
 * 5. All Articles Archive
 * 6. Guides & E-books
 * 7. Newsletter
 */
export default function RessourcesContent() {
  const { t, locale } = useTranslation();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Fetch data - Recent articles (not just featured)
  const { articles: recentArticles, isLoading: loadingRecent } = useArticles({
    limit: 6,
  });
  const { articles: allArticles, isLoading: loadingAllArticles } = useArticles({
    tags: selectedTags.length > 0 ? selectedTags : undefined,
    limit: 50,
  });
  const { resources: videos, isLoading: loadingVideos } = useResources({
    type: 'video',
    tags: selectedTags.length > 0 ? selectedTags : undefined,
    limit: 12,
  });
  const { events: pastEvents, isLoading: loadingPastEvents, hasMore, loadMore } = usePastEvents(8);

  // Guides data from translations (keep existing)
  const guides = [
    {
      title: t('ressources.guides.0.title'),
      description: t('ressources.guides.0.description'),
      type: 'PDF',
      pages: t('ressources.guides.0.pages'),
    },
    {
      title: t('ressources.guides.1.title'),
      description: t('ressources.guides.1.description'),
      type: 'PDF',
      pages: t('ressources.guides.1.pages'),
    },
    {
      title: t('ressources.guides.2.title'),
      description: t('ressources.guides.2.description'),
      type: 'PDF',
      pages: t('ressources.guides.2.pages'),
    },
  ];

  return (
    <>
      {/* Page Header + Inner Engineering Highlight */}
      <div className="bg-gradient-to-b from-dune-beige to-warm-white pt-32 pb-12 md:pt-36 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-deep-blue text-center">
            {locale === 'fr' ? 'Ressources' : 'Resources'}
          </h1>
          <p className="text-text-secondary text-center mt-3 max-w-2xl mx-auto">
            {locale === 'fr'
              ? 'Actualités, vidéos, guides et archives pour votre développement.'
              : 'News, videos, guides and archives for your development.'}
          </p>
        </div>

        {/* Inner Engineering Highlight */}
        <InnerEngineeringHighlight />
      </div>

      {/* 1. Actualités (Featured Articles) */}
      <Section
        id="actualites"
        subtitle={locale === 'fr' ? 'Actualités' : 'News'}
        title={locale === 'fr' ? 'Dernières Publications' : 'Latest Publications'}
        background="beige"
        padding="lg"
      >
        {loadingRecent ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-video rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : recentArticles.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentArticles.map((article) => (
                <ArticleCard key={article.id} article={article} locale={locale} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" size="md" href="#articles-archive">
                {locale === 'fr' ? 'Voir tous les articles' : 'View all articles'}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-16 text-text-secondary">
            {locale === 'fr'
              ? 'Aucune actualité pour le moment. Revenez bientôt !'
              : 'No news at the moment. Check back soon!'}
          </div>
        )}
      </Section>

      {/* 2. Video Resources with Filters */}
      <Section
        id="videos"
        subtitle={locale === 'fr' ? 'Ressources' : 'Resources'}
        title={locale === 'fr' ? 'Vidéos & Contenus Éducatifs' : 'Videos & Educational Content'}
        background="sage"
        padding="lg"
      >
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <ResourceFilters selectedTags={selectedTags} onTagsChange={setSelectedTags} />
            </div>
          </div>

          {/* Videos Grid */}
          <div className="lg:col-span-3">
            {loadingVideos ? (
              <div className="grid md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-video bg-gray-200 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : videos.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {videos.map((video) => (
                  <ResourceCard key={video.id} resource={video} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-text-secondary">
                {selectedTags.length > 0
                  ? locale === 'fr'
                    ? 'Aucune ressource ne correspond à ces filtres.'
                    : 'No resources match these filters.'
                  : locale === 'fr'
                  ? 'Aucune ressource pour le moment.'
                  : 'No resources available at the moment.'}
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* 3. Past Events & Programmes */}
      <Section
        id="archives"
        subtitle={locale === 'fr' ? 'Archives' : 'Archives'}
        title={locale === 'fr' ? 'Événements & Programmes Passés' : 'Past Events & Programs'}
        background="white"
        padding="lg"
      >
        {loadingPastEvents ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : pastEvents.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <PastEventCard key={event.id} event={event} />
              ))}
            </div>
            {hasMore && (
              <div className="text-center mt-12">
                <Button variant="outline" size="md" onClick={loadMore}>
                  {locale === 'fr' ? 'Voir plus d\'événements' : 'Load more events'}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 text-text-secondary">
            {locale === 'fr'
              ? 'Aucun événement passé à afficher.'
              : 'No past events to display.'}
          </div>
        )}
      </Section>

      {/* 4. All Articles */}
      <Section
        id="articles-archive"
        title={locale === 'fr' ? 'Tous les Articles' : 'All Articles'}
        background="beige"
        padding="lg"
      >
        {loadingAllArticles ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : allArticles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allArticles.map((article) => (
              <ArticleCard key={article.id} article={article} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-text-secondary">
            {locale === 'fr' ? 'Aucun article disponible.' : 'No articles available.'}
          </div>
        )}
      </Section>

      {/* 5. Guides Gratuits (Keep from original) */}
      <Section
        id="guides"
        subtitle={t('ressources.guides.subtitle')}
        title={t('ressources.guides.title')}
        description={t('ressources.guides.description')}
        background="white"
        centered
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {guides.map((guide, index) => (
            <Card key={index} padding="lg" className="flex flex-col">
              <div className="flex-grow">
                <div className="w-16 h-16 bg-terracotta/10 rounded-xl flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-terracotta"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-bold text-deep-blue mb-3">
                  {guide.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  {guide.description}
                </p>
                <div className="flex items-center text-xs text-text-secondary mb-6">
                  <span className="px-2 py-1 bg-soft-gray rounded mr-2">{guide.type}</span>
                  <span>{guide.pages}</span>
                </div>
              </div>
              <Button variant="outline" fullWidth href="/contact">
                {t('common.buttons.download')}
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      {/* 6. Newsletter (Keep from original) */}
      <Section centered padding="lg" background="beige">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-deep-blue mb-4">
            {t('ressources.newsletter.title')}
          </h2>
          <p className="text-text-secondary mb-8">{t('ressources.newsletter.description')}</p>
          <Card padding="lg">
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder={t('ressources.newsletter.placeholder')}
                className="flex-grow px-4 py-3 rounded-lg border-2 border-soft-gray focus:border-terracotta focus:outline-none transition-colors"
              />
              <Button variant="primary" size="md">
                {t('ressources.newsletter.submit')}
              </Button>
            </form>
            <p className="text-xs text-text-secondary mt-4 text-center">
              {t('ressources.newsletter.disclaimer')}
            </p>
          </Card>
        </div>
      </Section>
    </>
  );
}
