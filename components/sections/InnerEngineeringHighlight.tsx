'use client';

import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';

/**
 * Inner Engineering Banner
 * Compact promotional banner for Isha Foundation's Inner Engineering program
 * Card-style with clear visual separation
 */
export default function InnerEngineeringHighlight() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        {/* Card Container */}
        <div className="relative bg-white rounded-2xl shadow-lg border border-golden-orange/20 overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10 p-8 md:p-10">
            {/* Image */}
            <div className="flex-shrink-0 w-28 h-28 md:w-36 md:h-36">
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-md">
                <img
                  src="/images/inner-engineering-meditation.jpg"
                  alt="Inner Engineering - Méditation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-grow text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-golden-orange/10 border border-golden-orange/30 rounded-full mb-3">
                <span className="w-1.5 h-1.5 bg-golden-orange rounded-full animate-pulse" />
                <span className="text-xs font-medium text-golden-orange uppercase tracking-wide">
                  Ressource Recommandée
                </span>
              </div>

              {/* Title & Description */}
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-deep-blue mb-2">
                Inner Engineering
              </h2>
              <p className="text-text-secondary text-sm md:text-base max-w-2xl leading-relaxed mb-4">
                Une technologie pour le bien-être intérieur par <strong className="text-deep-blue">Sadhguru</strong>.
                Apprenez <strong className="text-deep-blue">Shambhavi Mahamudra Kriya</strong>,
                une pratique puissante de 21 minutes pour transformer votre vie.
              </p>

              {/* Key Points - Inline */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs text-text-secondary mb-5">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-golden-orange" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  En ligne ou en personne
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-golden-orange" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Pratique quotidienne 21 min
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-golden-orange" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Par Isha Foundation
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button
                  variant="primary"
                  size="md"
                  href="https://isha.sadhguru.org/yoga/yoga-programs/inner-engineering/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  En savoir plus
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  href="https://online.innerengineering.com/en/search"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Trouver une session
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
