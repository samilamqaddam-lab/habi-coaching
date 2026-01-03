import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Nom du site',
      type: 'string',
      initialValue: 'Transcendence Work',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Description du site',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'siteDescriptionEn',
      title: 'Description du site (EN)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Réseaux sociaux',
      type: 'object',
      fields: [
        { name: 'instagram', type: 'url', title: 'Instagram' },
        { name: 'linkedin', type: 'url', title: 'LinkedIn' },
        { name: 'youtube', type: 'url', title: 'YouTube' },
        { name: 'facebook', type: 'url', title: 'Facebook' },
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Email de contact',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Téléphone',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'calcomUsername',
      title: 'Cal.com Username',
      type: 'string',
      description: 'Pour l\'intégration de réservation',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Paramètres du site',
      }
    },
  },
})
