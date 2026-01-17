import { Metadata } from 'next'
import CgvContent from './CgvContent'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente',
  description: 'Conditions générales de vente des services de coaching et yoga proposés par Transcendence Work - Hajar Habi.',
  openGraph: {
    title: 'Conditions Générales de Vente | Transcendence Work',
    description: 'Conditions applicables aux services de coaching et programmes de yoga proposés par Transcendence Work.',
    images: [
      {
        url: '/images/Reel/hajar-professional.jpg',
        width: 1200,
        height: 630,
        alt: 'Transcendence Work - Conditions Générales de Vente',
      },
    ],
  },
}

export default function CgvPage() {
  return <CgvContent />
}
