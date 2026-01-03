import { defineType, defineField } from 'sanity'

export const programme = defineType({
  name: 'programme',
  title: 'Programme',
  type: 'document',
  fields: [
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
      description: 'Traduction anglaise du titre',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type de programme',
      type: 'string',
      options: {
        list: [
          { title: 'Cours régulier', value: 'class' },
          { title: 'Retraite', value: 'retreat' },
          { title: 'Atelier', value: 'workshop' },
          { title: 'Formation', value: 'training' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Yoga', value: 'yoga' },
          { title: 'Coaching', value: 'coaching' },
          { title: 'Organisations', value: 'corporate' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (EN)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'fullDescription',
      title: 'Description complète',
      type: 'blockContent',
    }),
    defineField({
      name: 'image',
      title: 'Image',
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
    }),
    defineField({
      name: 'location',
      title: 'Lieu',
      type: 'string',
    }),
    defineField({
      name: 'duration',
      title: 'Durée',
      type: 'string',
      description: 'Ex: 1h30, 3 jours, 1 semaine',
    }),
    defineField({
      name: 'schedule',
      title: 'Horaires',
      type: 'string',
      description: 'Ex: Lundi 18h-19h30',
    }),
    defineField({
      name: 'dates',
      title: 'Dates',
      type: 'object',
      fields: [
        { name: 'start', type: 'date', title: 'Date de début' },
        { name: 'end', type: 'date', title: 'Date de fin' },
      ],
    }),
    defineField({
      name: 'price',
      title: 'Prix',
      type: 'object',
      fields: [
        { name: 'amount', type: 'number', title: 'Montant' },
        {
          name: 'currency',
          type: 'string',
          title: 'Devise',
          options: {
            list: ['EUR', 'MAD', 'USD'],
          },
          initialValue: 'EUR',
        },
        {
          name: 'unit',
          type: 'string',
          title: 'Unité',
          options: {
            list: [
              { title: 'Par séance', value: 'session' },
              { title: 'Par mois', value: 'month' },
              { title: 'Total', value: 'total' },
              { title: 'Par personne', value: 'person' },
            ],
          },
        },
        { name: 'note', type: 'string', title: 'Note prix' },
      ],
    }),
    defineField({
      name: 'highlights',
      title: 'Points forts',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'highlightsEn',
      title: 'Points forts (EN)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'spotsAvailable',
      title: 'Places disponibles',
      type: 'number',
    }),
    defineField({
      name: 'maxParticipants',
      title: 'Nombre max de participants',
      type: 'number',
    }),
    defineField({
      name: 'instructor',
      title: 'Instructeur',
      type: 'reference',
      to: [{ type: 'instructor' }],
    }),
    defineField({
      name: 'bySadhguru',
      title: 'Programme Sadhguru',
      type: 'boolean',
      description: 'Afficher le badge "By Sadhguru"',
      initialValue: false,
    }),
    defineField({
      name: 'isPublished',
      title: 'Publié',
      type: 'boolean',
      initialValue: false,
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
      title: 'title',
      type: 'type',
      media: 'image',
    },
    prepare({ title, type, media }) {
      const typeLabels: Record<string, string> = {
        class: 'Cours',
        retreat: 'Retraite',
        workshop: 'Atelier',
        training: 'Formation',
      }
      return {
        title,
        subtitle: typeLabels[type] || type,
        media,
      }
    },
  },
})
