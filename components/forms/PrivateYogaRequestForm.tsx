'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import SessionDatePicker from '@/components/programmes/SessionDatePicker';
import { useTranslation } from '@/hooks/useTranslation';
import type { ProgrammeEdition, EditionSessionWithAvailability } from '@/lib/supabase';

interface PrivateYogaRequestFormProps {
  onClose?: () => void;
  defaultYogaType?: string;
  isGroupClass?: boolean; // Si true, c'est un cours collectif (dates fixes, studio)
  // Hybrid integration: edition data for multi-session registration
  edition?: ProgrammeEdition | null;
  sessions?: EditionSessionWithAvailability[];
}

export default function PrivateYogaRequestForm({
  onClose,
  defaultYogaType,
  isGroupClass = false,
  edition,
  sessions
}: PrivateYogaRequestFormProps) {
  const { t, locale } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [yogaType, setYogaType] = useState(defaultYogaType || '');
  const [consentChecked, setConsentChecked] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Edition mode: when edition and sessions are provided
  const isEditionMode = !!(edition && sessions && sessions.length > 0);
  const [selectedDates, setSelectedDates] = useState<Record<string, string>>({});
  const [availability, setAvailability] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      if (isEditionMode && edition) {
        // **EDITION MODE**: Multi-session registration via Supabase

        // Validate all sessions have dates selected
        const allSessionsSelected = sessions!.every(session => selectedDates[session.id]);
        if (!allSessionsSelected) {
          setSubmitError(locale === 'fr'
            ? 'Veuillez sélectionner une date pour chaque session'
            : 'Please select a date for each session'
          );
          setIsSubmitting(false);
          return;
        }

        const response = await fetch(`/api/yoga/${edition.id}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            whatsapp: data.whatsapp || null,
            message: data.message || null,
            consent: true,
            dateChoices: Object.values(selectedDates),
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Registration failed');
        }

        setIsSuccess(true);
      } else {
        // **SIMPLE MODE**: Spontaneous registration for group classes
        // or private class request

        if (isGroupClass) {
          // Group class interest - send to /api/yoga/interest
          const response = await fetch('/api/yoga/interest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              phone: data.phone,
              whatsapp: data.whatsapp || null,
              yogaType: data.yogaType || yogaType,
              message: data.message || null,
              consent: true,
            }),
          });

          const result = await response.json();

          if (!response.ok) {
            throw new Error(result.error || 'Registration failed');
          }
        } else {
          // Private class request - send to /api/contact with yoga context
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: `${data.firstName} ${data.lastName}`,
              email: data.email,
              phone: data.phone,
              subject: `Demande de cours privé - ${data.yogaType || yogaType}`,
              message: `
Type de yoga: ${data.yogaType || yogaType}
Ville: ${data.location}
Objectif: ${data.goals}
Niveau: ${data.level}
Préférence de lieu: ${data.locationPreference}
Disponibilités: ${data.availability || 'Non précisées'}

Message:
${data.message || 'Aucun message supplémentaire'}
              `.trim(),
            }),
          });

          const result = await response.json();

          if (!response.ok) {
            throw new Error(result.error || 'Request failed');
          }
        }

        setIsSuccess(true);
      }

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        if (onClose) onClose();
      }, 3000);
    } catch (error: any) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitError(error.message || (locale === 'fr'
        ? 'Une erreur est survenue. Veuillez réessayer.'
        : 'An error occurred. Please try again.'
      ));
    } finally {
      setIsSubmitting(false);
    }
  };

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
          {isEditionMode
            ? (locale === 'fr' ? 'Inscription confirmée avec succès!' : 'Registration confirmed successfully!')
            : isGroupClass
            ? (locale === 'fr' ? 'Inscription envoyée avec succès!' : 'Registration sent successfully!')
            : (locale === 'fr' ? 'Demande envoyée avec succès!' : 'Request sent successfully!')}
        </h3>
        <p className="text-text-secondary">
          {isEditionMode
            ? (locale === 'fr'
              ? 'Vous recevrez un email de confirmation avec le récapitulatif de vos sessions sélectionnées dans quelques instants.'
              : 'You will receive a confirmation email with a summary of your selected sessions shortly.')
            : isGroupClass
            ? (locale === 'fr'
              ? 'Vous recevrez une confirmation et les détails du programme dans les 24-48h.'
              : 'You will receive confirmation and program details within 24-48h.')
            : (locale === 'fr'
              ? 'Hajar vous contactera dans les 24-48h pour discuter de votre cours privé.'
              : 'Hajar will contact you within 24-48h to discuss your private class.')}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informations personnelles */}
      <div className="grid md:grid-cols-2 gap-6">
        <FormInput
          label="Prénom"
          name="firstName"
          type="text"
          placeholder="Votre prénom"
          required
        />
        <FormInput
          label="Nom"
          name="lastName"
          type="text"
          placeholder="Votre nom"
          required
        />
      </div>

      <FormInput
        label="Email"
        name="email"
        type="email"
        placeholder="votre@email.com"
        required
      />

      <FormInput
        label="Téléphone"
        name="phone"
        type="tel"
        placeholder="+212 6 00 00 00 00"
        required
      />

      {/* WhatsApp si différent - Cours collectifs uniquement */}
      {isGroupClass && (
        <FormInput
          label="WhatsApp (si différent du téléphone)"
          name="whatsapp"
          type="tel"
          placeholder="+212 6 00 00 00 00"
        />
      )}

      {/* Ville - Seulement pour cours individuels */}
      {!isGroupClass && (
        <FormInput
          label="Ville / Quartier"
          name="location"
          type="text"
          placeholder="Ex: Casablanca, Maarif"
          required
        />
      )}

      {/* HYBRID INTEGRATION: Session Date Picker in Edition Mode */}
      {isEditionMode && edition && sessions ? (
        <div className="space-y-4">
          {/* Important Notice - Only show if sessions are mandatory */}
          {edition.sessions_mandatory !== false && (
            <div className="bg-deep-blue/5 rounded-lg p-4 border border-deep-blue/20">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-deep-blue mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-deep-blue mb-1">
                    {locale === 'fr' ? 'Important' : 'Important'}
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {locale === 'fr'
                      ? `La participation aux ${sessions.length} sessions est obligatoire.`
                      : `Participation in all ${sessions.length} sessions is mandatory.`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Date Selection */}
          <div className="bg-golden-orange/10 rounded-lg p-4 border border-golden-orange/20">
            <h4 className="font-heading font-semibold text-deep-blue mb-2">
              {locale === 'fr' ? 'Sélectionnez vos dates' : 'Select your dates'}
            </h4>
            <p className="text-sm text-text-secondary mb-4">
              {locale === 'fr'
                ? `Choisissez une date pour chacune des ${sessions.length} sessions`
                : `Choose one date for each of the ${sessions.length} sessions`
              }
            </p>
            <SessionDatePicker
              editionId={edition.id}
              sessions={sessions}
              selectedDates={selectedDates}
              onDateChange={(sessionId, dateOptionId) => {
                setSelectedDates(prev => ({ ...prev, [sessionId]: dateOptionId }));
              }}
              onRefreshAvailability={() => {
                // Optionally refresh availability
              }}
            />
          </div>

          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-700">{submitError}</p>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Type de yoga souhaité - Simple Mode */}
          <FormInput
            label={isGroupClass ? "Programme sélectionné" : t('forms.yogaRequest.yogaTypeLabel')}
            name="yogaType"
            type="select"
            required
            value={yogaType}
            onChange={(e) => setYogaType(e.target.value)}
            disabled={isGroupClass && !!defaultYogaType}
            options={[
              { value: 'upa-yoga', label: t('forms.yogaRequest.yogaTypeOptions.0') },
              { value: 'surya-kriya', label: t('forms.yogaRequest.yogaTypeOptions.1') },
              { value: 'surya-shakti', label: t('forms.yogaRequest.yogaTypeOptions.2') },
              { value: 'angamardana', label: t('forms.yogaRequest.yogaTypeOptions.3') },
              { value: 'yogasanas', label: t('forms.yogaRequest.yogaTypeOptions.4') },
              { value: 'custom', label: t('forms.yogaRequest.yogaTypeOptions.5') },
              { value: 'not-sure', label: t('forms.yogaRequest.yogaTypeOptions.6') },
            ]}
          />
        </>
      )}

      {/* Objectifs et Niveau - Seulement pour cours individuels */}
      {!isGroupClass && (
        <>
          <FormInput
            label="Votre objectif principal"
            name="goals"
            type="select"
            required
            options={[
              { value: 'stress', label: 'Gestion du stress et relaxation' },
              { value: 'wellbeing', label: 'Bien-être général (corps, mental, émotions)' },
              { value: 'flexibility', label: 'Améliorer la flexibilité et la mobilité' },
              { value: 'physical', label: 'Renforcement physique et tonus musculaire' },
              { value: 'energy', label: 'Augmenter ma vitalité et mon énergie' },
              { value: 'spiritual', label: 'Développement spirituel et méditation' },
              { value: 'health', label: 'Améliorer ma santé globale' },
              { value: 'sleep', label: 'Mieux dormir et récupérer' },
              { value: 'other', label: 'Autre objectif' },
            ]}
          />

          <FormInput
            label="Votre niveau de pratique"
            name="level"
            type="select"
            required
            options={[
              { value: 'beginner', label: 'Débutant(e) - Jamais pratiqué' },
              { value: 'some-experience', label: 'Quelques cours suivis' },
              { value: 'intermediate', label: 'Intermédiaire - Pratique régulière' },
              { value: 'advanced', label: 'Avancé(e)' },
            ]}
          />
        </>
      )}

      {/* Préférence lieu - Seulement pour cours individuels */}
      {!isGroupClass && (
        <>
          <FormInput
            label="Préférence de lieu"
            name="locationPreference"
            type="select"
            required
            options={[
              { value: 'home', label: 'À mon domicile (Casablanca/Rabat)' },
              { value: 'online', label: 'En ligne (Visio)' },
              { value: 'flexible', label: 'Flexible / À discuter' },
            ]}
          />

          {/* Disponibilités générales */}
          <FormInput
            label="Vos disponibilités générales"
            name="availability"
            type="textarea"
            placeholder="Ex: Lundis et mercredis en soirée, ou samedis matin..."
            rows={3}
          />
        </>
      )}

      {/* Message / Besoins spécifiques */}
      <FormInput
        label={isGroupClass ? "Message (optionnel)" : "Besoins spécifiques ou informations complémentaires"}
        name="message"
        type="textarea"
        placeholder={
          isGroupClass
            ? "Questions ou informations complémentaires..."
            : "Partagez toute information qui pourrait aider Hajar à mieux comprendre vos besoins..."
        }
        rows={4}
        required={!isGroupClass}
      />

      {/* Error display for non-edition errors */}
      {!isEditionMode && submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-700">{submitError}</p>
        </div>
      )}

      {/* Consentement RGPD */}
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
          J'accepte que mes données personnelles soient utilisées pour me recontacter concernant ma demande.
          Elles ne seront jamais partagées avec des tiers.
        </label>
      </div>

      {/* Bouton submit - Adaptatif selon mode */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        type="submit"
        disabled={isSubmitting || consentChecked !== true || (isEditionMode && Object.keys(selectedDates).length < (sessions?.length || 0))}
      >
        {isSubmitting
          ? (locale === 'fr' ? 'Envoi en cours...' : 'Sending...')
          : isEditionMode
          ? (locale === 'fr' ? "Confirmer mon inscription" : 'Confirm registration')
          : isGroupClass
          ? (locale === 'fr' ? "M'inscrire au programme" : 'Register for program')
          : (locale === 'fr' ? 'Envoyer ma demande' : 'Send my request')}
      </Button>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-text-secondary text-center mb-2">
          {isGroupClass ? (
            <>
              Vous recevrez une <strong>confirmation et les détails</strong> du programme dans les 24-48h.
            </>
          ) : (
            <>
              Hajar vous contactera dans les <strong>24-48 heures</strong> pour discuter de votre
              programme personnalisé.
            </>
          )}
        </p>
        <p className="text-xs text-text-secondary text-center italic">
          {isGroupClass
            ? '💡 Vous serez contacté·e par la Professeure de Hatha Yoga pour un échange préalable.'
            : '💡 Tous les programmes sont basés sur le Hatha Yoga Classique et adaptés à vos besoins individuels.'}
        </p>
      </div>
    </form>
  );
}
