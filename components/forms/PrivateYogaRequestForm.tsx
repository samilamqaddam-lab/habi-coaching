'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import { useTranslation } from '@/hooks/useTranslation';

interface PrivateYogaRequestFormProps {
  onClose?: () => void;
  defaultYogaType?: string;
}

export default function PrivateYogaRequestForm({ onClose, defaultYogaType }: PrivateYogaRequestFormProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [yogaType, setYogaType] = useState(defaultYogaType || '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // TODO: Implémenter l'envoi via API Resend
      // Pour l'instant, juste simulation
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Demande de cours privé:', data);
      setIsSuccess(true);

      // Réinitialiser après 3 secondes
      setTimeout(() => {
        setIsSuccess(false);
        if (onClose) onClose();
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
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
          Demande envoyée avec succès!
        </h3>
        <p className="text-text-secondary">
          Hajar vous contactera dans les 24-48h pour discuter de votre cours privé.
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

      <FormInput
        label="Ville / Quartier"
        name="location"
        type="text"
        placeholder="Ex: Casablanca, Maarif"
        required
      />

      {/* Type de yoga souhaité */}
      <FormInput
        label={t('forms.yogaRequest.yogaTypeLabel')}
        name="yogaType"
        type="select"
        required
        value={yogaType}
        onChange={(e) => setYogaType(e.target.value)}
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

      {/* Objectifs */}
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

      {/* Niveau d'expérience */}
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

      {/* Préférence lieu */}
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

      {/* Message / Besoins spécifiques */}
      <FormInput
        label="Besoins spécifiques ou informations complémentaires"
        name="message"
        type="textarea"
        placeholder="Partagez toute information qui pourrait aider Hajar à mieux comprendre vos besoins..."
        rows={4}
      />

      {/* Bouton submit */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
      </Button>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-text-secondary text-center mb-2">
          Hajar vous contactera dans les <strong>24-48 heures</strong> pour discuter de votre
          programme personnalisé.
        </p>
        <p className="text-xs text-text-secondary text-center italic">
          💡 Tous les programmes sont inspirés du yoga traditionnel Isha Foundation et adaptés à vos besoins individuels.
        </p>
      </div>
    </form>
  );
}
