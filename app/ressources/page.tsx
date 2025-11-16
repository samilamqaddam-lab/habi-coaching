'use client';

import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useTranslation } from '@/hooks/useTranslation';

export default function RessourcesPage() {
  const { t } = useTranslation();

  const articles = [
    {
      title: t('ressources.articles.0.title'),
      category: t('ressources.articles.0.category'),
      readTime: t('ressources.articles.0.readTime'),
      excerpt: t('ressources.articles.0.excerpt'),
    },
    {
      title: t('ressources.articles.1.title'),
      category: t('ressources.articles.1.category'),
      readTime: t('ressources.articles.1.readTime'),
      excerpt: t('ressources.articles.1.excerpt'),
    },
    {
      title: t('ressources.articles.2.title'),
      category: t('ressources.articles.2.category'),
      readTime: t('ressources.articles.2.readTime'),
      excerpt: t('ressources.articles.2.excerpt'),
    },
  ];

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
      <Hero
        subtitle={t('ressources.hero.subtitle')}
        title={t('ressources.hero.title')}
        description={t('ressources.hero.description')}
        primaryCTA={{
          text: t('ressources.hero.primaryCTA'),
          href: '#articles',
        }}
        centered
        compact
      />

      {/* Articles */}
      <Section
        id="articles"
        subtitle={t('ressources.blog.subtitle')}
        title={t('ressources.blog.title')}
        description={t('ressources.blog.description')}
        background="beige"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Card key={index} hover padding="lg" className="flex flex-col">
              <div className="aspect-[16/9] bg-gradient-to-br from-terracotta/10 to-sage/10 rounded-xl mb-6 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-morocco-blue/30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-terracotta uppercase">
                    {article.category}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {article.readTime}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-deep-blue mb-3">
                  {article.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  {article.excerpt}
                </p>
              </div>
              <Button variant="text" href="#">
                {t('ressources.blog.readArticle')}
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="md" href="#">
            {t('ressources.blog.viewAll')}
          </Button>
        </div>
      </Section>

      {/* Guides Gratuits */}
      <Section
        id="guides"
        subtitle={t('ressources.guides.subtitle')}
        title={t('ressources.guides.title')}
        description={t('ressources.guides.description')}
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
                  <span className="px-2 py-1 bg-soft-gray rounded mr-2">
                    {guide.type}
                  </span>
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

      {/* Témoignages */}
      <Section
        id="temoignages"
        subtitle={t('ressources.testimonials.subtitle')}
        title={t('ressources.testimonials.title')}
        background="sage"
        centered
        padding="lg"
      >
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card padding="lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-terracotta/20 rounded-full flex items-center justify-center mr-4">
                <span className="font-heading font-bold text-terracotta">
                  {t('ressources.testimonials.0.initial')}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-deep-blue">
                  {t('ressources.testimonials.0.name')}
                </h4>
                <p className="text-sm text-text-secondary">
                  {t('ressources.testimonials.0.role')}
                </p>
              </div>
            </div>
            <p className="text-text-secondary italic leading-relaxed">
              {t('ressources.testimonials.0.quote')}
            </p>
          </Card>

          <Card padding="lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-sage/30 rounded-full flex items-center justify-center mr-4">
                <span className="font-heading font-bold text-sage">
                  {t('ressources.testimonials.1.initial')}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-deep-blue">
                  {t('ressources.testimonials.1.name')}
                </h4>
                <p className="text-sm text-text-secondary">
                  {t('ressources.testimonials.1.role')}
                </p>
              </div>
            </div>
            <p className="text-text-secondary italic leading-relaxed">
              {t('ressources.testimonials.1.quote')}
            </p>
          </Card>

          <Card padding="lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-morocco-blue/10 rounded-full flex items-center justify-center mr-4">
                <span className="font-heading font-bold text-morocco-blue">
                  {t('ressources.testimonials.2.initial')}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-deep-blue">
                  {t('ressources.testimonials.2.name')}
                </h4>
                <p className="text-sm text-text-secondary">
                  {t('ressources.testimonials.2.role')}
                </p>
              </div>
            </div>
            <p className="text-text-secondary italic leading-relaxed">
              {t('ressources.testimonials.2.quote')}
            </p>
          </Card>

          <Card padding="lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-terracotta/20 rounded-full flex items-center justify-center mr-4">
                <span className="font-heading font-bold text-terracotta">
                  {t('ressources.testimonials.3.initial')}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-deep-blue">
                  {t('ressources.testimonials.3.name')}
                </h4>
                <p className="text-sm text-text-secondary">
                  {t('ressources.testimonials.3.role')}
                </p>
              </div>
            </div>
            <p className="text-text-secondary italic leading-relaxed">
              {t('ressources.testimonials.3.quote')}
            </p>
          </Card>
        </div>
      </Section>

      {/* Newsletter */}
      <Section centered padding="lg">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-deep-blue mb-4">
            {t('ressources.newsletter.title')}
          </h2>
          <p className="text-text-secondary mb-8">
            {t('ressources.newsletter.description')}
          </p>
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
