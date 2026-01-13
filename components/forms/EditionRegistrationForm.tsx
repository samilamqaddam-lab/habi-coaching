'use client';

import { useState, useEffect, useCallback } from 'react';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import SessionDatePicker from '@/components/programmes/SessionDatePicker';
import { useTranslation } from '@/hooks/useTranslation';
import { isSupabaseConfigured } from '@/lib/supabase';

interface DateOption {
  id: string;
  session_id: string;
  date_time: string;
  location: string;
  max_capacity: number;
  current_count: number;
  remaining_spots: number;
  is_full: boolean;
}

interface Session {
  id: string;
  session_number: number;
  title: string;
  title_en?: string;
  date_options: DateOption[];
}

interface Edition {
  id: string;
  programme_key: string;
  title: string;
  title_en?: string;
}

interface EditionRegistrationFormProps {
  editionId?: string; // UUID or programme_key like 'upa-yoga'
  programmeKey?: string; // Alternative to editionId
  onClose?: () => void;
  onSuccess?: () => void;
}

export default function EditionRegistrationForm({
  editionId,
  programmeKey,
  onClose,
  onSuccess,
}: EditionRegistrationFormProps) {
  const { t, locale } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  // Edition data
  const [edition, setEdition] = useState<Edition | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoadingEdition, setIsLoadingEdition] = useState(true);
  const [editionError, setEditionError] = useState<string | null>(null);

  // Selected dates for each session
  const [selectedDates, setSelectedDates] = useState<Record<string, string>>({});

  // Form validation
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const resolvedId = editionId || programmeKey || 'upa-yoga';

  // Fetch edition data
  const fetchEdition = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setEditionError(locale === 'fr'
        ? 'Service d\'inscription non disponible'
        : 'Registration service unavailable'
      );
      setIsLoadingEdition(false);
      return;
    }

    try {
      setIsLoadingEdition(true);
      const response = await fetch(`/api/programmes/${resolvedId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch edition');
      }

      const data = await response.json();
      setEdition(data.edition);
      setSessions(data.sessions);
      setEditionError(null);

      // Pre-select first available date for each session
      const initialSelections: Record<string, string> = {};
      data.sessions.forEach((session: Session) => {
        const availableOption = session.date_options.find(opt => !opt.is_full);
        if (availableOption) {
          initialSelections[session.id] = availableOption.id;
        }
      });
      setSelectedDates(initialSelections);
    } catch (err) {
      console.error('Error fetching edition:', err);
      setEditionError(locale === 'fr'
        ? 'Erreur lors du chargement des sessions'
        : 'Error loading sessions'
      );
    } finally {
      setIsLoadingEdition(false);
    }
  }, [resolvedId, locale]);

  useEffect(() => {
    fetchEdition();
  }, [fetchEdition]);

  // Refresh availability
  const refreshAvailability = async () => {
    if (!isSupabaseConfigured()) return;

    try {
      const response = await fetch(`/api/programmes/${resolvedId}/availability`);
      if (response.ok) {
        const data = await response.json();

        // Update sessions with new availability
        setSessions(prevSessions =>
          prevSessions.map(session => ({
            ...session,
            date_options: session.date_options.map(option => {
              const newAvail = data.availability[option.id];
              if (newAvail) {
                return {
                  ...option,
                  current_count: newAvail.current_count,
                  remaining_spots: newAvail.remaining_spots,
                  is_full: newAvail.is_full,
                };
              }
              return option;
            }),
          }))
        );
      }
    } catch (err) {
      console.error('Error refreshing availability:', err);
    }
  };

  const handleDateChange = (sessionId: string, dateOptionId: string) => {
    setSelectedDates(prev => ({
      ...prev,
      [sessionId]: dateOptionId,
    }));
  };

  const validateForm = (formData: FormData): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.get('firstName')?.toString().trim()) {
      errors.firstName = locale === 'fr' ? 'Prénom requis' : 'First name required';
    }
    if (!formData.get('lastName')?.toString().trim()) {
      errors.lastName = locale === 'fr' ? 'Nom requis' : 'Last name required';
    }
    if (!formData.get('email')?.toString().trim()) {
      errors.email = locale === 'fr' ? 'Email requis' : 'Email required';
    }
    if (!formData.get('phone')?.toString().trim()) {
      errors.phone = locale === 'fr' ? 'Téléphone requis' : 'Phone required';
    }

    // Check all sessions have a date selected
    const missingDates = sessions.filter(s => !selectedDates[s.id]);
    if (missingDates.length > 0) {
      errors.dates = locale === 'fr'
        ? `Veuillez choisir une date pour: ${missingDates.map(s => s.title).join(', ')}`
        : `Please choose a date for: ${missingDates.map(s => s.title_en || s.title).join(', ')}`;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!validateForm(formData)) {
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    try {
      const response = await fetch(`/api/programmes/${resolvedId}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.get('firstName'),
          lastName: formData.get('lastName'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          whatsapp: formData.get('whatsapp') || undefined,
          message: formData.get('message') || undefined,
          consent: consentChecked,
          dateChoices: Object.values(selectedDates),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.fullDates) {
          // Some dates are now full - refresh and show error
          await refreshAvailability();
          setFormErrors({
            dates: locale === 'fr'
              ? 'Certaines dates sont maintenant complètes. Veuillez choisir d\'autres dates.'
              : 'Some dates are now full. Please choose different dates.',
          });
        } else {
          setFormErrors({
            submit: result.error || (locale === 'fr' ? 'Erreur lors de l\'inscription' : 'Registration error'),
          });
        }
        return;
      }

      setIsSuccess(true);
      if (onSuccess) {
        setTimeout(onSuccess, 3000);
      } else if (onClose) {
        setTimeout(onClose, 3000);
      }
    } catch (error) {
      console.error('Submit error:', error);
      setFormErrors({
        submit: locale === 'fr' ? 'Erreur de connexion' : 'Connection error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-bold text-deep-blue mb-3">
          {locale === 'fr' ? 'Inscription envoyée avec succès!' : 'Registration submitted successfully!'}
        </h3>
        <p className="text-text-secondary">
          {locale === 'fr'
            ? 'Vous recevrez une confirmation et les détails du programme dans les 24-48h.'
            : 'You will receive confirmation and program details within 24-48h.'
          }
        </p>
      </div>
    );
  }

  // Loading state
  if (isLoadingEdition) {
    return (
      <div className="py-12 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-golden-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Error state
  if (editionError) {
    return (
      <div className="py-12 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h3 className="font-heading text-xl font-bold text-deep-blue mb-2">
          {locale === 'fr' ? 'Oups!' : 'Oops!'}
        </h3>
        <p className="text-text-secondary mb-4">{editionError}</p>
        <Button variant="outline" onClick={fetchEdition}>
          {locale === 'fr' ? 'Réessayer' : 'Try again'}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Edition title */}
      {edition && (
        <div className="bg-golden-orange/10 rounded-lg p-4 mb-6">
          <h3 className="font-heading font-bold text-deep-blue">
            {locale === 'fr' ? edition.title : edition.title_en || edition.title}
          </h3>
          <p className="text-sm text-text-secondary">
            {locale === 'fr'
              ? 'Choisissez une date pour chaque session'
              : 'Choose a date for each session'
            }
          </p>
        </div>
      )}

      {/* Session Date Picker */}
      <SessionDatePicker
        editionId={resolvedId}
        sessions={sessions}
        selectedDates={selectedDates}
        onDateChange={handleDateChange}
        onRefreshAvailability={refreshAvailability}
        isLoading={false}
        error={formErrors.dates}
      />

      {/* Personal Information */}
      <div className="pt-6 border-t border-gray-200">
        <h4 className="font-heading font-semibold text-deep-blue mb-4">
          {locale === 'fr' ? 'Vos informations' : 'Your information'}
        </h4>

        <div className="grid md:grid-cols-2 gap-4">
          <FormInput
            label={locale === 'fr' ? 'Prénom' : 'First name'}
            name="firstName"
            type="text"
            placeholder={locale === 'fr' ? 'Votre prénom' : 'Your first name'}
            required
            error={formErrors.firstName}
          />
          <FormInput
            label={locale === 'fr' ? 'Nom' : 'Last name'}
            name="lastName"
            type="text"
            placeholder={locale === 'fr' ? 'Votre nom' : 'Your last name'}
            required
            error={formErrors.lastName}
          />
        </div>

        <div className="mt-4">
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="votre@email.com"
            required
            error={formErrors.email}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <FormInput
            label={locale === 'fr' ? 'Téléphone' : 'Phone'}
            name="phone"
            type="tel"
            placeholder="+212 6 00 00 00 00"
            required
            error={formErrors.phone}
          />
          <FormInput
            label={locale === 'fr' ? 'WhatsApp (si différent)' : 'WhatsApp (if different)'}
            name="whatsapp"
            type="tel"
            placeholder="+212 6 00 00 00 00"
          />
        </div>

        <div className="mt-4">
          <FormInput
            label={locale === 'fr' ? 'Message (optionnel)' : 'Message (optional)'}
            name="message"
            type="textarea"
            placeholder={locale === 'fr'
              ? 'Questions ou informations complémentaires...'
              : 'Questions or additional information...'
            }
            rows={3}
          />
        </div>
      </div>

      {/* RGPD Consent */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          checked={consentChecked}
          onChange={(e) => setConsentChecked(e.target.checked)}
          required
          className="mt-1 h-4 w-4 rounded border-gray-300 text-golden-orange focus:ring-golden-orange"
        />
        <label htmlFor="consent" className="text-sm text-text-secondary leading-relaxed">
          {locale === 'fr'
            ? "J'accepte que mes données personnelles soient utilisées pour me recontacter concernant ma demande. Elles ne seront jamais partagées avec des tiers."
            : "I agree that my personal data may be used to contact me regarding my request. They will never be shared with third parties."
          }
        </label>
      </div>

      {/* Submit error */}
      {formErrors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {formErrors.submit}
        </div>
      )}

      {/* Submit button */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        type="submit"
        disabled={isSubmitting || !consentChecked || Object.keys(selectedDates).length !== sessions.length}
      >
        {isSubmitting
          ? (locale === 'fr' ? 'Envoi en cours...' : 'Sending...')
          : (locale === 'fr' ? "Confirmer mon inscription" : 'Confirm registration')
        }
      </Button>

      {/* Footer note */}
      <p className="text-xs text-text-secondary text-center">
        {locale === 'fr'
          ? "Vous serez contacté·e par la Professeure de Hatha Yoga pour un échange préalable."
          : "You will be contacted by the Hatha Yoga Teacher for a preliminary discussion."
        }
      </p>
    </form>
  );
}
