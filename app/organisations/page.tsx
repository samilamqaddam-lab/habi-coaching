'use client';

import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import { useTranslation } from '@/hooks/useTranslation';

export default function OrganisationsPage() {
  const { t } = useTranslation();

  return (
    <>
      <Hero
        subtitle={t('organisations.hero.subtitle')}
        title={t('organisations.hero.title')}
        description={t('organisations.hero.description')}
        primaryCTA={{
          text: t('organisations.hero.primaryCTA'),
          href: '#devis',
        }}
        secondaryCTA={{
          text: t('organisations.hero.secondaryCTA'),
          href: '#programmes',
        }}
        theme="corporate"
        compact
      />

      {/* Services pour Organisations */}
      <Section
        id="programmes"
        subtitle={t('organisations.services.subtitle')}
        title={t('organisations.services.title')}
        description={t('organisations.services.description')}
        background="beige"
        centered
        accentColor="corporate"
        afterHero
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <Card hover padding="lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-morocco-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-deep-blue mb-4">
                {t('organisations.services.transformation.title')}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                {t('organisations.services.transformation.description')}
              </p>
              <ul className="text-sm text-text-secondary space-y-2 text-left">
                <li>• {t('organisations.services.transformation.features.0')}</li>
                <li>• {t('organisations.services.transformation.features.1')}</li>
                <li>• {t('organisations.services.transformation.features.2')}</li>
              </ul>
            </div>
          </Card>

          <Card hover padding="lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-golden-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-deep-blue mb-4">
                {t('organisations.services.leadership.title')}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                {t('organisations.services.leadership.description')}
              </p>
              <ul className="text-sm text-text-secondary space-y-2 text-left">
                <li>• {t('organisations.services.leadership.features.0')}</li>
                <li>• {t('organisations.services.leadership.features.1')}</li>
                <li>• {t('organisations.services.leadership.features.2')}</li>
              </ul>
            </div>
          </Card>

          <Card hover padding="lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-morocco-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-deep-blue mb-4">
                {t('organisations.services.retreats.title')}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                {t('organisations.services.retreats.description')}
              </p>
              <ul className="text-sm text-text-secondary space-y-2 text-left">
                <li>• {t('organisations.services.retreats.features.0')}</li>
                <li>• {t('organisations.services.retreats.features.1')}</li>
                <li>• {t('organisations.services.retreats.features.2')}</li>
              </ul>
            </div>
          </Card>
        </div>
      </Section>

      {/* Formulaire de Devis */}
      <Section
        id="devis"
        subtitle={t('organisations.quote.subtitle')}
        title={t('organisations.quote.title')}
        description={t('organisations.quote.description')}
        centered
        accentColor="corporate"
      >
        <div className="max-w-3xl mx-auto">
          <Card padding="lg">
            <form className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <FormInput
                  label={t('organisations.form.firstName')}
                  name="firstName"
                  type="text"
                  placeholder={t('organisations.form.firstNamePlaceholder')}
                  required
                />
                <FormInput
                  label={t('organisations.form.lastName')}
                  name="lastName"
                  type="text"
                  placeholder={t('organisations.form.lastNamePlaceholder')}
                  required
                />
              </div>

              <FormInput
                label={t('organisations.form.email')}
                name="email"
                type="email"
                placeholder={t('organisations.form.emailPlaceholder')}
                required
              />

              <FormInput
                label={t('organisations.form.phone')}
                name="phone"
                type="tel"
                placeholder="+212 6 00 00 00 00"
              />

              <FormInput
                label={t('organisations.form.organization')}
                name="organization"
                type="text"
                placeholder={t('organisations.form.organizationPlaceholder')}
                required
              />

              <FormInput
                label={t('organisations.form.size')}
                name="size"
                type="select"
                required
                options={[
                  { value: '1-10', label: t('organisations.form.sizeOptions.0') },
                  { value: '11-50', label: t('organisations.form.sizeOptions.1') },
                  { value: '51-200', label: t('organisations.form.sizeOptions.2') },
                  { value: '201-500', label: t('organisations.form.sizeOptions.3') },
                  { value: '500+', label: t('organisations.form.sizeOptions.4') },
                ]}
              />

              <FormInput
                label={t('organisations.form.service')}
                name="service"
                type="select"
                required
                options={[
                  {
                    value: 'transformation',
                    label: t('organisations.form.serviceOptions.0'),
                  },
                  { value: 'leadership', label: t('organisations.form.serviceOptions.1') },
                  { value: 'retraite', label: t('organisations.form.serviceOptions.2') },
                  { value: 'facilitation', label: t('organisations.form.serviceOptions.3') },
                  { value: 'autre', label: t('organisations.form.serviceOptions.4') },
                ]}
              />

              <FormInput
                label={t('organisations.form.message')}
                name="message"
                type="textarea"
                placeholder={t('organisations.form.messagePlaceholder')}
                required
                rows={6}
              />

              <Button variant="primary" size="lg" fullWidth>
                {t('organisations.form.submit')}
              </Button>

              <p className="text-sm text-text-secondary text-center">
                {t('organisations.form.responseTime')}
              </p>
            </form>
          </Card>
        </div>
      </Section>

      {/* CTA */}
      <Section background="sky-blue-light" padding="md" centered>
        <div className="max-w-3xl mx-auto">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-deep-blue mb-4">
            {t('organisations.cta.title')}
          </h3>
          <p className="text-text-secondary mb-6">
            {t('organisations.cta.description')}
          </p>
          <Button variant="primary" size="lg" href="/contact">
            {t('organisations.cta.button')}
          </Button>
        </div>
      </Section>
    </>
  );
}
