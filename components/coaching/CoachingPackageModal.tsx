'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Button from '@/components/ui/Button';

interface CoachingPackageModalProps {
  triggerText?: string;
  variant?: 'primary' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export default function CoachingPackageModal({
  triggerText = 'Réserver une séance',
  variant = 'outline',
  size = 'md',
  fullWidth = false,
  className = '',
}: CoachingPackageModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const calcomUsername = process.env.NEXT_PUBLIC_CALCOM_USERNAME || 'hajar-habi-tpufjt';
  const calcomCoachingSlug = process.env.NEXT_PUBLIC_CALCOM_COACHING_SLUG || 'coaching-individuel';

  // Informations bancaires pour les paiements
  const bankInfo = {
    accountName: "Hajar Habi",
    bank: "Votre Banque", // À configurer
    rib: "XXX XXX XXXXXXXXXXXXXXXXXX XX", // À configurer
    email: "contact@hajar-habi.com", // À configurer
    phone: "+212 6XX XX XX XX", // À configurer
  };

  const handlePackageClick = (packageType: '3' | '6' | '12', price: number) => {
    // Pour l'instant, redirection vers contact avec info package
    const subject = `Demande Pack ${packageType} Séances - ${price} DH`;
    const body = `Bonjour Hajar,\n\nJe souhaite réserver le Pack ${packageType} Séances au tarif de ${price} DH.\n\nMerci de me communiquer les informations de paiement.\n\nCordialement,`;
    window.location.href = `/contact?subject=${encodeURIComponent(subject)}&message=${encodeURIComponent(body)}`;
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
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-deep-blue leading-tight">
              Choisissez votre formule de coaching
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary mt-1.5 leading-relaxed">
              Accompagnement holistique certifié EMCC avec Hajar
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
        <div className="p-4 sm:p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Séance Unique */}
          <div className="mb-6 sm:mb-8">
            <div className="bg-gradient-to-br from-mystic-mauve/5 to-mystic-mauve/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 border-2 border-mystic-mauve/30 hover:border-mystic-mauve/50 transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                <div className="flex-1">
                  <h4 className="font-heading text-lg sm:text-xl font-bold text-deep-blue mb-2">
                    Séance Unique
                  </h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    60 min pour explorer vos besoins ou bénéficier d'un accompagnement ponctuel
                  </p>
                </div>
                <div className="text-left sm:text-right flex-shrink-0">
                  <div className="text-3xl sm:text-4xl font-bold text-deep-blue leading-none">510 DH</div>
                  <div className="text-xs text-text-secondary mt-1">par séance</div>
                </div>
              </div>
              <a
                href={`https://cal.com/${calcomUsername}/${calcomCoachingSlug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-3.5 bg-mystic-mauve text-white rounded-full font-semibold hover:bg-mystic-mauve-dark active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-mystic-mauve focus:ring-offset-2"
              >
                Réserver maintenant
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 sm:px-4 text-xs sm:text-sm font-semibold text-text-secondary uppercase tracking-wider">
              ou
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Packages */}
          <div>
            <h4 className="font-heading text-lg sm:text-xl font-bold text-deep-blue mb-5 sm:mb-6 text-center">
              Packages
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {/* Pack 3 */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-5 sm:p-6 hover:border-golden-orange hover:shadow-lg transition-all duration-300 group">
                <div className="text-center mb-4">
                  <div className="text-xs sm:text-sm font-semibold text-golden-orange uppercase tracking-wide mb-2">
                    Pack 3 Séances
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-deep-blue mb-1 leading-none">1400 DH</div>
                  <div className="text-xs sm:text-sm text-text-secondary mt-1.5">467 DH/séance</div>
                  <div className="inline-block mt-2.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    Économie de 8%
                  </div>
                </div>
                <ul className="space-y-2.5 mb-6 text-sm text-text-secondary">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="leading-relaxed">3 séances de 60 min</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="leading-relaxed">Valable 3 mois</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="leading-relaxed">Visio</span>
                  </li>
                </ul>
                <button
                  onClick={() => handlePackageClick('3', 1400)}
                  className="block w-full px-4 py-3 sm:py-3.5 bg-golden-orange text-white rounded-full font-semibold text-center hover:bg-golden-orange-dark active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-golden-orange focus:ring-offset-2"
                >
                  Réserver ce pack
                </button>
              </div>

              {/* Pack 6 - Populaire */}
              <div className="bg-white border-2 border-mystic-mauve rounded-xl p-5 sm:p-6 relative hover:border-mystic-mauve-dark hover:shadow-xl transition-all duration-300 shadow-lg ring-2 ring-mystic-mauve/10 sm:scale-[1.02] group">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-mystic-mauve text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-md">
                  Populaire
                </div>
                <div className="text-center mb-4 pt-2">
                  <div className="text-xs sm:text-sm font-semibold text-mystic-mauve uppercase tracking-wide mb-2">
                    Pack 6 Séances
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold text-deep-blue mb-1 leading-none">2500 DH</div>
                  <div className="text-xs sm:text-sm text-text-secondary mt-1.5">417 DH/séance</div>
                  <div className="inline-block mt-2.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    Économie de 18%
                  </div>
                </div>
                <ul className="space-y-2.5 mb-6 text-sm text-text-secondary">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="leading-relaxed">6 séances de 60 min</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="leading-relaxed">Valable 6 mois</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="leading-relaxed">Visio</span>
                  </li>
                </ul>
                <button
                  onClick={() => handlePackageClick('6', 2500)}
                  className="block w-full px-4 py-3 sm:py-3.5 bg-mystic-mauve text-white rounded-full font-semibold text-center hover:bg-mystic-mauve-dark active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-mystic-mauve focus:ring-offset-2"
                >
                  Réserver ce pack
                </button>
              </div>

              {/* Pack 12 */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-5 sm:p-6 hover:border-morocco-blue hover:shadow-lg transition-all duration-300 group sm:col-span-2 lg:col-span-1">
                <div className="text-center mb-4">
                  <div className="text-xs sm:text-sm font-semibold text-morocco-blue uppercase tracking-wide mb-2">
                    Pack 12 Séances
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-deep-blue mb-1 leading-none">4500 DH</div>
                  <div className="text-xs sm:text-sm text-text-secondary mt-1.5">375 DH/séance</div>
                  <div className="inline-block mt-2.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    Économie de 26%
                  </div>
                </div>
                <ul className="space-y-2.5 mb-6 text-sm text-text-secondary">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="leading-relaxed">12 séances de 60 min</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="leading-relaxed">Valable 12 mois</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="leading-relaxed">Visio</span>
                  </li>
                </ul>
                <button
                  onClick={() => handlePackageClick('12', 4500)}
                  className="block w-full px-4 py-3 sm:py-3.5 bg-morocco-blue text-white rounded-full font-semibold text-center hover:bg-deep-blue active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-morocco-blue focus:ring-offset-2"
                >
                  Réserver ce pack
                </button>
              </div>
            </div>
          </div>

          {/* Footer info */}
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-gray-200">
            <p className="text-xs sm:text-sm text-text-secondary text-center mb-2 leading-relaxed">
              Paiement par <strong>virement bancaire</strong> ou <strong>Cal.com</strong> (séance unique)
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
