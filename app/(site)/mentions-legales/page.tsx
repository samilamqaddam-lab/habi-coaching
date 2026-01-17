import { Metadata } from 'next'
import MentionsLegalesContent from './MentionsLegalesContent'

export const metadata: Metadata = {
  title: 'Mentions Légales',
  description: 'Mentions légales du site Transcendence Work - Informations sur l\'éditeur, l\'hébergement et la propriété intellectuelle.',
  openGraph: {
    title: 'Mentions Légales | Transcendence Work',
    description: 'Informations légales concernant le site Transcendence Work - Hajar Habi, Coaching & Yoga.',
    images: [
      {
        url: '/images/Reel/hajar-professional.jpg',
        width: 1200,
        height: 630,
        alt: 'Transcendence Work - Mentions Légales',
      },
    ],
  },
}

export default function MentionsLegalesPage() {
  return <MentionsLegalesContent />
}
