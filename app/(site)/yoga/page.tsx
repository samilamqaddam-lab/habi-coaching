import { Metadata } from 'next'
import ProgrammesContent from './ProgrammesContent'

export const metadata: Metadata = {
  title: 'Cours Yoga Casablanca | Hatha Yoga Traditionnel Maroc - Hajar Habi',
  description: 'Cours de Hatha Yoga Classique à Casablanca. Professeure certifiée Sadhguru Gurukulam (1750h). Upa Yoga, Surya Kriya, Angamardana, Yogasanas. Studio Shido Mind, Boulevard d\'Anfa.',
  keywords: [
    'yoga casablanca',
    'hatha yoga maroc',
    'cours yoga casablanca',
    'yoga traditionnel maroc',
    'professeur yoga casablanca',
    'isha yoga maroc',
    'sadhguru gurukulam',
    'upa yoga',
    'surya kriya',
    'angamardana',
    'yogasanas',
    'formation yoga maroc',
    'studio yoga casablanca',
    'yoga anfa',
  ],
  authors: [{ name: 'Hajar Habi' }],
  alternates: {
    canonical: 'https://transcendencework.com/yoga',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_MA',
    url: 'https://transcendencework.com/yoga',
    siteName: 'Transcendence Work',
    title: 'Programmes de Hatha Yoga Classique',
    description: 'Découvrez le Hatha Yoga Classique structuré par Sadhguru. Cours collectifs, programmes santé et bien-être.',
    images: [
      {
        url: '/images/sadhguru/sadhguru-portrait-2.jpg',
        width: 1200,
        height: 630,
        alt: 'Hatha Yoga Classique Casablanca - Sadhguru Gurukulam',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cours Yoga Casablanca | Hatha Yoga Traditionnel',
    description: 'Programmes de Hatha Yoga Classique à Casablanca. Certifiée Sadhguru Gurukulam.',
    images: ['/images/sadhguru/sadhguru-portrait-2.jpg'],
  },
}

export default function ProgrammesPage() {
  return <ProgrammesContent />
}
