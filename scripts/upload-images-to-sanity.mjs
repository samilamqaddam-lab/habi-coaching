/**
 * Image Upload Script: Local images → Sanity Media Library
 * Run with: SANITY_API_TOKEN=xxx node scripts/upload-images-to-sanity.mjs
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const client = createClient({
  projectId: 'czmpe9zr',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Image categories to upload
const imageCategories = [
  {
    folder: 'heroes',
    images: [
      { file: 'coaching-path-hero.jpg', alt: 'Tunnel de feuillage vers la lumière - Coaching' },
      { file: 'organisations-meeting-room-hero.jpg', alt: 'Salle de réunion moderne - Organisations' },
      { file: 'ressources-notebook-hero.jpg', alt: 'Carnet avec bougie - Ressources' },
      { file: 'contact-coffee-cups-hero.jpg', alt: 'Deux tasses de café - Contact' },
      { file: 'sadhguru-hero.jpg', alt: 'Moine en méditation - Yoga' },
    ],
  },
  {
    folder: 'programmes',
    images: [
      { file: 'atlas-mountains.jpg', alt: 'Montagnes de l\'Atlas - Retraite' },
      { file: 'leadership-workshop.jpg', alt: 'Atelier Leadership' },
      { file: 'balance-yoga.jpg', alt: 'Yoga équilibre' },
      { file: 'philosophy-training.jpg', alt: 'Formation philosophie' },
      { file: 'silence-retreat.jpg', alt: 'Retraite silence' },
    ],
  },
  {
    folder: 'Reel',
    images: [
      { file: 'hajar-professional.jpg', alt: 'Hajar Habi - Portrait professionnel' },
      { file: 'IMG_4078.jpeg', alt: 'Lieu de retraite' },
    ],
  },
  {
    folder: 'sadhguru',
    images: [
      { file: 'sadhguru-portrait-1.jpg', alt: 'Sadhguru en méditation' },
      { file: 'sadhguru-portrait-2.jpg', alt: 'Sadhguru portrait' },
    ],
  },
  {
    folder: 'certifications',
    images: [
      { file: 'isha-hatha-yoga-certified.png', alt: 'Certification Isha Hatha Yoga' },
    ],
  },
]

// Store uploaded image references
const uploadedImages = {}

async function uploadImage(folder, imageInfo) {
  const imagePath = path.join(__dirname, '..', 'public', 'images', folder, imageInfo.file)

  if (!fs.existsSync(imagePath)) {
    console.log(`   ⚠️  File not found: ${imagePath}`)
    return null
  }

  try {
    const imageBuffer = fs.readFileSync(imagePath)
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: imageInfo.file,
      contentType: imageInfo.file.endsWith('.png') ? 'image/png' : 'image/jpeg',
    })

    console.log(`   ✅ Uploaded: ${imageInfo.file} (${(asset.size / 1024).toFixed(1)} KB)`)

    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
      alt: imageInfo.alt,
    }
  } catch (error) {
    console.log(`   ❌ Error uploading ${imageInfo.file}: ${error.message}`)
    return null
  }
}

async function uploadAllImages() {
  console.log('🚀 Starting image upload to Sanity...\n')

  for (const category of imageCategories) {
    console.log(`📁 Uploading ${category.folder}/...`)
    uploadedImages[category.folder] = {}

    for (const image of category.images) {
      const result = await uploadImage(category.folder, image)
      if (result) {
        uploadedImages[category.folder][image.file] = result
      }
    }
    console.log('')
  }

  // Save references to a JSON file for later use
  const outputPath = path.join(__dirname, 'uploaded-images.json')
  fs.writeFileSync(outputPath, JSON.stringify(uploadedImages, null, 2))

  console.log('✨ Upload complete!')
  console.log(`📄 Image references saved to: ${outputPath}`)
  console.log('\nYou can now update your Sanity documents to use these images.')
}

uploadAllImages().catch(console.error)
