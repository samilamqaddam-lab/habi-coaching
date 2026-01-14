'use client';

interface TypographySectionProps {
  headingLabel?: string;
  bodyLabel?: string;
  scaleLabel?: string;
}

export default function TypographySection({
  headingLabel = 'Police Titres',
  bodyLabel = 'Police Corps',
  scaleLabel = 'Échelle Typographique',
}: TypographySectionProps) {
  return (
    <div className="space-y-16">
      {/* Heading Font - Playfair Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div>
          <span className="inline-block px-3 py-1 bg-[var(--golden-orange)]/10 text-[var(--golden-orange)] text-sm font-medium rounded-full mb-4">
            {headingLabel}
          </span>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2">
            Playfair Display
          </h3>
          <p className="text-[var(--text-secondary)] mb-4">
            Utilisée pour les titres, accroches et éléments de mise en valeur.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-[var(--dune-beige)] text-[var(--text-secondary)] text-sm rounded-full">
              Bold (700)
            </span>
            <span className="px-3 py-1 bg-[var(--dune-beige)] text-[var(--text-secondary)] text-sm rounded-full">
              Serif
            </span>
            <span className="px-3 py-1 bg-[var(--dune-beige)] text-[var(--text-secondary)] text-sm rounded-full">
              Google Fonts
            </span>
          </div>
        </div>

        <div className="bg-[var(--dune-beige)] rounded-xl p-8 md:p-10">
          <p className="font-heading text-6xl md:text-7xl lg:text-8xl font-bold text-[var(--text-primary)] leading-none">
            Aa
          </p>
          <p className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-secondary)] mt-4">
            Bb Cc Dd Ee Ff
          </p>
          <p className="font-heading text-xl md:text-2xl font-bold text-[var(--text-secondary)] mt-2">
            1234567890
          </p>
        </div>
      </div>

      {/* Body Font - Inter */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div>
          <span className="inline-block px-3 py-1 bg-[var(--mystic-mauve)]/20 text-[var(--mystic-mauve-dark)] text-sm font-medium rounded-full mb-4">
            {bodyLabel}
          </span>
          <h3 className="font-body text-2xl md:text-3xl font-semibold text-[var(--text-primary)] mb-2">
            Inter
          </h3>
          <p className="text-[var(--text-secondary)] mb-4">
            Utilisée pour le corps de texte, la navigation et les boutons.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-[var(--dune-beige)] text-[var(--text-secondary)] text-sm rounded-full">
              Regular (400)
            </span>
            <span className="px-3 py-1 bg-[var(--dune-beige)] text-[var(--text-secondary)] text-sm rounded-full">
              Medium (500)
            </span>
            <span className="px-3 py-1 bg-[var(--dune-beige)] text-[var(--text-secondary)] text-sm rounded-full">
              Semibold (600)
            </span>
            <span className="px-3 py-1 bg-[var(--dune-beige)] text-[var(--text-secondary)] text-sm rounded-full">
              Sans-Serif
            </span>
          </div>
        </div>

        <div className="bg-[var(--warm-white)] border border-[var(--soft-gray)] rounded-xl p-8 md:p-10">
          <p className="font-body text-6xl md:text-7xl lg:text-8xl font-semibold text-[var(--text-primary)] leading-none">
            Aa
          </p>
          <p className="font-body text-3xl md:text-4xl font-medium text-[var(--text-secondary)] mt-4">
            Bb Cc Dd Ee Ff
          </p>
          <p className="font-body text-xl md:text-2xl text-[var(--text-secondary)] mt-2">
            1234567890
          </p>
        </div>
      </div>

      {/* Type Scale */}
      <div>
        <span className="inline-block px-3 py-1 bg-[var(--morocco-blue)]/10 text-[var(--morocco-blue)] text-sm font-medium rounded-full mb-6">
          {scaleLabel}
        </span>

        <div className="space-y-6 bg-[var(--dune-beige)] rounded-xl p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 pb-4 border-b border-[var(--soft-gray)]">
            <span className="text-sm font-mono text-[var(--text-secondary)] w-24 shrink-0">H1</span>
            <span className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)]">
              Titre Principal
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 pb-4 border-b border-[var(--soft-gray)]">
            <span className="text-sm font-mono text-[var(--text-secondary)] w-24 shrink-0">H2</span>
            <span className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text-primary)]">
              Titre de Section
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 pb-4 border-b border-[var(--soft-gray)]">
            <span className="text-sm font-mono text-[var(--text-secondary)] w-24 shrink-0">H3</span>
            <span className="font-body text-xl md:text-2xl font-semibold text-[var(--text-primary)]">
              Sous-titre
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 pb-4 border-b border-[var(--soft-gray)]">
            <span className="text-sm font-mono text-[var(--text-secondary)] w-24 shrink-0">Body</span>
            <span className="font-body text-base md:text-lg text-[var(--text-primary)]">
              Corps de texte standard pour les paragraphes et contenus longs.
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
            <span className="text-sm font-mono text-[var(--text-secondary)] w-24 shrink-0">Small</span>
            <span className="font-body text-sm text-[var(--text-secondary)]">
              Texte secondaire, labels et annotations.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
