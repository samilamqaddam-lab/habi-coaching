import React from 'react';
import Image from 'next/image';
import Container from '../ui/Container';
import Button from '../ui/Button';

interface HeroProps {
  title: string;
  titleLine2?: string; // Second line of title with same styling (e.g., "& transformation durable")
  titleSuffix?: string; // Displayed below title with different styling (e.g., "— Individus & Organisations")
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
  compact?: boolean; // Réduit la hauteur pour les pages internes
  minimal?: boolean; // Hauteur minimale pour homepage
  useVhSpacing?: boolean; // Utilise l'ancien système vh pour la page d'accueil
  endWithWhite?: boolean; // Force le gradient à se terminer en blanc pour plus de contraste
  splitLayout?: boolean; // Active le layout split avec image à droite
  splitImage?: string; // Image pour le layout split
  reducedTitle?: boolean; // Réduit la taille du titre principal
  children?: React.ReactNode; // Contenu additionnel après les CTAs
}

export default function Hero({
  title,
  titleLine2,
  titleSuffix,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  overlay = true,
  centered = true,
  theme = 'default',
  compact = false,
  minimal = false,
  useVhSpacing = false,
  endWithWhite = false,
  splitLayout = false,
  splitImage,
  reducedTitle = false,
  children,
}: HeroProps) {
  // Theme-based gradients with smooth bottom transition to beige (or white if endWithWhite is true)
  const gradients = endWithWhite ? {
    yoga: 'bg-gradient-to-b from-golden-orange/10 via-warm-white to-warm-white',
    coaching: 'bg-gradient-to-b from-mystic-mauve/20 via-warm-white to-warm-white',
    corporate: 'bg-gradient-to-b from-sky-blue/25 via-warm-white to-warm-white',
    default: 'bg-gradient-to-b from-dune-beige/30 via-warm-white to-warm-white',
  } : {
    yoga: 'bg-gradient-to-b from-golden-orange/10 via-warm-white via-70% to-dune-beige',
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

  // Split Layout Rendering
  if (splitLayout) {
    return (
      <section
        className={`relative ${
          useVhSpacing
            ? 'min-h-[85vh]'
            : compact
            ? 'min-h-[40rem] sm:min-h-[44rem] lg:min-h-[48rem]'
            : 'min-h-[44rem] sm:min-h-[48rem] lg:min-h-[52rem] xl:min-h-[56rem]'
        } flex items-center ${gradients[theme]}`}
      >
        <Container className={`relative z-10 ${
          useVhSpacing
            ? 'py-16 sm:py-20'
            : compact
            ? 'py-12 sm:py-16 md:py-20'
            : 'py-16 sm:py-20 md:py-24 lg:py-28'
        }`}>
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-stretch isolate">
            {/* Left Side - Text Content */}
            <div className="order-2 lg:order-1 space-y-6 flex flex-col justify-center">
              {subtitle && (
                <p className={`${subtitleColors[theme]} text-sm md:text-base font-medium uppercase tracking-wider animate-[fade-in-up_0.6s_ease-out]`}>
                  {subtitle}
                </p>
              )}

              <h1 className={`font-heading font-bold text-deep-blue leading-tight ${titleSuffix ? 'mb-2' : 'mb-4'} ${
                reducedTitle
                  ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'
                  : compact
                  ? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
                  : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
              } animate-[fade-in-up_0.6s_ease-out_0.1s_both]`}>
                {title}
                {titleLine2 && (
                  <>
                    <br />
                    {titleLine2}
                  </>
                )}
              </h1>

              {titleSuffix && (
                <p className={`font-heading text-lg md:text-xl lg:text-2xl font-medium mb-4 text-text-secondary animate-[fade-in-up_0.6s_ease-out_0.15s_both]`}>
                  — {titleSuffix} —
                </p>
              )}

              <p className={`leading-relaxed text-text-secondary whitespace-pre-line ${
                compact ? 'text-base md:text-lg' : 'text-lg md:text-xl'
              } animate-[fade-in-up_0.6s_ease-out_0.2s_both]`}>
                {description}
              </p>

              {(primaryCTA || secondaryCTA) && (
                <div className="flex flex-col sm:flex-row gap-4 pt-2 animate-[fade-in-up_0.6s_ease-out_0.3s_both]">
                  {primaryCTA && (
                    <Button variant="primary" size="lg" href={primaryCTA.href}>
                      {primaryCTA.text}
                    </Button>
                  )}
                  {secondaryCTA && (
                    <Button
                      variant={theme === 'corporate' ? 'corporate' : 'secondary'}
                      size="lg"
                      href={secondaryCTA.href}
                    >
                      {secondaryCTA.text}
                    </Button>
                  )}
                </div>
              )}

              {children}
            </div>

            {/* Right Side - Image */}
            <div className="order-1 lg:order-2 relative animate-[fade-in-up_0.8s_ease-out_0.4s_both] h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
              <div className="relative w-full h-full">
                {/* Decorative background elements */}
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-golden-orange/20 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-mystic-mauve/25 rounded-full blur-3xl -z-10"></div>

                {/* Image container with creative styling */}
                <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                  {splitImage && (
                    <Image
                      src={splitImage}
                      alt={title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  )}
                  {/* Subtle overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/5 to-transparent"></div>
                </div>

                {/* Decorative frame accent */}
                <div className="absolute -inset-4 border-2 border-golden-orange/10 rounded-3xl -z-10 hidden lg:block"></div>
              </div>
            </div>
          </div>
        </Container>

      </section>
    );
  }

  // Original Centered Layout
  return (
    <section
      className={`relative ${
        useVhSpacing
          ? 'min-h-[75vh]'
          : minimal
          ? 'min-h-[28rem] sm:min-h-[32rem] lg:min-h-[34rem]'
          : compact
          ? 'min-h-[32rem] sm:min-h-[36rem] lg:min-h-[40rem]'
          : 'min-h-[40rem] sm:min-h-[44rem] lg:min-h-[48rem] xl:min-h-[52rem]'
      } flex items-center ${
        backgroundImage ? 'bg-cover bg-center' : gradients[theme]
      }`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      {/* Decorative elements - only on split layout (homepage) */}
      {splitLayout && (
        <>
          {/* Large gradient circles */}
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-golden-orange/15 to-golden-orange/5 rounded-full blur-3xl -z-10" />
          <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-gradient-to-bl from-mystic-mauve/20 to-mystic-mauve/5 rounded-full blur-3xl -z-10" />

          {/* Geometric shapes for visual interest */}
          <div className="absolute top-1/4 left-10 w-32 h-32 border-2 border-golden-orange/20 rounded-lg rotate-12 -z-10" />
          <div className="absolute bottom-1/4 right-20 w-24 h-24 bg-mystic-mauve/10 rounded-full -z-10" />
          <div className="absolute bottom-10 left-1/3 w-16 h-16 border-2 border-morocco-blue/15 rotate-45 -z-10" />
        </>
      )}

      {/* Overlay */}
      {overlay && backgroundImage && (
        <div className="absolute inset-0 bg-deep-blue/40" />
      )}

      <Container className={`relative z-10 ${
        useVhSpacing
          ? 'py-20 -translate-y-6'
          : minimal
          ? 'py-10 sm:py-12 md:py-16 -translate-y-2'
          : compact
          ? 'py-12 sm:py-16 md:py-20 lg:py-24'
          : 'py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32'
      } ${centered ? 'text-center' : ''}`}>
        <div className={`max-w-4xl ${centered ? 'mx-auto' : ''}`}>
          {subtitle && (
            <p className={`${subtitleColors[theme]} text-sm md:text-base font-medium uppercase tracking-wider mb-4`}>
              {subtitle}
            </p>
          )}

          <h1
            className={`font-heading font-bold ${titleSuffix ? 'mb-2' : 'mb-6'} ${
              backgroundImage ? 'text-warm-white' : 'text-deep-blue'
            } ${
              reducedTitle
                ? 'text-xl sm:text-2xl md:text-3xl lg:text-4xl'
                : 'text-4xl md:text-6xl lg:text-7xl'
            } ${minimal ? 'animate-[fade-in-up_0.6s_ease-out]' : ''}`}
          >
            {title}
            {titleLine2 && (
              <>
                <br />
                {titleLine2}
              </>
            )}
          </h1>

          {titleSuffix && (
            <p className={`font-heading text-xl md:text-2xl lg:text-3xl font-medium mb-6 ${
              backgroundImage ? 'text-warm-white/80' : 'text-text-secondary'
            } ${minimal ? 'animate-[fade-in-up_0.6s_ease-out]' : ''}`}>
              — {titleSuffix} —
            </p>
          )}

          <p
            className={`text-lg md:text-xl mb-10 leading-relaxed whitespace-pre-line ${
              backgroundImage ? 'text-sage-light' : 'text-text-secondary'
            } ${minimal ? 'animate-[fade-in-up_0.6s_ease-out_0.1s_both]' : ''}`}
          >
            {description}
          </p>

          {(primaryCTA || secondaryCTA) && (
            <div className={`flex flex-col sm:flex-row gap-4 ${centered ? 'justify-center' : ''} ${compact ? 'mb-8' : ''} ${minimal ? 'animate-[fade-in-up_0.6s_ease-out_0.2s_both]' : ''}`}>
              {primaryCTA && (
                <Button variant="primary" size="lg" href={primaryCTA.href}>
                  {primaryCTA.text}
                </Button>
              )}
              {secondaryCTA && (
                <Button
                  variant={backgroundImage ? 'outline' : theme === 'corporate' ? 'corporate' : 'secondary'}
                  size="lg"
                  href={secondaryCTA.href}
                >
                  {secondaryCTA.text}
                </Button>
              )}
            </div>
          )}

          {/* Additional content (e.g., service pills) */}
          {children}
        </div>
      </Container>

    </section>
  );
}
