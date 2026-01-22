import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/studio/', '/brand-kit/'],
      },
    ],
    sitemap: 'https://transcendencework.com/sitemap.xml',
  }
}
