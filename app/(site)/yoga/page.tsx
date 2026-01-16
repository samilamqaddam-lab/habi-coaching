import { Metadata } from 'next'
import ProgrammesContent from './ProgrammesContent'

export const metadata: Metadata = {
  title: 'Programmes de Hatha Yoga Classique',
  description: 'Découvrez le Hatha Yoga Classique structuré par Sadhguru. Cours collectifs, programmes santé et bien-être avec Hajar Habi, certifiée Sadhguru Gurukulam.',
  openGraph: {
    title: 'Programmes de Hatha Yoga Classique',
    description: 'Découvrez le Hatha Yoga Classique structuré par Sadhguru. Cours collectifs, programmes santé et bien-être.',
    images: [
      {
        url: '/images/sadhguru/sadhguru-portrait-2.jpg',
        width: 1200,
        height: 630,
        alt: 'Sadhguru - Hatha Yoga Classique',
      },
    ],
  },
}

export default function ProgrammesPage() {
  return <ProgrammesContent />
}
