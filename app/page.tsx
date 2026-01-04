import { getFeaturedTestimonials, getHomepageContent, getHeroByPage } from '@/lib/sanity'
import HomeContent from './HomeContent'

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
