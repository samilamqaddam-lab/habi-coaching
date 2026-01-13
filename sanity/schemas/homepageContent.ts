import { defineType, defineField } from 'sanity'

// Objet réutilisable pour les cartes d'expertise
const expertiseCardObject = {
  type: 'object',
  name: 'expertiseCard',
  title: 'Carte d\'expertise',
  fields: [
    { name: 'title', type: 'string', title: 'Titre', validation: (Rule: any) => Rule.required() },
    { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
    { name: 'highlight', type: 'string', title: 'Texte en surbrillance (ex: "20+ ans")', validation: (Rule: any) => Rule.required() },
    { name: 'highlightEn', type: 'string', title: 'Texte en surbrillance (EN)' },
    { name: 'description', type: 'text', title: 'Description', rows: 3 },
    { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 3 },
    {
      name: 'icon',
      type: 'string',
      title: 'Icône',
      options: {
        list: [
          { title: 'Corporate (bâtiment)', value: 'corporate' },
          { title: 'Coaching (dialogue)', value: 'coaching' },
          { title: 'Yoga (lotus)', value: 'yoga' },
        ],
      },
      initialValue: 'corporate',
    },
    {
      name: 'color',
      type: 'string',
      title: 'Couleur d\'accent',
      options: {
        list: [
          { title: 'Bleu Maroc (corporate)', value: 'morocco-blue' },
          { title: 'Mauve Mystique (coaching)', value: 'mystic-mauve' },
          { title: 'Orange Doré (yoga)', value: 'golden-orange' },
        ],
      },
      initialValue: 'morocco-blue',
    },
  ],
  preview: {
    select: {
      title: 'title',
      highlight: 'highlight',
      icon: 'icon',
    },
    prepare({ title, highlight, icon }: { title?: string; highlight?: string; icon?: string }) {
      const iconEmoji = icon === 'corporate' ? '🏢' : icon === 'coaching' ? '💬' : icon === 'yoga' ? '🧘' : '📋'
      return {
        title: title || 'Carte sans titre',
        subtitle: highlight || '',
        media: () => iconEmoji,
      }
    },
  },
}

// Objet réutilisable pour les services
const serviceObject = {
  type: 'object',
  name: 'serviceCard',
  title: 'Service',
  fields: [
    { name: 'title', type: 'string', title: 'Titre', validation: (Rule: any) => Rule.required() },
    { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
    { name: 'description', type: 'text', title: 'Description', rows: 3 },
    { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 3 },
    { name: 'ctaText', type: 'string', title: 'Texte du bouton' },
    { name: 'ctaTextEn', type: 'string', title: 'Texte du bouton (EN)' },
    { name: 'link', type: 'string', title: 'Lien (ex: /coaching)' },
    {
      name: 'icon',
      type: 'string',
      title: 'Icône',
      options: {
        list: [
          { title: 'Organisations (bâtiment)', value: 'organisations' },
          { title: 'Coaching (dialogue)', value: 'coaching' },
          { title: 'Yoga (lotus)', value: 'yoga' },
        ],
      },
      initialValue: 'coaching',
    },
    {
      name: 'color',
      type: 'string',
      title: 'Couleur d\'accent',
      options: {
        list: [
          { title: 'Bleu Maroc (corporate)', value: 'morocco-blue' },
          { title: 'Mauve Mystique (coaching)', value: 'mystic-mauve' },
          { title: 'Orange Doré (yoga)', value: 'golden-orange' },
        ],
      },
      initialValue: 'mystic-mauve',
    },
  ],
  preview: {
    select: {
      title: 'title',
      link: 'link',
      icon: 'icon',
    },
    prepare({ title, link, icon }: { title?: string; link?: string; icon?: string }) {
      const iconEmoji = icon === 'organisations' ? '🏢' : icon === 'coaching' ? '💬' : icon === 'yoga' ? '🧘' : '📋'
      return {
        title: title || 'Service sans titre',
        subtitle: link || '',
        media: () => iconEmoji,
      }
    },
  },
}

export const homepageContent = defineType({
  name: 'homepageContent',
  title: 'Contenu Accueil',
  type: 'document',
  groups: [
    { name: 'expertise', title: '🎯 Section Expertise' },
    { name: 'about', title: '👤 Section À Propos' },
    { name: 'services', title: '📦 Section Services' },
    { name: 'cta', title: '🎬 Section CTA' },
  ],
  fields: [
    // ============================================
    // SECTION EXPERTISE
    // ============================================
    defineField({
      name: 'expertiseSection',
      title: 'Section Expertise',
      description: 'Section "L\'alliance unique de trois mondes" avec les 3 cartes',
      type: 'object',
      group: 'expertise',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'subtitle',
          title: 'Sous-titre (badge)',
          type: 'string',
          description: 'Ex: "Mon Expertise"',
        },
        {
          name: 'subtitleEn',
          title: 'Sous-titre (EN)',
          type: 'string',
        },
        {
          name: 'title',
          title: 'Titre principal',
          type: 'string',
          description: 'Ex: "L\'alliance unique de trois mondes"',
        },
        {
          name: 'titleEn',
          title: 'Titre (EN)',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'descriptionEn',
          title: 'Description (EN)',
          type: 'text',
          rows: 3,
        },
        {
          name: 'cards',
          title: 'Cartes d\'expertise (3 cartes)',
          description: 'Les 3 piliers: Corporate, Coaching, Yoga',
          type: 'array',
          of: [expertiseCardObject],
          validation: (Rule) => Rule.max(3).error('Maximum 3 cartes'),
        },
      ],
    }),

    // ============================================
    // SECTION À PROPOS
    // ============================================
    defineField({
      name: 'aboutSection',
      title: 'Section "Qui suis-je"',
      type: 'object',
      group: 'about',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
          description: 'Ex: "Mon Parcours"',
        },
        {
          name: 'badgeEn',
          title: 'Badge (EN)',
          type: 'string',
        },
        {
          name: 'title',
          title: 'Titre',
          type: 'string',
          description: 'Ex: "Qui suis-je ?"',
        },
        {
          name: 'titleEn',
          title: 'Titre (EN)',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 4,
        },
        {
          name: 'descriptionEn',
          title: 'Description (EN)',
          type: 'text',
          rows: 4,
        },
        {
          name: 'ctaText',
          title: 'Texte du bouton',
          type: 'string',
        },
        {
          name: 'ctaTextEn',
          title: 'Texte du bouton (EN)',
          type: 'string',
        },
        {
          name: 'image',
          title: 'Photo',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texte alternatif',
            },
          ],
        },
      ],
    }),

    // ============================================
    // SECTION SERVICES
    // ============================================
    defineField({
      name: 'servicesSection',
      title: 'Section Services',
      description: 'Les 3 services proposés',
      type: 'object',
      group: 'services',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'subtitle',
          title: 'Sous-titre',
          type: 'string',
          description: 'Ex: "Mes Services"',
        },
        {
          name: 'subtitleEn',
          title: 'Sous-titre (EN)',
          type: 'string',
        },
        {
          name: 'title',
          title: 'Titre',
          type: 'string',
          description: 'Ex: "Des solutions adaptées à vos besoins"',
        },
        {
          name: 'titleEn',
          title: 'Titre (EN)',
          type: 'string',
        },
        {
          name: 'services',
          title: 'Services (3 services)',
          type: 'array',
          of: [serviceObject],
          validation: (Rule) => Rule.max(3).error('Maximum 3 services'),
        },
      ],
    }),

    // ============================================
    // SECTION CTA
    // ============================================
    defineField({
      name: 'ctaSection',
      title: 'Section CTA finale',
      description: 'Appel à l\'action en bas de page',
      type: 'object',
      group: 'cta',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: 'title',
          title: 'Titre',
          type: 'string',
        },
        {
          name: 'titleEn',
          title: 'Titre (EN)',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'descriptionEn',
          title: 'Description (EN)',
          type: 'text',
          rows: 3,
        },
        {
          name: 'primaryCTA',
          title: 'Bouton principal',
          type: 'object',
          fields: [
            { name: 'text', type: 'string', title: 'Texte' },
            { name: 'textEn', type: 'string', title: 'Texte (EN)' },
            { name: 'link', type: 'string', title: 'Lien' },
          ],
        },
        {
          name: 'secondaryCTA',
          title: 'Bouton secondaire',
          type: 'object',
          fields: [
            { name: 'text', type: 'string', title: 'Texte' },
            { name: 'textEn', type: 'string', title: 'Texte (EN)' },
            { name: 'link', type: 'string', title: 'Lien' },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contenu de la page d\'accueil',
        subtitle: 'Expertise • À Propos • Services • CTA',
      }
    },
  },
})
