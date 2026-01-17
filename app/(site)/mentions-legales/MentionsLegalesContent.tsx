'use client'

import Hero from '@/components/sections/Hero'
import Section from '@/components/sections/Section'
import { useTranslation } from '@/hooks/useTranslation'

export default function MentionsLegalesContent() {
  const { t } = useTranslation()

  const sections = [
    { key: 'editor', icon: '📝' },
    { key: 'hosting', icon: '🌐' },
    { key: 'intellectual', icon: '©️' },
    { key: 'responsibility', icon: '⚠️' },
  ]

  return (
    <>
      <Hero
        title={t('legal.mentions.title')}
        description={t('legal.mentions.description')}
        compact
        centered
        endWithWhite
      />
      <Section background="beige" padding="lg" afterHero>
        <div className="max-w-3xl mx-auto space-y-12">
          {sections.map((section) => (
            <div key={section.key}>
              <h2 className="font-heading text-2xl font-bold text-deep-blue mb-4 flex items-center gap-3">
                <span>{section.icon}</span>
                {t(`legal.mentions.sections.${section.key}.title`)}
              </h2>
              <div className="prose prose-lg text-text-secondary whitespace-pre-line">
                {t(`legal.mentions.sections.${section.key}.content`)}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
