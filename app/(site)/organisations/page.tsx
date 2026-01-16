import { Metadata } from 'next'
import OrganisationsContent from './OrganisationsContent'

export const metadata: Metadata = {
  title: 'Organisations - Transformation & Leadership',
  description: 'Accompagnement des organisations dans leur transformation. Leadership, cohésion d\'équipe et retraites corporate avec Hajar Habi.',
  openGraph: {
    title: 'Organisations - Transformation & Leadership | Transcendence Work',
    description: 'Accompagnement des organisations dans leur transformation. Leadership, cohésion d\'équipe et retraites corporate.',
    images: [
      {
        url: '/images/heroes/organisations-meeting-room-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Organisations - Transcendence Work',
      },
    ],
  },
}

export default function OrganisationsPage() {
  return <OrganisationsContent />
}
