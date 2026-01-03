import { defineType, defineField } from 'sanity'

export const instructor = defineType({
  name: 'instructor',
  title: 'Instructeur',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rôle',
      type: 'string',
      description: 'Ex: Coach Holistique & Enseignante de Yoga',
    }),
    defineField({
      name: 'bio',
      title: 'Biographie',
      type: 'blockContent',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'specialties',
      title: 'Spécialités',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Titre' },
            { name: 'organization', type: 'string', title: 'Organisation' },
            { name: 'year', type: 'number', title: 'Année' },
            { name: 'logo', type: 'image', title: 'Logo' },
          ],
        },
      ],
    }),
    defineField({
      name: 'experience',
      title: 'Années d\'expérience',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
})
