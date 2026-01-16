import { Metadata } from 'next'
import { getArticles } from '@/lib/sanity'
import RessourcesContent from './RessourcesContent'

export const metadata: Metadata = {
  title: 'Ressources - Articles & Inspirations',
  description: 'Explorez nos articles sur le yoga, le coaching, le leadership et le bien-être. Ressources pour votre développement personnel et professionnel.',
  openGraph: {
    title: 'Ressources - Articles & Inspirations | Transcendence Work',
    description: 'Explorez nos articles sur le yoga, le coaching, le leadership et le bien-être.',
    images: [
      {
        url: '/images/heroes/ressources-notebook-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Ressources - Transcendence Work',
      },
    ],
  },
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function RessourcesPage() {
  // Fetch articles from Sanity
  const articles = await getArticles()

  return <RessourcesContent articles={articles} />
}
