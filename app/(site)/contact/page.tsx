import { Metadata } from 'next'
import ContactContent from './ContactContent'

export const metadata: Metadata = {
  title: 'Contact - Prenons Rendez-vous',
  description: 'Contactez Hajar Habi pour vos besoins en coaching, yoga ou transformation organisationnelle. Réponse sous 48h.',
  openGraph: {
    title: 'Contact - Prenons Rendez-vous | Transcendence Work',
    description: 'Contactez Hajar Habi pour vos besoins en coaching, yoga ou transformation organisationnelle.',
    images: [
      {
        url: '/images/heroes/contact-coffee-cups-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact - Transcendence Work',
      },
    ],
  },
}

export default function ContactPage() {
  return <ContactContent />
}
