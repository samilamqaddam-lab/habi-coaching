import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { z } from 'zod';

// Validation schema for updating an event
const updateEventSchema = z.object({
  title: z.string().min(1).optional(),
  titleEn: z.string().optional().nullable(),
  subtitle: z.string().optional().nullable(),
  subtitleEn: z.string().optional().nullable(),
  badge: z.string().optional().nullable(),
  badgeEn: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  descriptionEn: z.string().optional().nullable(),
  dateTime: z.string().optional(),
  durationMinutes: z.coerce.number().int().positive().optional(),
  location: z.string().optional(),
  address: z.string().optional(),
  price: z.coerce.number().positive().optional().nullable(),
  maxCapacity: z.coerce.number().int().positive().optional(),
  isActive: z.boolean().optional(),
});

/**
 * GET /api/admin/events/[id]
 * Récupère un événement complet avec ses statistiques
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return NextResponse.json(
      { error: 'Service non disponible' },
      { status: 503 }
    );
  }

  try {
    // Get event
    const { data: event, error: eventError } = await supabaseAdmin
      .from('yoga_events')
      .select('*')
      .eq('id', id)
      .single();

    if (eventError || !event) {
      return NextResponse.json(
        { error: 'Événement non trouvé' },
        { status: 404 }
      );
    }

    // Get registration stats
    const { data: registrations } = await supabaseAdmin
      .from('event_registrations')
      .select('status')
      .eq('event_id', id)
      .neq('status', 'cancelled');

    const stats = {
      total: registrations?.length || 0,
      pending: registrations?.filter(r => r.status === 'pending').length || 0,
      confirmed: registrations?.filter(r => r.status === 'confirmed').length || 0,
    };

    const remaining = Math.max(0, event.max_capacity - stats.total);
    const fillRate = event.max_capacity > 0 ? (stats.total / event.max_capacity) * 100 : 0;
    const isPast = new Date(event.date_time) < new Date();

    return NextResponse.json({
      event: {
        id: event.id,
        title: event.title,
        titleEn: event.title_en,
        subtitle: event.subtitle,
        subtitleEn: event.subtitle_en,
        badge: event.badge,
        badgeEn: event.badge_en,
        description: event.description,
        descriptionEn: event.description_en,
        dateTime: event.date_time,
        durationMinutes: event.duration_minutes,
        location: event.location,
        address: event.address,
        price: event.price,
        maxCapacity: event.max_capacity,
        isActive: event.is_active,
        createdAt: event.created_at,
        isPast,
        stats: {
          registrations: stats.total,
          pending: stats.pending,
          confirmed: stats.confirmed,
          remaining,
          fillRate: Math.round(fillRate),
        },
      },
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/events/[id]
 * Met à jour un événement
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return NextResponse.json(
      { error: 'Service non disponible' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();

    // Validate input
    const validationResult = updateEventSchema.safeParse(body);
    if (!validationResult.success) {
      console.error('Validation errors:', JSON.stringify(validationResult.error.issues, null, 2));
      return NextResponse.json(
        { error: 'Données invalides', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Check if event exists
    const { data: existingEvent, error: findError } = await supabaseAdmin
      .from('yoga_events')
      .select('id')
      .eq('id', id)
      .single();

    if (findError || !existingEvent) {
      return NextResponse.json(
        { error: 'Événement non trouvé' },
        { status: 404 }
      );
    }

    // Build update object
    const eventUpdate: Record<string, unknown> = {};
    if (data.title !== undefined) eventUpdate.title = data.title;
    if (data.titleEn !== undefined) eventUpdate.title_en = data.titleEn;
    if (data.subtitle !== undefined) eventUpdate.subtitle = data.subtitle;
    if (data.subtitleEn !== undefined) eventUpdate.subtitle_en = data.subtitleEn;
    if (data.badge !== undefined) eventUpdate.badge = data.badge;
    if (data.badgeEn !== undefined) eventUpdate.badge_en = data.badgeEn;
    if (data.description !== undefined) eventUpdate.description = data.description;
    if (data.descriptionEn !== undefined) eventUpdate.description_en = data.descriptionEn;
    if (data.dateTime !== undefined) eventUpdate.date_time = data.dateTime;
    if (data.durationMinutes !== undefined) eventUpdate.duration_minutes = data.durationMinutes;
    if (data.location !== undefined) eventUpdate.location = data.location;
    if (data.address !== undefined) eventUpdate.address = data.address;
    if (data.price !== undefined) eventUpdate.price = data.price;
    if (data.maxCapacity !== undefined) eventUpdate.max_capacity = data.maxCapacity;
    if (data.isActive !== undefined) eventUpdate.is_active = data.isActive;

    if (Object.keys(eventUpdate).length > 0) {
      const { error: updateError } = await supabaseAdmin
        .from('yoga_events')
        .update(eventUpdate)
        .eq('id', id);

      if (updateError) {
        console.error('Error updating event:', updateError);
        return NextResponse.json(
          { error: 'Erreur lors de la mise à jour de l\'événement' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Événement mis à jour avec succès',
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/events/[id]
 * Archive ou supprime un événement
 * Query param: ?hard=true pour suppression définitive
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return NextResponse.json(
      { error: 'Service non disponible' },
      { status: 503 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const hardDelete = searchParams.get('hard') === 'true';

    // Check if event exists
    const { data: event, error: findError } = await supabaseAdmin
      .from('yoga_events')
      .select('id, is_active')
      .eq('id', id)
      .single();

    if (findError || !event) {
      return NextResponse.json(
        { error: 'Événement non trouvé' },
        { status: 404 }
      );
    }

    if (hardDelete) {
      // Hard delete: remove registrations first, then event
      await supabaseAdmin
        .from('event_registrations')
        .delete()
        .eq('event_id', id);

      const { error: deleteError } = await supabaseAdmin
        .from('yoga_events')
        .delete()
        .eq('id', id);

      if (deleteError) {
        console.error('Error deleting event:', deleteError);
        return NextResponse.json(
          { error: 'Erreur lors de la suppression' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Événement supprimé définitivement',
      });

    } else {
      // Soft delete: archive (set is_active to false)
      const { error: archiveError } = await supabaseAdmin
        .from('yoga_events')
        .update({ is_active: false })
        .eq('id', id);

      if (archiveError) {
        console.error('Error archiving event:', archiveError);
        return NextResponse.json(
          { error: 'Erreur lors de l\'archivage' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Événement archivé',
      });
    }

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
