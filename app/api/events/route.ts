import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function GET() {
  // Check if Supabase is configured
  if (!isSupabaseConfigured() || !supabase) {
    return NextResponse.json(
      { error: 'Service non disponible' },
      { status: 503 }
    );
  }

  try {
    // Get active events with future dates
    const { data: events, error: eventsError } = await supabase
      .from('yoga_events')
      .select('*')
      .eq('is_active', true)
      .gte('date_time', new Date().toISOString())
      .order('date_time', { ascending: true });

    if (eventsError) {
      console.error('Events fetch error:', eventsError);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des événements' },
        { status: 500 }
      );
    }

    if (!events || events.length === 0) {
      return NextResponse.json({ events: [] });
    }

    // Get availability for all events
    const eventIds = events.map(e => e.id);
    const { data: availability, error: availError } = await supabase
      .from('event_availability')
      .select('*')
      .in('event_id', eventIds);

    if (availError) {
      console.error('Availability fetch error:', availError);
    }

    // Merge availability with events
    const eventsWithAvailability = events.map(event => {
      const avail = availability?.find(a => a.event_id === event.id);
      return {
        ...event,
        current_count: avail?.current_count || 0,
        remaining_spots: avail?.remaining_spots || event.max_capacity,
        is_full: avail?.is_full || false,
      };
    });

    return NextResponse.json({ events: eventsWithAvailability });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
