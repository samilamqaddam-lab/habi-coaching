'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Button from '@/components/ui/Button';
import PrivateYogaRequestForm from './PrivateYogaRequestForm';
import type { ProgrammeEdition, EditionSessionWithAvailability } from '@/lib/supabase';

interface PrivateYogaRequestModalProps {
  triggerText?: string;
  variant?: 'primary' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  defaultYogaType?: string; // Pré-remplissage du type de yoga
  isGroupClass?: boolean; // Si true, c'est un cours collectif
  // Hybrid integration: edition data for multi-session registration
  edition?: ProgrammeEdition | null;
  sessions?: EditionSessionWithAvailability[];
}

export default function PrivateYogaRequestModal({
  triggerText = 'Demander un cours privé',
  variant = 'outline',
  size = 'md',
  fullWidth = false,
  className = '',
  defaultYogaType,
  isGroupClass = false,
  edition,
  sessions,
}: PrivateYogaRequestModalProps) {
  const [isOpen, setIsOpen] = useState(false);
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
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 sm:pt-12 overflow-hidden"
      onClick={handleClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-deep-blue/60 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col my-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed */}
        <div className="flex items-start justify-between p-4 sm:p-6 border-b border-gray-200 gap-3 flex-shrink-0">
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-deep-blue leading-snug break-words">
              {isGroupClass ? 'Inscription au Programme Collectif' : 'Demande de Cours Privé de Yoga'}
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary mt-1.5 leading-relaxed">
              {isGroupClass
                ? (edition?.title || 'Cours collectif')
                : 'Programme personnalisé avec une professeure certifiée Sadhguru Gurukulam'}
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

        {/* Form - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <PrivateYogaRequestForm
            onClose={handleClose}
            defaultYogaType={defaultYogaType}
            isGroupClass={isGroupClass}
            edition={edition}
            sessions={sessions}
          />
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
        {triggerText}
      </Button>

      {/* Modal via Portal */}
      {mounted && modalContent && createPortal(modalContent, document.body)}
    </>
  );
}
