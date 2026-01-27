import { Metadata } from 'next'
import OrganisationsContent from './OrganisationsContent'

export const metadata: Metadata = {
  title: 'Conseil Entreprise Casablanca | Coaching Équipe Maroc - Hajar Habi',
  description: '≃20 ans expérience corporate & conseil. Formation équipe, coaching dirigeants, transformation organisationnelle au Maroc. Team building et retraites corporate à Casablanca.',
  keywords: [
    'conseil entreprise casablanca',
    'consultant organisation maroc',
    'formation entreprise casablanca',
    'team building maroc',
    'accompagnement dirigeants',
    'coaching équipe casablanca',
    'transformation organisationnelle',
    'leadership maroc',
    'cohésion équipe casablanca',
    'retraite corporate maroc',
    'consultant corporate casablanca',
    'formation management maroc',
  ],
  authors: [{ name: 'Hajar Habi' }],
  alternates: {
    canonical: 'https://transcendencework.com/organisations',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_MA',
    url: 'https://transcendencework.com/organisations',
    siteName: 'Transcendence Work',
    title: 'Organisations - Transformation & Leadership | Transcendence Work',
    description: 'Accompagnement des organisations dans leur transformation. Leadership, cohésion d\'équipe et retraites corporate.',
    images: [
      {
        url: '/images/heroes/organisations-coaching-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Conseil Entreprise Casablanca - Hajar Habi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conseil Entreprise Casablanca | Team Building Maroc',
    description: 'Transformation organisationnelle et coaching équipe. ≃20 ans expérience corporate.',
    images: ['/images/heroes/organisations-coaching-hero.jpg'],
  },
}

export default function OrganisationsPage() {
  return <OrganisationsContent />
}
