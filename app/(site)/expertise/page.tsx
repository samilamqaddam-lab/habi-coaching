import { Metadata } from 'next'
import ExpertiseContent from './ExpertiseContent'

export const metadata: Metadata = {
  title: 'Expertise - Parcours & Certifications',
  description: 'Découvrez le parcours de Hajar Habi : Coach certifiée Transformance Pro, professeure de Hatha Yoga certifiée Sadhguru Gurukulam, 20 ans d\'expérience corporate.',
  openGraph: {
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
