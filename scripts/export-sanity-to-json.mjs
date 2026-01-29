#!/usr/bin/env node

/**
 * Script d'export du contenu Homepage depuis Sanity vers JSON
 * Usage: node scripts/export-sanity-to-json.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'czmpe9zr',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function exportHomepageContent() {
  try {
    console.log('🔍 Fetching homepage content from Sanity...\n')

    const content = await client.fetch(`*[_type == "homepageContent"][0]{
      expertiseSection {
        subtitle,
        subtitleEn,
        title,
        titleEn,
        description,
        descriptionEn,
        cards[] {
          title,
          titleEn,
          highlight,
          highlightEn,
          description,
          descriptionEn,
          icon,
          color
        }
      },
      servicesSection {
        subtitle,
        subtitleEn,
        title,
        titleEn,
        services[] {
          title,
          titleEn,
          description,
          descriptionEn,
          ctaText,
          ctaTextEn,
          link,
          icon,
          color,
          badge,
          badgeEn
        }
      },
      ctaSection {
        title,
        titleEn,
        description,
        descriptionEn,
        primaryCTA {
          text,
          textEn,
          link
        },
        secondaryCTA {
          text,
          textEn,
          link
        }
      }
    }`)

    if (!content) {
      console.log('⚠️  No homepage content found in Sanity')
      console.log('✅ Will use existing JSON translations as-is')
      return
    }

    console.log('✅ Found homepage content\n')

    // === FRENCH CONTENT ===
    const frContent = {
      expertise: {},
      services: {},
      cta: {}
    }

    // Expertise Section
    if (content.expertiseSection) {
      frContent.expertise = {
        subtitle: content.expertiseSection.subtitle,
        title: content.expertiseSection.title,
        description: content.expertiseSection.description,
        cards: content.expertiseSection.cards?.map(card => ({
          title: card.title,
          highlight: card.highlight,
          description: card.description,
          icon: card.icon,
          color: card.color
        })) || []
      }
    }

    // Services Section (FILTER OUT COACHING)
    if (content.servicesSection) {
      const servicesWithoutCoaching = content.servicesSection.services
        ?.filter(service => !service.link?.includes('/coaching')) || []

      frContent.services = {
        subtitle: content.servicesSection.subtitle,
        title: content.servicesSection.title,
        cards: servicesWithoutCoaching.map(service => ({
          badge: service.badge,
          title: service.title,
          description: service.description,
          ctaText: service.ctaText,
          link: service.link,
          icon: service.icon,
          color: service.color
        }))
      }
    }

    // CTA Section
    if (content.ctaSection) {
      frContent.cta = {
        title: content.ctaSection.title,
        description: content.ctaSection.description,
        primaryCTA: content.ctaSection.primaryCTA.text,
        secondaryCTA: content.ctaSection.secondaryCTA.text
      }
    }

    // === ENGLISH CONTENT ===
    const enContent = {
      expertise: {},
      services: {},
      cta: {}
    }

    // Expertise Section
    if (content.expertiseSection) {
      enContent.expertise = {
        subtitle: content.expertiseSection.subtitleEn || content.expertiseSection.subtitle,
        title: content.expertiseSection.titleEn || content.expertiseSection.title,
        description: content.expertiseSection.descriptionEn || content.expertiseSection.description,
        cards: content.expertiseSection.cards?.map(card => ({
          title: card.titleEn || card.title,
          highlight: card.highlightEn || card.highlight,
          description: card.descriptionEn || card.description,
          icon: card.icon,
          color: card.color
        })) || []
      }
    }

    // Services Section (FILTER OUT COACHING)
    if (content.servicesSection) {
      const servicesWithoutCoaching = content.servicesSection.services
        ?.filter(service => !service.link?.includes('/coaching')) || []

      enContent.services = {
        subtitle: content.servicesSection.subtitleEn || content.servicesSection.subtitle,
        title: content.servicesSection.titleEn || content.servicesSection.title,
        cards: servicesWithoutCoaching.map(service => ({
          badge: service.badgeEn || service.badge,
          title: service.titleEn || service.title,
          description: service.descriptionEn || service.description,
          ctaText: service.ctaTextEn || service.ctaText,
          link: service.link,
          icon: service.icon,
          color: service.color
        }))
      }
    }

    // CTA Section
    if (content.ctaSection) {
      enContent.cta = {
        title: content.ctaSection.titleEn || content.ctaSection.title,
        description: content.ctaSection.descriptionEn || content.ctaSection.description,
        primaryCTA: content.ctaSection.primaryCTA.textEn || content.ctaSection.primaryCTA.text,
        secondaryCTA: content.ctaSection.secondaryCTA.textEn || content.ctaSection.secondaryCTA.text
      }
    }

    // === DISPLAY RESULTS ===
    console.log('📋 FRENCH CONTENT (to add to locales/fr.json):')
    console.log('=' .repeat(60))
    console.log(JSON.stringify(frContent, null, 2))
    console.log('\n')

    console.log('📋 ENGLISH CONTENT (to add to locales/en.json):')
    console.log('='.repeat(60))
    console.log(JSON.stringify(enContent, null, 2))
    console.log('\n')

    console.log('✅ Export complete!')
    console.log('\n📝 Next steps:')
    console.log('1. Copy French content into locales/fr.json under "home" key')
    console.log('2. Copy English content into locales/en.json under "home" key')
    console.log('3. Verify JSON structure is valid')

  } catch (error) {
    console.error('❌ Error exporting content:', error)
    process.exit(1)
  }
}

exportHomepageContent()
