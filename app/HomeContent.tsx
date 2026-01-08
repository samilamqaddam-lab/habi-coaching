'use client'

import Image from 'next/image'
import Hero from '@/components/sections/Hero'
import Section from '@/components/sections/Section'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import { useTranslation } from '@/hooks/useTranslation'
import { imagePresets } from '@/lib/sanity.image'
import type { Testimonial } from '@/lib/sanity.types'

interface ExpertiseCard {
  title: string
  titleEn?: string
  highlight: string
  highlightEn?: string
  description: string
  descriptionEn?: string
  icon: string
  color: string
}

interface Service {
  title: string
  titleEn?: string
  description: string
  descriptionEn?: string
  ctaText: string
  ctaTextEn?: string
  link: string
  icon: string
  color: string
}

interface HomepageContent {
  expertiseSection?: {
    subtitle: string
    subtitleEn?: string
    title: string
    titleEn?: string
    description: string
    descriptionEn?: string
    cards: ExpertiseCard[]
  }
  aboutSection?: {
    badge: string
    badgeEn?: string
    title: string
    titleEn?: string
    description: string
    descriptionEn?: string
    ctaText: string
    ctaTextEn?: string
    image?: {
      asset: { _ref: string }
      alt?: string
    }
  }
  servicesSection?: {
    subtitle: string
    subtitleEn?: string
    title: string
    titleEn?: string
    services: Service[]
  }
  ctaSection?: {
    title: string
    titleEn?: string
    description: string
    descriptionEn?: string
    primaryCTA: {
      text: string
      textEn?: string
      link: string
    }
    secondaryCTA: {
      text: string
      textEn?: string
      link: string
    }
  }
}

interface HeroSection {
  title?: string
  titleEn?: string
  titleLine2?: string
  titleLine2En?: string
  titleSuffix?: string
  titleSuffixEn?: string
  subtitle?: string
  subtitleEn?: string
  description?: string
  descriptionEn?: string
  primaryCTA?: {
    text: string
    textEn?: string
    href: string
  }
  secondaryCTA?: {
    text: string
    textEn?: string
    href: string
  }
}

interface HomeContentProps {
  testimonials: Testimonial[]
  homepageContent: HomepageContent | null
  hero: HeroSection | null
}

// Icon components
const icons = {
  corporate: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  ),
  coaching: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
  yoga: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
  organisations: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  ),
}

