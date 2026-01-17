import { Metadata } from 'next'
import ConfidentialiteContent from './ConfidentialiteContent'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité',
  description: 'Politique de confidentialité de Transcendence Work - Comment nous protégeons vos données personnelles conformément au RGPD.',
}

export default function ConfidentialitePage() {
  return <ConfidentialiteContent />
}
