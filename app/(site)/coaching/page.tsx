import { Metadata } from 'next'
import CoachingContent from './CoachingContent'

export const metadata: Metadata = {
  title: 'Coaching - Accompagnement Personnel & Professionnel',
  description: 'Coaching individuel et professionnel avec Hajar Habi. Transformation personnelle, évolution de carrière et équilibre de vie.',
  openGraph: {
    title: 'Coaching - Accompagnement Personnel & Professionnel | Transcendence Work',
    description: 'Coaching individuel et professionnel avec Hajar Habi. Transformation personnelle, évolution de carrière et équilibre de vie.',
    images: [
      {
        url: '/images/heroes/coaching-path-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Coaching - Transcendence Work',
      },
    ],
  },
}

export default function CoachingPage() {
  return <CoachingContent />
}
