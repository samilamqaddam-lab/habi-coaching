import { Metadata } from 'next'
import CoachingContent from './CoachingContent'

export const metadata: Metadata = {
  title: 'Coaching professionnel - Individuel, collectif & Organisationnel',
  description: 'Coaching individuel et professionnel avec Hajar Habi. Transformation personnelle, évolution de carrière et équilibre de vie.',
  openGraph: {
    title: 'Coaching professionnel - Individuel, collectif & Organisationnel | Transcendence Work',
    description: 'Coaching individuel et professionnel avec Hajar Habi. Transformation personnelle, évolution de carrière et équilibre de vie.',
    images: [
      {
        url: '/images/heroes/coaching-path-hero.jpg?v=2',
        width: 1200,
        height: 630,
        alt: 'Coaching professionnel - Transcendence Work',
      },
    ],
  },
}

export default function CoachingPage() {
  return <CoachingContent />
}
