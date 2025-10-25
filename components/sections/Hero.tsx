import React from 'react';
import Container from '../ui/Container';
import Button from '../ui/Button';

interface HeroProps {
  title: string;
  subtitle?: string;
  description: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
  overlay?: boolean;
  centered?: boolean;
  theme?: 'yoga' | 'coaching' | 'corporate' | 'default';
}

export default function Hero({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  overlay = true,
  centered = true,
  theme = 'default',
}: HeroProps) {
  // Theme-based gradients with smooth bottom transition to beige
  const gradients = {
    yoga: 'bg-gradient-to-b from-golden-orange/20 via-warm-white via-70% to-dune-beige',
    coaching: 'bg-gradient-to-b from-mystic-mauve/20 via-warm-white via-70% to-dune-beige',
    corporate: 'bg-gradient-to-b from-sky-blue/25 via-warm-white via-70% to-dune-beige',
    default: 'bg-gradient-to-b from-dune-beige via-warm-white via-70% to-dune-beige',
  };

  // Theme-based subtitle colors
  const subtitleColors = {
    yoga: 'text-golden-orange',
    coaching: 'text-mystic-mauve',
    corporate: 'text-morocco-blue',
    default: 'text-golden-orange',
  };

  // Theme-based scroll indicator colors
  const scrollColors = {
    yoga: 'text-golden-orange',
    coaching: 'text-mystic-mauve',
    corporate: 'text-morocco-blue',
    default: 'text-golden-orange',
  };

  return (
    <section
      className={`relative min-h-[75vh] flex items-center ${
        backgroundImage ? 'bg-cover bg-center' : gradients[theme]
      }`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      {/* Overlay */}
      {overlay && backgroundImage && (
        <div className="absolute inset-0 bg-deep-blue/40" />
      )}

      <Container className={`relative z-10 py-20 -translate-y-6 ${centered ? 'text-center' : ''}`}>
        <div className={`max-w-4xl ${centered ? 'mx-auto' : ''}`}>
          {subtitle && (
            <p className={`${subtitleColors[theme]} text-sm md:text-base font-medium uppercase tracking-wider mb-4`}>
              {subtitle}
            </p>
          )}

          <h1
            className={`font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 ${
              backgroundImage ? 'text-warm-white' : 'text-deep-blue'
            }`}
          >
            {title}
          </h1>

          <p
            className={`text-lg md:text-xl mb-10 leading-relaxed ${
              backgroundImage ? 'text-sage-light' : 'text-text-secondary'
            }`}
          >
            {description}
          </p>

          {(primaryCTA || secondaryCTA) && (
            <div className={`flex flex-col sm:flex-row gap-4 ${centered ? 'justify-center' : ''}`}>
              {primaryCTA && (
                <Button variant="primary" size="lg" href={primaryCTA.href}>
                  {primaryCTA.text}
                </Button>
              )}
              {secondaryCTA && (
                <Button
                  variant={backgroundImage ? 'outline' : 'secondary'}
                  size="lg"
                  href={secondaryCTA.href}
                >
                  {secondaryCTA.text}
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className={`w-6 h-6 ${backgroundImage ? 'text-warm-white' : scrollColors[theme]}`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
