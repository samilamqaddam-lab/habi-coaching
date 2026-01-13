import { defineType, defineField } from 'sanity'

// Guide/E-book object
const guideObject = {
  type: 'object',
  name: 'guideItem',
  title: 'Guide/E-book',
  fields: [
    { name: 'title', type: 'string', title: 'Titre', validation: (Rule: any) => Rule.required() },
    { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
    { name: 'description', type: 'text', title: 'Description', rows: 3 },
    { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 3 },
    { name: 'pages', type: 'string', title: 'Nombre de pages (ex: 20 pages)' },
    { name: 'pagesEn', type: 'string', title: 'Nombre de pages (EN)' },
    {
      name: 'file',
      title: 'Fichier PDF',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    },
    {
      name: 'coverImage',
      title: 'Image de couverture',
      type: 'image',
      options: { hotspot: true },
    },
  ],
  preview: {
    select: {
      title: 'title',
      pages: 'pages',
      media: 'coverImage',
    },
    prepare({ title, pages, media }: { title?: string; pages?: string; media?: any }) {
      return {
        title: title || 'Guide sans titre',
        subtitle: pages || '',
        media,
      }
    },
  },
}

export const ressourcesPageContent = defineType({
  name: 'ressourcesPageContent',
  title: 'Contenu Page Ressources',
  type: 'document',
  groups: [
    { name: 'hero', title: '🎬 Hero' },
    { name: 'blog', title: '📝 Blog' },
    { name: 'guides', title: '📚 Guides' },
    { name: 'testimonials', title: '💬 Témoignages' },
    { name: 'newsletter', title: '📧 Newsletter' },
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
    // BLOG SECTION
    // ============================================
    defineField({
      name: 'blogSection',
      title: 'Section Blog',
      description: 'Les articles sont gérés via le type "Articles" dans Sanity',
      type: 'object',
      group: 'blog',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'subtitle', type: 'string', title: 'Sous-titre' },
        { name: 'subtitleEn', type: 'string', title: 'Sous-titre (EN)' },
        { name: 'title', type: 'string', title: 'Titre' },
        { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
        { name: 'description', type: 'text', title: 'Description', rows: 2 },
        { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 2 },
        { name: 'readArticleText', type: 'string', title: 'Texte "Lire l\'article"' },
        { name: 'readArticleTextEn', type: 'string', title: 'Texte "Lire l\'article" (EN)' },
        { name: 'viewAllText', type: 'string', title: 'Texte "Voir tous"' },
        { name: 'viewAllTextEn', type: 'string', title: 'Texte "Voir tous" (EN)' },
      ],
    }),

    // ============================================
    // GUIDES SECTION
    // ============================================
    defineField({
      name: 'guidesSection',
      title: 'Section Guides & E-books',
      type: 'object',
      group: 'guides',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'subtitle', type: 'string', title: 'Sous-titre' },
        { name: 'subtitleEn', type: 'string', title: 'Sous-titre (EN)' },
        { name: 'title', type: 'string', title: 'Titre' },
        { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
        { name: 'description', type: 'text', title: 'Description', rows: 2 },
        { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 2 },
        {
          name: 'guides',
          title: 'Guides',
          type: 'array',
          of: [guideObject],
        },
        { name: 'downloadButtonText', type: 'string', title: 'Texte bouton télécharger' },
        { name: 'downloadButtonTextEn', type: 'string', title: 'Texte bouton télécharger (EN)' },
      ],
    }),

    // ============================================
    // TESTIMONIALS SECTION
    // ============================================
    defineField({
      name: 'testimonialsSection',
      title: 'Section Témoignages',
      description: 'Les témoignages sont gérés via le type "Témoignages" dans Sanity',
      type: 'object',
      group: 'testimonials',
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
    // NEWSLETTER SECTION
    // ============================================
    defineField({
      name: 'newsletterSection',
      title: 'Section Newsletter',
      type: 'object',
      group: 'newsletter',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'title', type: 'string', title: 'Titre' },
        { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
        { name: 'description', type: 'text', title: 'Description', rows: 2 },
        { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 2 },
        { name: 'placeholder', type: 'string', title: 'Placeholder email' },
        { name: 'placeholderEn', type: 'string', title: 'Placeholder email (EN)' },
        { name: 'submitText', type: 'string', title: 'Texte bouton' },
        { name: 'submitTextEn', type: 'string', title: 'Texte bouton (EN)' },
        { name: 'disclaimer', type: 'string', title: 'Avertissement' },
        { name: 'disclaimerEn', type: 'string', title: 'Avertissement (EN)' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contenu de la page Ressources',
        subtitle: 'Hero - Blog - Guides - Témoignages - Newsletter',
      }
    },
  },
})
