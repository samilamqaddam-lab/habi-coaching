'use client'

import Hero from '@/components/sections/Hero'
import Section from '@/components/sections/Section'
import Card from '@/components/ui/Card'
import { useTranslation } from '@/hooks/useTranslation'
import Link from 'next/link'

export default function NotFound() {
  const { t } = useTranslation()

  const suggestions = [
    { href: '/yoga', title: 'Yoga', desc: 'Nos programmes' },
    { href: '/coaching', title: 'Coaching', desc: 'Accompagnement' },
    { href: '/contact', title: 'Contact', desc: 'Nous écrire' },
  ]

  return (
    <>
      <Hero
        title="404"
        titleSuffix={t('notFound.title')}
        description={t('notFound.description')}
        primaryCTA={{ text: t('notFound.cta'), href: '/' }}
        compact
        centered
        endWithWhite
      />
      <Section background="beige" padding="lg" afterHero centered>
        <h3 className="font-heading text-2xl font-bold text-deep-blue mb-8">
          {t('notFound.suggestions')}
        </h3>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {suggestions.map((s) => (
            <Link key={s.href} href={s.href}>
              <Card hover className="text-center h-full p-6">
                <h4 className="font-semibold text-deep-blue mb-2">{s.title}</h4>
                <p className="text-sm text-text-secondary">{s.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
