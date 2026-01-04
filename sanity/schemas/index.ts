import { blockContent } from './blockContent'
import { instructor } from './instructor'
import { programme } from './programme'
import { testimonial } from './testimonial'
import { heroSection } from './heroSection'
import { article } from './article'
import { siteSettings } from './siteSettings'
import { homepageContent } from './homepageContent'

export const schemaTypes = [
  // Document types
  instructor,
  programme,
  testimonial,
  heroSection,
  article,
  siteSettings,
  homepageContent,

  // Object types
  blockContent,
]
