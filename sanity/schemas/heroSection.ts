import { defineType, defineField } from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Section Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      options: {
        list: [
          { title: 'Accueil', value: 'home' },
          { title: 'Coaching', value: 'coaching' },
          { title: 'Programmes (Yoga)', value: 'programmes' },
          { title: 'Organisations', value: 'organisations' },
          { title: 'Contact', value: 'contact' },
          { title: 'Ressources', value: 'ressources' },
          { title: 'Expertise', value: 'expertise' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Titre (EN)',
      type: 'string',
    }),
    defineField({
      name: 'titleLine2',
      title: 'Titre ligne 2',
      type: 'string',
      description: 'Deuxième ligne du titre (optionnel)',
    }),
    defineField({
      name: 'titleLine2En',
      title: 'Titre ligne 2 (EN)',
      type: 'string',
    }),
    defineField({
      name: 'titleSuffix',
      title: 'Suffixe titre',
      type: 'string',
      description: 'Ex: "— Individus & Organisations"',
    }),
    defineField({
      name: 'titleSuffixEn',
      title: 'Suffixe titre (EN)',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'string',
    }),
    defineField({
      name: 'subtitleEn',
      title: 'Sous-titre (EN)',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (EN)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'primaryCTA',
      title: 'CTA Principal',
      type: 'object',
      fields: [
        { name: 'text', type: 'string', title: 'Texte' },
        { name: 'textEn', type: 'string', title: 'Texte (EN)' },
        { name: 'href', type: 'string', title: 'Lien' },
      ],
    }),
    defineField({
      name: 'secondaryCTA',
      title: 'CTA Secondaire',
      type: 'object',
      fields: [
        { name: 'text', type: 'string', title: 'Texte' },
        { name: 'textEn', type: 'string', title: 'Texte (EN)' },
        { name: 'href', type: 'string', title: 'Lien' },
      ],
    }),
    defineField({
      name: 'theme',
      title: 'Thème couleur',
      type: 'string',
      options: {
        list: [
          { title: 'Yoga (golden-orange)', value: 'yoga' },
          { title: 'Coaching (mystic-mauve)', value: 'coaching' },
          { title: 'Corporate (morocco-blue)', value: 'corporate' },
          { title: 'Default (dune-beige)', value: 'default' },
        ],
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Centré', value: 'centered' },
          { title: 'Split (texte gauche, image droite)', value: 'split' },
        ],
      },
      initialValue: 'centered',
    }),
    defineField({
      name: 'displayMode',
      title: 'Mode d\'affichage',
      type: 'string',
      options: {
        list: [
          { title: 'Minimal (homepage)', value: 'minimal' },
          { title: 'Compact (pages internes)', value: 'compact' },
          { title: 'Default (grand)', value: 'default' },
        ],
      },
      initialValue: 'compact',
    }),
    defineField({
      name: 'splitImage',
      title: 'Image split layout',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ document }) => document?.layout !== 'split',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Image de fond',
      type: 'image',
      description: 'Optionnel - généralement pas utilisé',
    }),
  ],
  preview: {
    select: {
      title: 'page',
      subtitle: 'title',
      media: 'splitImage',
    },
    prepare({ title, subtitle, media }) {
      const pageLabels: Record<string, string> = {
        home: 'Accueil',
        coaching: 'Coaching',
        programmes: 'Programmes',
        organisations: 'Organisations',
        contact: 'Contact',
        ressources: 'Ressources',
        expertise: 'Expertise',
      }
      return {
        title: `Hero - ${pageLabels[title] || title}`,
        subtitle,
        media,
      }
    },
  },
})
