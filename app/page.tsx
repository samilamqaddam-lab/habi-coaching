'use client';

import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useTranslation } from '@/hooks/useTranslation';

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero Section */}
      <Hero
        subtitle="Hajar Habi"
        title={t('home.hero.title')}
        description={t('home.hero.description')}
        primaryCTA={{
          text: t('home.hero.primaryCTA'),
          href: '#services',
        }}
        secondaryCTA={{
          text: t('home.hero.secondaryCTA'),
          href: '/contact',
        }}
      />

      {/* Expertise Section */}
      <Section
        id="expertise"
        subtitle={t('home.expertise.subtitle')}
        title={t('home.expertise.title')}
        description={t('home.expertise.description')}
        centered
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
          {/* Corporate Experience */}
          <Card padding="lg" className="text-center">
            <div className="w-16 h-16 bg-morocco-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-morocco-blue"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-deep-blue mb-3">
              {t('home.expertise.corporate.title')}
            </h3>
            <div className="text-3xl font-bold text-terracotta mb-3">
              {t('home.expertise.corporate.years')}
            </div>
            <p className="text-text-secondary text-sm">
              {t('home.expertise.corporate.description')}
            </p>
          </Card>

          {/* Coaching */}
          <Card padding="lg" className="text-center">
            <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-6">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-deep-blue mb-3">
              {t('home.expertise.coaching.title')}
            </h3>
            <div className="text-lg font-bold text-terracotta mb-3">
              {t('home.expertise.coaching.certification')}
            </div>
            <p className="text-text-secondary text-sm">
              {t('home.expertise.coaching.description')}
            </p>
          </Card>

          {/* Yoga */}
          <Card padding="lg" className="text-center">
            <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
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
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-deep-blue mb-3">
              {t('home.expertise.yoga.title')}
            </h3>
            <div className="text-lg font-bold text-sage mb-1">
              {t('home.expertise.yoga.certification')}
            </div>
            <div className="text-sm text-terracotta mb-3">
              {t('home.expertise.yoga.hours')}
            </div>
            <p className="text-text-secondary text-sm">
              {t('home.expertise.yoga.description')}
            </p>
          </Card>
        </div>
      </Section>

      {/* Services Section */}
      <Section
        id="services"
        subtitle={t('home.services.subtitle')}
        title={t('home.services.title')}
        background="beige"
        centered
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* Pour les Organisations */}
          <Card hover padding="lg" className="flex flex-col">
            <div className="flex-grow">
              <div className="w-16 h-16 bg-morocco-blue/10 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-morocco-blue"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-bold text-deep-blue mb-4">
                {t('home.services.organisations.title')}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                {t('home.services.organisations.description')}
              </p>
            </div>
            <Button variant="outline" href="/organisations" fullWidth>
              {t('home.services.organisations.cta')}
            </Button>
          </Card>

          {/* Coaching */}
          <Card hover padding="lg" className="flex flex-col">
            <div className="flex-grow">
              <div className="w-16 h-16 bg-terracotta/10 rounded-2xl flex items-center justify-center mb-6">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-bold text-deep-blue mb-4">
                {t('home.services.coaching.title')}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                {t('home.services.coaching.description')}
              </p>
            </div>
            <Button variant="outline" href="/coaching" fullWidth>
              {t('home.services.coaching.cta')}
            </Button>
          </Card>

          {/* Yoga */}
          <Card hover padding="lg" className="flex flex-col">
            <div className="flex-grow">
              <div className="w-16 h-16 bg-sage/20 rounded-2xl flex items-center justify-center mb-6">
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
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-bold text-deep-blue mb-4">
                {t('home.services.yoga.title')}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                {t('home.services.yoga.description')}
              </p>
            </div>
            <Button variant="outline" href="/programmes" fullWidth>
              {t('home.services.yoga.cta')}
            </Button>
          </Card>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="sage" padding="lg" centered>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-deep-blue mb-6">
            {t('home.cta.title')}
          </h2>
          <p className="text-lg text-text-secondary mb-8 leading-relaxed">
            {t('home.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/contact">
              {t('home.cta.primaryCTA')}
            </Button>
            <Button variant="outline" size="lg" href="/programmes">
              {t('home.cta.secondaryCTA')}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
