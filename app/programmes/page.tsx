'use client';

import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useTranslation } from '@/hooks/useTranslation';

export default function ProgrammesPage() {
  const { t } = useTranslation();

  const yogaClasses = [
    {
      title: t('programmes.classes.hatha.title'),
      description: t('programmes.classes.hatha.description'),
      schedule: t('programmes.classes.hatha.schedule'),
      duration: t('programmes.classes.hatha.duration'),
      price: t('programmes.classes.hatha.price'),
    },
    {
      title: t('programmes.classes.restorative.title'),
      description: t('programmes.classes.restorative.description'),
      schedule: t('programmes.classes.restorative.schedule'),
      duration: t('programmes.classes.restorative.duration'),
      price: t('programmes.classes.restorative.price'),
    },
    {
      title: t('programmes.classes.meditation.title'),
      description: t('programmes.classes.meditation.description'),
      schedule: t('programmes.classes.meditation.schedule'),
      duration: t('programmes.classes.meditation.duration'),
      price: t('programmes.classes.meditation.price'),
    },
  ];

  const programmes = [
    {
      id: 1,
      title: t('programmes.retreats.atlas.title'),
      location: t('programmes.retreats.atlas.location'),
      duration: t('programmes.retreats.atlas.duration'),
      dates: t('programmes.retreats.atlas.dates'),
      price: t('programmes.retreats.atlas.price'),
      spotsLeft: 8,
      description: t('programmes.retreats.atlas.description'),
      highlights: [
        t('programmes.retreats.atlas.highlights.0'),
        t('programmes.retreats.atlas.highlights.1'),
        t('programmes.retreats.atlas.highlights.2'),
        t('programmes.retreats.atlas.highlights.3'),
        t('programmes.retreats.atlas.highlights.4'),
      ],
      type: t('programmes.type.retreat'),
    },
    {
      id: 2,
      title: t('programmes.workshops.leadership.title'),
      location: t('programmes.workshops.leadership.location'),
      duration: t('programmes.workshops.leadership.duration'),
      dates: t('programmes.workshops.leadership.dates'),
      price: t('programmes.workshops.leadership.price'),
      spotsLeft: 12,
      description: t('programmes.workshops.leadership.description'),
      highlights: [
        t('programmes.workshops.leadership.highlights.0'),
        t('programmes.workshops.leadership.highlights.1'),
        t('programmes.workshops.leadership.highlights.2'),
        t('programmes.workshops.leadership.highlights.3'),
        t('programmes.workshops.leadership.highlights.4'),
      ],
      type: t('programmes.type.workshop'),
    },
    {
      id: 3,
      title: t('programmes.workshops.balance.title'),
      location: t('programmes.workshops.balance.location'),
      duration: t('programmes.workshops.balance.duration'),
      dates: t('programmes.workshops.balance.dates'),
      price: t('programmes.workshops.balance.price'),
      spotsLeft: 14,
      description: t('programmes.workshops.balance.description'),
      highlights: [
        t('programmes.workshops.balance.highlights.0'),
        t('programmes.workshops.balance.highlights.1'),
        t('programmes.workshops.balance.highlights.2'),
        t('programmes.workshops.balance.highlights.3'),
        t('programmes.workshops.balance.highlights.4'),
      ],
      type: t('programmes.type.workshop'),
    },
    {
      id: 5,
      title: t('programmes.retreats.silence.title'),
      location: t('programmes.retreats.silence.location'),
      duration: t('programmes.retreats.silence.duration'),
      dates: t('programmes.retreats.silence.dates'),
      price: t('programmes.retreats.silence.price'),
      spotsLeft: 10,
      description: t('programmes.retreats.silence.description'),
      highlights: [
        t('programmes.retreats.silence.highlights.0'),
        t('programmes.retreats.silence.highlights.1'),
        t('programmes.retreats.silence.highlights.2'),
        t('programmes.retreats.silence.highlights.3'),
        t('programmes.retreats.silence.highlights.4'),
      ],
      type: t('programmes.type.retreat'),
    },
    {
      id: 6,
      title: t('programmes.training.philosophy.title'),
      location: t('programmes.training.philosophy.location'),
      duration: t('programmes.training.philosophy.duration'),
      dates: t('programmes.training.philosophy.dates'),
      price: t('programmes.training.philosophy.price'),
      spotsLeft: 15,
      description: t('programmes.training.philosophy.description'),
      highlights: [
        t('programmes.training.philosophy.highlights.0'),
        t('programmes.training.philosophy.highlights.1'),
        t('programmes.training.philosophy.highlights.2'),
        t('programmes.training.philosophy.highlights.3'),
        t('programmes.training.philosophy.highlights.4'),
      ],
      type: t('programmes.type.training'),
    },
  ];

  return (
    <>
      <Hero
        subtitle={t('programmes.hero.subtitle')}
        title={t('programmes.hero.title')}
        description={t('programmes.hero.description')}
        primaryCTA={{
          text: t('programmes.hero.primaryCTA'),
          href: '#cours',
        }}
        secondaryCTA={{
          text: t('programmes.hero.secondaryCTA'),
          href: '#retraites',
        }}
        theme="yoga"
      />

      {/* Cours réguliers */}
      <Section
        id="cours"
        subtitle={t('programmes.regularClasses.subtitle')}
        title={t('programmes.regularClasses.title')}
        description={t('programmes.regularClasses.description')}
        background="beige"
        accentColor="yoga"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {yogaClasses.map((yogaClass, index) => (
            <Card key={index} hover padding="lg" className="flex flex-col">
              <div className="flex-grow">
                <h3 className="font-heading text-xl font-bold text-deep-blue mb-4">
                  {yogaClass.title}
                </h3>
                <p className="text-text-secondary leading-relaxed mb-6">
                  {yogaClass.description}
                </p>
                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex items-center text-text-secondary">
                    <svg
                      className="w-4 h-4 mr-2 text-golden-orange"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {yogaClass.schedule}
                  </div>
                  <div className="flex items-center text-text-secondary">
                    <svg
                      className="w-4 h-4 mr-2 text-golden-orange"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {yogaClass.duration}
                  </div>
                  <p className="font-semibold text-golden-orange mt-4">
                    {yogaClass.price}
                  </p>
                </div>
              </div>
              <Button variant="outline" href="/contact" fullWidth>
                {t('programmes.buttons.book')}
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card padding="lg" className="max-w-3xl mx-auto bg-mystic-mauve-light/10">
            <h4 className="font-semibold text-deep-blue mb-3">
              {t('programmes.trialClass.title')}
            </h4>
            <p className="text-text-secondary mb-4">
              {t('programmes.trialClass.description')}
            </p>
            <Button variant="primary" size="md" href="/contact">
              {t('programmes.trialClass.button')}
            </Button>
          </Card>
        </div>
      </Section>

      {/* Retraites & Programmes */}
      <Section
        id="retraites"
        subtitle={t('programmes.experiences.subtitle')}
        title={t('programmes.experiences.title')}
        description={t('programmes.experiences.description')}
        accentColor="yoga"
      >
        <div className="grid gap-8">
          {programmes.map((programme) => (
            <Card key={programme.id} padding="lg" className="group">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Image placeholder */}
                <div className="md:col-span-1">
                  <div className="aspect-[4/3] bg-gradient-to-br from-golden-orange/20 to-mystic-mauve/20 rounded-xl flex items-center justify-center group-hover:from-golden-orange/30 group-hover:to-mystic-mauve/30 transition-all">
                    <svg
                      className="w-16 h-16 text-deep-earth/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Contenu */}
                <div className="md:col-span-2">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 bg-golden-orange/10 text-golden-orange text-xs font-medium rounded-full mb-3 uppercase">
                        {programme.type}
                      </span>
                      <h3 className="font-heading text-2xl font-bold text-deep-blue mb-2">
                        {programme.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-text-secondary mb-4">
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-golden-orange"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {programme.location}
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-golden-orange"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {programme.duration}
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-golden-orange"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {programme.dates}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-heading text-3xl font-bold text-golden-orange mb-1">
                        {programme.price}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {t('programmes.perPerson')}
                      </p>
                      {programme.spotsLeft <= 5 && (
                        <p className="text-xs text-golden-orange font-medium mt-2">
                          Plus que {programme.spotsLeft} places
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-text-secondary leading-relaxed mb-6">
                    {programme.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-deep-blue mb-3 text-sm">
                      {t('programmes.programHighlights')}
                    </h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {programme.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <svg
                            className="w-4 h-4 text-golden-orange mr-2 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-text-secondary">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="primary" size="md" href="/contact">
                      {t('programmes.buttons.bookSpot')}
                    </Button>
                    <Button variant="outline" size="md" href="/contact">
                      {t('programmes.buttons.moreInfo')}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Philosophie */}
      <Section
        subtitle={t('programmes.philosophy.subtitle')}
        title={t('programmes.philosophy.title')}
        background="beige"
        centered
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            {t('programmes.philosophy.intro')}
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card padding="md">
              <h4 className="font-semibold text-deep-blue mb-3">
                {t('programmes.philosophy.tradition.title')}
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                {t('programmes.philosophy.tradition.description')}
              </p>
            </Card>

            <Card padding="md">
              <h4 className="font-semibold text-deep-blue mb-3">
                {t('programmes.philosophy.inclusive.title')}
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                {t('programmes.philosophy.inclusive.description')}
              </p>
            </Card>

            <Card padding="md">
              <h4 className="font-semibold text-deep-blue mb-3">
                {t('programmes.philosophy.beyond.title')}
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                {t('programmes.philosophy.beyond.description')}
              </p>
            </Card>

            <Card padding="md">
              <h4 className="font-semibold text-deep-blue mb-3">
                {t('programmes.philosophy.smallGroups.title')}
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                {t('programmes.philosophy.smallGroups.description')}
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* Programme sur-mesure */}
      <Section
        subtitle={t('programmes.custom.subtitle')}
        title={t('programmes.custom.title')}
        description={t('programmes.custom.description')}
        centered
        padding="lg"
      >
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-golden-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-deep-blue mb-2">
                {t('programmes.custom.features.groups.title')}
              </h4>
              <p className="text-sm text-text-secondary">
                {t('programmes.custom.features.groups.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-golden-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-deep-blue mb-2">
                {t('programmes.custom.features.locations.title')}
              </h4>
              <p className="text-sm text-text-secondary">
                {t('programmes.custom.features.locations.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-golden-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-deep-blue mb-2">
                {t('programmes.custom.features.personalized.title')}
              </h4>
              <p className="text-sm text-text-secondary">
                {t('programmes.custom.features.personalized.description')}
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button variant="primary" size="lg" href="/contact">
              {t('programmes.custom.button')}
            </Button>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section background="mystic-mauve-light" padding="lg" centered>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-deep-blue mb-6">
            {t('programmes.cta.title')}
          </h2>
          <p className="text-lg text-text-secondary mb-8">
            {t('programmes.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/contact">
              {t('programmes.cta.primaryCTA')}
            </Button>
            <Button variant="outline" size="lg" href="/contact">
              {t('programmes.cta.secondaryCTA')}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
