'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Button from '@/components/ui/Button';
import IndividualYogaBookingForm from './IndividualYogaBookingForm';
import { useTranslation } from '@/hooks/useTranslation';

interface IndividualYogaBookingModalProps {
  triggerText?: string;
  variant?: 'primary' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function IndividualYogaBookingModal({
  triggerText,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
}: IndividualYogaBookingModalProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const buttonContent = children || triggerText || t('forms.individualYoga.triggerButton');

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleOpen = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const modalContent = isOpen && mounted ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{ width: '100vw', height: '100vh', left: 0, top: 0 }}
      onClick={handleClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-deep-blue/60 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full my-8"
        style={{ maxWidth: '42rem', minWidth: 'min(90vw, 42rem)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-4 sm:p-6 border-b border-gray-200 gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-deep-blue leading-snug break-words">
              {t('forms.individualYoga.modalTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary mt-1.5 leading-relaxed">
              {t('forms.individualYoga.modalSubtitle')}
            </p>
          </div>
          <button
            onClick={handleClose}
            type="button"
            className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-golden-orange focus:ring-offset-2"
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

        {/* Form */}
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          <IndividualYogaBookingForm onClose={handleClose} />
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Bouton déclencheur */}
      <Button
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        onClick={handleOpen}
        type="button"
        className={className}
      >
        {buttonContent}
      </Button>

      {/* Modal via Portal */}
      {mounted && modalContent && createPortal(modalContent, document.body)}
    </>
  );
}
