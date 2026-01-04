import { defineType, defineField } from 'sanity'

export const homepageContent = defineType({
  name: 'homepageContent',
  title: 'Contenu Accueil',
  type: 'document',
  fields: [
    // Expertise Section
    defineField({
      name: 'expertiseSection',
      title: 'Section Expertise',
      type: 'object',
      fields: [
        {
          name: 'subtitle',
          title: 'Sous-titre',
          type: 'string',
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
          title: 'Cartes d\'expertise',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', type: 'string', title: 'Titre' },
                { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
                { name: 'highlight', type: 'string', title: 'Texte en surbrillance' },
                { name: 'highlightEn', type: 'string', title: 'Texte en surbrillance (EN)' },
                { name: 'description', type: 'text', title: 'Description', rows: 3 },
                { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 3 },
                {
                  name: 'icon',
                  type: 'string',
                  title: 'Icône',
                  options: {
                    list: [
                      { title: 'Corporate', value: 'corporate' },
                      { title: 'Coaching', value: 'coaching' },
                      { title: 'Yoga', value: 'yoga' },
                    ],
                  },
                },
                {
                  name: 'color',
                  type: 'string',
                  title: 'Couleur',
                  options: {
                    list: [
                      { title: 'Morocco Blue', value: 'morocco-blue' },
                      { title: 'Mystic Mauve', value: 'mystic-mauve' },
                      { title: 'Golden Orange', value: 'golden-orange' },
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    }),

    // About Section (Qui suis-je)
    defineField({
      name: 'aboutSection',
      title: 'Section "Qui suis-je"',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge',
          type: 'string',
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

    // Services Section
    defineField({
      name: 'servicesSection',
      title: 'Section Services',
      type: 'object',
      fields: [
        {
          name: 'subtitle',
          title: 'Sous-titre',
          type: 'string',
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
        },
        {
          name: 'titleEn',
          title: 'Titre (EN)',
          type: 'string',
        },
        {
          name: 'services',
          title: 'Services',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', type: 'string', title: 'Titre' },
                { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
                { name: 'description', type: 'text', title: 'Description', rows: 3 },
                { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 3 },
                { name: 'ctaText', type: 'string', title: 'Texte du bouton' },
                { name: 'ctaTextEn', type: 'string', title: 'Texte du bouton (EN)' },
                { name: 'link', type: 'string', title: 'Lien' },
                {
                  name: 'icon',
                  type: 'string',
                  title: 'Icône',
                  options: {
                    list: [
                      { title: 'Organisations', value: 'organisations' },
                      { title: 'Coaching', value: 'coaching' },
                      { title: 'Yoga', value: 'yoga' },
                    ],
                  },
                },
                {
                  name: 'color',
                  type: 'string',
                  title: 'Couleur',
                  options: {
                    list: [
                      { title: 'Morocco Blue', value: 'morocco-blue' },
                      { title: 'Mystic Mauve', value: 'mystic-mauve' },
                      { title: 'Golden Orange', value: 'golden-orange' },
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    }),

    // CTA Section
    defineField({
      name: 'ctaSection',
      title: 'Section CTA finale',
      type: 'object',
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
      }
    },
  },
})
