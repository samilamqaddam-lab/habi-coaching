'use client';

import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { CoachingPackageModal } from '@/components/coaching';
import { useTranslation } from '@/hooks/useTranslation';

export default function CoachingContent() {
  const { t } = useTranslation();

  const coachingTypes: Array<{
    title: string;
    description: string;
    duration: string;
    format: string;
    icon: 'user' | 'briefcase' | 'building';
    isExecutive?: boolean;
  }> = [
    {
      title: t('coaching.services.individual.title'),
      description: t('coaching.services.individual.description'),
      duration: t('coaching.services.individual.duration'),
      format: t('coaching.services.individual.format'),
      icon: 'user',
    },
    {
      title: t('coaching.services.career.title'),
      description: t('coaching.services.career.description'),
      duration: t('coaching.services.career.duration'),
      format: t('coaching.services.career.format'),
      icon: 'briefcase',
    },
    {
      title: t('coaching.services.executive.title'),
      description: t('coaching.services.executive.description'),
      duration: t('coaching.services.executive.duration'),
      format: t('coaching.services.executive.format'),
      icon: 'building',
      isExecutive: true,
    },
  ];

  return (
    <>
      <Hero
        subtitle={t('coaching.hero.subtitle')}
        title={t('coaching.hero.title')}
        description={t('coaching.hero.description')}
        primaryCTA={{
          text: t('coaching.hero.primaryCTA'),
          href: '/contact',
        }}
        secondaryCTA={{
          text: t('coaching.hero.secondaryCTA'),
          href: '#approche',
        }}
        theme="coaching"
        compact
        splitLayout
        splitImage="/images/heroes/coaching-session-hero.png"
      />

      {/* Types de coaching */}
      <Section
        id="services"
        subtitle={t('coaching.services.subtitle')}
        title={t('coaching.services.title')}
        background="beige"
        centered
        accentColor="coaching"
        afterHero
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {coachingTypes.map((type, index) => (
            <Card key={index} hover padding="lg" className="flex flex-col">
              <div className="flex-grow">
                <div className="w-14 h-14 bg-mystic-mauve/10 rounded-xl flex items-center justify-center mb-5">
                  <svg
                    className="w-7 h-7 text-mystic-mauve"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {type.icon === 'user' && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    )}
                    {type.icon === 'briefcase' && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    )}
                    {type.icon === 'building' && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    )}
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-deep-blue mb-3">
                  {type.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-5">
                  {type.description}
                </p>

                {/* Duration & Format Section */}
                <div className="border-t border-gray-100 pt-4 mb-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-mystic-mauve flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-text-secondary">{type.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-mystic-mauve flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-text-secondary">{type.format}</span>
                  </div>
                </div>

                {type.isExecutive && (
                  <p className="text-xs text-text-secondary/80 italic mb-5 leading-relaxed">
                    {t('coaching.services.executive.note')}
                  </p>
                )}
              </div>
              {type.isExecutive ? (
                <Button variant="outline" fullWidth href="/contact">
                  {t('coaching.services.executive.cta')}
                </Button>
              ) : (
                <CoachingPackageModal
                  triggerText="Réserver une séance"
                  variant="outline"
                  fullWidth
                />
              )}
            </Card>
          ))}
        </div>
      </Section>

      {/* Approche */}
      <Section
        id="approche"
        subtitle={t('coaching.approach.subtitle')}
        title={t('coaching.approach.title')}
        description={t('coaching.approach.description')}
        accentColor="coaching"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-mystic-mauve/10 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-mystic-mauve font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-deep-blue mb-2">
                    {t('coaching.approach.step1.title')}
                  </h4>
                  <p className="text-text-secondary text-sm">
                    {t('coaching.approach.step1.description')}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-golden-orange/10 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-golden-orange font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-deep-blue mb-2">
                    {t('coaching.approach.step2.title')}
                  </h4>
                  <p className="text-text-secondary text-sm">
                    {t('coaching.approach.step2.description')}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-mystic-mauve/10 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-mystic-mauve font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-deep-blue mb-2">
                    {t('coaching.approach.step3.title')}
                  </h4>
                  <p className="text-text-secondary text-sm">
                    {t('coaching.approach.step3.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Section>

      {/* CTA */}
      <Section background="mystic-mauve-light" padding="lg" centered>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-deep-blue mb-6">
            {t('coaching.cta.title')}
          </h2>
          <p className="text-lg text-text-secondary mb-8">
            {t('coaching.cta.description')}
          </p>
          <Button variant="primary" size="lg" href="/contact">
            {t('coaching.cta.button')}
          </Button>
        </div>
      </Section>
    </>
  );
}
