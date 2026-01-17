import { Metadata } from 'next'
import CgvContent from './CgvContent'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente',
  description: 'Conditions générales de vente des services de coaching et yoga proposés par Transcendence Work.',
}

export default function CgvPage() {
  return <CgvContent />
}
