import { Metadata } from 'next'
import ContactContent from './ContactContent'

export const metadata: Metadata = {
  title: 'Contact Hajar Habi - Coach & Yoga Casablanca | Rendez-vous',
  description: 'Contactez Hajar Habi à Casablanca pour coaching, yoga ou conseil entreprise. +212 663 096 857 • hajar@transcendencework.com • Studio Shido Mind, Boulevard d\'Anfa. Réponse sous 48h.',
  keywords: [
    'contact coach casablanca',
    'rendez-vous yoga casablanca',
    'coach hajar habi',
    'studio shido mind',
    'coaching casablanca contact',
    'yoga casablanca contact',
  ],
  alternates: {
    canonical: 'https://transcendencework.com/contact',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_MA',
    url: 'https://transcendencework.com/contact',
    siteName: 'Transcendence Work',
    title: 'Contact - Prenons Rendez-vous | Transcendence Work',
    description: 'Contactez Hajar Habi pour vos besoins en coaching, yoga ou transformation organisationnelle.',
    images: [
      {
        url: '/images/heroes/contact-conversation-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Hajar Habi Casablanca',
      },
    ],
  },
}

export default function ContactPage() {
  return <ContactContent />
}
