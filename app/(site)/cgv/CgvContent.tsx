'use client'

import Hero from '@/components/sections/Hero'
import Section from '@/components/sections/Section'
import { useTranslation } from '@/hooks/useTranslation'

export default function CgvContent() {
  const { t } = useTranslation()

  const sections = [
    { key: 'object', icon: '📋' },
    { key: 'services', icon: '🎯' },
    { key: 'pricing', icon: '💳' },
    { key: 'booking', icon: '📅' },
    { key: 'cancellation', icon: '🔄' },
    { key: 'responsibility', icon: '⚠️' },
    { key: 'disputes', icon: '⚖️' },
  ]

  return (
    <>
      <Hero
        title={t('legal.cgv.title')}
        description={t('legal.cgv.description')}
        compact
        centered
        endWithWhite
      />
      <Section background="beige" padding="lg" afterHero>
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-text-secondary mb-8">{t('legal.cgv.lastUpdated')}</p>
          <div className="space-y-12">
            {sections.map((section) => (
              <div key={section.key}>
                <h2 className="font-heading text-2xl font-bold text-deep-blue mb-4 flex items-center gap-3">
                  <span>{section.icon}</span>
                  {t(`legal.cgv.sections.${section.key}.title`)}
                </h2>
                <div className="prose prose-lg text-text-secondary whitespace-pre-line">
                  {t(`legal.cgv.sections.${section.key}.content`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
