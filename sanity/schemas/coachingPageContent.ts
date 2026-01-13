import { defineType, defineField } from 'sanity'

// Reusable service card object
const serviceCardObject = {
  type: 'object',
  name: 'coachingServiceCard',
  title: 'Service de Coaching',
  fields: [
    { name: 'title', type: 'string', title: 'Titre', validation: (Rule: any) => Rule.required() },
    { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
    { name: 'description', type: 'text', title: 'Description', rows: 3 },
    { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 3 },
    { name: 'duration', type: 'string', title: 'Durée (ex: 60-90 min)' },
    { name: 'durationEn', type: 'string', title: 'Durée (EN)' },
    { name: 'format', type: 'string', title: 'Format (ex: En personne ou en ligne)' },
    { name: 'formatEn', type: 'string', title: 'Format (EN)' },
    { name: 'price', type: 'string', title: 'Prix (ex: À partir de 150€/session)' },
    { name: 'priceEn', type: 'string', title: 'Prix (EN)' },
  ],
  preview: {
    select: {
      title: 'title',
      price: 'price',
    },
    prepare({ title, price }: { title?: string; price?: string }) {
      return {
        title: title || 'Service sans titre',
        subtitle: price || '',
      }
    },
  },
}

// Approach step object
const approachStepObject = {
  type: 'object',
  name: 'approachStep',
  title: 'Étape d\'approche',
  fields: [
    { name: 'title', type: 'string', title: 'Titre', validation: (Rule: any) => Rule.required() },
    { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
    { name: 'description', type: 'text', title: 'Description', rows: 3 },
    { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 3 },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }: { title?: string }) {
      return {
        title: title || 'Étape sans titre',
      }
    },
  },
}

export const coachingPageContent = defineType({
  name: 'coachingPageContent',
  title: 'Contenu Page Coaching',
  type: 'document',
  groups: [
    { name: 'hero', title: '🎬 Hero' },
    { name: 'services', title: '📦 Services' },
    { name: 'approach', title: '🎯 Approche' },
    { name: 'cta', title: '📞 CTA' },
  ],
  fields: [
    // ============================================
    // HERO SECTION
    // ============================================
    defineField({
      name: 'heroSection',
      title: 'Section Hero',
      type: 'object',
      group: 'hero',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'subtitle', type: 'string', title: 'Sous-titre (badge)' },
        { name: 'subtitleEn', type: 'string', title: 'Sous-titre (EN)' },
        { name: 'title', type: 'string', title: 'Titre principal' },
        { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
        { name: 'description', type: 'text', title: 'Description', rows: 4 },
        { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 4 },
        { name: 'primaryCtaText', type: 'string', title: 'Bouton primaire' },
        { name: 'primaryCtaTextEn', type: 'string', title: 'Bouton primaire (EN)' },
        { name: 'secondaryCtaText', type: 'string', title: 'Bouton secondaire' },
        { name: 'secondaryCtaTextEn', type: 'string', title: 'Bouton secondaire (EN)' },
      ],
    }),

    // ============================================
    // SERVICES SECTION
    // ============================================
    defineField({
      name: 'servicesSection',
      title: 'Section Services',
      type: 'object',
      group: 'services',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'subtitle', type: 'string', title: 'Sous-titre' },
        { name: 'subtitleEn', type: 'string', title: 'Sous-titre (EN)' },
        { name: 'title', type: 'string', title: 'Titre' },
        { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
        {
          name: 'services',
          title: 'Services (3 services)',
          type: 'array',
          of: [serviceCardObject],
          validation: (Rule) => Rule.max(3).error('Maximum 3 services'),
        },
      ],
    }),

    // ============================================
    // APPROACH SECTION
    // ============================================
    defineField({
      name: 'approachSection',
      title: 'Section Approche',
      type: 'object',
      group: 'approach',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'subtitle', type: 'string', title: 'Sous-titre' },
        { name: 'subtitleEn', type: 'string', title: 'Sous-titre (EN)' },
        { name: 'title', type: 'string', title: 'Titre' },
        { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
        { name: 'description', type: 'text', title: 'Description', rows: 3 },
        { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 3 },
        {
          name: 'steps',
          title: 'Étapes (3 étapes)',
          type: 'array',
          of: [approachStepObject],
          validation: (Rule) => Rule.max(3).error('Maximum 3 étapes'),
        },
        {
          name: 'testimonial',
          title: 'Témoignage',
          type: 'object',
          fields: [
            { name: 'quote', type: 'text', title: 'Citation', rows: 4 },
            { name: 'quoteEn', type: 'text', title: 'Citation (EN)', rows: 4 },
            { name: 'author', type: 'string', title: 'Auteur' },
            { name: 'authorEn', type: 'string', title: 'Auteur (EN)' },
          ],
        },
      ],
    }),

    // ============================================
    // CTA SECTION
    // ============================================
    defineField({
      name: 'ctaSection',
      title: 'Section CTA',
      type: 'object',
      group: 'cta',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'title', type: 'string', title: 'Titre' },
        { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
        { name: 'description', type: 'text', title: 'Description', rows: 3 },
        { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 3 },
        { name: 'buttonText', type: 'string', title: 'Texte du bouton' },
        { name: 'buttonTextEn', type: 'string', title: 'Texte du bouton (EN)' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contenu de la page Coaching',
        subtitle: 'Hero - Services - Approche - CTA',
      }
    },
  },
})
