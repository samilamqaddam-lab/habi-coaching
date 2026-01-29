import { Metadata } from 'next'
import { getFeaturedTestimonials, getHeroByPage } from '@/lib/sanity'
import HomeContent from './HomeContent'

export const metadata: Metadata = {
  title: 'Transcendence Work - Coach & Yoga Casablanca | Hajar Habi',
  description: 'Coach professionnel et professeure de Hatha Yoga à Casablanca. Certifiée Transformance Pro & Sadhguru Gurukulam. ≃20 ans expérience corporate. Accompagnement individuel et entreprises au Maroc.',
  keywords: [
    'coach casablanca',
    'coaching maroc',
    'yoga casablanca',
    'hatha yoga maroc',
    'coach professionnel casablanca',
    'développement personnel maroc',
    'conseil entreprise casablanca',
    'transformation organisationnelle',
    'hajar habi',
    'transcendence work',
  ],
  authors: [{ name: 'Hajar Habi' }],
  creator: 'Hajar Habi',
  publisher: 'Transcendence Work',
  alternates: {
    canonical: 'https://transcendencework.com',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_MA',
    url: 'https://transcendencework.com',
    siteName: 'Transcendence Work',
    title: 'Transcendence Work - Coaching Professionnel & Yoga Traditionnel',
    description: 'Hajar Habi - Experte en coaching professionnel et pratiques yogiques traditionnelles.',
    images: [
      {
        url: '/images/Reel/hajar-professional.jpg',
        width: 1200,
        height: 630,
        alt: 'Hajar Habi - Coach & Yoga Casablanca',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transcendence Work - Coach & Yoga Casablanca',
    description: 'Coaching professionnel et Hatha Yoga traditionnel à Casablanca, Maroc.',
    images: ['/images/Reel/hajar-professional.jpg'],
  },
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Home() {
  // Fetch data from Sanity
  const [testimonials, hero] = await Promise.all([
    getFeaturedTestimonials(),
    getHeroByPage('home'),
  ])

  return (
    <HomeContent
      testimonials={testimonials}
      hero={hero}
    />
  )
}
