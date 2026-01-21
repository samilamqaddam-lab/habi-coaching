'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useTranslation } from '@/hooks/useTranslation';
import type { YogaEvent } from '@/hooks/useEventsData';
import { formatDuration } from '@/lib/price-utils';

interface EventCardProps {
  event: YogaEvent;
}

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function EventCard({ event }: EventCardProps) {
  const { locale } = useTranslation();
  const [showForm, setShowForm] = useState(false);
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
      setShowForm(false);
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
    <Card padding="lg" className="group !bg-warm-white border border-golden-orange/20 hover:border-golden-orange/40 transition-colors relative">
      {/* Open in new tab icon */}
      <a
        href={`/evenements/${event.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-3 right-3 w-8 h-8 bg-golden-orange/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-golden-orange/20 hover:scale-110 z-10"
        title={locale === 'fr' ? 'Voir la page complète' : 'View full page'}
      >
        <svg className="w-4 h-4 text-golden-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>

      <div className="space-y-4">
        {/* Header with Badge */}
        <div className="flex items-start justify-between gap-4 pr-10">
          <div>
            <h3 className="font-heading text-xl font-bold text-deep-blue">
              {title}
            </h3>
            {subtitle && (
              <p className="text-golden-orange font-medium italic text-sm mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {badge && (
            <span className="flex-shrink-0 px-3 py-1 bg-golden-orange/10 text-golden-orange text-xs font-semibold rounded-full">
              {badge}
            </span>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-text-secondary text-sm leading-relaxed">
            {description}
          </p>
        )}

        {/* Event Details */}
        <div className="space-y-2 text-sm">
          {/* Date */}
          <div className="flex items-start text-text-secondary">
            <svg className="w-4 h-4 mr-2 text-golden-orange mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatEventDate(event.date_time)}</span>
          </div>

          {/* Time & Duration */}
          <div className="flex items-start text-text-secondary">
            <svg className="w-4 h-4 mr-2 text-golden-orange mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {formatEventTime(event.date_time)} - {getEndTime(event.date_time, event.duration_minutes)} ({formatDuration(event.duration_minutes)})
            </span>
          </div>

          {/* Location */}
          <div className="flex items-start text-text-secondary">
            <svg className="w-4 h-4 mr-2 text-golden-orange mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{event.location}, {event.address}</span>
          </div>

          {/* Price */}
          {event.price && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-golden-orange/10">
              <span className="text-golden-orange font-bold text-lg">
                {event.price} MAD
              </span>
            </div>
          )}
        </div>

        {/* Availability Badge */}
        <div className="flex items-center gap-2">
          {event.is_full ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {locale === 'fr' ? 'Complet' : 'Full'}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {event.remaining_spots} {locale === 'fr' ? 'places restantes' : 'spots left'}
            </span>
          )}
        </div>

        {/* Success/Error Message */}
        {submitResult && (
          <div className={`p-4 rounded-lg ${submitResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            <p className="text-sm font-medium">{submitResult.message}</p>
          </div>
        )}

        {/* CTA Button / Registration Form */}
        {!showForm ? (
          <Button
            variant="primary"
            fullWidth
            onClick={() => setShowForm(true)}
            disabled={event.is_full}
          >
            {event.is_full
              ? (locale === 'fr' ? 'Complet' : 'Full')
              : (locale === 'fr' ? "S'inscrire" : 'Register')
            }
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-golden-orange/10">
            <h4 className="font-semibold text-deep-blue">
              {locale === 'fr' ? 'Inscription' : 'Registration'}
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-text-secondary mb-1">
                  {locale === 'fr' ? 'Prénom' : 'First Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-golden-orange/50 focus:border-golden-orange"
                />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1">
                  {locale === 'fr' ? 'Nom' : 'Last Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-golden-orange/50 focus:border-golden-orange"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-text-secondary mb-1">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-golden-orange/50 focus:border-golden-orange"
              />
            </div>

            <div>
              <label className="block text-xs text-text-secondary mb-1">
                {locale === 'fr' ? 'Téléphone' : 'Phone'} *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-golden-orange/50 focus:border-golden-orange"
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                className="flex-1"
              >
                {locale === 'fr' ? 'Annuler' : 'Cancel'}
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? (locale === 'fr' ? 'Envoi...' : 'Sending...')
                  : (locale === 'fr' ? 'Confirmer' : 'Confirm')
                }
              </Button>
            </div>

            <p className="text-xs text-text-secondary text-center">
              {locale === 'fr'
                ? 'En vous inscrivant, vous acceptez de recevoir des informations concernant cet événement.'
                : 'By registering, you agree to receive information about this event.'}
            </p>
          </form>
        )}
      </div>
    </Card>
  );
}
