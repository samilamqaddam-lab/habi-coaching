import { getFeaturedTestimonials } from '@/lib/sanity'
import HomeContent from './HomeContent'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Home() {
  // Fetch featured testimonials from Sanity
  const testimonials = await getFeaturedTestimonials()

  return <HomeContent testimonials={testimonials} />
}
