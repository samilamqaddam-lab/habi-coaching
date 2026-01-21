'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import Button from '@/components/ui/Button';
import Section from '@/components/sections/Section';

interface EventData {
  id: string;
  title: string;
  title_en?: string | null;
  subtitle?: string | null;
  subtitle_en?: string | null;
  badge?: string | null;
  badge_en?: string | null;
  description?: string | null;
  description_en?: string | null;
  date_time: string;
  duration_minutes: number;
  location: string;
  address: string;
  price?: number | null;
  max_capacity: number;
  remaining_spots: number;
  is_full: boolean;
}

interface EventPageContentProps {
  event: EventData;
}

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function EventPageContent({ event }: EventPageContentProps) {
  const { locale, t } = useTranslation();
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  // Get localized content
  const title = locale === 'en' && event.title_en ? event.title_en : event.title;
  const subtitle = locale === 'en' && event.subtitle_en ? event.subtitle_en : event.subtitle;
  const badge = locale === 'en' && event.badge_en ? event.badge_en : event.badge;
  const description = locale === 'en' && event.description_en ? event.description_en : event.description;

  // Format date
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    });
  };

  const formatEventTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch(`/api/events/${event.id}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'inscription');
      }

      setSubmitResult({
        success: true,
        message: locale === 'fr'
          ? 'Inscription enregistrée ! Vous recevrez un email de confirmation.'
          : 'Registration complete! You will receive a confirmation email.',
      });
      setFormData({ firstName: '', lastName: '', email: '', phone: '' });
    } catch (error) {
      setSubmitResult({
        success: false,
        message: error instanceof Error ? error.message : 'Erreur lors de l\'inscription',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <Section className="!pt-24 !pb-12 bg-gradient-to-b from-dune-beige to-white">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-text-secondary">
              <li>
                <Link href="/" className="hover:text-golden-orange transition-colors">
                  {locale === 'fr' ? 'Accueil' : 'Home'}
                </Link>
              </li>
              <li>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li>
                <Link href="/yoga" className="hover:text-golden-orange transition-colors">
                  Yoga
                </Link>
              </li>
              <li>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-deep-blue font-medium">{title}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Event Info */}
            <div>
              {/* Badge */}
              {badge && (
                <span className="inline-block px-4 py-1.5 bg-golden-orange/10 text-golden-orange text-sm font-semibold rounded-full mb-4">
                  {badge}
                </span>
              )}

              {/* Title */}
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-deep-blue mb-3">
                {title}
              </h1>

              {/* Subtitle */}
              {subtitle && (
                <p className="text-xl text-golden-orange font-medium italic mb-6">
                  {subtitle}
                </p>
              )}

              {/* Description */}
              {description && (
                <p className="text-text-secondary text-lg leading-relaxed mb-8">
                  {description}
                </p>
              )}

              {/* Event Details Cards */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {/* Date */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-golden-orange/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-golden-orange/10 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-golden-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary uppercase tracking-wide">
                        {locale === 'fr' ? 'Date' : 'Date'}
                      </p>
                      <p className="text-deep-blue font-semibold capitalize">
                        {formatEventDate(event.date_time)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Time */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-golden-orange/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-golden-orange/10 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-golden-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary uppercase tracking-wide">
                        {locale === 'fr' ? 'Heure' : 'Time'}
                      </p>
                      <p className="text-deep-blue font-semibold">
                        {formatEventTime(event.date_time)} ({event.duration_minutes} min)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-golden-orange/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-golden-orange/10 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-golden-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary uppercase tracking-wide">
                        {locale === 'fr' ? 'Lieu' : 'Location'}
                      </p>
                      <p className="text-deep-blue font-semibold">{event.location}</p>
                      <p className="text-text-secondary text-sm">{event.address}</p>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-golden-orange/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-golden-orange/10 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-golden-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary uppercase tracking-wide">
                        {locale === 'fr' ? 'Tarif' : 'Price'}
                      </p>
                      <p className="text-golden-orange font-bold text-xl">
                        {event.price ? `${event.price} MAD` : (locale === 'fr' ? 'Gratuit' : 'Free')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-3 mb-4">
                {event.is_full ? (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 font-semibold rounded-full">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {locale === 'fr' ? 'Complet' : 'Full'}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 font-semibold rounded-full">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {event.remaining_spots} {locale === 'fr' ? 'places restantes' : 'spots left'}
                  </span>
                )}
              </div>
            </div>

            {/* Right Column - Registration Form */}
            <div className="lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl shadow-lg border border-golden-orange/10 p-8">
                <h2 className="font-heading text-2xl font-bold text-deep-blue mb-6">
                  {locale === 'fr' ? 'Inscription' : 'Registration'}
                </h2>

                {/* Success/Error Message */}
                {submitResult && (
                  <div className={`mb-6 p-4 rounded-lg ${submitResult.success ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                    <div className="flex items-start gap-3">
                      {submitResult.success ? (
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                      <p className="text-sm font-medium">{submitResult.message}</p>
                    </div>
                  </div>
                )}

                {event.is_full ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <p className="text-text-secondary">
                      {locale === 'fr'
                        ? 'Cet événement est complet. Consultez nos autres événements.'
                        : 'This event is full. Check out our other events.'}
                    </p>
                    <Link href="/yoga" className="inline-block mt-4 text-golden-orange hover:underline font-medium">
                      {locale === 'fr' ? 'Voir tous les événements' : 'View all events'}
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-deep-blue mb-2">
                          {locale === 'fr' ? 'Prénom' : 'First Name'} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-orange/50 focus:border-golden-orange transition-colors"
                          placeholder={locale === 'fr' ? 'Votre prénom' : 'Your first name'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-deep-blue mb-2">
                          {locale === 'fr' ? 'Nom' : 'Last Name'} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-orange/50 focus:border-golden-orange transition-colors"
                          placeholder={locale === 'fr' ? 'Votre nom' : 'Your last name'}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-deep-blue mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-orange/50 focus:border-golden-orange transition-colors"
                        placeholder={locale === 'fr' ? 'votre@email.com' : 'your@email.com'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-deep-blue mb-2">
                        {locale === 'fr' ? 'Téléphone' : 'Phone'} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-orange/50 focus:border-golden-orange transition-colors"
                        placeholder="+212 6XX XXX XXX"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      fullWidth
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? (locale === 'fr' ? 'Envoi en cours...' : 'Sending...')
                        : (locale === 'fr' ? "S'inscrire" : 'Register')
                      }
                    </Button>

                    <p className="text-xs text-text-secondary text-center">
                      {locale === 'fr'
                        ? 'En vous inscrivant, vous acceptez de recevoir des informations concernant cet événement.'
                        : 'By registering, you agree to receive information about this event.'}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Instructor Section */}
      <Section className="bg-white !py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-golden-orange/20">
                <Image
                  src="/images/Reel/Hajar.jpg"
                  alt="Hajar Habi"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-heading text-xl font-bold text-deep-blue mb-1">
                  Hajar Habi
                </h3>
                <p className="text-golden-orange font-medium text-sm mb-3">
                  {locale === 'fr' ? 'Professeure de Yoga Certifiée' : 'Certified Yoga Teacher'}
                </p>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {locale === 'fr'
                    ? 'Certifiée Sadhguru Gurukulam avec plus de 1750 heures de formation. Coach professionnelle et consultante avec plus de 20 ans d\'expérience corporate.'
                    : 'Certified by Sadhguru Gurukulam with over 1750 hours of training. Professional coach and consultant with over 20 years of corporate experience.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-b from-dune-beige/50 to-white !py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-deep-blue mb-4">
            {locale === 'fr' ? 'Découvrez nos autres offres' : 'Discover our other offerings'}
          </h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            {locale === 'fr'
              ? 'Explorez notre gamme complète de programmes yoga et événements pour approfondir votre pratique.'
              : 'Explore our full range of yoga programs and events to deepen your practice.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/yoga">
              <Button variant="primary">
                {locale === 'fr' ? 'Voir tous les programmes' : 'View all programs'}
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">
                {locale === 'fr' ? 'Nous contacter' : 'Contact us'}
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
