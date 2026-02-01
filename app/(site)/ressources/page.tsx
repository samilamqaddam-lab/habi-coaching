import { Metadata } from 'next'
import RessourcesContent from './RessourcesContent'

export const metadata: Metadata = {
  title: 'Ressources - Hub de Contenu | Transcendence Work',
  description: 'Actualités, événements passés, vidéos éducatives et ressources pour votre développement personnel et professionnel. Yoga, coaching, QVT.',
  openGraph: {
    title: 'Ressources - Hub de Contenu | Transcendence Work',
    description: 'Actualités, événements passés, vidéos éducatives et ressources pour votre développement.',
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

export default function RessourcesPage() {
  return <RessourcesContent />
}
