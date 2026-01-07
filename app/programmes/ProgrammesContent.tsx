'use client'

import { useState } from 'react'
import Image from 'next/image'
import Hero from '@/components/sections/Hero'
import Section from '@/components/sections/Section'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { PrivateYogaRequestModal } from '@/components/forms'
import { useTranslation } from '@/hooks/useTranslation'
import Accordion from '@/components/ui/Accordion'

// Composant Accordion pour les bénéfices
function BenefitsAccordion({ programKey, t }: { programKey: string; t: (key: string) => string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left font-semibold text-deep-blue text-sm hover:text-golden-orange transition-colors"
      >
        <span>Ce que cette pratique peut vous apporter</span>
        <svg
          className={`w-5 h-5 text-golden-orange transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 mt-2' : 'max-h-0'
        }`}
      >
        <ul className="space-y-1 text-sm text-text-secondary">
          {Array.from({ length: 10 }).map((_, index) => {
            const benefit = t(`programmes.classes.${programKey}.benefits.${index}`)
            if (benefit.startsWith('programmes.classes.')) return null
            return (
              <li key={index} className="flex items-start">
                <span className="text-golden-orange mr-2">•</span>
                <span>{benefit}</span>
              </li>
            )
          }).filter(Boolean)}
        </ul>
      </div>
    </div>
  )
}

