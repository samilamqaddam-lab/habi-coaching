import { Metadata } from 'next'
import MentionsLegalesContent from './MentionsLegalesContent'

export const metadata: Metadata = {
  title: 'Mentions Légales',
  description: 'Mentions légales du site Transcendence Work - Informations sur l\'éditeur, l\'hébergement et la propriété intellectuelle.',
}

export default function MentionsLegalesPage() {
  return <MentionsLegalesContent />
}
