'use client';

import { useTranslation } from '@/hooks/useTranslation';
import ColorCard from '@/components/brand-kit/ColorCard';
import LogoShowcase from '@/components/brand-kit/LogoShowcase';
import TypographySection from '@/components/brand-kit/TypographySection';

// Color palette data
const mixedPalette = [
  { name: 'Golden Orange', hex: '#D4924F', usage: 'Accent Yoga' },
  { name: 'Mystic Mauve', hex: '#9F8AAA', usage: 'Accent Coaching' },
  { name: 'Morocco Blue', hex: '#2C4B5E', usage: 'Accent Corporate' },
  { name: 'Dune Beige', hex: '#F5EFE7', usage: 'Fond de page' },
];

const yogaColors = [
  { name: 'Golden Orange', hex: '#D4924F', usage: 'Accent principal' },
  { name: 'Golden Orange Dark', hex: '#B87A3D', usage: 'Hover / dark states' },
];

const coachingColors = [
  { name: 'Mystic Mauve', hex: '#9F8AAA', usage: 'Accent principal' },
  { name: 'Mystic Mauve Light', hex: '#C8BADB', usage: 'Backgrounds clairs' },
  { name: 'Mystic Mauve Dark', hex: '#87738F', usage: 'Hover / dark states' },
];

const corporateColors = [
  { name: 'Morocco Blue', hex: '#2C4B5E', usage: 'Accent principal' },
  { name: 'Deep Blue', hex: '#1A3A4A', usage: 'Dark states' },
  { name: 'Sky Blue', hex: '#7BA0B4', usage: 'Light accent' },
];

const neutralColors = [
  { name: 'Dune Beige', hex: '#F5EFE7', usage: 'Background soft' },
  { name: 'Warm White', hex: '#FDFBF7', usage: 'Main background' },
  { name: 'Soft Gray', hex: '#E8E5E1', usage: 'Dividers subtils' },
  { name: 'Text Primary', hex: '#2C2C2C', usage: 'Corps de texte' },
  { name: 'Text Secondary', hex: '#6B6B6B', usage: 'Texte secondaire' },
  { name: 'Charcoal', hex: '#3A3A3A', usage: 'UI sombre' },
];

