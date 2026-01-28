'use client'

import { useState } from 'react'
import Hero from '@/components/sections/Hero'
import Section from '@/components/sections/Section'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import FormInput from '@/components/ui/FormInput'
import { useTranslation } from '@/hooks/useTranslation'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  organization: string
  function: string
  city: string
  interest: string
  message: string
  consent: boolean
}

export default function ContactContent() {
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    function: '',
    city: '',
    interest: '',
    message: '',
    consent: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmitStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          organization: '',
          function: '',
          city: '',
          interest: '',
          message: '',
          consent: false,
        })
      } else {
        setSubmitStatus('error')
        setErrorMessage(data.error || 'Une erreur est survenue')
      }
    } catch {
      setSubmitStatus('error')
      setErrorMessage('Erreur de connexion. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
              href="mailto:hajar@transcendencework.com"
              className="text-text-secondary hover:text-terracotta transition-colors"
            >
              hajar@transcendencework.com
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
              href="tel:+212663096857"
              className="text-text-secondary hover:text-terracotta transition-colors"
            >
              +212 663 096 857
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
            {submitStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl font-bold text-deep-blue mb-4">
                  Message envoyé !
                </h3>
                <p className="text-text-secondary mb-6">
                  Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                </p>
                <Button variant="outline" onClick={() => setSubmitStatus('idle')}>
                  Envoyer un autre message
                </Button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {errorMessage}
                  </div>
                )}

                <div className="grid lg:grid-cols-2 gap-6">
                  <FormInput
                    label={t('contact.form.firstName')}
                    name="firstName"
                    type="text"
                    placeholder={t('contact.form.firstNamePlaceholder')}
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <FormInput
                    label={t('contact.form.lastName')}
                    name="lastName"
                    type="text"
                    placeholder={t('contact.form.lastNamePlaceholder')}
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>

                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder={t('contact.form.emailPlaceholder')}
                  required
                  value={formData.email}
                  onChange={handleChange}
                />

                <FormInput
                  label={t('contact.form.phone')}
                  name="phone"
                  type="tel"
                  placeholder="+212 6 00 00 00 00"
                  value={formData.phone}
                  onChange={handleChange}
                />

                <div className="grid lg:grid-cols-3 gap-6">
                  <FormInput
                    label={t('contact.form.organization')}
                    name="organization"
                    type="text"
                    placeholder={t('contact.form.organizationPlaceholder')}
                    value={formData.organization}
                    onChange={handleChange}
                  />
                  <FormInput
                    label={t('contact.form.function')}
                    name="function"
                    type="text"
                    placeholder={t('contact.form.functionPlaceholder')}
                    value={formData.function}
                    onChange={handleChange}
                  />
                  <FormInput
                    label={t('contact.form.city')}
                    name="city"
                    type="text"
                    placeholder={t('contact.form.cityPlaceholder')}
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                <FormInput
                  label={t('contact.form.interest')}
                  name="interest"
                  type="select"
                  required
                  value={formData.interest}
                  onChange={handleChange}
                  options={[
                    { value: 'yoga-individuel', label: t('contact.form.interestOptions.0') },
                    { value: 'organisations', label: t('contact.form.interestOptions.1') },
                    { value: 'autre', label: t('contact.form.interestOptions.2') },
                  ]}
                />

                <FormInput
                  label={t('contact.form.message')}
                  name="message"
                  type="textarea"
                  placeholder={t('contact.form.messagePlaceholder')}
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                />

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    required
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 mr-3 w-4 h-4 text-terracotta border-soft-gray rounded focus:ring-terracotta"
                  />
                  <label htmlFor="consent" className="text-sm text-text-secondary">
                    {t('contact.form.consent')}
                  </label>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Envoi en cours...' : t('contact.form.submit')}
                </Button>

                <p className="text-sm text-text-secondary text-center">
                  {t('contact.form.responseTime')}
                </p>
              </form>
            )}
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
            href="https://open.spotify.com/show/3c1fH8hzdIRcFVwRGYQClR"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-warm-white rounded-full flex items-center justify-center text-morocco-blue hover:bg-terracotta hover:text-warm-white transition-all"
            aria-label="Spotify Podcast"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/hajar-habi/"
            target="_blank"
            rel="noopener noreferrer"
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
  )
}
