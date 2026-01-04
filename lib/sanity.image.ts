import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './sanity'

// Sanity image source type
type SanityImageSource = Parameters<ReturnType<typeof createImageUrlBuilder>['image']>[0]

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Pre-configured image sizes for common use cases
export const imagePresets = {
  // Hero images - large, high quality
  hero: (source: SanityImageSource) =>
    urlFor(source).width(1920).height(1080).quality(85).auto('format'),

  // Card thumbnails - medium size
  card: (source: SanityImageSource) =>
    urlFor(source).width(600).height(400).quality(80).auto('format'),

  // Profile photos - square
  avatar: (source: SanityImageSource) =>
    urlFor(source).width(200).height(200).quality(80).auto('format'),

  // Blog featured images
  blogFeatured: (source: SanityImageSource) =>
    urlFor(source).width(1200).height(630).quality(85).auto('format'),

  // Programme images
  programme: (source: SanityImageSource) =>
    urlFor(source).width(800).height(600).quality(80).auto('format'),

  // Thumbnail for lists
  thumbnail: (source: SanityImageSource) =>
    urlFor(source).width(300).height(200).quality(75).auto('format'),
}
