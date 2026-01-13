'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import { useTranslation } from '@/hooks/useTranslation';

interface PrivateYogaRequestFormProps {
  onClose?: () => void;
  defaultYogaType?: string;
  isGroupClass?: boolean; // Si true, c'est un cours collectif (dates fixes, studio)
}

export default function PrivateYogaRequestForm({ onClose, defaultYogaType, isGroupClass = false }: PrivateYogaRequestFormProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [yogaType, setYogaType] = useState(defaultYogaType || '');
  const [consentChecked, setConsentChecked] = useState(false);

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
          {isGroupClass ? 'Inscription envoyée avec succès!' : 'Demande envoyée avec succès!'}
        </h3>
        <p className="text-text-secondary">
          {isGroupClass
            ? 'Vous recevrez une confirmation et les détails du programme dans les 24-48h.'
            : 'Hajar vous contactera dans les 24-48h pour discuter de votre cours privé.'}
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

      {/* Type de yoga souhaité */}
      <FormInput
        label={isGroupClass ? "Programme sélectionné" : t('forms.yogaRequest.yogaTypeLabel')}
        name="yogaType"
        type="select"
        required
        value={yogaType}
        onChange={(e) => setYogaType(e.target.value)}
        disabled={isGroupClass && !!defaultYogaType} // Lecture seule si cours collectif avec programme pré-rempli
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

      {/* Bouton submit */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        type="submit"
        disabled={isSubmitting || !consentChecked}
      >
        {isSubmitting
          ? 'Envoi en cours...'
          : isGroupClass
          ? "M'inscrire au programme"
          : 'Envoyer ma demande'}
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
