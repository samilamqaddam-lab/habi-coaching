#!/usr/bin/env node

/**
 * Script to update Homepage CTA section in Sanity CMS
 * Updates the description to reflect B2B coaching model
 */

import { createClient } from '@sanity/client'

// Use environment variables directly (set via command line or .env.local)
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'czmpe9zr',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function updateCTA() {
  try {
    console.log('🔍 Fetching homepage content...')

    // Fetch the homepage content document
    const homepage = await client.fetch(
      `*[_type == "homepageContent"][0]`
    )

    if (!homepage) {
      console.error('❌ No homepage content found in Sanity')
      return
    }

    console.log('✅ Found homepage content:', homepage._id)
    console.log('📝 Current CTA description (FR):', homepage.ctaSection?.description)

    // Update the CTA section description
    const result = await client
      .patch(homepage._id)
      .set({
        'ctaSection.description':
          'Que ce soit pour accompagner votre organisation (coaching, transformation, qualité de vie au travail) ou pour vos cours de yoga individuels, réservons un moment d\'échange pour explorer comment nous pouvons travailler ensemble.',
        'ctaSection.descriptionEn':
          'Whether to support your organization (coaching, transformation, quality of work life) or for your individual yoga classes, let\'s schedule a conversation to explore how we can work together.',
      })
      .commit()

    console.log('✅ CTA section updated successfully!')
    console.log('📝 New description (FR):', result.ctaSection.description)
    console.log('📝 New description (EN):', result.ctaSection.descriptionEn)

  } catch (error) {
    console.error('❌ Error updating CTA:', error)
    process.exit(1)
  }
}

updateCTA()
