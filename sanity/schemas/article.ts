import { defineType, defineField } from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Article',
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
      name: 'excerpt',
      title: 'Extrait',
      type: 'text',
      rows: 3,
      description: 'Court résumé pour les cartes et le SEO',
    }),
    defineField({
      name: 'excerptEn',
      title: 'Extrait (EN)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'content',
      title: 'Contenu',
      type: 'blockContent',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Image principale',
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
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Bien-être', value: 'wellness' },
          { title: 'Yoga', value: 'yoga' },
          { title: 'Coaching', value: 'coaching' },
          { title: 'Leadership', value: 'leadership' },
          { title: 'Développement personnel', value: 'personal-growth' },
        ],
      },
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'reference',
      to: [{ type: 'instructor' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
    }),
    defineField({
      name: 'readTime',
      title: 'Temps de lecture',
      type: 'number',
      description: 'En minutes',
    }),
    defineField({
      name: 'featured',
      title: 'Mis en avant',
      type: 'boolean',
      description: 'Afficher en premier sur la page blog',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 2 },
        { name: 'keywords', type: 'array', title: 'Keywords', of: [{ type: 'string' }] },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Date de publication',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage',
      date: 'publishedAt',
    },
    prepare({ title, author, media, date }) {
      return {
        title,
        subtitle: author ? `Par ${author}` : 'Sans auteur',
        media,
      }
    },
  },
})
