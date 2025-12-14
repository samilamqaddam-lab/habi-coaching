'use client';

import Image from 'next/image';
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
        useVhSpacing
        endWithWhite
      />

      {/* Expertise Section */}
      <Section
        id="expertise"
        subtitle={t('home.expertise.subtitle')}
        title={t('home.expertise.title')}
        description={t('home.expertise.description')}
        background="beige"
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
            <h3 className="font-heading text-2xl font-bold text-deep-blue mb-3">
              {t('home.expertise.corporate.title')}
            </h3>
            <div className="text-xl font-bold text-morocco-blue mb-3">
              {t('home.expertise.corporate.years')}
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              {t('home.expertise.corporate.description')}
            </p>
          </Card>

          {/* Coaching */}
          <Card padding="lg" className="text-center">
            <div className="w-16 h-16 bg-mystic-mauve/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-mystic-mauve"
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
            <h3 className="font-heading text-2xl font-bold text-deep-blue mb-3">
              {t('home.expertise.coaching.title')}
            </h3>
            <div className="text-xl font-bold text-mystic-mauve mb-3">
              {t('home.expertise.coaching.certification')}
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              {t('home.expertise.coaching.description')}
            </p>
          </Card>

          {/* Yoga */}
          <Card padding="lg" className="text-center">
            <div className="w-16 h-16 bg-golden-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-golden-orange"
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
            <h3 className="font-heading text-2xl font-bold text-deep-blue mb-3">
              {t('home.expertise.yoga.title')}
            </h3>
            <div className="text-xl font-bold text-golden-orange mb-1">
              {t('home.expertise.yoga.certification')}
            </div>
            <div className="text-sm text-golden-orange/70 mb-3">
              {t('home.expertise.yoga.hours')}
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              {t('home.expertise.yoga.description')}
            </p>
          </Card>
        </div>
      </Section>

      {/* À Propos - CTA vers Expertise */}
      <Section background="sage">
        <div className="max-w-6xl mx-auto">
          {/* Asymmetric Layout with Offset Image */}
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Image Portrait - Offset and Floating */}
            <div className="md:col-span-5 relative">
              <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl transform md:-rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/images/Reel/Hajar.jpg"
                  alt="Hajar Habi - Coach Holistique & Professeure de Yoga"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              {/* Subtle decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-mystic-mauve/20 rounded-full blur-2xl -z-10"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-golden-orange/15 rounded-full blur-2xl -z-10"></div>
            </div>

            {/* Content - Overlapping Card */}
            <div className="md:col-span-7 relative">
              <Card className="p-8 md:p-12 bg-gradient-to-br from-warm-white via-warm-white to-dune-beige/20 shadow-xl">
                <div className="inline-block px-4 py-1.5 bg-mystic-mauve/10 text-mystic-mauve text-xs font-semibold rounded-full mb-6 self-start uppercase tracking-wide">
                  Mon Parcours
                </div>

                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-deep-blue mb-4 leading-tight">
                  Qui suis-je ?
                </h2>

                <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8">
                  Plus de 20 ans d'expérience corporate, certifiée Coach & Team® et
                  professeure de Yoga traditionnelle (Isha Foundation). Découvrez mon
                  parcours et mes qualifications complètes.
                </p>

                <Button
                  href="/expertise"
                  variant="primary"
                  size="lg"
                  className="self-start"
                >
                  Découvrir mon parcours
                </Button>
              </Card>
            </div>
          </div>
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
              <div className="w-16 h-16 bg-mystic-mauve/10 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-mystic-mauve"
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
              <div className="w-16 h-16 bg-golden-orange/10 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-golden-orange"
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
      <Section background="mystic-mauve-light" padding="lg" centered>
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
