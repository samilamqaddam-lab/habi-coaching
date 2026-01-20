import { Metadata } from 'next'
import { getFeaturedTestimonials, getHomepageContent, getHeroByPage } from '@/lib/sanity'
import HomeContent from './HomeContent'

export const metadata: Metadata = {
  title: 'Transcendence Work - Coaching Professionnel & Yoga Traditionnel',
  description: 'Hajar Habi - Experte en coaching professionnel et pratiques yogiques traditionnelles. Transformation des organisations et accompagnement individuel.',
  openGraph: {
    title: 'Transcendence Work - Coaching Professionnel & Yoga Traditionnel',
    description: 'Hajar Habi - Experte en coaching professionnel et pratiques yogiques traditionnelles.',
    images: [
      {
        url: '/images/Reel/hajar-professional.jpg',
        width: 1200,
        height: 630,
        alt: 'Hajar Habi - Transcendence Work',
      },
    ],
  },
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Home() {
  // Fetch data from Sanity
  const [testimonials, homepageContent, hero] = await Promise.all([
    getFeaturedTestimonials(),
    getHomepageContent(),
    getHeroByPage('home'),
  ])

  return (
    <HomeContent
      testimonials={testimonials}
      homepageContent={homepageContent}
      hero={hero}
    />
  )
}
