'use client';

import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Card from '@/components/ui/Card';
import { useTranslation } from '@/hooks/useTranslation';

export default function ExpertisePage() {
  const { t } = useTranslation();

  return (
    <>
      <Hero
        subtitle={t('expertise.hero.subtitle')}
        title={t('expertise.hero.title')}
        description={t('expertise.hero.description')}
        primaryCTA={{
          text: t('expertise.hero.primaryCTA'),
          href: '/contact',
        }}
        centered
        compact
      />

      {/* Histoire */}
      <Section
        subtitle={t('expertise.story.subtitle')}
        title={t('expertise.story.title')}
        background="beige"
        centered
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            {t('expertise.story.paragraph1')}
          </p>
          <p className="text-lg text-text-secondary leading-relaxed mb-6">
            {t('expertise.story.paragraph2')}
          </p>
          <p className="text-lg text-text-secondary leading-relaxed">
            {t('expertise.story.paragraph3')}
          </p>
        </div>
      </Section>

      {/* Certifications & Formations */}
      <Section
        subtitle={t('expertise.certifications.subtitle')}
        title={t('expertise.certifications.title')}
      >
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Coach & Team */}
          <Card padding="lg">
            <div className="flex items-start mb-6">
              <div className="w-16 h-16 bg-terracotta/10 rounded-xl flex items-center justify-center flex-shrink-0 mr-6">
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
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-heading text-2xl font-bold text-deep-blue mb-2">
                  {t('expertise.certifications.coaching.title')}
                </h3>
                <p className="text-terracotta font-semibold mb-4">
                  {t('expertise.certifications.coaching.subtitle')}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-text-secondary">
              <div>
                <h4 className="font-semibold text-deep-blue mb-2">
                  {t('expertise.certifications.coaching.training.title')}
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>• {t('expertise.certifications.coaching.training.items.0')}</li>
                  <li>• {t('expertise.certifications.coaching.training.items.1')}</li>
                  <li>• {t('expertise.certifications.coaching.training.items.2')}</li>
                  <li>• {t('expertise.certifications.coaching.training.items.3')}</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-deep-blue mb-2">
                  {t('expertise.certifications.coaching.expertise.title')}
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>• {t('expertise.certifications.coaching.expertise.items.0')}</li>
                  <li>• {t('expertise.certifications.coaching.expertise.items.1')}</li>
                  <li>• {t('expertise.certifications.coaching.expertise.items.2')}</li>
                  <li>• {t('expertise.certifications.coaching.expertise.items.3')}</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Isha Foundation */}
          <Card padding="lg">
            <div className="flex items-start mb-6">
              <div className="w-16 h-16 bg-sage/20 rounded-xl flex items-center justify-center flex-shrink-0 mr-6">
                <svg
                  className="w-8 h-8 text-sage"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-heading text-2xl font-bold text-deep-blue mb-2">
                  {t('expertise.certifications.yoga.title')}
                </h3>
                <p className="text-sage font-semibold mb-4">
                  {t('expertise.certifications.yoga.subtitle')}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-text-secondary">
              <div>
                <h4 className="font-semibold text-deep-blue mb-2">
                  {t('expertise.certifications.yoga.training.title')}
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>• {t('expertise.certifications.yoga.training.items.0')}</li>
                  <li>• {t('expertise.certifications.yoga.training.items.1')}</li>
                  <li>• {t('expertise.certifications.yoga.training.items.2')}</li>
                  <li>• {t('expertise.certifications.yoga.training.items.3')}</li>
                  <li>• {t('expertise.certifications.yoga.training.items.4')}</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-deep-blue mb-2">
                  {t('expertise.certifications.yoga.teachings.title')}
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>• {t('expertise.certifications.yoga.teachings.items.0')}</li>
                  <li>• {t('expertise.certifications.yoga.teachings.items.1')}</li>
                  <li>• {t('expertise.certifications.yoga.teachings.items.2')}</li>
                  <li>• {t('expertise.certifications.yoga.teachings.items.3')}</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Expérience Professionnelle */}
      <Section
        subtitle={t('expertise.experience.subtitle')}
        title={t('expertise.experience.title')}
        background="beige"
        centered
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-text-secondary leading-relaxed mb-12">
            {t('expertise.experience.description')}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-terracotta"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-deep-blue mb-2">
                {t('expertise.experience.areas.transformation.title')}
              </h4>
              <p className="text-sm text-text-secondary">
                {t('expertise.experience.areas.transformation.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-sage"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-deep-blue mb-2">
                {t('expertise.experience.areas.strategy.title')}
              </h4>
              <p className="text-sm text-text-secondary">
                {t('expertise.experience.areas.strategy.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-morocco-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-morocco-blue"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-deep-blue mb-2">
                {t('expertise.experience.areas.hr.title')}
              </h4>
              <p className="text-sm text-text-secondary">
                {t('expertise.experience.areas.hr.description')}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Philosophie */}
      <Section
        subtitle={t('expertise.philosophy.subtitle')}
        title={t('expertise.philosophy.title')}
        centered
      >
        <div className="max-w-3xl mx-auto space-y-6 text-lg text-text-secondary leading-relaxed">
          <p>{t('expertise.philosophy.paragraph1')}</p>
          <p dangerouslySetInnerHTML={{ __html: t('expertise.philosophy.paragraph2') }} />
          <p dangerouslySetInnerHTML={{ __html: t('expertise.philosophy.paragraph3') }} />
          <p>{t('expertise.philosophy.paragraph4')}</p>
        </div>
      </Section>

      {/* CTA */}
      <Section background="sage" padding="lg" centered>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-deep-blue mb-6">
            {t('expertise.cta.title')}
          </h2>
          <p className="text-lg text-text-secondary mb-8">
            {t('expertise.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full bg-terracotta text-warm-white hover:bg-terracotta-dark shadow-md hover:shadow-lg transition-all duration-300"
            >
              {t('expertise.cta.primaryCTA')}
            </a>
            <a
              href="/organisations"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-warm-white transition-all duration-300"
            >
              {t('expertise.cta.secondaryCTA')}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
