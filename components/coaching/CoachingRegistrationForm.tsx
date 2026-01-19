'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

interface CoachingPackage {
  slug: string;
  name: string;
  sessionCount: number;
  sessionDuration: number;
  price: number;
  pricePerSession: number;
}

interface CoachingRegistrationFormProps {
  selectedPackage: CoachingPackage;
  onSuccess: () => void;
  onBack: () => void;
}

type PreferredFormat = 'online' | 'in_person' | 'both';

export default function CoachingRegistrationForm({
  selectedPackage,
  onSuccess,
  onBack,
}: CoachingRegistrationFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    whatsapp: '',
    preferredFormat: 'both' as PreferredFormat,
    message: '',
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/coaching/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageSlug: selectedPackage.slug,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          whatsapp: formData.whatsapp || null,
          preferredFormat: formData.preferredFormat,
          message: formData.message || null,
          consent: formData.consent,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'inscription');
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatLabels: Record<PreferredFormat, string> = {
    online: 'En ligne',
    in_person: 'En présentiel',
    both: 'En ligne ou en présentiel',
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Package Summary */}
      <div className="bg-mystic-mauve/5 border border-mystic-mauve/20 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-deep-blue">{selectedPackage.name}</h4>
            <p className="text-sm text-text-secondary">
              {selectedPackage.sessionCount} séance(s) de {selectedPackage.sessionDuration} min
            </p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-mystic-mauve">{selectedPackage.price} DH</div>
            {selectedPackage.sessionCount > 1 && (
              <div className="text-xs text-text-secondary">
                {selectedPackage.pricePerSession} DH/séance
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-deep-blue mb-1">
              Prénom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mystic-mauve focus:border-mystic-mauve transition-colors"
              placeholder="Votre prénom"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-deep-blue mb-1">
              Nom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mystic-mauve focus:border-mystic-mauve transition-colors"
              placeholder="Votre nom"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-deep-blue mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mystic-mauve focus:border-mystic-mauve transition-colors"
            placeholder="votre@email.com"
          />
        </div>

        {/* Phone fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-deep-blue mb-1">
              Téléphone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mystic-mauve focus:border-mystic-mauve transition-colors"
              placeholder="+212 6XX XXX XXX"
            />
          </div>
          <div>
            <label htmlFor="whatsapp" className="block text-sm font-medium text-deep-blue mb-1">
              WhatsApp <span className="text-text-secondary text-xs">(optionnel)</span>
            </label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mystic-mauve focus:border-mystic-mauve transition-colors"
              placeholder="Si différent du téléphone"
            />
          </div>
        </div>

        {/* Preferred format */}
        <div>
          <label htmlFor="preferredFormat" className="block text-sm font-medium text-deep-blue mb-1">
            Format préféré <span className="text-red-500">*</span>
          </label>
          <select
            id="preferredFormat"
            name="preferredFormat"
            value={formData.preferredFormat}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mystic-mauve focus:border-mystic-mauve transition-colors bg-white"
          >
            {Object.entries(formatLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-deep-blue mb-1">
            Message <span className="text-text-secondary text-xs">(optionnel)</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mystic-mauve focus:border-mystic-mauve transition-colors resize-none"
            placeholder="Parlez-moi de votre projet ou de vos attentes..."
          />
        </div>

        {/* Consent */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            required
            className="mt-1 w-4 h-4 text-mystic-mauve border-gray-300 rounded focus:ring-mystic-mauve"
          />
          <label htmlFor="consent" className="text-sm text-text-secondary leading-relaxed">
            J'accepte que mes données soient utilisées pour me contacter concernant cette demande de coaching.{' '}
            <span className="text-red-500">*</span>
          </label>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-4 py-2.5 border border-gray-300 text-text-secondary rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Retour
          </button>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isSubmitting}
            className="flex-1 !bg-mystic-mauve hover:!bg-mystic-mauve-dark"
          >
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
          </Button>
        </div>
      </form>
    </div>
  );
}
