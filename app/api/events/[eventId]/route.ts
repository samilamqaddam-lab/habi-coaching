import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

/**
 * GET /api/events/[eventId]
 * Récupère un événement actif par son ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  const { eventId } = await params;

  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return NextResponse.json(
      { error: 'Service non disponible' },
      { status: 503 }
    );
  }

  try {
    // Get event - only if active
    const { data: event, error: eventError } = await supabaseAdmin
      .from('yoga_events')
      .select('*')
      .eq('id', eventId)
      .eq('is_active', true)
      .single();

    if (eventError || !event) {
      return NextResponse.json(
        { error: 'Événement non trouvé' },
        { status: 404 }
      );
    }

    // Check if event is in the past
    const isPast = new Date(event.date_time) < new Date();
    if (isPast) {
      return NextResponse.json(
        { error: 'Événement terminé' },
        { status: 410 }
      );
    }

    // Get availability
    const { data: availability } = await supabaseAdmin
      .from('event_availability')
      .select('*')
      .eq('event_id', eventId)
      .single();

    return NextResponse.json({
      event: {
        id: event.id,
        title: event.title,
        title_en: event.title_en,
        subtitle: event.subtitle,
        subtitle_en: event.subtitle_en,
        badge: event.badge,
        badge_en: event.badge_en,
        description: event.description,
        description_en: event.description_en,
        date_time: event.date_time,
        duration_minutes: event.duration_minutes,
        location: event.location,
        address: event.address,
        price: event.price,
        max_capacity: event.max_capacity,
        remaining_spots: availability?.remaining_spots ?? event.max_capacity,
        is_full: availability?.is_full ?? false,
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
