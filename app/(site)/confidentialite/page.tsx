import { Metadata } from 'next'
import ConfidentialiteContent from './ConfidentialiteContent'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité',
  description: 'Politique de confidentialité de Transcendence Work - Comment nous protégeons vos données personnelles conformément au RGPD.',
  openGraph: {
    title: 'Politique de Confidentialité | Transcendence Work',
    description: 'Découvrez comment Transcendence Work protège vos données personnelles conformément au RGPD.',
    images: [
      {
        url: '/images/Reel/hajar-professional.jpg',
        width: 1200,
        height: 630,
        alt: 'Transcendence Work - Politique de Confidentialité',
      },
    ],
  },
}

export default function ConfidentialitePage() {
  return <ConfidentialiteContent />
}
