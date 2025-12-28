'use client';

import Hero from '@/components/sections/Hero';
import Section from '@/components/sections/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import { useTranslation } from '@/hooks/useTranslation';

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <>
      <Hero
        subtitle={t('contact.hero.subtitle')}
        title={t('contact.hero.title')}
        description={t('contact.hero.description')}
        primaryCTA={{
          text: t('contact.hero.primaryCTA'),
          href: '#contact-form',
        }}
        compact
        splitLayout
        splitImage="/images/heroes/contact-coffee-cups-hero.jpg"
      />

      {/* Contact Methods */}
      <Section background="beige" padding="lg" afterHero>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-deep-blue mb-3">Email</h3>
            <a
              href="mailto:contact@habi-coaching.com"
              className="text-text-secondary hover:text-terracotta transition-colors"
            >
              contact@habi-coaching.com
            </a>
          </Card>

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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-deep-blue mb-3">
              {t('contact.methods.phone')}
            </h3>
            <a
              href="tel:+212600000000"
              className="text-text-secondary hover:text-terracotta transition-colors"
            >
              +212 6 00 00 00 00
            </a>
          </Card>

          <Card padding="lg" className="text-center">
            <div className="w-16 h-16 bg-morocco-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-morocco-blue"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </div>
            <h3 className="font-semibold text-deep-blue mb-3">LinkedIn</h3>
            <a
              href="https://www.linkedin.com/in/hajar-habi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-terracotta transition-colors"
            >
              {t('contact.methods.linkedin.profile')}
            </a>
          </Card>
        </div>

        {/* Contact Form */}
        <div id="contact-form" className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-terracotta text-sm font-medium uppercase tracking-wider mb-3">
              {t('contact.form.subtitle')}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-deep-blue mb-4">
              {t('contact.form.title')}
            </h2>
            <p className="text-text-secondary">
              {t('contact.form.description')}
            </p>
          </div>

          <Card padding="lg">
            <form className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <FormInput
                  label={t('contact.form.firstName')}
                  name="firstName"
                  type="text"
                  placeholder={t('contact.form.firstNamePlaceholder')}
                  required
                />
                <FormInput
                  label={t('contact.form.lastName')}
                  name="lastName"
                  type="text"
                  placeholder={t('contact.form.lastNamePlaceholder')}
                  required
                />
              </div>

              <FormInput
                label="Email"
                name="email"
                type="email"
                placeholder={t('contact.form.emailPlaceholder')}
                required
              />

              <FormInput
                label={t('contact.form.phone')}
                name="phone"
                type="tel"
                placeholder="+212 6 00 00 00 00"
              />

              <div className="grid lg:grid-cols-3 gap-6">
                <FormInput
                  label={t('contact.form.organization')}
                  name="organization"
                  type="text"
                  placeholder={t('contact.form.organizationPlaceholder')}
                />
                <FormInput
                  label={t('contact.form.function')}
                  name="function"
                  type="text"
                  placeholder={t('contact.form.functionPlaceholder')}
                />
                <FormInput
                  label={t('contact.form.city')}
                  name="city"
                  type="text"
                  placeholder={t('contact.form.cityPlaceholder')}
                />
              </div>

              <FormInput
                label={t('contact.form.interest')}
                name="interest"
                type="select"
                required
                options={[
                  { value: 'coaching', label: t('contact.form.interestOptions.0') },
                  { value: 'yoga', label: t('contact.form.interestOptions.1') },
                  { value: 'retraite', label: t('contact.form.interestOptions.2') },
                  { value: 'organisation', label: t('contact.form.interestOptions.3') },
                  { value: 'autre', label: t('contact.form.interestOptions.4') },
                ]}
              />

              <FormInput
                label={t('contact.form.message')}
                name="message"
                type="textarea"
                placeholder={t('contact.form.messagePlaceholder')}
                required
                rows={6}
              />

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  required
                  className="mt-1 mr-3 w-4 h-4 text-terracotta border-soft-gray rounded focus:ring-terracotta"
                />
                <label htmlFor="consent" className="text-sm text-text-secondary">
                  {t('contact.form.consent')}
                </label>
              </div>

              <Button variant="primary" size="lg" fullWidth>
                {t('contact.form.submit')}
              </Button>

              <p className="text-sm text-text-secondary text-center">
                {t('contact.form.responseTime')}
              </p>
            </form>
          </Card>
        </div>
      </Section>

      {/* Social Media */}
      <Section background="sage" padding="md" centered>
        <h3 className="font-heading text-2xl font-bold text-deep-blue mb-4">
          {t('contact.social.title')}
        </h3>
        <p className="text-text-secondary mb-6">
          {t('contact.social.description')}
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="#"
            className="w-12 h-12 bg-warm-white rounded-full flex items-center justify-center text-morocco-blue hover:bg-terracotta hover:text-warm-white transition-all"
            aria-label="Instagram"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a
            href="#"
            className="w-12 h-12 bg-warm-white rounded-full flex items-center justify-center text-morocco-blue hover:bg-terracotta hover:text-warm-white transition-all"
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </Section>
    </>
  );
}
