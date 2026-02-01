import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { Article, ArticlesResponse } from '@/lib/types';

/**
 * GET /api/articles
 * Fetch published articles with optional filters
 *
 * Query params:
 * - tags[]: Array of tag IDs to filter by (AND logic)
 * - featured: true/false - Filter featured articles
 * - limit: Number of articles to return (default: 50)
 * - offset: Pagination offset (default: 0)
 * - search: Search in title/excerpt
 */
export async function GET(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const searchParams = request.nextUrl.searchParams;

    // Parse query parameters
    const tags = searchParams.getAll('tags[]');
    const featured = searchParams.get('featured') === 'true';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');

    // Build query
    let query = supabase
      .from('articles')
      .select('*', { count: 'exact' })
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (featured) {
      query = query.eq('featured', true);
    }

    if (tags.length > 0) {
      // Filter articles that contain ALL specified tags
      query = query.contains('tags', tags);
    }

    if (search) {
      // Search in title and excerpt (case-insensitive)
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
    }

    // Execute query
    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching articles:', error);
      return NextResponse.json(
        { error: 'Failed to fetch articles' },
        { status: 500 }
      );
    }

    const response: ArticlesResponse = {
      articles: (data as Article[]) || [],
      total: count || 0,
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (err) {
    console.error('Unexpected error in GET /api/articles:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
