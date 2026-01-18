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

  const handleOpen = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const calcomUsername = process.env.NEXT_PUBLIC_CALCOM_USERNAME || 'hajar-habi-tpufjt';
  const calcomCoachingSlug = process.env.NEXT_PUBLIC_CALCOM_COACHING_SLUG || 'coaching-individuel';

  // Informations bancaires pour les paiements
  const bankInfo = {
    accountName: "HAJAR HABI",
    bank: "CIH Bank",
    rib: "230 810 3473290211005600 89",
    email: "hajar@transcendencework.com",
    phone: "+212 663 096 857",
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
            <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-deep-blue leading-snug break-words">
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
          {/* Séance Unique - Mise en avant avec fond sombre */}
          <div className="mb-6 sm:mb-8">
            <div className="bg-gradient-to-br from-deep-blue to-morocco-blue rounded-xl p-5 sm:p-6 border-2 border-deep-blue shadow-xl relative overflow-hidden hover:border-golden-orange/50 transition-all duration-300 group">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h4 className="font-heading text-xl sm:text-2xl font-bold text-warm-white mb-3">
                    Séance Unique
                  </h4>
                  <div className="text-xs sm:text-sm font-semibold text-warm-white/90 uppercase tracking-wide mb-2">
                    Réservation immédiate
                  </div>
                  <ul className="space-y-2 text-sm text-warm-white/90">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-warm-white mr-2.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="leading-relaxed">60 minutes d'échange approfondi</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-warm-white mr-2.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="leading-relaxed">Parfait pour découvrir le coaching</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-warm-white mr-2.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="leading-relaxed">Réservation en ligne immédiate</span>
                    </li>
                  </ul>
                </div>
                <div className="text-left sm:text-right flex-shrink-0">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-warm-white mb-1 leading-none">510 DH</div>
                  <div className="text-xs sm:text-sm text-warm-white/80 mt-1.5">Séance unique • 60 min</div>
                  <div className="inline-block mt-2.5 px-3 py-1 bg-warm-white/20 text-warm-white rounded-full text-xs font-semibold backdrop-blur-sm">
                    Commencez aujourd'hui
                  </div>
                </div>
              </div>
              <a
                href={`https://cal.com/${calcomUsername}/${calcomCoachingSlug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-2.5 bg-warm-white text-deep-blue rounded-full font-semibold text-sm text-center hover:bg-warm-white/95 hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-warm-white focus:ring-offset-2 focus:ring-offset-deep-blue"
              >
                Réserver une séance
              </a>
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
              {/* Pack 3 */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-4 sm:p-5 hover:border-golden-orange hover:shadow-lg transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm font-semibold text-golden-orange uppercase tracking-wide mb-2">
                      Initiation
                    </div>
                    <ul className="space-y-2 text-sm text-text-secondary">
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
                        <span className="leading-relaxed">Suivi personnalisé et flexible</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-golden-orange mr-2.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="leading-relaxed">Séances en visio</span>
                      </li>
                    </ul>
                  </div>
                  <div className="text-left sm:text-right flex-shrink-0">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-deep-blue mb-1 leading-none">1400 DH</div>
                    <div className="text-xs sm:text-sm text-text-secondary mt-1.5">3 séances • 467 DH/séance</div>
                    <div className="inline-block mt-2.5 px-3 py-1 bg-golden-orange/10 text-golden-orange rounded-full text-xs font-semibold">
                      Pour démarrer votre parcours
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handlePackageClick('3', 1400)}
                  className="block w-full px-4 py-2.5 bg-golden-orange text-white rounded-full font-semibold text-sm text-center hover:bg-golden-orange-dark hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-golden-orange focus:ring-offset-2"
                >
                  Commencer ce parcours
                </button>
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
                        <span className="leading-relaxed">Continuité de votre cheminement</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-mystic-mauve mr-2.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="leading-relaxed">Outils et ressources personnalisés</span>
                      </li>
                    </ul>
                  </div>
                  <div className="text-left sm:text-right flex-shrink-0">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-deep-blue mb-1 leading-none">2500 DH</div>
                    <div className="text-xs sm:text-sm text-text-secondary mt-1.5">6 séances • 417 DH/séance</div>
                    <div className="inline-block mt-2.5 px-3 py-1 bg-mystic-mauve/10 text-mystic-mauve rounded-full text-xs font-semibold">
                      Pour ancrer votre transformation
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handlePackageClick('6', 2500)}
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
                        <span className="leading-relaxed">Changements profonds et durables</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-morocco-blue mr-2.5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="leading-relaxed">Suivi régulier et soutien continu</span>
                      </li>
                    </ul>
                  </div>
                  <div className="text-left sm:text-right flex-shrink-0">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-deep-blue mb-1 leading-none">4500 DH</div>
                    <div className="text-xs sm:text-sm text-text-secondary mt-1.5">12 séances • 375 DH/séance</div>
                    <div className="inline-block mt-2.5 px-3 py-1 bg-morocco-blue/10 text-morocco-blue rounded-full text-xs font-semibold">
                      Pour une évolution durable
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handlePackageClick('12', 4500)}
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
