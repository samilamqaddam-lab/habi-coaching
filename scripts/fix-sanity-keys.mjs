/**
 * Script de réparation des clés manquantes dans les données Sanity
 *
 * Problème: Le script de migration initial a créé des items d'array sans `_key`,
 * ce qui cause l'erreur "Missing keys: some items in the list are missing their keys"
 *
 * Solution: Ce script ajoute des `_key` uniques à tous les items d'array
 */

import { createClient } from '@sanity/client'
import { v4 as uuidv4 } from 'uuid'

const client = createClient({
  projectId: 'czmpe9zr',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Génère une clé unique pour Sanity
function generateKey() {
  return uuidv4().slice(0, 8)
}

// Ajoute _key à tous les items d'un array s'ils n'en ont pas
function addKeysToArray(arr) {
  if (!Array.isArray(arr)) return arr
  return arr.map(item => {
    if (typeof item === 'object' && item !== null && !item._key) {
      return { ...item, _key: generateKey() }
    }
    return item
  })
}

async function fixHomepageContent() {
  console.log('🔧 Réparation du contenu homepage...\n')

  const content = await client.fetch('*[_id == "homepageContent"][0]')

  if (!content) {
    console.log('❌ Contenu homepage non trouvé')
    return
  }

  console.log('📊 Données actuelles:')
  console.log(`  - expertiseSection.cards: ${content.expertiseSection?.cards?.length || 0} items`)
  console.log(`  - servicesSection.services: ${content.servicesSection?.services?.length || 0} items`)

  // Vérifier si réparation nécessaire
  const cardsNeedFix = content.expertiseSection?.cards?.some(c => !c._key)
  const servicesNeedFix = content.servicesSection?.services?.some(s => !s._key)

  if (!cardsNeedFix && !servicesNeedFix) {
    console.log('\n✅ Toutes les clés sont déjà présentes, aucune réparation nécessaire')
    return
  }

  console.log('\n🔄 Réparation en cours...')

  // Préparer les données corrigées
  const updates = {}

  if (cardsNeedFix && content.expertiseSection?.cards) {
    updates['expertiseSection.cards'] = addKeysToArray(content.expertiseSection.cards)
    console.log('  ✓ Clés ajoutées aux cartes d\'expertise')
  }

  if (servicesNeedFix && content.servicesSection?.services) {
    updates['servicesSection.services'] = addKeysToArray(content.servicesSection.services)
    console.log('  ✓ Clés ajoutées aux services')
  }

  // Appliquer les mises à jour avec patch
  if (Object.keys(updates).length > 0) {
    await client
      .patch('homepageContent')
      .set(updates)
      .commit()

    console.log('\n✅ Réparation terminée avec succès!')
  }
}

async function fixTestimonials() {
  console.log('\n🔧 Vérification des témoignages...\n')

  const testimonials = await client.fetch('*[_type == "testimonial"]')
  console.log(`  - ${testimonials.length} témoignages trouvés`)

  // Les témoignages sont des documents, pas des arrays, donc pas de _key nécessaire
  console.log('  ✅ Les témoignages sont des documents indépendants, pas besoin de _key')
}

async function verifyFix() {
  console.log('\n📋 Vérification finale...\n')

  const content = await client.fetch('*[_id == "homepageContent"][0]')

  if (!content) {
    console.log('❌ Contenu non trouvé')
    return
  }

  // Vérifier expertiseSection.cards
  if (content.expertiseSection?.cards) {
    const cardsOk = content.expertiseSection.cards.every(c => c._key)
    console.log(`  expertiseSection.cards: ${cardsOk ? '✅ OK' : '❌ Clés manquantes'}`)
    if (cardsOk) {
      content.expertiseSection.cards.forEach((c, i) => {
        console.log(`    ${i + 1}. ${c.title} [_key: ${c._key}]`)
      })
    }
  }

  // Vérifier servicesSection.services
  if (content.servicesSection?.services) {
    const servicesOk = content.servicesSection.services.every(s => s._key)
    console.log(`  servicesSection.services: ${servicesOk ? '✅ OK' : '❌ Clés manquantes'}`)
    if (servicesOk) {
      content.servicesSection.services.forEach((s, i) => {
        console.log(`    ${i + 1}. ${s.title} [_key: ${s._key}]`)
      })
    }
  }
}

async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗')
  console.log('║     RÉPARATION DES CLÉS MANQUANTES DANS SANITY            ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  try {
    await fixHomepageContent()
    await fixTestimonials()
    await verifyFix()

    console.log('\n╔════════════════════════════════════════════════════════════╗')
    console.log('║                    TERMINÉ AVEC SUCCÈS                     ║')
    console.log('╚════════════════════════════════════════════════════════════╝')
    console.log('\n💡 Rechargez Sanity Studio pour voir les changements.')
  } catch (error) {
    console.error('\n❌ Erreur:', error.message)
    process.exit(1)
  }
}

main()
