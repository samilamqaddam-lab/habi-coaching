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
}: SectionProps) {
  const backgrounds = {
    white: 'bg-warm-white',
    beige: 'bg-dune-beige',
    sage: 'bg-sage-light/20',
    'mystic-mauve-light': 'bg-mystic-mauve-light/20',
    'sky-blue-light': 'bg-sky-blue/10',
    none: '',
  };

  const paddings = {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-20',
    lg: 'py-20 md:py-28',
    xl: 'py-28 md:py-36',
  };

  return (
    <section id={id} className={`${backgrounds[background]} ${paddings[padding]}`}>
      <Container size={containerSize}>
        {(title || subtitle || description) && (
          <div className={`mb-12 md:mb-16 ${centered ? 'text-center max-w-3xl mx-auto' : ''}`}>
            {subtitle && (
              <p className="text-terracotta text-sm md:text-base font-medium uppercase tracking-wider mb-3">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-deep-blue mb-6">
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
