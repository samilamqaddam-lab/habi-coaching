import { getArticles } from '@/lib/sanity'
import RessourcesContent from './RessourcesContent'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function RessourcesPage() {
  // Fetch articles from Sanity
  const articles = await getArticles()

  return <RessourcesContent articles={articles} />
}
