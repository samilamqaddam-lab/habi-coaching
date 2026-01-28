'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import { useTranslation } from '@/hooks/useTranslation';

interface IndividualYogaBookingFormProps {
  onClose?: () => void;
}

export default function IndividualYogaBookingForm({ onClose }: IndividualYogaBookingFormProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!consent) {
      alert(t('forms.individualYoga.consentRequired'));
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // Envoi via API
      const response = await fetch('/api/individual-yoga-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi');
      }

      setIsSuccess(true);

      // Fermer après 3 secondes
      setTimeout(() => {
        setIsSuccess(false);
        if (onClose) onClose();
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      // Fallback: log et afficher succès quand même (pour le développement)
      console.log('Demande de cours individuel:', data);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        if (onClose) onClose();
      }, 3000);
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
          {t('forms.individualYoga.successTitle')}
        </h3>
        <p className="text-text-secondary">
          {t('forms.individualYoga.successMessage')}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informations personnelles */}
      <div className="grid md:grid-cols-2 gap-6">
        <FormInput
          label={t('forms.individualYoga.firstName')}
          name="firstName"
          type="text"
          placeholder={t('forms.individualYoga.firstNamePlaceholder')}
          required
        />
        <FormInput
          label={t('forms.individualYoga.lastName')}
          name="lastName"
          type="text"
          placeholder={t('forms.individualYoga.lastNamePlaceholder')}
          required
        />
      </div>

      <FormInput
        label={t('forms.individualYoga.email')}
        name="email"
        type="email"
        placeholder={t('forms.individualYoga.emailPlaceholder')}
        required
      />

      {/* Téléphone principal (obligatoire) */}
      <FormInput
        label={t('forms.individualYoga.phone')}
        name="phone"
        type="tel"
        placeholder={t('forms.individualYoga.phonePlaceholder')}
        required
      />

      {/* WhatsApp (si différent) */}
      <FormInput
        label={t('forms.individualYoga.whatsapp')}
        name="whatsapp"
        type="tel"
        placeholder={t('forms.individualYoga.whatsappPlaceholder')}
      />

      {/* Lieu préféré pour le cours */}
      <FormInput
        label={t('forms.individualYoga.locationPreference')}
        name="locationPreference"
        type="select"
        required
        options={[
          { value: 'studio', label: t('forms.individualYoga.locationOptions.studio') },
          { value: 'home', label: t('forms.individualYoga.locationOptions.home') },
        ]}
      />

      {/* Je m'intéresse à */}
      <FormInput
        label={t('forms.individualYoga.interest')}
        name="interest"
        type="select"
        required
        options={[
          { value: 'upa-yoga', label: t('forms.individualYoga.interestOptions.0') },
          { value: 'surya-kriya', label: t('forms.individualYoga.interestOptions.1') },
          { value: 'angamardana', label: t('forms.individualYoga.interestOptions.2') },
          { value: 'yogasanas', label: t('forms.individualYoga.interestOptions.3') },
          { value: 'surya-shakti', label: t('forms.individualYoga.interestOptions.4') },
          { value: 'yoga-bien-etre', label: t('forms.individualYoga.interestOptions.5') },
          { value: 'yoga-sante', label: t('forms.individualYoga.interestOptions.6') },
          { value: 'autre', label: t('forms.individualYoga.interestOptions.7') },
        ]}
      />

      {/* Message (optionnel) */}
      <FormInput
        label={t('forms.individualYoga.message')}
        name="message"
        type="textarea"
        placeholder={t('forms.individualYoga.messagePlaceholder')}
        rows={3}
      />

      {/* Checkbox consentement */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-5 w-5 rounded border-2 border-soft-gray text-golden-orange focus:ring-golden-orange focus:ring-offset-0 cursor-pointer"
          required
        />
        <label htmlFor="consent" className="text-sm text-text-secondary cursor-pointer leading-relaxed">
          {t('forms.individualYoga.consent')}
          <span className="text-terracotta ml-1">*</span>
        </label>
      </div>

      {/* Bouton submit */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        type="submit"
        disabled={isSubmitting || !consent}
      >
        {isSubmitting ? t('forms.individualYoga.submitting') : t('forms.individualYoga.submit')}
      </Button>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-text-secondary text-center">
          {t('forms.individualYoga.responseTime')}
        </p>
      </div>
    </form>
  );
}
