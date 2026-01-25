import { Metadata } from 'next'
import ExpertiseContent from './ExpertiseContent'

export const metadata: Metadata = {
  title: 'Expertise Hajar Habi - Parcours & Certifications | Casablanca',
  description: 'Parcours de Hajar Habi : Coach certifiée Transformance Pro (EMCC), professeure Hatha Yoga Sadhguru Gurukulam (1750h), ≃20 ans expérience corporate & conseil au Maroc.',
  keywords: [
    'hajar habi',
    'coach certifié maroc',
    'transformance pro',
    'sadhguru gurukulam',
    'expertise coach casablanca',
    'certification yoga maroc',
    'parcours professionnel',
  ],
  alternates: {
    canonical: 'https://transcendencework.com/expertise',
  },
  openGraph: {
    type: 'profile',
    locale: 'fr_MA',
    url: 'https://transcendencework.com/expertise',
    siteName: 'Transcendence Work',
    title: 'Expertise - Parcours & Certifications | Transcendence Work',
    description: 'Découvrez le parcours de Hajar Habi : Coach certifiée, professeure de Yoga, 20 ans d\'expérience corporate.',
    images: [
      {
        url: '/images/Reel/hajar-professional.jpg',
        width: 1200,
        height: 630,
        alt: 'Hajar Habi - Expertise',
      },
    ],
  },
}

export default function ExpertisePage() {
  return <ExpertiseContent />
}
