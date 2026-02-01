import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { Resource, ResourcesResponse, ResourceType } from '@/lib/types';

/**
 * GET /api/resources
 * Fetch active resources with optional filters
 *
 * Query params:
 * - type: Resource type filter ('video', 'pdf', 'link', 'audio')
 * - tags[]: Array of tag IDs to filter by (AND logic)
 * - featured: true/false - Filter featured resources
 * - limit: Number of resources to return (default: 50)
 * - offset: Pagination offset (default: 0)
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
    const type = searchParams.get('type') as ResourceType | null;
    const tags = searchParams.getAll('tags[]');
    const featured = searchParams.get('featured') === 'true';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build query
    let query = supabase
      .from('resources')
      .select('*', { count: 'exact' })
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (type) {
      query = query.eq('resource_type', type);
    }

    if (featured) {
      query = query.eq('featured', true);
    }

    if (tags.length > 0) {
      // Filter resources that contain ALL specified tags
      query = query.contains('tags', tags);
    }

    // Execute query
    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching resources:', error);
      return NextResponse.json(
        { error: 'Failed to fetch resources' },
        { status: 500 }
      );
    }

    const response: ResourcesResponse = {
      resources: (data as Resource[]) || [],
      total: count || 0,
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (err) {
    console.error('Unexpected error in GET /api/resources:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
