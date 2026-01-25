import { Metadata } from 'next'
import CoachingContent from './CoachingContent'

export const metadata: Metadata = {
  title: 'Coach Professionnel Casablanca | Coaching Individuel Maroc - Hajar Habi',
  description: 'Coach certifiée Transformance Pro (EMCC) à Casablanca. Coaching individuel, développement personnel et professionnel. ≃20 ans expérience corporate. Accompagnement transformation personnelle au Maroc.',
  keywords: [
    'coach casablanca',
    'coaching maroc',
    'coach professionnel casablanca',
    'coaching individuel maroc',
    'développement personnel casablanca',
    'coach certifié maroc',
    'transformance pro',
    'coaching holistique',
    'évolution carrière maroc',
    'transformation personnelle',
    'coach EMCC maroc',
    'accompagnement professionnel casablanca',
  ],
  authors: [{ name: 'Hajar Habi' }],
  alternates: {
    canonical: 'https://transcendencework.com/coaching',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_MA',
    url: 'https://transcendencework.com/coaching',
    siteName: 'Transcendence Work',
    title: 'Coaching professionnel - Individuel, collectif & Organisationnel | Transcendence Work',
    description: 'Coaching individuel et professionnel avec Hajar Habi. Transformation personnelle, évolution de carrière et équilibre de vie.',
    images: [
      {
        url: '/images/heroes/coaching-path-hero.jpg?v=2',
        width: 1200,
        height: 630,
        alt: 'Coach Professionnel Casablanca - Hajar Habi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coach Professionnel Casablanca | Hajar Habi',
    description: 'Coaching individuel et développement personnel. Certifiée Transformance Pro (EMCC).',
    images: ['/images/heroes/coaching-path-hero.jpg?v=2'],
  },
}

export default function CoachingPage() {
  return <CoachingContent />
}
