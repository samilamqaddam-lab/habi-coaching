/**
 * Create sample articles for the blog
 * Run with: SANITY_API_TOKEN=xxx node scripts/create-sample-articles.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'czmpe9zr',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Get instructor ID for author reference
async function getInstructorId() {
  const instructor = await client.fetch(`*[_type == "instructor"][0]._id`)
  return instructor
}

// Sample articles
const articles = [
  {
    title: 'Les bienfaits du Hatha Yoga classique',
    titleEn: 'The Benefits of Classical Hatha Yoga',
    slug: { _type: 'slug', current: 'bienfaits-hatha-yoga-classique' },
    excerpt: 'Découvrez comment le Hatha Yoga traditionnel peut transformer votre vie quotidienne, améliorer votre santé et développer votre conscience intérieure.',
    excerptEn: 'Discover how traditional Hatha Yoga can transform your daily life, improve your health, and develop your inner awareness.',
    category: 'yoga',
    publishedAt: '2025-01-02T10:00:00Z',
    readTime: 8,
    featured: true,
    content: [
      {
        _type: 'block',
        _key: 'intro1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'intro1span',
            text: 'Le Hatha Yoga, dans sa forme classique transmise par la lignée de Sadhguru, offre bien plus qu\'une simple pratique physique. C\'est un système complet de transformation qui touche tous les aspects de l\'être humain.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'h2_1',
        style: 'h2',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'h2_1span',
            text: 'Une pratique ancestrale pour le monde moderne',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'para1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'para1span',
            text: 'Dans notre société hyperconnectée, le Hatha Yoga classique offre un refuge précieux. Les pratiques comme Upa Yoga, Angamardana et Surya Kriya ont été conçues il y a des millénaires pour préparer le corps et l\'esprit à des états de conscience supérieurs.',
            marks: [],
          },
        ],
      },
    ],
  },
  {
    title: 'Comment le coaching transforme les leaders',
    titleEn: 'How Coaching Transforms Leaders',
    slug: { _type: 'slug', current: 'coaching-transformation-leaders' },
    excerpt: 'Le coaching professionnel est un puissant levier de développement pour les leaders. Découvrez les mécanismes de transformation et les résultats concrets.',
    excerptEn: 'Professional coaching is a powerful development lever for leaders. Discover the transformation mechanisms and concrete results.',
    category: 'coaching',
    publishedAt: '2024-12-28T10:00:00Z',
    readTime: 6,
    featured: true,
    content: [
      {
        _type: 'block',
        _key: 'intro2',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'intro2span',
            text: 'Le coaching professionnel n\'est pas une mode passagère, mais une approche éprouvée de développement des compétences et de transformation personnelle.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'h2_2',
        style: 'h2',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'h2_2span',
            text: 'Les piliers du coaching transformationnel',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'para2',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'para2span',
            text: 'Un accompagnement de qualité repose sur trois piliers fondamentaux : l\'écoute active, le questionnement puissant et la responsabilisation du coaché. Ces éléments créent un espace propice à la prise de conscience et au changement durable.',
            marks: [],
          },
        ],
      },
    ],
  },
  {
    title: 'Gérer le stress au travail avec le yoga',
    titleEn: 'Managing Work Stress with Yoga',
    slug: { _type: 'slug', current: 'gerer-stress-travail-yoga' },
    excerpt: 'Des techniques simples de yoga et de respiration pour retrouver calme et clarté mentale, même au bureau.',
    excerptEn: 'Simple yoga and breathing techniques to regain calm and mental clarity, even at the office.',
    category: 'wellness',
    publishedAt: '2024-12-20T10:00:00Z',
    readTime: 5,
    featured: true,
    content: [
      {
        _type: 'block',
        _key: 'intro3',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'intro3span',
            text: 'Le stress professionnel touche une majorité de travailleurs. Heureusement, quelques pratiques simples issues du yoga peuvent faire une différence significative.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'h2_3',
        style: 'h2',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'h2_3span',
            text: 'Techniques respiratoires pour le bureau',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'para3',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'para3span',
            text: 'La respiration consciente est l\'outil le plus accessible pour réguler le stress. Voici une technique simple que vous pouvez pratiquer à votre bureau : respirez profondément pendant 4 temps, retenez 4 temps, expirez 4 temps, puis maintenez vide 4 temps. Répétez 4 à 8 cycles.',
            marks: [],
          },
        ],
      },
    ],
  },
]

async function createArticles() {
  console.log('🚀 Creating sample articles in Sanity...\n')

  const instructorId = await getInstructorId()

  for (const article of articles) {
    try {
      // Check if article already exists
      const existing = await client.fetch(
        `*[_type == "article" && slug.current == $slug][0]`,
        { slug: article.slug.current }
      )

      if (existing) {
        console.log(`   ⏭️  Article "${article.title}" already exists, skipping`)
        continue
      }

      // Add author reference if instructor exists
      const articleData = {
        _type: 'article',
        ...article,
        ...(instructorId && { author: { _type: 'reference', _ref: instructorId } }),
      }

      await client.create(articleData)
      console.log(`   ✅ Created: ${article.title}`)
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`)
    }
  }

  console.log('\n✨ Articles creation complete!')
}

createArticles().catch(console.error)
