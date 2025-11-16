'use client';

import { useState } from 'react';
import BookingWidget, { BookingType } from './BookingWidget';
import Button from '@/components/ui/Button';

interface BookingModalProps {
  /**
   * Type de réservation
   */
  type: BookingType;

  /**
   * Texte du bouton déclencheur
   */
  triggerText: string;

  /**
   * Variant du bouton
   */
  variant?: 'primary' | 'outline' | 'secondary';

  /**
   * Taille du bouton
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Pleine largeur
   */
  fullWidth?: boolean;

  /**
   * Classe CSS additionnelle
   */
  className?: string;
}

export default function BookingModal({
  type,
  triggerText,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
}: BookingModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Bouton déclencheur */}
      <Button
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        onClick={() => setIsOpen(true)}
        className={className}
      >
        {triggerText}
      </Button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-deep-blue/60 backdrop-blur-sm" />

          {/* Modal Content */}
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="font-heading text-2xl font-bold text-deep-blue">
                Réserver votre session
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Fermer"
              >
                <svg
                  className="w-6 h-6 text-text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Booking Widget */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-88px)]">
              <BookingWidget type={type} mode="inline" height={700} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
