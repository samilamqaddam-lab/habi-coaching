import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { Tag, TagsResponse, TagCategory } from '@/lib/types';

/**
 * GET /api/tags
 * Fetch tags with optional hierarchical filtering
 *
 * Query params:
 * - parent: Filter by parent_id (use empty string for main tags only, specific ID for children)
 * - category: Filter by category ('main' or 'sub')
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
    const parentParam = searchParams.get('parent');
    const category = searchParams.get('category') as TagCategory | null;

    // Build query
    let query = supabase
      .from('tags')
      .select('*')
      .order('display_order', { ascending: true });

    // Apply filters
    if (parentParam !== null) {
      if (parentParam === '') {
        // Empty string means filter for main tags (parent_id IS NULL)
        query = query.is('parent_id', null);
      } else {
        // Specific parent ID
        query = query.eq('parent_id', parentParam);
      }
    }

    if (category) {
      query = query.eq('category', category);
    }

    // Execute query
    const { data, error } = await query;

    if (error) {
      console.error('Error fetching tags:', error);
      return NextResponse.json(
        { error: 'Failed to fetch tags' },
        { status: 500 }
      );
    }

    const response: TagsResponse = {
      tags: (data as Tag[]) || [],
    };

    return NextResponse.json(response, {
      headers: {
        // Tags change rarely, cache aggressively
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (err) {
    console.error('Unexpected error in GET /api/tags:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
