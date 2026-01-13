import { defineType, defineField } from 'sanity'

// Feature item for services
const featureItemObject = {
  type: 'object',
  name: 'featureItem',
  title: 'Fonctionnalité',
  fields: [
    { name: 'text', type: 'string', title: 'Texte', validation: (Rule: any) => Rule.required() },
    { name: 'textEn', type: 'string', title: 'Texte (EN)' },
  ],
  preview: {
    select: { title: 'text' },
    prepare({ title }: { title?: string }) {
      return { title: title || 'Fonctionnalité sans texte' }
    },
  },
}

// Organisation service card
const orgServiceCardObject = {
  type: 'object',
  name: 'orgServiceCard',
  title: 'Service Organisation',
  fields: [
    { name: 'title', type: 'string', title: 'Titre', validation: (Rule: any) => Rule.required() },
    { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
    { name: 'description', type: 'text', title: 'Description', rows: 3 },
    { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 3 },
    {
      name: 'features',
      title: 'Fonctionnalités (3 max)',
      type: 'array',
      of: [featureItemObject],
      validation: (Rule: any) => Rule.max(3).error('Maximum 3 fonctionnalités'),
    },
    {
      name: 'icon',
      type: 'string',
      title: 'Icône',
      options: {
        list: [
          { title: 'Transformation (engrenages)', value: 'transformation' },
          { title: 'Leadership (étoile)', value: 'leadership' },
          { title: 'Retraites (montagne)', value: 'retreats' },
        ],
      },
      initialValue: 'transformation',
    },
    {
      name: 'color',
      type: 'string',
      title: 'Couleur d\'accent',
      options: {
        list: [
          { title: 'Bleu Maroc', value: 'morocco-blue' },
          { title: 'Mauve Mystique', value: 'mystic-mauve' },
          { title: 'Orange Doré', value: 'golden-orange' },
        ],
      },
      initialValue: 'morocco-blue',
    },
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon',
    },
    prepare({ title, icon }: { title?: string; icon?: string }) {
      const iconEmoji = icon === 'transformation' ? '⚙️' : icon === 'leadership' ? '⭐' : icon === 'retreats' ? '🏔️' : '📦'
      return {
        title: title || 'Service sans titre',
        media: () => iconEmoji,
      }
    },
  },
}

export const organisationsPageContent = defineType({
  name: 'organisationsPageContent',
  title: 'Contenu Page Organisations',
  type: 'document',
  groups: [
    { name: 'hero', title: '🎬 Hero' },
    { name: 'services', title: '📦 Services' },
    { name: 'quote', title: '📝 Demande de Devis' },
    { name: 'form', title: '📋 Formulaire' },
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
        { name: 'subtitle', type: 'string', title: 'Sous-titre' },
        { name: 'subtitleEn', type: 'string', title: 'Sous-titre (EN)' },
        { name: 'title', type: 'string', title: 'Titre' },
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
        { name: 'description', type: 'text', title: 'Description', rows: 3 },
        { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 3 },
        {
          name: 'services',
          title: 'Services (3 services)',
          type: 'array',
          of: [orgServiceCardObject],
          validation: (Rule) => Rule.max(3).error('Maximum 3 services'),
        },
      ],
    }),

    // ============================================
    // QUOTE REQUEST SECTION
    // ============================================
    defineField({
      name: 'quoteSection',
      title: 'Section Demande de Devis',
      type: 'object',
      group: 'quote',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'subtitle', type: 'string', title: 'Sous-titre' },
        { name: 'subtitleEn', type: 'string', title: 'Sous-titre (EN)' },
        { name: 'title', type: 'string', title: 'Titre' },
        { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
        { name: 'description', type: 'text', title: 'Description', rows: 2 },
        { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 2 },
      ],
    }),

    // ============================================
    // FORM LABELS (for localization)
    // ============================================
    defineField({
      name: 'formLabels',
      title: 'Labels du Formulaire',
      description: 'Textes du formulaire de demande de devis',
      type: 'object',
      group: 'form',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'firstName', type: 'string', title: 'Label Prénom' },
        { name: 'firstNameEn', type: 'string', title: 'Label Prénom (EN)' },
        { name: 'lastName', type: 'string', title: 'Label Nom' },
        { name: 'lastNameEn', type: 'string', title: 'Label Nom (EN)' },
        { name: 'email', type: 'string', title: 'Label Email' },
        { name: 'emailEn', type: 'string', title: 'Label Email (EN)' },
        { name: 'phone', type: 'string', title: 'Label Téléphone' },
        { name: 'phoneEn', type: 'string', title: 'Label Téléphone (EN)' },
        { name: 'organization', type: 'string', title: 'Label Organisation' },
        { name: 'organizationEn', type: 'string', title: 'Label Organisation (EN)' },
        { name: 'size', type: 'string', title: 'Label Taille' },
        { name: 'sizeEn', type: 'string', title: 'Label Taille (EN)' },
        { name: 'service', type: 'string', title: 'Label Service' },
        { name: 'serviceEn', type: 'string', title: 'Label Service (EN)' },
        { name: 'message', type: 'string', title: 'Label Message' },
        { name: 'messageEn', type: 'string', title: 'Label Message (EN)' },
        { name: 'submit', type: 'string', title: 'Bouton Envoyer' },
        { name: 'submitEn', type: 'string', title: 'Bouton Envoyer (EN)' },
        { name: 'responseTime', type: 'string', title: 'Délai de réponse' },
        { name: 'responseTimeEn', type: 'string', title: 'Délai de réponse (EN)' },
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
        { name: 'description', type: 'text', title: 'Description', rows: 2 },
        { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 2 },
        { name: 'buttonText', type: 'string', title: 'Texte du bouton' },
        { name: 'buttonTextEn', type: 'string', title: 'Texte du bouton (EN)' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contenu de la page Organisations',
        subtitle: 'Hero - Services - Devis - CTA',
      }
    },
  },
})
