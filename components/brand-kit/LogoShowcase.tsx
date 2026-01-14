'use client';

import { useState } from 'react';
import Image from 'next/image';

interface LogoShowcaseProps {
  downloadLabel?: string;
  primaryLabel?: string;
  iconLabel?: string;
  wordmarkLabel?: string;
  whiteLabel?: string;
  closeLabel?: string;
}

const logos = [
  {
    id: 'primary',
    src: '/images/logos/logo-primary.png',
    alt: 'Logo Principal - Montagne intégrée',
    bgClass: 'bg-[var(--warm-white)] border border-[var(--soft-gray)]',
    modalBg: 'bg-[var(--warm-white)]',
    textColor: 'dark',
    description: 'Utilisation principale',
    filename: 'logos/logo-primary.png',
  },
  {
    id: 'icon',
    src: '/images/logos/logo-icon.png',
    alt: 'Logo avec Icône - Deux montagnes',
    bgClass: 'bg-[var(--dune-beige)]',
    modalBg: 'bg-[var(--dune-beige)]',
    textColor: 'dark',
    description: 'Avec symbole séparé',
    filename: 'logos/logo-icon.png',
  },
  {
    id: 'wordmark',
    src: '/images/logos/logo-wordmark.png',
    alt: 'Wordmark - Texte seul',
    bgClass: 'bg-[var(--warm-white)] border border-[var(--soft-gray)]',
    modalBg: 'bg-[var(--warm-white)]',
    textColor: 'dark',
    description: 'Version texte épurée',
    filename: 'logos/logo-wordmark.png',
  },
  {
    id: 'white',
    src: '/images/logos/logo-white.png',
    alt: 'Logo Blanc - Sur fond sombre',
    bgClass: 'bg-[#2C4B5E]',
    modalBg: 'bg-[#2C4B5E]',
    textColor: 'light',
    description: 'Pour fonds sombres',
    filename: 'logos/logo-white.png',
  },
];

export default function LogoShowcase({
  downloadLabel = 'Télécharger',
  primaryLabel = 'Logo Principal',
  iconLabel = 'Logo avec Icône',
  wordmarkLabel = 'Wordmark',
  whiteLabel = 'Logo Blanc',
  closeLabel = 'Fermer',
}: LogoShowcaseProps) {
  const [selectedLogo, setSelectedLogo] = useState<typeof logos[0] | null>(null);

  const labels: Record<string, string> = {
    primary: primaryLabel,
    icon: iconLabel,
    wordmark: wordmarkLabel,
    white: whiteLabel,
  };

  const handleDownload = async (e: React.MouseEvent, filename: string, displayName: string) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = `/images/${filename}`;
    link.download = `transcendence-work-${displayName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {logos.map((logo) => (
          <div key={logo.id} className="flex flex-col">
            {/* Clickable logo frame */}
            <button
              onClick={() => setSelectedLogo(logo)}
              className={`relative ${logo.bgClass} rounded-xl p-4 md:p-5 flex items-center justify-center min-h-[140px] cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--golden-orange)] focus:ring-offset-2`}
              aria-label={`Voir ${labels[logo.id]} en plein écran`}
            >
              {/* Safe zone indicator */}
              <div className={`absolute inset-3 border-2 border-dashed ${
                logo.textColor === 'light' ? 'border-white/20' : 'border-black/10'
              } rounded-lg pointer-events-none`} />

              <Image
                src={logo.src}
                alt={logo.alt}
                width={400}
                height={100}
                className="relative z-10 h-14 md:h-16 lg:h-18 w-auto max-w-[85%] object-contain"
              />

              {/* Zoom icon overlay */}
              <div className={`absolute bottom-3 right-3 p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity ${
                logo.textColor === 'light' ? 'bg-white/20 text-white' : 'bg-black/10 text-[var(--text-secondary)]'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                  <path d="M11 8v6"></path>
                  <path d="M8 11h6"></path>
                </svg>
              </div>
            </button>

            <div className="mt-3 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-medium text-[var(--text-primary)]">{labels[logo.id]}</p>
                <p className="text-sm text-[var(--text-secondary)]">{logo.description}</p>
              </div>
              <button
                onClick={(e) => handleDownload(e, logo.filename, logo.id)}
                className="shrink-0 px-4 py-2 bg-[var(--dune-beige)] hover:bg-[var(--soft-gray)] text-[var(--text-primary)] rounded-lg text-sm font-medium transition-colors"
              >
                {downloadLabel}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {selectedLogo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedLogo(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal content */}
          <div
            className={`relative ${selectedLogo.modalBg} rounded-2xl p-8 md:p-12 lg:p-16 max-w-4xl w-full max-h-[80vh] flex items-center justify-center`}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedLogo.src}
              alt={selectedLogo.alt}
              width={800}
              height={200}
              className="w-full h-auto max-h-[50vh] object-contain"
            />

            {/* Close button */}
            <button
              onClick={() => setSelectedLogo(null)}
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                selectedLogo.textColor === 'light'
                  ? 'bg-white/20 hover:bg-white/30 text-white'
                  : 'bg-black/10 hover:bg-black/20 text-[var(--text-primary)]'
              }`}
              aria-label={closeLabel}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>

            {/* Download button in modal */}
            <button
              onClick={(e) => handleDownload(e, selectedLogo.filename, selectedLogo.id)}
              className={`absolute bottom-4 right-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedLogo.textColor === 'light'
                  ? 'bg-white/20 hover:bg-white/30 text-white'
                  : 'bg-[var(--dune-beige)] hover:bg-[var(--soft-gray)] text-[var(--text-primary)]'
              }`}
            >
              {downloadLabel} PNG
            </button>
          </div>
        </div>
      )}
    </>
  );
}
