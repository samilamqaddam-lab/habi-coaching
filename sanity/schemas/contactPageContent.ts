import { defineType, defineField } from 'sanity'

// FAQ item object
const faqItemObject = {
  type: 'object',
  name: 'faqItem',
  title: 'Question FAQ',
  fields: [
    { name: 'question', type: 'string', title: 'Question', validation: (Rule: any) => Rule.required() },
    { name: 'questionEn', type: 'string', title: 'Question (EN)' },
    { name: 'answer', type: 'text', title: 'Réponse', rows: 4 },
    { name: 'answerEn', type: 'text', title: 'Réponse (EN)', rows: 4 },
  ],
  preview: {
    select: { title: 'question' },
    prepare({ title }: { title?: string }) {
      return { title: title || 'Question sans texte' }
    },
  },
}

// Social media item
const socialItemObject = {
  type: 'object',
  name: 'socialItem',
  title: 'Réseau Social',
  fields: [
    {
      name: 'platform',
      type: 'string',
      title: 'Plateforme',
      options: {
        list: [
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'Twitter/X', value: 'twitter' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    { name: 'url', type: 'url', title: 'URL du profil' },
    { name: 'label', type: 'string', title: 'Label (ex: @hajar.habi)' },
  ],
  preview: {
    select: { platform: 'platform', label: 'label' },
    prepare({ platform, label }: { platform?: string; label?: string }) {
      const icons: Record<string, string> = {
        linkedin: '💼',
        instagram: '📷',
        facebook: '📘',
        youtube: '🎬',
        twitter: '🐦',
      }
      return {
        title: platform ? platform.charAt(0).toUpperCase() + platform.slice(1) : 'Réseau sans nom',
        subtitle: label || '',
        media: () => icons[platform || ''] || '🌐',
      }
    },
  },
}

export const contactPageContent = defineType({
  name: 'contactPageContent',
  title: 'Contenu Page Contact',
  type: 'document',
  groups: [
    { name: 'hero', title: '🎬 Hero' },
    { name: 'methods', title: '📞 Moyens de Contact' },
    { name: 'form', title: '📋 Formulaire' },
    { name: 'faq', title: '❓ FAQ' },
    { name: 'social', title: '🌐 Réseaux Sociaux' },
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
      ],
    }),

    // ============================================
    // CONTACT METHODS SECTION
    // ============================================
    defineField({
      name: 'methodsSection',
      title: 'Section Moyens de Contact',
      type: 'object',
      group: 'methods',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'subtitle', type: 'string', title: 'Sous-titre' },
        { name: 'subtitleEn', type: 'string', title: 'Sous-titre (EN)' },
        { name: 'title', type: 'string', title: 'Titre' },
        { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
        // Contact info
        { name: 'email', type: 'string', title: 'Email' },
        { name: 'phone', type: 'string', title: 'Téléphone' },
        { name: 'phoneLabel', type: 'string', title: 'Label Téléphone' },
        { name: 'phoneLabelEn', type: 'string', title: 'Label Téléphone (EN)' },
        { name: 'linkedinUrl', type: 'url', title: 'URL LinkedIn' },
        { name: 'linkedinLabel', type: 'string', title: 'Label LinkedIn' },
        { name: 'linkedinLabelEn', type: 'string', title: 'Label LinkedIn (EN)' },
      ],
    }),

    // ============================================
    // FORM SECTION
    // ============================================
    defineField({
      name: 'formSection',
      title: 'Section Formulaire',
      type: 'object',
      group: 'form',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'subtitle', type: 'string', title: 'Sous-titre' },
        { name: 'subtitleEn', type: 'string', title: 'Sous-titre (EN)' },
        { name: 'title', type: 'string', title: 'Titre' },
        { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
        { name: 'description', type: 'text', title: 'Description', rows: 2 },
        { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 2 },
        // Form labels
        { name: 'firstNameLabel', type: 'string', title: 'Label Prénom' },
        { name: 'firstNameLabelEn', type: 'string', title: 'Label Prénom (EN)' },
        { name: 'lastNameLabel', type: 'string', title: 'Label Nom' },
        { name: 'lastNameLabelEn', type: 'string', title: 'Label Nom (EN)' },
        { name: 'emailLabel', type: 'string', title: 'Label Email' },
        { name: 'emailLabelEn', type: 'string', title: 'Label Email (EN)' },
        { name: 'phoneLabel', type: 'string', title: 'Label Téléphone' },
        { name: 'phoneLabelEn', type: 'string', title: 'Label Téléphone (EN)' },
        { name: 'organizationLabel', type: 'string', title: 'Label Organisation' },
        { name: 'organizationLabelEn', type: 'string', title: 'Label Organisation (EN)' },
        { name: 'functionLabel', type: 'string', title: 'Label Fonction' },
        { name: 'functionLabelEn', type: 'string', title: 'Label Fonction (EN)' },
        { name: 'cityLabel', type: 'string', title: 'Label Ville' },
        { name: 'cityLabelEn', type: 'string', title: 'Label Ville (EN)' },
        { name: 'interestLabel', type: 'string', title: 'Label Intérêt' },
        { name: 'interestLabelEn', type: 'string', title: 'Label Intérêt (EN)' },
        { name: 'messageLabel', type: 'string', title: 'Label Message' },
        { name: 'messageLabelEn', type: 'string', title: 'Label Message (EN)' },
        { name: 'consentText', type: 'text', title: 'Texte Consentement', rows: 2 },
        { name: 'consentTextEn', type: 'text', title: 'Texte Consentement (EN)', rows: 2 },
        { name: 'submitButton', type: 'string', title: 'Bouton Envoyer' },
        { name: 'submitButtonEn', type: 'string', title: 'Bouton Envoyer (EN)' },
        { name: 'responseTime', type: 'string', title: 'Délai de réponse' },
        { name: 'responseTimeEn', type: 'string', title: 'Délai de réponse (EN)' },
      ],
    }),

    // ============================================
    // FAQ SECTION
    // ============================================
    defineField({
      name: 'faqSection',
      title: 'Section FAQ',
      type: 'object',
      group: 'faq',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'subtitle', type: 'string', title: 'Sous-titre' },
        { name: 'subtitleEn', type: 'string', title: 'Sous-titre (EN)' },
        { name: 'title', type: 'string', title: 'Titre' },
        { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
        {
          name: 'questions',
          title: 'Questions FAQ',
          type: 'array',
          of: [faqItemObject],
        },
      ],
    }),

    // ============================================
    // SOCIAL SECTION
    // ============================================
    defineField({
      name: 'socialSection',
      title: 'Section Réseaux Sociaux',
      type: 'object',
      group: 'social',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'title', type: 'string', title: 'Titre' },
        { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
        { name: 'description', type: 'text', title: 'Description', rows: 2 },
        { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 2 },
        {
          name: 'networks',
          title: 'Réseaux',
          type: 'array',
          of: [socialItemObject],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contenu de la page Contact',
        subtitle: 'Hero - Moyens de Contact - Formulaire - FAQ - Réseaux',
      }
    },
  },
})
