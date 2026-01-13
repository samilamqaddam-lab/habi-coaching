import { blockContent } from './blockContent'
import { instructor } from './instructor'
import { programme } from './programme'
import { testimonial } from './testimonial'
import { heroSection } from './heroSection'
import { article } from './article'
import { siteSettings } from './siteSettings'
import { homepageContent } from './homepageContent'
import { coachingPageContent } from './coachingPageContent'
import { expertisePageContent } from './expertisePageContent'
import { organisationsPageContent } from './organisationsPageContent'
import { programmesPageContent } from './programmesPageContent'
import { contactPageContent } from './contactPageContent'
import { ressourcesPageContent } from './ressourcesPageContent'

export const schemaTypes = [
  // Document types
  instructor,
  programme,
  testimonial,
  heroSection,
  article,
  siteSettings,
  homepageContent,

  // Page content types
  coachingPageContent,
  expertisePageContent,
  organisationsPageContent,
  programmesPageContent,
  contactPageContent,
  ressourcesPageContent,

  // Object types
  blockContent,
]
