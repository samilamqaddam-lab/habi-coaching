'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { useTranslation } from '@/hooks/useTranslation';
import type { YogaEvent } from '@/hooks/useEventsData';
import { formatDuration } from '@/lib/price-utils';

interface FeaturedEventCardProps {
  event: YogaEvent;
  image?: string;
}

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function FeaturedEventCard({ event, image }: FeaturedEventCardProps) {
  const { locale } = useTranslation();
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

  // Format date (without time)
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

  // Format time
  const formatEventTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
    });
  };

  // Calculate end time
  const getEndTime = (dateString: string, durationMinutes: number) => {
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() + durationMinutes);
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
    <div className="bg-warm-white rounded-2xl border border-golden-orange/20 overflow-hidden shadow-sm group/card">
      <div className="grid lg:grid-cols-3">
        {/* Left: Image */}
        <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:min-h-full">
          <Image
            src={event.image_url || image || '/images/events/default-event.jpg'}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          {/* Open in new tab icon */}
          <a
            href={`/evenements/${event.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 hover:bg-white hover:scale-110 shadow-md z-10"
            title={locale === 'fr' ? 'Voir la page complète' : 'View full page'}
          >
            <svg className="w-4 h-4 text-deep-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          {/* Gradient overlay on mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
        </div>

        {/* Middle: Event Info */}
        <div className="p-6 lg:py-6 lg:px-8">
          {/* Badge */}
          {badge && (
            <span className="inline-flex self-start px-3 py-1 bg-golden-orange/10 text-golden-orange text-xs font-semibold rounded-full mb-4">
              {badge}
            </span>
          )}

          {/* Title */}
          <h3 className="font-heading text-2xl lg:text-3xl font-bold text-deep-blue mb-2">
            {title}
          </h3>
          {subtitle && (
            <p className="text-golden-orange font-medium italic text-base mb-4">
              {subtitle}
            </p>
          )}

          {/* Description */}
          {description && (
            <p className="text-text-secondary leading-relaxed mb-6">
              {description}
            </p>
          )}

          {/* Event Details */}
          <div className="space-y-3">
            {/* Date */}
            <div className="flex items-start text-text-secondary">
              <svg className="w-5 h-5 mr-3 text-golden-orange mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-base">{formatEventDate(event.date_time)}</span>
            </div>

            {/* Time & Duration */}
            <div className="flex items-start text-text-secondary">
              <svg className="w-5 h-5 mr-3 text-golden-orange mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-base">
                {formatEventTime(event.date_time)} - {getEndTime(event.date_time, event.duration_minutes)} ({formatDuration(event.duration_minutes)})
              </span>
            </div>

            {/* Location */}
            <div className="flex items-start text-text-secondary">
              <svg className="w-5 h-5 mr-3 text-golden-orange mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-base">{event.location}, {event.address}</span>
            </div>

            {/* Price */}
            {event.price && (
              <div className="pt-4 mt-4 border-t border-golden-orange/10">
                <span className="text-golden-orange font-bold text-2xl">
                  {event.price} MAD
                </span>
              </div>
            )}
          </div>

          {/* Availability Badge */}
          <div className="mt-6">
            {event.is_full ? (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 text-sm font-semibold rounded-full">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {locale === 'fr' ? 'Complet' : 'Full'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {event.remaining_spots} {locale === 'fr' ? 'places restantes' : 'spots left'}
              </span>
            )}
          </div>
        </div>

        {/* Right: Registration Form */}
        <div className="bg-dune-beige/30 p-6 lg:py-6 lg:px-8 border-t lg:border-t-0 lg:border-l border-golden-orange/10">
          <h4 className="font-heading text-xl font-semibold text-deep-blue mb-6">
            {locale === 'fr' ? 'Inscription' : 'Registration'}
          </h4>

          {/* Success/Error Message */}
          {submitResult && (
            <div className={`p-4 rounded-lg mb-6 ${submitResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              <p className="text-sm font-medium">{submitResult.message}</p>
            </div>
          )}

          {event.is_full ? (
            <div className="text-center py-8">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              <p className="text-text-secondary">
                {locale === 'fr'
                  ? 'Cet événement est complet. Contactez-nous pour être informé des prochaines dates.'
                  : 'This event is full. Contact us to be notified of upcoming dates.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-1.5 font-medium">
                    {locale === 'fr' ? 'Prénom' : 'First Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-orange/50 focus:border-golden-orange bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1.5 font-medium">
                    {locale === 'fr' ? 'Nom' : 'Last Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-orange/50 focus:border-golden-orange bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-1.5 font-medium">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-orange/50 focus:border-golden-orange bg-white"
                />
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-1.5 font-medium">
                  {locale === 'fr' ? 'Téléphone' : 'Phone'} *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-orange/50 focus:border-golden-orange bg-white"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? (locale === 'fr' ? 'Envoi en cours...' : 'Sending...')
                  : (locale === 'fr' ? "Confirmer l'inscription" : 'Confirm Registration')
                }
              </Button>

              <p className="text-xs text-text-secondary text-center mt-3">
                {locale === 'fr'
                  ? 'En vous inscrivant, vous acceptez de recevoir des informations concernant cet événement.'
                  : 'By registering, you agree to receive information about this event.'}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