// Composant ProgramCard pour les programmes de santé et bien-être
function ProgramCard({ type, t }: { type: 'health' | 'wellbeing'; t: (key: string) => any }) {
  const programKey = `programmes.otherPrograms.${type}`

  // Helper to get array items from translations
  const getArrayItems = (baseKey: string, maxItems = 10): string[] => {
    const items: string[] = []
    for (let i = 0; i < maxItems; i++) {
      const item = t(`${baseKey}.${i}`)
      if (item && !item.startsWith('programmes.')) {
        items.push(item)
      } else {
        break
      }
    }
    return items
  }

  // Helper to get category object
  const getCategories = () => {
    const categoryKeys = type === 'health'
      ? ['cardioMetabolic', 'respiratory', 'spine', 'digestive', 'hormonal', 'immunity', 'mental']
      : ['presence', 'energy', 'body', 'specific', 'cardio', 'daily']

    return categoryKeys.map(key => ({
      key,
      title: t(`${programKey}.categories.${key}.title`),
      items: getArrayItems(`${programKey}.categories.${key}.items`),
    })).filter(cat => cat.items.length > 0)
  }

  const data = {
    title: t(`${programKey}.title`),
    intro: t(`${programKey}.intro`),
    note: type === 'wellbeing' ? t(`${programKey}.note`) : null,
    whatToExpect: {
      title: t(`${programKey}.whatToExpect.title`),
      items: getArrayItems(`${programKey}.whatToExpect.items`, 10),
    },
    formats: getArrayItems(`${programKey}.formats`, 5),
    accordionTitle: t(`${programKey}.accordionTitle`),
    categories: getCategories(),
    ctaButton: t(`${programKey}.ctaButton`),
    ctaSubtext: t(`${programKey}.ctaSubtext`),
    disclaimer: type === 'health' ? t(`${programKey}.disclaimer`) : null,
    durationNote: type === 'wellbeing' ? t(`${programKey}.durationNote`) : null,
    image: t(`${programKey}.image`),
  }

  return (
    <Card padding="lg" className="group">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Colonne 1: Image (1/3) */}
        <div className="lg:col-span-1">
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>
        </div>

        {/* Colonnes 2-3: Contenu (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Titre */}
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-golden-orange">
            {data.title}
          </h3>

          {/* Intro */}
          <p className="text-text-secondary leading-relaxed">
            {data.intro}
          </p>

          {/* Note optionnelle (seulement wellbeing) */}
          {data.note && (
            <p className="text-sm text-text-secondary italic">
              {data.note}
            </p>
          )}

          {/* À quoi ressemblent ces programmes */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-deep-blue mb-3">
              {data.whatToExpect.title}
            </h4>
            <ul className="space-y-2">
              {data.whatToExpect.items.map((item: string, idx: number) => (
                <li key={idx} className="flex gap-2 text-text-secondary">
                  <span className="text-golden-orange mt-1">•</span>
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Formats (chips) */}
          <div className="flex flex-wrap gap-2">
            {data.formats.map((format: string) => (
              <span
                key={format}
                className="px-3 py-1 bg-golden-orange/10 text-golden-orange text-sm font-medium rounded-full"
              >
                {format}
              </span>
            ))}
          </div>

          {/* Accordion: Problématiques/Thématiques */}
          <Accordion title={data.accordionTitle} defaultOpen={false}>
            <div className="space-y-4 pt-4">
              {data.categories.map((category) => (
                <div key={category.key}>
                  <h5 className="font-semibold text-deep-blue mb-2">
                    {category.title}
                  </h5>
                  <ul className="space-y-1 pl-4">
                    {category.items.map((item: string, idx: number) => (
                      <li key={idx} className="text-sm text-text-secondary">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Accordion>

          {/* Disclaimer (seulement health) */}
          {data.disclaimer && (
            <p className="text-xs text-text-secondary italic">
              {data.disclaimer}
            </p>
          )}

          {/* Duration note (seulement wellbeing) */}
          {data.durationNote && (
            <p className="text-xs text-text-secondary italic">
              {data.durationNote}
            </p>
          )}

          {/* CTA */}
          <div className="space-y-2">
            <Button variant="primary" size="lg" href="/contact">
              {data.ctaButton}
            </Button>
            <p className="text-xs text-text-secondary italic">
              {data.ctaSubtext}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}

// Mapping des programKeys vers les values du formulaire
const programKeyToFormValue: Record<string, string> = {
  upaYoga: 'upa-yoga',
  suryaKriya: 'surya-kriya',
  suryaShakti: 'surya-shakti',
  angamardana: 'angamardana',
  yogasanas: 'yogasanas',
}

export default function ProgrammesContent() {
  const { t } = useTranslation()

  return (
    <>
      <Hero
        subtitle={t('programmes.hero.subtitle')}
        title={t('programmes.hero.title')}
        description={t('programmes.hero.description')}
        theme="yoga"
        compact
        splitLayout
        splitImage="/images/sadhguru/sadhguru-portrait-2.jpg"
        reducedTitle
      >
        {/* 3 Paragraphes - pleine largeur */}
        <div className="space-y-5 mt-6 mb-8">
          <div>
            <h3 className="font-heading text-base font-semibold text-golden-orange mb-2">
              {t('programmes.hero.paragraph1.title')}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {t('programmes.hero.paragraph1.text')}
            </p>
          </div>

          <div>
            <h3 className="font-heading text-base font-semibold text-golden-orange mb-2">
              {t('programmes.hero.paragraph2.title')}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {t('programmes.hero.paragraph2.text')}
            </p>
          </div>

          <div>
            <h3 className="font-heading text-base font-semibold text-golden-orange mb-2">
              {t('programmes.hero.paragraph3.title')}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {t('programmes.hero.paragraph3.text')}
            </p>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/contact" variant="primary" size="lg" className="text-sm text-center gap-2.5">
            {/* Icône calendrier simple */}
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {t('programmes.hero.cta1')}
          </Button>
          <Button href="#cours" variant="primary" size="lg" className="text-sm text-center gap-2.5">
            {/* Icône lotus/méditation yoga */}
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="7" r="2.5" strokeWidth={2}/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10.5c-3 0-5 2-5 4.5v1.5c0 .5.5 1 1 1h8c.5 0 1-.5 1-1V15c0-2.5-2-4.5-5-4.5z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 15.5l-2 3M17 15.5l2 3"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 13l-2.5-1.5M16 13l2.5-1.5"/>
            </svg>
            {t('programmes.hero.cta2')}
          </Button>
        </div>

        {/* Bouton supplémentaire - Découvrir programmes */}
        <div className="mt-4">
          <Button href="#retraites" variant="secondary" size="lg" className="w-full sm:w-auto text-sm text-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            {t('programmes.hero.cta3')}
          </Button>
        </div>
      </Hero>

      {/* Cours collectifs */}
      <Section
        id="cours"
        subtitle={t('programmes.regularClasses.subtitle')}
        title={t('programmes.regularClasses.title')}
        description={t('programmes.regularClasses.autonomy')}
        background="beige"
        accentColor="yoga"
        afterHero
      >

        {/* 5 programmes en grille */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {['upaYoga', 'suryaKriya', 'suryaShakti', 'angamardana', 'yogasanas'].map((programKey) => (
            <Card key={programKey} hover padding="lg" className="flex flex-col">
              {/* Image du programme */}
              <div className="mb-6">
                <div className="aspect-[4/3] relative rounded-xl overflow-hidden">
                  <Image
                    src={t(`programmes.classes.${programKey}.image`)}
                    alt={t(`programmes.classes.${programKey}.title`)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </div>

              {/* Contenu */}
              <div className="flex-grow flex flex-col">
                <div className="mb-4">
                  <h3 className="font-heading text-xl font-bold text-deep-blue mb-1">
                    {t(`programmes.classes.${programKey}.title`)}
                  </h3>
                  <p className="text-golden-orange font-medium italic text-sm">
                    {t(`programmes.classes.${programKey}.subtitle`)}
                  </p>
                </div>

                <p className="text-text-secondary leading-relaxed mb-4 text-sm">
                  {t(`programmes.classes.${programKey}.description`)}
                </p>

                {/* Bénéfices - Accordion */}
                <BenefitsAccordion programKey={programKey} t={t} />

                {/* Infos pratiques */}
                <div className="space-y-2 mb-4 text-sm flex-grow">
                  <div className="flex items-start text-text-secondary">
                    <svg className="w-4 h-4 mr-2 text-golden-orange mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{t(`programmes.classes.${programKey}.schedule`)}</span>
                  </div>
                  <div className="flex items-start text-text-secondary">
                    <svg className="w-4 h-4 mr-2 text-golden-orange mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{t(`programmes.classes.${programKey}.duration`)}</span>
                  </div>
                  <div className="flex items-start text-text-secondary">
                    <svg className="w-4 h-4 mr-2 text-golden-orange mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{t(`programmes.classes.${programKey}.location`)}</span>
                  </div>
                  <p className="font-semibold text-golden-orange mt-4">
                    {t(`programmes.classes.${programKey}.price`)}
                  </p>
                </div>

                {/* Bouton */}
                <PrivateYogaRequestModal
                  triggerText={t('programmes.buttons.book')}
                  variant="outline"
                  fullWidth
                  defaultYogaType={programKeyToFormValue[programKey]}
                />
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Autres programmes */}
      <Section
        id="autres-programmes"
        subtitle={t('programmes.otherPrograms.subtitle')}
        title={t('programmes.otherPrograms.title')}
        accentColor="yoga"
      >
        {/* Intro + Disclaimers */}
        <div className="max-w-4xl mx-auto mb-12 space-y-4">
          <p className="text-lg text-text-secondary leading-relaxed">
            {t('programmes.otherPrograms.intro')}
          </p>
          <p className="text-sm text-text-secondary italic">
            {t('programmes.otherPrograms.disclaimer')}
          </p>
          <div className="bg-golden-orange/5 border-l-4 border-golden-orange p-4 rounded-r-lg">
            <p className="text-sm text-text-secondary font-medium">
              {t('programmes.otherPrograms.medicalWarning')}
            </p>
          </div>
        </div>

        {/* Méga-cartes empilées verticalement */}
        <div className="space-y-12">
          <ProgramCard type="health" t={t} />
          <ProgramCard type="wellbeing" t={t} />
        </div>
      </Section>

      {/* Lignée Isha Foundation */}
      <Section
        id="lignee"
        subtitle={t('programmes.lineage.subtitle')}
        title={t('programmes.lineage.title')}
        background="beige"
        centered
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-text-secondary leading-relaxed mb-10 text-center">
            {t('programmes.lineage.intro')}
          </p>

          {/* Certification Logo */}
          <div className="flex justify-center mb-10">
            <Image
              src="/images/certifications/isha-hatha-yoga-certified.png"
              alt="Classical Hatha Yoga - Sadhguru Gurukulam Certified Teacher"
              width={320}
              height={100}
              className="object-contain"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Sadhguru Photo Card */}
            <div className="relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/sadhguru/sadhguru-portrait-1.jpg"
                  alt="Sadhguru en méditation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-deep-blue/90 via-deep-blue/60 to-transparent p-6 rounded-b-2xl">
                <h3 className="font-heading text-2xl font-bold text-warm-white mb-1">
                  {t('programmes.lineage.sadhguru.title')}
                </h3>
                <p className="text-golden-orange font-medium text-sm mb-3">
                  {t('programmes.lineage.sadhguru.role')}
                </p>
                <a
                  href="https://isha.sadhguru.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-warm-white hover:text-golden-orange transition-colors font-medium"
                >
                  {t('programmes.lineage.sadhguru.link')}
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Formation Info */}
            <div className="space-y-4">
              {/* Sadhguru Description */}
              <Card padding="md" className="bg-gradient-to-br from-warm-white to-golden-orange/5 border border-golden-orange/10">
                <p className="text-text-secondary leading-relaxed text-sm">
                  {t('programmes.lineage.sadhguru.description')}
                </p>
              </Card>

              <Card padding="md" className="bg-warm-white">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-golden-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-golden-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-deep-blue mb-1">
                      {t('programmes.lineage.training.title')}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {t('programmes.lineage.training.description')}
                    </p>
                  </div>
                </div>
              </Card>

              <Card padding="md" className="bg-warm-white">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-golden-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-golden-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-deep-blue mb-1">
                      {t('programmes.lineage.hours.title')}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {t('programmes.lineage.hours.description')}
                    </p>
                  </div>
                </div>
              </Card>

              <Card padding="md" className="bg-warm-white">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-golden-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-golden-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-deep-blue mb-1">
                      {t('programmes.lineage.global.title')}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {t('programmes.lineage.global.description')}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* Philosophie */}
      <Section
        subtitle={t('programmes.philosophy.subtitle')}
        title={t('programmes.philosophy.title')}
        centered
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            {t('programmes.philosophy.intro')}
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card padding="md">
              <h4 className="font-semibold text-deep-blue mb-3">
                {t('programmes.philosophy.tradition.title')}
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                {t('programmes.philosophy.tradition.description')}
              </p>
            </Card>

            <Card padding="md">
              <h4 className="font-semibold text-deep-blue mb-3">
                {t('programmes.philosophy.inclusive.title')}
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                {t('programmes.philosophy.inclusive.description')}
              </p>
            </Card>

            <Card padding="md">
              <h4 className="font-semibold text-deep-blue mb-3">
                {t('programmes.philosophy.beyond.title')}
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                {t('programmes.philosophy.beyond.description')}
              </p>
            </Card>

            <Card padding="md">
              <h4 className="font-semibold text-deep-blue mb-3">
                {t('programmes.philosophy.smallGroups.title')}
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                {t('programmes.philosophy.smallGroups.description')}
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* Programme sur-mesure */}
      <Section
        subtitle={t('programmes.custom.subtitle')}
        title={t('programmes.custom.title')}
        description={t('programmes.custom.description')}
        centered
        padding="lg"
      >
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-golden-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-golden-orange"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-deep-blue mb-2">
                {t('programmes.custom.features.groups.title')}
              </h4>
              <p className="text-sm text-text-secondary">
                {t('programmes.custom.features.groups.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-golden-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-golden-orange"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-deep-blue mb-2">
                {t('programmes.custom.features.locations.title')}
              </h4>
              <p className="text-sm text-text-secondary">
                {t('programmes.custom.features.locations.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-golden-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-golden-orange"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-deep-blue mb-2">
                {t('programmes.custom.features.personalized.title')}
              </h4>
              <p className="text-sm text-text-secondary">
                {t('programmes.custom.features.personalized.description')}
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button variant="primary" size="lg" href="/contact">
              {t('programmes.custom.button')}
            </Button>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section background="beige" padding="lg" centered>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-deep-blue mb-6">
            {t('programmes.cta.title')}
          </h2>
          <p className="text-lg text-text-secondary mb-8">
            {t('programmes.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/contact">
              {t('programmes.cta.primaryCTA')}
            </Button>
            <Button variant="outline" size="lg" href="/contact">
              {t('programmes.cta.secondaryCTA')}
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
