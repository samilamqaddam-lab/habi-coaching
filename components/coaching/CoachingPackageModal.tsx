'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Button from '@/components/ui/Button';
import CoachingRegistrationForm from './CoachingRegistrationForm';

interface CoachingPackageModalProps {
  triggerText?: string;
  variant?: 'primary' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

interface SelectedPackage {
  slug: string;
  name: string;
  sessionCount: number;
  sessionDuration: number;
  price: number;
  pricePerSession: number;
}

type ModalView = 'packages' | 'form' | 'success';

export default function CoachingPackageModal({
  triggerText = 'Réserver une séance',
  variant = 'outline',
  size = 'md',
  fullWidth = false,
  className = '',
}: CoachingPackageModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<ModalView>('packages');
  const [selectedPackage, setSelectedPackage] = useState<SelectedPackage | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleOpen = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsOpen(true);
    setView('packages');
    setSelectedPackage(null);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset state after animation
    setTimeout(() => {
      setView('packages');
      setSelectedPackage(null);
    }, 200);
  };

  const handlePackageClick = (pkg: SelectedPackage) => {
    setSelectedPackage(pkg);
    setView('form');
  };

  const handleFormSuccess = () => {
    setView('success');
  };

  const handleBackToPackages = () => {
    setView('packages');
    setSelectedPackage(null);
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
        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-4 sm:p-6 border-b border-gray-200 gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-deep-blue leading-snug break-words">
              {view === 'packages' && 'Coaching professionnel'}
              {view === 'form' && 'Réserver votre coaching'}
              {view === 'success' && 'Demande envoyée'}
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary mt-1.5 leading-relaxed">
              {view === 'packages' && 'Coaching professionnel certifié Coach & Team avec Hajar'}
              {view === 'form' && selectedPackage?.name}
              {view === 'success' && 'Votre demande a été enregistrée avec succès'}
            </p>
          </div>
          <button
            onClick={handleClose}
            type="button"
            className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-mystic-mauve focus:ring-offset-2"
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

        {/* Content */}
        {view === 'packages' && (
        <div className="p-4 sm:p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Séance Unique - Mise en avant avec fond sombre */}
          <div className="mb-6 sm:mb-8">
            <div className="bg-gradient-to-br from-deep-blue to-morocco-blue rounded-xl p-5 sm:p-6 border-2 border-deep-blue shadow-xl relative overflow-hidden hover:border-golden-orange/50 transition-all duration-300 group">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h4 className="font-heading text-xl sm:text-2xl font-bold text-warm-white mb-3">
                    Séance Unique
                  </h4>
                  <ul className="space-y-2 text-sm text-warm-white/90">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-warm-white mr-2.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="leading-relaxed">Préparer une prise de décision à court terme</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-warm-white mr-2.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="leading-relaxed">Clarifier une prise de parole importante (réunion, entretien...)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-warm-white mr-2.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="leading-relaxed">Débloquer une situation relationnelle ponctuelle</span>
                    </li>
                  </ul>
                </div>
                <div className="text-left sm:text-right flex-shrink-0">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-warm-white mb-1 leading-none">750 DH</div>
                  <div className="text-xs sm:text-sm text-warm-white/80 mt-1.5">Séance unique • 90 min</div>
                  <div className="inline-block mt-2.5 px-3 py-1 bg-warm-white/20 text-warm-white rounded-full text-xs font-semibold backdrop-blur-sm">
                    Commencez aujourd'hui
                  </div>
                </div>
              </div>
              <button
                onClick={() => handlePackageClick({
                  slug: 'seance-unique',
                  name: 'Séance Unique',
                  sessionCount: 1,
                  sessionDuration: 90,
                  price: 750,
                  pricePerSession: 750,
                })}
                className="block w-full px-4 py-2.5 bg-warm-white text-deep-blue rounded-full font-semibold text-sm text-center hover:bg-warm-white/95 hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-warm-white focus:ring-offset-2 focus:ring-offset-deep-blue"
              >
                Réserver une séance
              </button>
            </div>
          </div>

          {/* Packages */}
          <div>
            <div className="mb-6 text-center">
              <h4 className="font-heading text-xl sm:text-2xl font-bold text-deep-blue mb-3">
                Parcours d'accompagnement
              </h4>
              <p className="text-sm text-text-secondary max-w-3xl mx-auto leading-relaxed">
                Plusieurs séances permettent d'ancrer les transformations et d'approfondir votre cheminement avec continuité et bienveillance
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:gap-5">
              {/* Pack Initiation - Double Option */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-4 sm:p-5 hover:border-golden-orange hover:shadow-lg transition-all duration-300 group">
                <div className="text-xs sm:text-sm font-semibold text-golden-orange uppercase tracking-wide mb-3">
                  Initiation
                </div>
                <ul className="space-y-2 text-sm text-text-secondary mb-4">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-golden-orange mr-2.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="leading-relaxed">Initier votre transformation</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-golden-orange mr-2.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="leading-relaxed">Faire émerger des prises de conscience structurantes</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-golden-orange mr-2.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="leading-relaxed">Définir une direction claire + premières actions concrètes</span>
                  </li>
                </ul>

                {/* Options 60/90 min */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {/* Option 60 min */}
                  <div className="border border-gray-200 rounded-lg p-3 text-center hover:border-golden-orange/50 transition-colors">
                    <div className="text-lg sm:text-xl font-bold text-deep-blue mb-1">1 350 DH</div>
                    <div className="text-xs text-text-secondary mb-1">3 × 60 min</div>
                    <div className="text-xs text-golden-orange font-medium mb-3">450 DH/séance</div>
                    <button
                      onClick={() => handlePackageClick({
                        slug: 'initiation-60',
                        name: 'Initiation 60 min',
                        sessionCount: 3,
                        sessionDuration: 60,
                        price: 1350,
                        pricePerSession: 450,
                      })}
                      className="w-full px-3 py-2 bg-golden-orange text-white rounded-full font-semibold text-xs hover:bg-golden-orange-dark hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-golden-orange focus:ring-offset-1"
                    >
                      3 séances de 60 min
                    </button>
                  </div>

                  {/* Option 90 min */}
                  <div className="border border-gray-200 rounded-lg p-3 text-center hover:border-golden-orange/50 transition-colors">
                    <div className="text-lg sm:text-xl font-bold text-deep-blue mb-1">2 025 DH</div>
                    <div className="text-xs text-text-secondary mb-1">3 × 90 min</div>
                    <div className="text-xs text-golden-orange font-medium mb-3">675 DH/séance</div>
                    <button
                      onClick={() => handlePackageClick({
                        slug: 'initiation-90',
                        name: 'Initiation 90 min',
                        sessionCount: 3,
                        sessionDuration: 90,
                        price: 2025,
                        pricePerSession: 675,
                      })}
                      className="w-full px-3 py-2 bg-golden-orange text-white rounded-full font-semibold text-xs hover:bg-golden-orange-dark hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-golden-orange focus:ring-offset-1"
                    >
                      3 séances de 90 min
                    </button>
                  </div>
                </div>

                <div className="text-center">
                  <span className="inline-block px-3 py-1 bg-golden-orange/10 text-golden-orange rounded-full text-xs font-semibold">
                    ~10% de réduction
                  </span>
                </div>
              </div>

              {/* Pack 6 - Recommandé */}
              <div className="bg-white border-2 border-mystic-mauve rounded-xl p-4 sm:p-5 relative hover:border-mystic-mauve-dark hover:shadow-xl transition-all duration-300 shadow-lg ring-2 ring-mystic-mauve/10 group">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-mystic-mauve text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-md">
                  Recommandé
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4 pt-2">
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm font-semibold text-mystic-mauve uppercase tracking-wide mb-2">
                      Approfondissement
                    </div>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-mystic-mauve mr-2.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="leading-relaxed">Accompagnement en profondeur</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-mystic-mauve mr-2.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="leading-relaxed">Installer de nouveaux modes de fonctionnement</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-mystic-mauve mr-2.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="leading-relaxed">Outils et ressources personnalisés</span>
                      </li>
                    </ul>
                    <p className="text-xs text-text-secondary/70 italic mt-2 leading-relaxed">Des pratiques de respiration et de méditation pour soutenir la gestion du stress et la clarté seront intégrées selon les besoins</p>
                  </div>
                  <div className="text-left sm:text-right flex-shrink-0">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-deep-blue mb-1 leading-none">3 825 DH</div>
                    <div className="text-xs sm:text-sm text-text-secondary mt-1.5">6 séances • 637,50 DH/séance</div>
                    <div className="inline-block mt-2.5 px-3 py-1 bg-mystic-mauve/10 text-mystic-mauve rounded-full text-xs font-semibold">
                      Pour ancrer votre transformation
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handlePackageClick({
                    slug: 'approfondissement',
                    name: 'Approfondissement',
                    sessionCount: 6,
                    sessionDuration: 90,
                    price: 3825,
                    pricePerSession: 637.50,
                  })}
                  className="block w-full px-4 py-2.5 bg-mystic-mauve text-white rounded-full font-semibold text-sm text-center hover:bg-mystic-mauve-dark hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-mystic-mauve focus:ring-offset-2"
                >
                  Commencer ce parcours
                </button>
              </div>

              {/* Pack 12 */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-4 sm:p-5 hover:border-morocco-blue hover:shadow-lg transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm font-semibold text-morocco-blue uppercase tracking-wide mb-2">
                      Transformation
                    </div>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-morocco-blue mr-2.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="leading-relaxed">Accompagnement complet et approfondi</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-morocco-blue mr-2.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="leading-relaxed">Transformer la posture identitaire (rapport à soi, au pouvoir, à la responsabilité)</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-morocco-blue mr-2.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="leading-relaxed">Faire émerger une manière d'agir plus consciente, cohérente et impactante</span>
                      </li>
                    </ul>
                    <p className="text-xs text-text-secondary/70 italic mt-2 leading-relaxed">Des pratiques de respiration et de méditation adaptées pour réguler le stress et soutenir un leadership plus stable et lucide, seront intégrées selon les besoins</p>
                  </div>
                  <div className="text-left sm:text-right flex-shrink-0">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-deep-blue mb-1 leading-none">7 650 DH</div>
                    <div className="text-xs sm:text-sm text-text-secondary mt-1.5">12 séances • 637,50 DH/séance</div>
                    <div className="inline-block mt-2.5 px-3 py-1 bg-morocco-blue/10 text-morocco-blue rounded-full text-xs font-semibold">
                      Pour une évolution durable
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handlePackageClick({
                    slug: 'transformation',
                    name: 'Transformation',
                    sessionCount: 12,
                    sessionDuration: 90,
                    price: 7650,
                    pricePerSession: 637.50,
                  })}
                  className="block w-full px-4 py-2.5 bg-morocco-blue text-white rounded-full font-semibold text-sm text-center hover:bg-deep-blue hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-morocco-blue focus:ring-offset-2"
                >
                  Commencer ce parcours
                </button>
              </div>
            </div>
          </div>

          {/* Footer info */}
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-gray-200">
            <p className="text-xs sm:text-sm text-text-secondary text-center mb-2 leading-relaxed">
              Paiement par <strong>virement bancaire</strong>
            </p>
            <p className="text-xs text-text-secondary text-center italic opacity-80 leading-relaxed mb-3">
              Après réservation d'un package, vous recevrez les informations de paiement et un lien privé pour réserver vos séances.
            </p>
            <p className="text-[10px] text-text-secondary text-center opacity-60 leading-relaxed">
              Pour un coaching en présentiel, merci de nous{' '}
              <a href="/contact" className="underline hover:opacity-100 transition-opacity">
                contacter directement
              </a>
              .
            </p>
          </div>
        </div>
        )}

        {/* Registration Form View */}
        {view === 'form' && selectedPackage && (
          <CoachingRegistrationForm
            selectedPackage={selectedPackage}
            onSuccess={handleFormSuccess}
            onBack={handleBackToPackages}
          />
        )}

        {/* Success View */}
        {view === 'success' && (
          <div className="p-6 sm:p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-deep-blue mb-3">
              Merci pour votre demande !
            </h4>
            <p className="text-text-secondary mb-6 leading-relaxed max-w-md mx-auto">
              Votre demande de coaching a bien été enregistrée. Je reviendrai vers vous dans les <strong>24-48 heures</strong> pour discuter de votre projet et planifier notre première séance.
            </p>
            <p className="text-sm text-text-secondary mb-6">
              Un email de confirmation a été envoyé à votre adresse.
            </p>
            <button
              onClick={handleClose}
              className="px-8 py-3 bg-mystic-mauve text-white rounded-full font-semibold hover:bg-mystic-mauve-dark transition-colors"
            >
              Fermer
            </button>
          </div>
        )}
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
