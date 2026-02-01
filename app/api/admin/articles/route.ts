import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { z } from 'zod';

// Validation schema for creating/updating an article
const articleSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  title_en: z.string().optional(),
  slug: z.string().min(1, 'Le slug est requis').regex(/^[a-z0-9-]+$/, 'Le slug ne peut contenir que des lettres minuscules, chiffres et tirets'),
  excerpt: z.string().optional(),
  excerpt_en: z.string().optional(),
  content: z.any().optional(), // JSONB content (portable text or custom)
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
 * GET /api/admin/articles
 * Liste tous les articles (published + drafts)
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
    const showDrafts = searchParams.get('drafts') !== 'false'; // Show drafts by default
    const featured = searchParams.get('featured') === 'true';
    const search = searchParams.get('search');

    // Build query
    let query = supabaseAdmin
      .from('articles')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    // Filters
    if (!showDrafts) {
      query = query.eq('is_published', true);
    }

    if (featured) {
      query = query.eq('featured', true);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
    }

    const { data: articles, error, count } = await query;

    if (error) {
      console.error('Error fetching articles:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des articles' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      articles: articles || [],
      total: count || 0,
    });
  } catch (err) {
    console.error('Unexpected error in GET /api/admin/articles:', err);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/articles
 * Créer un nouvel article
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
    const validatedData = articleSchema.parse(body);

    // Check if slug already exists
    const { data: existing } = await supabaseAdmin
      .from('articles')
      .select('id')
      .eq('slug', validatedData.slug)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Un article avec ce slug existe déjà' },
        { status: 400 }
      );
    }

    // Set published_at if publishing
    const articleData = {
      ...validatedData,
      published_at: validatedData.is_published
        ? validatedData.published_at || new Date().toISOString()
        : null,
    };

    // Create article
    const { data: article, error } = await supabaseAdmin
      .from('articles')
      .insert(articleData)
      .select()
      .single();

    if (error) {
      console.error('Error creating article:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la création de l\'article' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      article,
      message: 'Article créé avec succès',
    }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: err.issues },
        { status: 400 }
      );
    }

    console.error('Unexpected error in POST /api/admin/articles:', err);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
