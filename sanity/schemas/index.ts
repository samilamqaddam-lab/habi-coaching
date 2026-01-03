import { blockContent } from './blockContent'
import { instructor } from './instructor'
import { programme } from './programme'
import { testimonial } from './testimonial'
import { heroSection } from './heroSection'
import { article } from './article'
import { siteSettings } from './siteSettings'

export const schemaTypes = [
  // Document types
  instructor,
  programme,
  testimonial,
  heroSection,
  article,
  siteSettings,

  // Object types
  blockContent,
]
