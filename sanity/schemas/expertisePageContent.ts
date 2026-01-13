import { defineType, defineField } from 'sanity'

// Training item object for certifications
const trainingItemObject = {
  type: 'object',
  name: 'trainingItem',
  title: 'Élément de formation',
  fields: [
    { name: 'text', type: 'string', title: 'Texte', validation: (Rule: any) => Rule.required() },
    { name: 'textEn', type: 'string', title: 'Texte (EN)' },
  ],
  preview: {
    select: { title: 'text' },
    prepare({ title }: { title?: string }) {
      return { title: title || 'Élément sans texte' }
    },
  },
}

// Experience area object
const experienceAreaObject = {
  type: 'object',
  name: 'experienceArea',
  title: 'Domaine d\'expérience',
  fields: [
    { name: 'title', type: 'string', title: 'Titre', validation: (Rule: any) => Rule.required() },
    { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
    { name: 'description', type: 'text', title: 'Description', rows: 2 },
    { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 2 },
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }: { title?: string }) {
      return { title: title || 'Domaine sans titre' }
    },
  },
}

export const expertisePageContent = defineType({
  name: 'expertisePageContent',
  title: 'Contenu Page Expertise',
  type: 'document',
  groups: [
    { name: 'hero', title: '🎬 Hero' },
    { name: 'story', title: '📖 Mon Histoire' },
    { name: 'certifications', title: '🎓 Certifications' },
    { name: 'experience', title: '💼 Expérience' },
    { name: 'philosophy', title: '💡 Philosophie' },
    { name: 'cta', title: '📞 CTA' },
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
    // STORY SECTION
    // ============================================
    defineField({
      name: 'storySection',
      title: 'Section Mon Histoire',
      type: 'object',
      group: 'story',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'subtitle', type: 'string', title: 'Sous-titre' },
        { name: 'subtitleEn', type: 'string', title: 'Sous-titre (EN)' },
        { name: 'title', type: 'string', title: 'Titre' },
        { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
        { name: 'paragraph1', type: 'text', title: 'Paragraphe 1', rows: 2 },
        { name: 'paragraph1En', type: 'text', title: 'Paragraphe 1 (EN)', rows: 2 },
        { name: 'paragraph2', type: 'text', title: 'Paragraphe 2', rows: 4 },
        { name: 'paragraph2En', type: 'text', title: 'Paragraphe 2 (EN)', rows: 4 },
        { name: 'paragraph3', type: 'text', title: 'Paragraphe 3', rows: 5 },
        { name: 'paragraph3En', type: 'text', title: 'Paragraphe 3 (EN)', rows: 5 },
        { name: 'paragraph4', type: 'text', title: 'Paragraphe 4', rows: 5 },
        { name: 'paragraph4En', type: 'text', title: 'Paragraphe 4 (EN)', rows: 5 },
        { name: 'paragraph5', type: 'text', title: 'Paragraphe 5', rows: 4 },
        { name: 'paragraph5En', type: 'text', title: 'Paragraphe 5 (EN)', rows: 4 },
        { name: 'paragraph6', type: 'text', title: 'Paragraphe 6', rows: 6 },
        { name: 'paragraph6En', type: 'text', title: 'Paragraphe 6 (EN)', rows: 6 },
        {
          name: 'image',
          title: 'Photo',
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Texte alternatif' }],
        },
      ],
    }),

    // ============================================
    // CERTIFICATIONS SECTION
    // ============================================
    defineField({
      name: 'certificationsSection',
      title: 'Section Certifications',
      type: 'object',
      group: 'certifications',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'subtitle', type: 'string', title: 'Sous-titre' },
        { name: 'subtitleEn', type: 'string', title: 'Sous-titre (EN)' },
        { name: 'title', type: 'string', title: 'Titre' },
        { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
        // Coach & Team certification
        {
          name: 'coaching',
          title: 'Certification Coach & Team',
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Titre' },
            { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
            { name: 'subtitle', type: 'string', title: 'Sous-titre' },
            { name: 'subtitleEn', type: 'string', title: 'Sous-titre (EN)' },
            { name: 'trainingTitle', type: 'string', title: 'Titre Formation' },
            { name: 'trainingTitleEn', type: 'string', title: 'Titre Formation (EN)' },
            {
              name: 'trainingItems',
              title: 'Points de formation',
              type: 'array',
              of: [trainingItemObject],
            },
            { name: 'expertiseTitle', type: 'string', title: 'Titre Expertise' },
            { name: 'expertiseTitleEn', type: 'string', title: 'Titre Expertise (EN)' },
            {
              name: 'expertiseItems',
              title: 'Points d\'expertise',
              type: 'array',
              of: [trainingItemObject],
            },
          ],
        },
        // Yoga certification
        {
          name: 'yoga',
          title: 'Certification Yoga',
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Titre' },
            { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
            { name: 'subtitle', type: 'string', title: 'Sous-titre' },
            { name: 'subtitleEn', type: 'string', title: 'Sous-titre (EN)' },
            { name: 'trainingTitle', type: 'string', title: 'Titre Formation' },
            { name: 'trainingTitleEn', type: 'string', title: 'Titre Formation (EN)' },
            {
              name: 'trainingItems',
              title: 'Points de formation',
              type: 'array',
              of: [trainingItemObject],
            },
            { name: 'teachingsTitle', type: 'string', title: 'Titre Enseignements' },
            { name: 'teachingsTitleEn', type: 'string', title: 'Titre Enseignements (EN)' },
            {
              name: 'teachingsItems',
              title: 'Points d\'enseignement',
              type: 'array',
              of: [trainingItemObject],
            },
          ],
        },
      ],
    }),

    // ============================================
    // EXPERIENCE SECTION
    // ============================================
    defineField({
      name: 'experienceSection',
      title: 'Section Expérience',
      type: 'object',
      group: 'experience',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'subtitle', type: 'string', title: 'Sous-titre' },
        { name: 'subtitleEn', type: 'string', title: 'Sous-titre (EN)' },
        { name: 'title', type: 'string', title: 'Titre' },
        { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
        { name: 'description', type: 'text', title: 'Description', rows: 3 },
        { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 3 },
        {
          name: 'areas',
          title: 'Domaines (3 domaines)',
          type: 'array',
          of: [experienceAreaObject],
          validation: (Rule) => Rule.max(3).error('Maximum 3 domaines'),
        },
      ],
    }),

    // ============================================
    // PHILOSOPHY SECTION
    // ============================================
    defineField({
      name: 'philosophySection',
      title: 'Section Philosophie',
      type: 'object',
      group: 'philosophy',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'subtitle', type: 'string', title: 'Sous-titre' },
        { name: 'subtitleEn', type: 'string', title: 'Sous-titre (EN)' },
        { name: 'title', type: 'string', title: 'Titre' },
        { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
        { name: 'paragraph1', type: 'text', title: 'Paragraphe 1', rows: 3 },
        { name: 'paragraph1En', type: 'text', title: 'Paragraphe 1 (EN)', rows: 3 },
        { name: 'paragraph2', type: 'text', title: 'Paragraphe 2 (peut contenir HTML)', rows: 3 },
        { name: 'paragraph2En', type: 'text', title: 'Paragraphe 2 (EN)', rows: 3 },
        { name: 'paragraph3', type: 'text', title: 'Paragraphe 3', rows: 3 },
        { name: 'paragraph3En', type: 'text', title: 'Paragraphe 3 (EN)', rows: 3 },
        { name: 'paragraph4', type: 'text', title: 'Paragraphe 4', rows: 3 },
        { name: 'paragraph4En', type: 'text', title: 'Paragraphe 4 (EN)', rows: 3 },
      ],
    }),

    // ============================================
    // CTA SECTION
    // ============================================
    defineField({
      name: 'ctaSection',
      title: 'Section CTA',
      type: 'object',
      group: 'cta',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'title', type: 'string', title: 'Titre' },
        { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
        { name: 'description', type: 'text', title: 'Description', rows: 2 },
        { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 2 },
        { name: 'cta1Text', type: 'string', title: 'Bouton 1 (Organisations)' },
        { name: 'cta1TextEn', type: 'string', title: 'Bouton 1 (EN)' },
        { name: 'cta2Text', type: 'string', title: 'Bouton 2 (Coaching)' },
        { name: 'cta2TextEn', type: 'string', title: 'Bouton 2 (EN)' },
        { name: 'cta3Text', type: 'string', title: 'Bouton 3 (Yoga)' },
        { name: 'cta3TextEn', type: 'string', title: 'Bouton 3 (EN)' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contenu de la page Expertise',
        subtitle: 'Hero - Histoire - Certifications - Expérience - Philosophie - CTA',
      }
    },
  },
})
