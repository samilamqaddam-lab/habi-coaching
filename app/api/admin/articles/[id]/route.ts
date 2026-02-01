import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { z } from 'zod';

// Same validation schema as route.ts
const articleSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  title_en: z.string().optional(),
  slug: z.string().min(1, 'Le slug est requis').regex(/^[a-z0-9-]+$/, 'Le slug ne peut contenir que des lettres minuscules, chiffres et tirets'),
  excerpt: z.string().optional(),
  excerpt_en: z.string().optional(),
  content: z.any().optional(),
  content_en: z.any().optional(),
  featured_image_url: z.string().url().optional().or(z.literal('')),
  thumbnail_url: z.string().url().optional().or(z.literal('')),
  tags: z.array(z.string()).default([]),
  author_name: z.string().default('Hajar Habi'),
  read_time_minutes: z.coerce.number().int().positive().optional(),
  related_event_id: z.string().uuid().optional().nullable(),
  related_programme_key: z.string().optional().nullable(),
  is_published: z.boolean().default(false),
  featured: z.boolean().default(false),
  published_at: z.string().optional().nullable(),
});

/**
 * GET /api/admin/articles/[id]
 * Récupérer un article par ID
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

    const { data: article, error } = await supabaseAdmin
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !article) {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({ article });
  } catch (err) {
    console.error('Error in GET /api/admin/articles/[id]:', err);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/articles/[id]
 * Mettre à jour un article
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
    const validatedData = articleSchema.parse(body);

    // Check if article exists
    const { data: existing } = await supabaseAdmin
      .from('articles')
      .select('id, slug')
      .eq('id', id)
      .single();

    if (!existing) {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      );
    }

    // Check if slug is taken by another article
    if (validatedData.slug !== existing.slug) {
      const { data: slugExists } = await supabaseAdmin
        .from('articles')
        .select('id')
        .eq('slug', validatedData.slug)
        .neq('id', id)
        .single();

      if (slugExists) {
        return NextResponse.json(
          { error: 'Ce slug est déjà utilisé par un autre article' },
          { status: 400 }
        );
      }
    }

    // Set published_at if publishing for the first time
    const articleData = {
      ...validatedData,
      published_at: validatedData.is_published
        ? validatedData.published_at || new Date().toISOString()
        : null,
    };

    // Update article
    const { data: article, error } = await supabaseAdmin
      .from('articles')
      .update(articleData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating article:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour de l\'article' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      article,
      message: 'Article mis à jour avec succès',
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: err.issues },
        { status: 400 }
      );
    }

    console.error('Unexpected error in PUT /api/admin/articles/[id]:', err);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/articles/[id]
 * Supprimer un article
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

    // Check if article exists
    const { data: existing } = await supabaseAdmin
      .from('articles')
      .select('id')
      .eq('id', id)
      .single();

    if (!existing) {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      );
    }

    // Delete article
    const { error } = await supabaseAdmin
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting article:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la suppression de l\'article' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Article supprimé avec succès',
    });
  } catch (err) {
    console.error('Unexpected error in DELETE /api/admin/articles/[id]:', err);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
