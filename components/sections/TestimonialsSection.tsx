'use client'

import Card from '@/components/ui/Card'
import Container from '@/components/ui/Container'
import { useTranslation } from '@/hooks/useTranslation'
import type { Testimonial } from '@/lib/sanity.types'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const { t, locale } = useTranslation()

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-24 bg-warm-white">
      <Container size="lg">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-golden-orange/10 text-golden-orange text-xs font-semibold rounded-full mb-4 uppercase tracking-wide">
            {t('testimonials.subtitle')}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-deep-blue mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            {t('testimonials.description')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial._id} padding="lg" className="relative">
              {/* Quote Icon */}
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-golden-orange/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-golden-orange"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Content */}
              <div className="pt-4">
                {/* Stars */}
                {testimonial.rating && (
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-golden-orange"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                )}

                {/* Quote */}
                <blockquote className="text-text-secondary leading-relaxed mb-6 italic">
                  "{locale === 'en' && testimonial.quoteEn ? testimonial.quoteEn : testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-golden-orange/20 to-mystic-mauve/20 rounded-full flex items-center justify-center">
                    <span className="font-heading text-lg font-bold text-deep-blue">
                      {testimonial.initial}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-deep-blue">{testimonial.author}</p>
                    <p className="text-sm text-text-secondary">
                      {locale === 'en' && testimonial.roleEn ? testimonial.roleEn : testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Service Type Badge */}
                <div className="mt-4 pt-4 border-t border-dune-beige/30">
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-dune-beige/30 text-text-secondary capitalize">
                    {t(`testimonials.serviceType.${testimonial.serviceType}`)}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