export default function HomeContent({ testimonials, homepageContent, hero }: HomeContentProps) {
  const { t, locale } = useTranslation()

  // Helper to get localized text
  const getText = (text: string, textEn?: string) => {
    return locale === 'en' && textEn ? textEn : text
  }

  // Fallback to translation keys if Sanity data not available
  const heroTitle = hero?.title || t('home.hero.title')
  const heroTitleLine2 = hero?.titleLine2 || t('home.hero.titleLine2')
  const heroTitleSuffix = hero?.titleSuffix || t('home.hero.titleSuffix')
  // Always use translation for description (prioritize fr.json over Sanity)
  const heroDescription = t('home.hero.description')

  return (
    <>
      {/* Hero Section */}
      <Hero
        title={getText(heroTitle, hero?.titleEn)}
        titleLine2={getText(heroTitleLine2, hero?.titleLine2En)}
        titleSuffix={getText(heroTitleSuffix, hero?.titleSuffixEn)}
        description={heroDescription}
        primaryCTA={{
          text: hero?.primaryCTA?.text || t('home.hero.primaryCTA'),
          href: hero?.primaryCTA?.href || '#services',
        }}
        secondaryCTA={{
          text: hero?.secondaryCTA?.text || t('home.hero.secondaryCTA'),
          href: hero?.secondaryCTA?.href || '/contact',
        }}
        minimal
        endWithWhite
        splitLayout
        splitImage="/images/heroes/mountain-tree-transcendence.jpg"
        reducedTitle
      >
        {/* Sadhguru Quote - Inline compact */}
        <div className="mt-8 pt-6 border-t border-golden-orange/20">
          <div className="flex items-start gap-3">
            <svg className="w-8 h-8 text-golden-orange/30 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
            </svg>
            <div>
              <p className="text-base md:text-lg italic text-text-secondary/90 leading-relaxed">
                {t('home.hero.sadhguruQuote')}
              </p>
              <p className="mt-2 text-sm text-golden-orange font-medium">
                {t('home.hero.sadhguruAttribution')}
              </p>
            </div>
          </div>
        </div>
      </Hero>

      {/* Expertise Section - Always use fr.json */}
      <Section
        id="expertise"
        subtitle={t('home.expertise.subtitle')}
        title={t('home.expertise.title')}
        description={t('home.expertise.description')}
        background="beige"
        centered
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
          {/* Corporate Card */}
          <Card padding="lg" className="text-center">
            <div className="w-16 h-16 bg-morocco-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-morocco-blue"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {icons.corporate}
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

          {/* Coaching Card */}
          <Card padding="lg" className="text-center">
            <div className="w-16 h-16 bg-mystic-mauve/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-mystic-mauve"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {icons.coaching}
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

          {/* Yoga Card */}
          <Card padding="lg" className="text-center">
            <div className="w-16 h-16 bg-golden-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-golden-orange"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {icons.yoga}
              </svg>
            </div>
            <h3 className="font-heading text-2xl font-bold text-deep-blue mb-3">
              {t('home.expertise.yoga.title')}
            </h3>
            <div className="text-xl font-bold text-golden-orange mb-3">
              {t('home.expertise.yoga.certification')}
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              {t('home.expertise.yoga.description')}
            </p>
          </Card>
        </div>
      </Section>

      {/* À Propos Section */}
      {homepageContent?.aboutSection && (
        <Section background="sage">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
              {/* Image Portrait */}
              <div className="md:col-span-5 relative">
                <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl transform md:-rotate-2 hover:rotate-0 transition-transform duration-500">
                  {homepageContent.aboutSection.image?.asset ? (
                    <Image
                      src={imagePresets.hero(homepageContent.aboutSection.image).url()}
                      alt={
                        homepageContent.aboutSection.image.alt ||
                        'Hajar Habi - Coach Holistique & Professeure de Yoga'
                      }
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  ) : (
                    <Image
                      src="/images/Reel/hajar-professional.jpg"
                      alt="Hajar Habi - Coach Holistique & Professeure de Yoga"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  )}
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-mystic-mauve/20 rounded-full blur-2xl -z-10"></div>
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-golden-orange/15 rounded-full blur-2xl -z-10"></div>
              </div>

              {/* Content Card */}
              <div className="md:col-span-7 relative">
                <Card className="p-8 md:p-12 bg-gradient-to-br from-warm-white via-warm-white to-dune-beige/20 shadow-xl">
                  <div className="inline-block px-4 py-1.5 bg-mystic-mauve/10 text-mystic-mauve text-xs font-semibold rounded-full mb-6 self-start uppercase tracking-wide">
                    {getText(
                      homepageContent.aboutSection.badge,
                      homepageContent.aboutSection.badgeEn
                    )}
                  </div>

                  <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-deep-blue mb-4 leading-tight">
                    {getText(
                      homepageContent.aboutSection.title,
                      homepageContent.aboutSection.titleEn
                    )}
                  </h2>

                  <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8">
                    {getText(
                      homepageContent.aboutSection.description,
                      homepageContent.aboutSection.descriptionEn
                    )}
                  </p>

                  <Button href="/expertise" variant="primary" size="lg" className="self-start">
                    {getText(
                      homepageContent.aboutSection.ctaText,
                      homepageContent.aboutSection.ctaTextEn
                    )}
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* Services Section - Always use fr.json */}
      <Section
        id="services"
        subtitle={t('home.services.subtitle')}
        title={t('home.services.title')}
        background="beige"
        centered
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* Organisations Card */}
          <Card hover padding="lg" className="flex flex-col">
            <div className="flex-grow">
              <div className="w-16 h-16 bg-morocco-blue/10 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-morocco-blue"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {icons.organisations}
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

          {/* Coaching Card */}
          <Card hover padding="lg" className="flex flex-col">
            <div className="flex-grow">
              <div className="w-16 h-16 bg-mystic-mauve/10 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-mystic-mauve"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {icons.coaching}
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

          {/* Yoga Card */}
          <Card hover padding="lg" className="flex flex-col">
            <div className="flex-grow">
              <div className="w-16 h-16 bg-golden-orange/10 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-golden-orange"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {icons.yoga}
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

      {/* Testimonials Section */}
      <TestimonialsSection testimonials={testimonials} />

      {/* CTA Section */}
      {homepageContent?.ctaSection && (
        <Section background="mystic-mauve-light" padding="lg" centered>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-deep-blue mb-6">
              {getText(homepageContent.ctaSection.title, homepageContent.ctaSection.titleEn)}
            </h2>
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              {getText(
                homepageContent.ctaSection.description,
                homepageContent.ctaSection.descriptionEn
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                href={homepageContent.ctaSection.primaryCTA.link}
              >
                {getText(
                  homepageContent.ctaSection.primaryCTA.text,
                  homepageContent.ctaSection.primaryCTA.textEn
                )}
              </Button>
              <Button
                variant="outline"
                size="lg"
                href={homepageContent.ctaSection.secondaryCTA.link}
              >
                {getText(
                  homepageContent.ctaSection.secondaryCTA.text,
                  homepageContent.ctaSection.secondaryCTA.textEn
                )}
              </Button>
            </div>
          </div>
        </Section>
      )}
    </>
  )
}
