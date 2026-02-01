import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { z } from 'zod';
import { extractYouTubeId, getYouTubeThumbnailUrl } from '@/lib/types';

// Validation schema for creating/updating a resource
const resourceSchema = z.object({
  resource_type: z.enum(['video', 'pdf', 'link', 'audio']),
  title: z.string().min(1, 'Le titre est requis'),
  title_en: z.string().optional(),
  description: z.string().optional(),
  description_en: z.string().optional(),
  url: z.string().url('URL invalide'),
  tags: z.array(z.string()).default([]),
  duration_minutes: z.coerce.number().int().positive().optional(),
  related_programme_key: z.string().optional().nullable(),
  related_event_id: z.string().uuid().optional().nullable(),
  is_active: z.boolean().default(true),
  featured: z.boolean().default(false),
});

/**
 * GET /api/admin/resources
 * Liste toutes les ressources
 */
export async function GET(request: NextRequest) {
  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return NextResponse.json(
      { error: 'Service non disponible' },
      { status: 503 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // Filter by resource_type
    const showInactive = searchParams.get('inactive') === 'true';
    const featured = searchParams.get('featured') === 'true';
    const search = searchParams.get('search');

    // Build query
    let query = supabaseAdmin
      .from('resources')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    // Filters
    if (!showInactive) {
      query = query.eq('is_active', true);
    }

    if (type) {
      query = query.eq('resource_type', type);
    }

    if (featured) {
      query = query.eq('featured', true);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data: resources, error, count } = await query;

    if (error) {
      console.error('Error fetching resources:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des ressources' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      resources: resources || [],
      total: count || 0,
    });
  } catch (err) {
    console.error('Unexpected error in GET /api/admin/resources:', err);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/resources
 * Créer une nouvelle ressource
 */
export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return NextResponse.json(
      { error: 'Service non disponible' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();

    // Validate input
    const validatedData = resourceSchema.parse(body);

    // Auto-extract YouTube video ID and thumbnail if type is video
    let resourceData: any = { ...validatedData };

    if (validatedData.resource_type === 'video') {
      const videoId = extractYouTubeId(validatedData.url);

      if (videoId) {
        resourceData = {
          ...resourceData,
          video_id: videoId,
          // Auto-generate thumbnail if not provided
          thumbnail_url: getYouTubeThumbnailUrl(videoId),
        };
      } else {
        return NextResponse.json(
          { error: 'URL YouTube invalide' },
          { status: 400 }
        );
      }
    }

    // Create resource
    const { data: resource, error } = await supabaseAdmin
      .from('resources')
      .insert(resourceData)
      .select()
      .single();

    if (error) {
      console.error('Error creating resource:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la création de la ressource' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      resource,
      message: 'Ressource créée avec succès',
    }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: err.issues },
        { status: 400 }
      );
    }

    console.error('Unexpected error in POST /api/admin/resources:', err);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