export default function BrandKitPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-[var(--warm-white)]">
      {/* Hero Section - Minimal */}
      <section className="relative bg-gradient-to-b from-[var(--dune-beige)] to-[var(--warm-white)] pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-[var(--golden-orange)]/10 text-[var(--golden-orange)] text-sm font-medium rounded-full mb-6">
            {t('brandKit.badge')}
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--text-primary)] mb-4">
            {t('brandKit.title')}
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            {t('brandKit.subtitle')}
          </p>
        </div>
      </section>

      {/* Logo Section */}
      <section className="py-16 md:py-24 bg-[var(--warm-white)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
              {t('brandKit.logos.title')}
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl">
              {t('brandKit.logos.description')}
            </p>
          </div>

          <LogoShowcase
            downloadLabel={t('brandKit.logos.download')}
            primaryLabel={t('brandKit.logos.primary')}
            iconLabel={t('brandKit.logos.icon')}
            wordmarkLabel={t('brandKit.logos.wordmark')}
            whiteLabel={t('brandKit.logos.white')}
          />

          {/* Safe Zone Note */}
          <div className="mt-8 p-4 bg-[var(--dune-beige)] rounded-lg">
            <p className="text-sm text-[var(--text-secondary)]">
              <span className="font-medium text-[var(--text-primary)]">{t('brandKit.logos.safeZone')}</span>
              {' '}{t('brandKit.logos.safeZoneDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Colors Section */}
      <section className="py-16 md:py-24 bg-[var(--dune-beige)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
              {t('brandKit.colors.title')}
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl">
              {t('brandKit.colors.description')}
            </p>
          </div>

          {/* Mixed Palette - Most Used */}
          <div className="mb-16">
            <h3 className="font-body text-xl font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-3">
              <div className="flex -space-x-1">
                <span className="w-4 h-4 rounded-full bg-[#D4924F] ring-2 ring-white" />
                <span className="w-4 h-4 rounded-full bg-[#9F8AAA] ring-2 ring-white" />
                <span className="w-4 h-4 rounded-full bg-[#2C4B5E] ring-2 ring-white" />
              </div>
              {t('brandKit.colors.mixed')}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-6">{t('brandKit.colors.mixedDesc')}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mixedPalette.map((color) => (
                <ColorCard key={color.hex + '-mixed'} {...color} />
              ))}
            </div>
          </div>

          <hr className="border-[var(--soft-gray)] mb-12" />

          {/* Yoga Theme */}
          <div className="mb-12">
            <h3 className="font-body text-lg font-semibold text-[var(--golden-orange)] mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[var(--golden-orange)]" />
              {t('brandKit.colors.yoga')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {yogaColors.map((color) => (
                <ColorCard key={color.hex} {...color} />
              ))}
            </div>
          </div>

          {/* Coaching Theme */}
          <div className="mb-12">
            <h3 className="font-body text-lg font-semibold text-[var(--mystic-mauve-dark)] mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[var(--mystic-mauve)]" />
              {t('brandKit.colors.coaching')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {coachingColors.map((color) => (
                <ColorCard key={color.hex} {...color} />
              ))}
            </div>
          </div>

          {/* Corporate Theme */}
          <div className="mb-12">
            <h3 className="font-body text-lg font-semibold text-[var(--morocco-blue)] mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[var(--morocco-blue)]" />
              {t('brandKit.colors.corporate')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {corporateColors.map((color) => (
                <ColorCard key={color.hex} {...color} />
              ))}
            </div>
          </div>

          {/* Neutral Colors */}
          <div>
            <h3 className="font-body text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[var(--soft-gray)] border border-[var(--text-secondary)]" />
              {t('brandKit.colors.neutral')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {neutralColors.map((color) => (
                <ColorCard key={color.hex} {...color} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section className="py-16 md:py-24 bg-[var(--warm-white)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
              {t('brandKit.typography.title')}
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl">
              {t('brandKit.typography.description')}
            </p>
          </div>

          <TypographySection
            headingLabel={t('brandKit.typography.heading')}
            bodyLabel={t('brandKit.typography.body')}
            scaleLabel={t('brandKit.typography.scale')}
          />
        </div>
      </section>

      {/* Spacing Section */}
      <section className="py-16 md:py-24 bg-[var(--dune-beige)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
              {t('brandKit.spacing.title')}
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl">
              {t('brandKit.spacing.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Spacing Scale */}
            <div className="bg-[var(--warm-white)] rounded-xl p-6 md:p-8">
              <h3 className="font-body text-lg font-semibold text-[var(--text-primary)] mb-6">
                {t('brandKit.spacing.scale')}
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'xs', value: '0.5rem', px: '8px' },
                  { name: 'sm', value: '1rem', px: '16px' },
                  { name: 'md', value: '2rem', px: '32px' },
                  { name: 'lg', value: '4rem', px: '64px' },
                  { name: 'xl', value: '6rem', px: '96px' },
                  { name: '2xl', value: '8rem', px: '128px' },
                ].map((space) => (
                  <div key={space.name} className="flex items-center gap-4">
                    <span className="font-mono text-sm text-[var(--text-secondary)] w-8">{space.name}</span>
                    <div
                      className="h-4 bg-[var(--golden-orange)] rounded"
                      style={{ width: space.value }}
                    />
                    <span className="font-mono text-xs text-[var(--text-secondary)]">
                      {space.value} ({space.px})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Border Radius */}
            <div className="bg-[var(--warm-white)] rounded-xl p-6 md:p-8">
              <h3 className="font-body text-lg font-semibold text-[var(--text-primary)] mb-6">
                {t('brandKit.spacing.radius')}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-[var(--mystic-mauve)] rounded-sm" />
                  <p className="mt-2 font-mono text-xs text-[var(--text-secondary)]">0.125rem</p>
                  <p className="text-sm text-[var(--text-primary)]">Subtle</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-[var(--mystic-mauve)] rounded-lg" />
                  <p className="mt-2 font-mono text-xs text-[var(--text-secondary)]">0.5rem</p>
                  <p className="text-sm text-[var(--text-primary)]">Buttons</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-[var(--mystic-mauve)] rounded-xl" />
                  <p className="mt-2 font-mono text-xs text-[var(--text-secondary)]">0.75rem</p>
                  <p className="text-sm text-[var(--text-primary)]">Cards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-12 bg-[var(--warm-white)] border-t border-[var(--soft-gray)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-[var(--text-secondary)]">
            {t('brandKit.footer')}
          </p>
        </div>
      </section>
    </main>
  );
}
