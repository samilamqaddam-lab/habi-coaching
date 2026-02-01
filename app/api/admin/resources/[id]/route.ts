import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { z } from 'zod';
import { extractYouTubeId, getYouTubeThumbnailUrl } from '@/lib/types';

// Same validation schema as route.ts
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
 * GET /api/admin/resources/[id]
 * Récupérer une ressource par ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return NextResponse.json(
      { error: 'Service non disponible' },
      { status: 503 }
    );
  }

  try {
    const { id } = await params;

    const { data: resource, error } = await supabaseAdmin
      .from('resources')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !resource) {
      return NextResponse.json(
        { error: 'Ressource non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json({ resource });
  } catch (err) {
    console.error('Error in GET /api/admin/resources/[id]:', err);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/resources/[id]
 * Mettre à jour une ressource
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return NextResponse.json(
      { error: 'Service non disponible' },
      { status: 503 }
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();

    // Validate input
    const validatedData = resourceSchema.parse(body);

    // Check if resource exists
    const { data: existing } = await supabaseAdmin
      .from('resources')
      .select('id')
      .eq('id', id)
      .single();

    if (!existing) {
      return NextResponse.json(
        { error: 'Ressource non trouvée' },
        { status: 404 }
      );
    }

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

    // Update resource
    const { data: resource, error } = await supabaseAdmin
      .from('resources')
      .update(resourceData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating resource:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour de la ressource' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      resource,
      message: 'Ressource mise à jour avec succès',
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: err.issues },
        { status: 400 }
      );
    }

    console.error('Unexpected error in PUT /api/admin/resources/[id]:', err);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/resources/[id]
 * Supprimer une ressource
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return NextResponse.json(
      { error: 'Service non disponible' },
      { status: 503 }
    );
  }

  try {
    const { id } = await params;

    // Check if resource exists
    const { data: existing } = await supabaseAdmin
      .from('resources')
      .select('id')
      .eq('id', id)
      .single();

    if (!existing) {
      return NextResponse.json(
        { error: 'Ressource non trouvée' },
        { status: 404 }
      );
    }

    // Delete resource
    const { error } = await supabaseAdmin
      .from('resources')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting resource:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la suppression de la ressource' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Ressource supprimée avec succès',
    });
  } catch (err) {
    console.error('Unexpected error in DELETE /api/admin/resources/[id]:', err);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
