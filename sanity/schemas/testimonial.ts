import { defineType, defineField } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Témoignage',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Citation',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quoteEn',
      title: 'Citation (EN)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'initial',
      title: 'Initiale',
      type: 'string',
      description: 'Première lettre du prénom pour l\'avatar',
      validation: (Rule) => Rule.max(2),
    }),
    defineField({
      name: 'role',
      title: 'Rôle / Titre',
      type: 'string',
      description: 'Ex: Directrice Marketing, Entrepreneur',
    }),
    defineField({
      name: 'roleEn',
      title: 'Rôle (EN)',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Photo (optionnel)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'serviceType',
      title: 'Type de service',
      type: 'string',
      options: {
        list: [
          { title: 'Coaching', value: 'coaching' },
          { title: 'Yoga', value: 'yoga' },
          { title: 'Retraite', value: 'retreat' },
          { title: 'Corporate', value: 'corporate' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Mis en avant',
      type: 'boolean',
      description: 'Afficher sur la page d\'accueil',
      initialValue: false,
    }),
    defineField({
      name: 'rating',
      title: 'Note',
      type: 'number',
      options: {
        list: [1, 2, 3, 4, 5],
      },
      initialValue: 5,
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Ordre manuel',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'quote',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle?.substring(0, 50) + '...',
        media,
      }
    },
  },
})
