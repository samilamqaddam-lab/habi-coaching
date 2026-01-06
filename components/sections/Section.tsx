import React from 'react';
import Container from '../ui/Container';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  background?: 'white' | 'beige' | 'sage' | 'mystic-mauve-light' | 'sky-blue-light' | 'none';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
  containerSize?: 'sm' | 'md' | 'lg' | 'full';
  accentColor?: 'yoga' | 'coaching' | 'corporate' | 'none';
  afterHero?: boolean; // Réduit le padding-top pour les sections juste après le Hero
}

export default function Section({
  children,
  id,
  title,
  subtitle,
  description,
  background = 'none',
  padding = 'lg',
  centered = false,
  containerSize = 'lg',
  accentColor = 'none',
  afterHero = false,
}: SectionProps) {
  const backgrounds = {
    white: 'bg-warm-white',
    beige: 'bg-dune-beige',
    sage: 'bg-sage-light/20',
    'mystic-mauve-light': 'bg-mystic-mauve-light/30',
    'sky-blue-light': 'bg-sky-blue/15',
    none: '',
  };

  const paddings = {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-20',
    lg: 'py-20 md:py-28',
    xl: 'py-28 md:py-36',
  };

  // Paddings réduits pour sections après Hero (padding-top réduit pour équilibrer avec la flèche)
  const afterHeroPaddings = {
    sm: 'pt-4 pb-12 md:pt-6 md:pb-16',
    md: 'pt-6 pb-16 md:pt-8 md:pb-20',
    lg: 'pt-6 pb-20 md:pt-8 md:pb-28',
    xl: 'pt-12 pb-28 md:pt-16 md:pb-36',
  };

  const accentColors = {
    yoga: 'text-golden-orange',
    coaching: 'text-mystic-mauve',
    corporate: 'text-morocco-blue',
    none: 'text-golden-orange',
  };

  const accentBorders = {
    yoga: 'border-golden-orange',
    coaching: 'border-mystic-mauve',
    corporate: 'border-morocco-blue',
    none: '',
  };

  return (
    <section
      id={id}
      className={`${backgrounds[background]} ${afterHero ? afterHeroPaddings[padding] : paddings[padding]}`}
    >
      <Container size={containerSize}>
        {(title || subtitle || description) && (
          <div className={`mb-12 md:mb-16 ${centered ? 'text-center max-w-3xl mx-auto' : ''}`}>
            {subtitle && (
              <p className={`${accentColors[accentColor]} text-sm md:text-base font-medium uppercase tracking-wider mb-3`}>
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-deep-blue mb-3">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-text-secondary leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
