import { defineType, defineField } from 'sanity'

// Benefit item for yoga classes
const benefitItemObject = {
  type: 'object',
  name: 'benefitItem',
  title: 'Bénéfice',
  fields: [
    { name: 'text', type: 'string', title: 'Texte', validation: (Rule: any) => Rule.required() },
    { name: 'textEn', type: 'string', title: 'Texte (EN)' },
  ],
  preview: {
    select: { title: 'text' },
    prepare({ title }: { title?: string }) {
      return { title: title || 'Bénéfice sans texte' }
    },
  },
}

// Yoga class object
const yogaClassObject = {
  type: 'object',
  name: 'yogaClass',
  title: 'Cours de Yoga',
  fields: [
    { name: 'title', type: 'string', title: 'Titre', validation: (Rule: any) => Rule.required() },
    { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
    { name: 'subtitle', type: 'string', title: 'Sous-titre' },
    { name: 'subtitleEn', type: 'string', title: 'Sous-titre (EN)' },
    { name: 'description', type: 'text', title: 'Description', rows: 4 },
    { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 4 },
    {
      name: 'benefits',
      title: 'Bénéfices',
      type: 'array',
      of: [benefitItemObject],
    },
    { name: 'schedule', type: 'string', title: 'Dates/Horaires' },
    { name: 'scheduleEn', type: 'string', title: 'Dates/Horaires (EN)' },
    { name: 'duration', type: 'string', title: 'Durée' },
    { name: 'durationEn', type: 'string', title: 'Durée (EN)' },
    { name: 'location', type: 'string', title: 'Lieu' },
    { name: 'locationEn', type: 'string', title: 'Lieu (EN)' },
    { name: 'attendance', type: 'string', title: 'Note de présence' },
    { name: 'attendanceEn', type: 'string', title: 'Note de présence (EN)' },
    { name: 'price', type: 'string', title: 'Prix' },
    { name: 'priceEn', type: 'string', title: 'Prix (EN)' },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Texte alternatif' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      price: 'price',
      media: 'image',
    },
    prepare({ title, price, media }: { title?: string; price?: string; media?: any }) {
      return {
        title: title || 'Cours sans titre',
        subtitle: price || '',
        media,
      }
    },
  },
}

// Hero paragraph object
const heroParagraphObject = {
  type: 'object',
  name: 'heroParagraph',
  title: 'Paragraphe Hero',
  fields: [
    { name: 'title', type: 'string', title: 'Titre', validation: (Rule: any) => Rule.required() },
    { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
    { name: 'text', type: 'text', title: 'Texte', rows: 3 },
    { name: 'textEn', type: 'text', title: 'Texte (EN)', rows: 3 },
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }: { title?: string }) {
      return { title: title || 'Paragraphe sans titre' }
    },
  },
}

// Hero CTA object
const heroCtaObject = {
  type: 'object',
  name: 'heroCta',
  title: 'Bouton Hero',
  fields: [
    { name: 'text', type: 'string', title: 'Texte', validation: (Rule: any) => Rule.required() },
    { name: 'textEn', type: 'string', title: 'Texte (EN)' },
    { name: 'subtitle', type: 'string', title: 'Sous-titre (optionnel)' },
    { name: 'subtitleEn', type: 'string', title: 'Sous-titre (EN)' },
    { name: 'link', type: 'string', title: 'Lien' },
  ],
  preview: {
    select: { title: 'text' },
    prepare({ title }: { title?: string }) {
      return { title: title || 'Bouton sans texte' }
    },
  },
}

// Lineage info card object
const lineageCardObject = {
  type: 'object',
  name: 'lineageCard',
  title: 'Carte Lignée',
  fields: [
    { name: 'title', type: 'string', title: 'Titre', validation: (Rule: any) => Rule.required() },
    { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
    { name: 'description', type: 'text', title: 'Description', rows: 3 },
    { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 3 },
    {
      name: 'icon',
      type: 'string',
      title: 'Icône',
      options: {
        list: [
          { title: 'Formation (livre)', value: 'training' },
          { title: 'Heures (horloge)', value: 'hours' },
          { title: 'Global (globe)', value: 'global' },
        ],
      },
    },
  ],
  preview: {
    select: { title: 'title', icon: 'icon' },
    prepare({ title, icon }: { title?: string; icon?: string }) {
      const iconEmoji = icon === 'training' ? '📚' : icon === 'hours' ? '⏰' : icon === 'global' ? '🌍' : '📋'
      return {
        title: title || 'Carte sans titre',
        media: () => iconEmoji,
      }
    },
  },
}

// Philosophy point object
const philosophyPointObject = {
  type: 'object',
  name: 'philosophyPoint',
  title: 'Point de Philosophie',
  fields: [
    { name: 'title', type: 'string', title: 'Titre', validation: (Rule: any) => Rule.required() },
    { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
    { name: 'description', type: 'text', title: 'Description', rows: 2 },
    { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 2 },
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }: { title?: string }) {
      return { title: title || 'Point sans titre' }
    },
  },
}

