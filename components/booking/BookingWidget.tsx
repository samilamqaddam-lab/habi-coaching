'use client';

import { useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export type BookingType =
  | 'hatha-yoga'
  | 'restorative-yoga'
  | 'meditation'
  | 'coaching';

interface BookingWidgetProps {
  /**
   * Type de réservation (correspond au slug Cal.com)
   */
  type: BookingType;

  /**
   * Mode d'affichage
   * - 'inline': Widget intégré dans la page
   * - 'popup': Ouvre un modal
   * - 'redirect': Redirige vers Cal.com
   */
  mode?: 'inline' | 'popup' | 'redirect';

  /**
   * Texte du bouton (seulement pour mode popup)
   */
  buttonText?: string;

  /**
   * Variant du bouton (seulement pour mode popup)
   */
  buttonVariant?: 'primary' | 'outline' | 'secondary';

  /**
   * Classe CSS additionnelle
   */
  className?: string;

  /**
   * Hauteur du widget inline (en pixels)
   */
  height?: number;
}

// Configuration des URLs Cal.com
const CALCOM_CONFIG = {
  // Cal.com cloud (production)
  baseUrl: 'https://cal.com',
  // Username depuis les variables d'environnement
  username: process.env.NEXT_PUBLIC_CALCOM_USERNAME || 'hajar-habi-tpufjt',
};

// Mapping des types vers les slugs Cal.com
const EVENT_SLUGS: Record<BookingType, string> = {
  'hatha-yoga': 'hatha-yoga',
  'restorative-yoga': 'restorative-yoga',
  'meditation': 'meditation',
  'coaching': process.env.NEXT_PUBLIC_CALCOM_COACHING_SLUG || 'seance-coaching',
};

export default function BookingWidget({
  type,
  mode = 'inline',
  buttonText,
  buttonVariant = 'primary',
  className = '',
  height = 600,
}: BookingWidgetProps) {
  const { t } = useTranslation();

  // URL complète de l'event Cal.com
  const eventSlug = EVENT_SLUGS[type];
  const calcomUrl = `${CALCOM_CONFIG.baseUrl}/${CALCOM_CONFIG.username}/${eventSlug}`;

  useEffect(() => {
    // Charger le script Cal.com embed
    if (mode !== 'redirect') {
      const script = document.createElement('script');
      script.src = 'https://app.cal.com/embed/embed.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Cleanup
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [mode]);

  // Mode redirect: simple lien
  if (mode === 'redirect') {
    return (
      <a
        href={calcomUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-block px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
          buttonVariant === 'primary'
            ? 'bg-morocco-blue text-white hover:bg-morocco-blue/90'
            : buttonVariant === 'outline'
            ? 'border-2 border-morocco-blue text-morocco-blue hover:bg-morocco-blue hover:text-white'
            : 'bg-gray-100 text-deep-blue hover:bg-gray-200'
        } ${className}`}
      >
        {buttonText || t('common.buttons.book')}
      </a>
    );
  }

  // Mode popup: bouton qui ouvre modal Cal.com
  if (mode === 'popup') {
    return (
      <button
        data-cal-link={`${CALCOM_CONFIG.username}/${eventSlug}`}
        data-cal-config='{"theme":"light"}'
        className={`inline-block px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
          buttonVariant === 'primary'
            ? 'bg-morocco-blue text-white hover:bg-morocco-blue/90'
            : buttonVariant === 'outline'
            ? 'border-2 border-morocco-blue text-morocco-blue hover:bg-morocco-blue hover:text-white'
            : 'bg-gray-100 text-deep-blue hover:bg-gray-200'
        } ${className}`}
      >
        {buttonText || t('common.buttons.book')}
      </button>
    );
  }

  // Mode inline: iframe intégré
  return (
    <div className={`cal-inline-widget ${className}`}>
      <div
        data-cal-link={`${CALCOM_CONFIG.username}/${eventSlug}`}
        data-cal-config='{"theme":"light","styles":{"branding":{"brandColor":"#2C5F7C"}}}'
        style={{ width: '100%', height: `${height}px`, overflow: 'scroll' }}
      />
    </div>
  );
}
