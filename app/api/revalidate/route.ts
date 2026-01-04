import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Webhook secret for validation
const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET

export async function POST(request: NextRequest) {
  try {
    // Validate webhook secret
    const secret = request.headers.get('x-sanity-webhook-secret')
    if (WEBHOOK_SECRET && secret !== WEBHOOK_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    const body = await request.json()
    const { _type, slug } = body

    // Revalidate based on content type
    switch (_type) {
      case 'article':
        revalidatePath('/blog')
        revalidatePath('/ressources')
        if (slug?.current) {
          revalidatePath(`/blog/${slug.current}`)
        }
        break

      case 'programme':
        revalidatePath('/programmes')
        break

      case 'testimonial':
        revalidatePath('/')
        revalidatePath('/coaching')
        revalidatePath('/organisations')
        break

      case 'heroSection':
        // Revalidate specific page based on hero page field
        if (body.page) {
          const pageRoutes: Record<string, string> = {
            home: '/',
            programmes: '/programmes',
            coaching: '/coaching',
            organisations: '/organisations',
            ressources: '/ressources',
            contact: '/contact',
            expertise: '/expertise',
          }
          const route = pageRoutes[body.page]
          if (route) {
            revalidatePath(route)
          }
        }
        break

      case 'instructor':
      case 'siteSettings':
        // Revalidate all pages for global content
        revalidatePath('/', 'layout')
        break

      default:
        // Revalidate home page as fallback
        revalidatePath('/')
    }

    return NextResponse.json({
      revalidated: true,
      type: _type,
      now: Date.now(),
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    )
  }
}

// Handle GET for testing
export async function GET() {
  return NextResponse.json({
    message: 'Revalidation webhook endpoint. Send POST request with Sanity document data.',
  })
}