// Custom program feature object
const customFeatureObject = {
  type: 'object',
  name: 'customFeature',
  title: 'Fonctionnalité Programme Sur-mesure',
  fields: [
    { name: 'title', type: 'string', title: 'Titre', validation: (Rule: any) => Rule.required() },
    { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
    { name: 'description', type: 'string', title: 'Description' },
    { name: 'descriptionEn', type: 'string', title: 'Description (EN)' },
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }: { title?: string }) {
      return { title: title || 'Fonctionnalité sans titre' }
    },
  },
}

export const programmesPageContent = defineType({
  name: 'programmesPageContent',
  title: 'Contenu Page Programmes (Yoga)',
  type: 'document',
  groups: [
    { name: 'hero', title: '🎬 Hero' },
    { name: 'regularClasses', title: '🧘 Cours Collectifs' },
    { name: 'otherPrograms', title: '💚 Autres Programmes' },
    { name: 'lineage', title: '🙏 Lignée' },
    { name: 'philosophy', title: '💡 Philosophie' },
    { name: 'custom', title: '✨ Sur-mesure' },
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
        {
          name: 'paragraphs',
          title: 'Paragraphes (3)',
          type: 'array',
          of: [heroParagraphObject],
          validation: (Rule) => Rule.max(3).error('Maximum 3 paragraphes'),
        },
        {
          name: 'ctas',
          title: 'Boutons CTA (3)',
          type: 'array',
          of: [heroCtaObject],
          validation: (Rule) => Rule.max(3).error('Maximum 3 boutons'),
        },
      ],
    }),

    // ============================================
    // REGULAR CLASSES SECTION
    // ============================================
    defineField({
      name: 'regularClassesSection',
      title: 'Section Cours Collectifs',
      type: 'object',
      group: 'regularClasses',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'subtitle', type: 'string', title: 'Sous-titre' },
        { name: 'subtitleEn', type: 'string', title: 'Sous-titre (EN)' },
        { name: 'title', type: 'string', title: 'Titre' },
        { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
        { name: 'autonomyNote', type: 'text', title: 'Note sur l\'autonomie', rows: 3 },
        { name: 'autonomyNoteEn', type: 'text', title: 'Note sur l\'autonomie (EN)', rows: 3 },
        {
          name: 'classes',
          title: 'Cours de Yoga',
          type: 'array',
          of: [yogaClassObject],
        },
        // Trial class info
        {
          name: 'trialClass',
          title: 'Cours d\'essai',
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Titre' },
            { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
            { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 2 },
            { name: 'buttonText', type: 'string', title: 'Texte du bouton' },
            { name: 'buttonTextEn', type: 'string', title: 'Texte du bouton (EN)' },
          ],
        },
      ],
    }),

    // ============================================
    // OTHER PROGRAMS SECTION (Health & Wellbeing)
    // ============================================
    defineField({
      name: 'otherProgramsSection',
      title: 'Section Autres Programmes',
      type: 'object',
      group: 'otherPrograms',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'subtitle', type: 'string', title: 'Sous-titre' },
        { name: 'subtitleEn', type: 'string', title: 'Sous-titre (EN)' },
        { name: 'title', type: 'string', title: 'Titre' },
        { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
        { name: 'intro', type: 'text', title: 'Introduction', rows: 3 },
        { name: 'introEn', type: 'text', title: 'Introduction (EN)', rows: 3 },
        { name: 'disclaimer', type: 'text', title: 'Avertissement', rows: 2 },
        { name: 'disclaimerEn', type: 'text', title: 'Avertissement (EN)', rows: 2 },
        { name: 'medicalWarning', type: 'text', title: 'Avertissement médical', rows: 2 },
        { name: 'medicalWarningEn', type: 'text', title: 'Avertissement médical (EN)', rows: 2 },
        // Health programs details
        {
          name: 'healthProgram',
          title: 'Programme Yoga pour la Santé',
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Titre' },
            { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
            { name: 'intro', type: 'text', title: 'Introduction', rows: 3 },
            { name: 'introEn', type: 'text', title: 'Introduction (EN)', rows: 3 },
            { name: 'ctaButton', type: 'string', title: 'Bouton CTA' },
            { name: 'ctaButtonEn', type: 'string', title: 'Bouton CTA (EN)' },
            { name: 'ctaSubtext', type: 'string', title: 'Sous-texte CTA' },
            { name: 'ctaSubtextEn', type: 'string', title: 'Sous-texte CTA (EN)' },
            { name: 'disclaimer', type: 'text', title: 'Avertissement', rows: 2 },
            { name: 'disclaimerEn', type: 'text', title: 'Avertissement (EN)', rows: 2 },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            },
          ],
        },
        // Wellbeing programs details
        {
          name: 'wellbeingProgram',
          title: 'Programme Yoga pour le Bien-être',
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Titre' },
            { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
            { name: 'intro', type: 'text', title: 'Introduction', rows: 3 },
            { name: 'introEn', type: 'text', title: 'Introduction (EN)', rows: 3 },
            { name: 'note', type: 'text', title: 'Note', rows: 2 },
            { name: 'noteEn', type: 'text', title: 'Note (EN)', rows: 2 },
            { name: 'ctaButton', type: 'string', title: 'Bouton CTA' },
            { name: 'ctaButtonEn', type: 'string', title: 'Bouton CTA (EN)' },
            { name: 'ctaSubtext', type: 'string', title: 'Sous-texte CTA' },
            { name: 'ctaSubtextEn', type: 'string', title: 'Sous-texte CTA (EN)' },
            { name: 'durationNote', type: 'text', title: 'Note sur la durée', rows: 3 },
            { name: 'durationNoteEn', type: 'text', title: 'Note sur la durée (EN)', rows: 3 },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            },
          ],
        },
      ],
    }),

    // ============================================
    // LINEAGE SECTION
    // ============================================
    defineField({
      name: 'lineageSection',
      title: 'Section Lignée (Sadhguru)',
      type: 'object',
      group: 'lineage',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'subtitle', type: 'string', title: 'Sous-titre' },
        { name: 'subtitleEn', type: 'string', title: 'Sous-titre (EN)' },
        { name: 'title', type: 'string', title: 'Titre' },
        { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
        { name: 'intro', type: 'text', title: 'Introduction', rows: 3 },
        { name: 'introEn', type: 'text', title: 'Introduction (EN)', rows: 3 },
        // Sadhguru card
        {
          name: 'sadhguru',
          title: 'Carte Sadhguru',
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Titre' },
            { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
            { name: 'role', type: 'string', title: 'Rôle' },
            { name: 'roleEn', type: 'string', title: 'Rôle (EN)' },
            { name: 'description', type: 'text', title: 'Description', rows: 4 },
            { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 4 },
            { name: 'linkText', type: 'string', title: 'Texte du lien' },
            { name: 'linkTextEn', type: 'string', title: 'Texte du lien (EN)' },
            { name: 'linkUrl', type: 'url', title: 'URL du lien' },
          ],
        },
        // Info cards
        {
          name: 'cards',
          title: 'Cartes d\'information',
          type: 'array',
          of: [lineageCardObject],
          validation: (Rule) => Rule.max(3).error('Maximum 3 cartes'),
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
        { name: 'intro', type: 'text', title: 'Introduction', rows: 3 },
        { name: 'introEn', type: 'text', title: 'Introduction (EN)', rows: 3 },
        {
          name: 'points',
          title: 'Points de philosophie (4)',
          type: 'array',
          of: [philosophyPointObject],
          validation: (Rule) => Rule.max(4).error('Maximum 4 points'),
        },
      ],
    }),

    // ============================================
    // CUSTOM PROGRAMS SECTION
    // ============================================
    defineField({
      name: 'customSection',
      title: 'Section Programme Sur-mesure',
      type: 'object',
      group: 'custom',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'subtitle', type: 'string', title: 'Sous-titre' },
        { name: 'subtitleEn', type: 'string', title: 'Sous-titre (EN)' },
        { name: 'title', type: 'string', title: 'Titre' },
        { name: 'titleEn', type: 'string', title: 'Titre (EN)' },
        { name: 'description', type: 'text', title: 'Description', rows: 3 },
        { name: 'descriptionEn', type: 'text', title: 'Description (EN)', rows: 3 },
        {
          name: 'features',
          title: 'Fonctionnalités (3)',
          type: 'array',
          of: [customFeatureObject],
          validation: (Rule) => Rule.max(3).error('Maximum 3 fonctionnalités'),
        },
        { name: 'buttonText', type: 'string', title: 'Texte du bouton' },
        { name: 'buttonTextEn', type: 'string', title: 'Texte du bouton (EN)' },
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
        { name: 'primaryCtaText', type: 'string', title: 'Bouton primaire' },
        { name: 'primaryCtaTextEn', type: 'string', title: 'Bouton primaire (EN)' },
        { name: 'secondaryCtaText', type: 'string', title: 'Bouton secondaire' },
        { name: 'secondaryCtaTextEn', type: 'string', title: 'Bouton secondaire (EN)' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Contenu de la page Programmes (Yoga)',
        subtitle: 'Hero - Cours - Programmes - Lignée - Philosophie - CTA',
      }
    },
  },
})
