'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import EditionRegistrationForm from './EditionRegistrationForm';
import { useTranslation } from '@/hooks/useTranslation';

interface EditionRegistrationModalProps {
  editionId?: string;
  programmeKey?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditionRegistrationModal({
  editionId,
  programmeKey = 'upa-yoga',
  isOpen,
  onClose,
}: EditionRegistrationModalProps) {
  const { locale } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  const handleSuccess = () => {
    // Close modal after showing success message
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const modalContent = isOpen && mounted ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-deep-blue/60 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-4 sm:p-6 border-b border-gray-200 gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-deep-blue leading-snug break-words">
              {locale === 'fr' ? 'Inscription au Programme' : 'Program Registration'}
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary mt-1.5 leading-relaxed">
              {locale === 'fr'
                ? 'Choisissez vos dates pour chaque session'
                : 'Choose your dates for each session'}
            </p>
          </div>
          <button
            onClick={handleClose}
            type="button"
            className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-golden-orange focus:ring-offset-2"
            aria-label={locale === 'fr' ? 'Fermer' : 'Close'}
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

        {/* Form */}
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          <EditionRegistrationForm
            editionId={editionId}
            programmeKey={programmeKey}
            onClose={handleClose}
            onSuccess={handleSuccess}
          />
        </div>
      </div>
    </div>
  ) : null;

  return mounted && modalContent ? createPortal(modalContent, document.body) : null;
}
