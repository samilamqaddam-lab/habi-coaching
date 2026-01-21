'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export interface EventFormData {
  title: string;
  subtitle?: string;
  badge?: string;
  description?: string;
  dateTime: string;
  durationMinutes: number;
  location: string;
  address: string;
  price?: number | null;
  maxCapacity: number;
  isActive: boolean;
}

interface EventFormProps {
  event?: EventFormData & { id?: string };
  onSubmit?: (data: EventFormData) => Promise<void>;
  isLoading?: boolean;
}

// Helper to format datetime for input
function formatDateTimeForInput(isoString: string): string {
  if (!isoString) return '';
  try {
    const d = new Date(isoString);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    const hours = String(d.getUTCHours()).padStart(2, '0');
    const minutes = String(d.getUTCMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  } catch {
    return '';
  }
}

// Helper to convert local datetime to UTC ISO string
function localDateTimeToUTC(localDateTime: string): string {
  if (!localDateTime) return '';
  // Input is in format: YYYY-MM-DDTHH:mm
  // Append Z to treat as UTC (we store the entered time as-is)
  return `${localDateTime}:00.000Z`;
}

export default function EventForm({ event, onSubmit, isLoading = false }: EventFormProps) {
  const router = useRouter();
  const isEditing = !!event?.id;

  const [formData, setFormData] = useState<EventFormData>({
    title: event?.title || '',
    subtitle: event?.subtitle || '',
    badge: event?.badge || '',
    description: event?.description || '',
    dateTime: event?.dateTime ? formatDateTimeForInput(event.dateTime) : '',
    durationMinutes: event?.durationMinutes || 90,
    location: event?.location || '',
    address: event?.address || '',
    price: event?.price || null,
    maxCapacity: event?.maxCapacity || 15,
    isActive: event?.isActive ?? true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (field: keyof EventFormData, value: string | number | boolean | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error on change
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    }
    if (!formData.dateTime) {
      newErrors.dateTime = 'La date et heure sont requises';
    }
    if (formData.durationMinutes <= 0) {
      newErrors.durationMinutes = 'La durée doit être positive';
    }
    if (formData.maxCapacity <= 0) {
      newErrors.maxCapacity = 'La capacité doit être positive';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Le lieu est requis';
    }
    if (!formData.address.trim()) {
      newErrors.address = "L'adresse est requise";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Convert datetime to UTC ISO string
      const submitData: EventFormData = {
        ...formData,
        dateTime: localDateTimeToUTC(formData.dateTime),
        // Clean up empty strings to undefined
        subtitle: formData.subtitle?.trim() || undefined,
        badge: formData.badge?.trim() || undefined,
        description: formData.description?.trim() || undefined,
      };

      if (onSubmit) {
        await onSubmit(submitData);
      } else {
        // Default behavior: POST or PUT to API
        const url = isEditing
          ? `/api/admin/events/${event?.id}`
          : '/api/admin/events';
        const method = isEditing ? 'PUT' : 'POST';

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submitData),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Erreur lors de la sauvegarde');
        }

        router.push('/admin/events');
        router.refresh();
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Erreur inconnue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName = (hasError: boolean) => `
    w-full px-4 py-3 bg-slate-900 border rounded-lg text-slate-100
    placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-400/50
    ${hasError ? 'border-red-400' : 'border-slate-700'}
  `;

  const labelClassName = 'block text-sm font-medium text-slate-300 mb-2';

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Submit Error */}
      {submitError && (
        <div className="bg-red-400/10 border border-red-400/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-red-400 font-medium">Erreur</p>
              <p className="text-red-300/80 text-sm mt-1">{submitError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Section: Informations de base */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
          <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Informations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className={labelClassName}>
              Titre <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={inputClassName(!!errors.title)}
              placeholder="Atelier Yoga Intensif"
            />
            {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Subtitle */}
          <div>
            <label className={labelClassName}>Sous-titre</label>
            <input
              type="text"
              value={formData.subtitle || ''}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              className={inputClassName(false)}
              placeholder="Session spéciale printemps"
            />
          </div>

          {/* Badge */}
          <div>
            <label className={labelClassName}>Badge</label>
            <input
              type="text"
              value={formData.badge || ''}
              onChange={(e) => handleChange('badge', e.target.value)}
              className={inputClassName(false)}
              placeholder="Nouveau"
            />
            <p className="text-slate-500 text-xs mt-1">Texte court affiché comme badge (ex: Nouveau, Populaire)</p>
          </div>
        </div>
      </div>

      {/* Section: Date & Lieu */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
          <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Date & Lieu
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DateTime */}
          <div>
            <label className={labelClassName}>
              Date et heure <span className="text-red-400">*</span>
            </label>
            <input
              type="datetime-local"
              value={formData.dateTime}
              onChange={(e) => handleChange('dateTime', e.target.value)}
              className={inputClassName(!!errors.dateTime)}
            />
            {errors.dateTime && <p className="text-red-400 text-sm mt-1">{errors.dateTime}</p>}
          </div>

          {/* Duration */}
          <div>
            <label className={labelClassName}>
              Durée (minutes) <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              min="1"
              value={formData.durationMinutes}
              onChange={(e) => handleChange('durationMinutes', parseInt(e.target.value) || 0)}
              className={inputClassName(!!errors.durationMinutes)}
              placeholder="90"
            />
            {errors.durationMinutes && <p className="text-red-400 text-sm mt-1">{errors.durationMinutes}</p>}
          </div>

          {/* Location */}
          <div>
            <label className={labelClassName}>
              Lieu <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className={inputClassName(!!errors.location)}
              placeholder="Shido Mind Yoga Studio"
            />
            {errors.location && <p className="text-red-400 text-sm mt-1">{errors.location}</p>}
          </div>

          {/* Address */}
          <div>
            <label className={labelClassName}>
              Adresse <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className={inputClassName(!!errors.address)}
              placeholder="36B bd d'Anfa, Casablanca"
            />
            {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
          </div>
        </div>
      </div>

      {/* Section: Capacité & Prix */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
          <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Capacité & Prix
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Max Capacity */}
          <div>
            <label className={labelClassName}>
              Places maximum <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              min="1"
              value={formData.maxCapacity}
              onChange={(e) => handleChange('maxCapacity', parseInt(e.target.value) || 0)}
              className={inputClassName(!!errors.maxCapacity)}
              placeholder="15"
            />
            {errors.maxCapacity && <p className="text-red-400 text-sm mt-1">{errors.maxCapacity}</p>}
          </div>

          {/* Price */}
          <div>
            <label className={labelClassName}>Prix (MAD)</label>
            <input
              type="number"
              min="0"
              step="10"
              value={formData.price ?? ''}
              onChange={(e) => handleChange('price', e.target.value ? parseFloat(e.target.value) : null)}
              className={inputClassName(false)}
              placeholder="200"
            />
            <p className="text-slate-500 text-xs mt-1">Laisser vide si gratuit</p>
          </div>
        </div>
      </div>

      {/* Section: Description */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
          <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          Description
        </h2>

        <div>
          <label className={labelClassName}>Description</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            className={`${inputClassName(false)} h-32 resize-none`}
            placeholder="Décrivez l'événement en détail..."
          />
        </div>
      </div>

      {/* Section: Statut */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-slate-100 mb-6 flex items-center gap-2">
          <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Statut
        </h2>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => handleChange('isActive', !formData.isActive)}
            className={`
              relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
              transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-900
              ${formData.isActive ? 'bg-green-500' : 'bg-slate-600'}
            `}
          >
            <span
              className={`
                pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0
                transition duration-200 ease-in-out
                ${formData.isActive ? 'translate-x-7' : 'translate-x-0'}
              `}
            />
          </button>
          <span className={`text-sm font-medium ${formData.isActive ? 'text-green-400' : 'text-slate-400'}`}>
            {formData.isActive ? 'Actif' : 'Archivé'}
          </span>
          <p className="text-slate-500 text-sm">
            {formData.isActive
              ? "L'événement sera visible sur le site"
              : "L'événement ne sera pas affiché sur le site"
            }
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-4 pt-4">
        <button
          type="button"
          onClick={() => router.push('/admin/events')}
          className="px-6 py-3 rounded-lg text-sm font-medium bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
        >
          Annuler
        </button>

        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className={`
            px-8 py-3 rounded-lg text-sm font-semibold transition-all flex items-center gap-2
            ${isSubmitting || isLoading
              ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
              : 'bg-orange-400 text-slate-900 hover:bg-orange-500'
            }
          `}
        >
          {(isSubmitting || isLoading) ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enregistrement...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {isEditing ? 'Mettre à jour' : 'Créer l\'événement'}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
