import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin as supabase, isSupabaseConfigured } from '@/lib/supabase';

// Helper to process a single edition with its sessions
async function processEdition(edition: Record<string, unknown>, availability: Record<string, unknown>[] | null) {
  if (!supabase) return null;

  // Get sessions with date options
  const { data: sessions, error: sessionsError } = await supabase
    .from('edition_sessions')
    .select(`
      *,
      session_date_options (*)
    `)
    .eq('edition_id', edition.id)
    .order('session_number');

  if (sessionsError) {
    console.error('Sessions error:', sessionsError);
    return null;
  }

  // Map availability to date options
  const sessionsWithAvailability = sessions?.map(session => ({
    id: session.id,
    edition_id: session.edition_id,
    session_number: session.session_number,
    title: session.title,
    title_en: session.title_en,
    duration_minutes: session.duration_minutes,
    date_options: session.session_date_options?.map((option: {
      id: string;
      session_id: string;
      date_time: string;
      location: string;
      max_capacity: number;
      created_at: string;
    }) => {
      const avail = availability?.find(a => a.date_option_id === option.id);
      return {
        id: option.id,
        session_id: option.session_id,
        date_time: option.date_time,
        location: option.location,
        max_capacity: option.max_capacity,
        current_count: avail?.current_count || 0,
        remaining_spots: avail?.remaining_spots ?? option.max_capacity,
        is_full: avail?.is_full || false,
      };
    }) || [],
  })) || [];

  // Calculate total minutes and price (for collective editions only)
  const totalMinutes = sessions?.reduce((sum, session) =>
    sum + (session.duration_minutes || 0), 0
  ) || 0;

  const editionType = (edition.edition_type as string) || 'collective';
  // Price = (total minutes / 60) * 150 DH per hour
  const calculatedPrice = editionType === 'collective' && totalMinutes > 0
    ? Math.round((totalMinutes / 60) * 150)
    : null;

  return {
    edition: {
      id: edition.id,
      programme_key: edition.programme_key,
      edition_type: editionType,
      title: edition.title,
      title_en: edition.title_en,
      start_date: edition.start_date,
      max_capacity: edition.max_capacity,
      sessions_mandatory: edition.sessions_mandatory ?? true,
      total_minutes: totalMinutes,
      calculated_price: calculatedPrice,
    },
    sessions: sessionsWithAvailability,
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ editionId: string }> }
) {
  const { editionId } = await params;

  // Check if Supabase is configured
  if (!isSupabaseConfigured() || !supabase) {
    return NextResponse.json(
      { error: 'Service non disponible' },
      { status: 503 }
    );
  }

  try {
    // Check if editionId is a UUID or a programme_key
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(editionId);

    // Get availability for all date options (shared across editions)
    const { data: availability, error: availError } = await supabase
      .from('date_availability')
      .select('*');

    if (availError) {
      console.error('Availability error:', availError);
    }

    if (isUUID) {
      // Query by UUID - return single edition (backward compatible)
      const { data: edition, error: editionError } = await supabase
        .from('programme_editions')
        .select('*')
        .eq('id', editionId)
        .eq('is_active', true)
        .single();

      if (editionError || !edition) {
        return NextResponse.json(
          { error: 'Édition non trouvée' },
          { status: 404 }
        );
      }

      const result = await processEdition(edition, availability || null);
      if (!result) {
        return NextResponse.json(
          { error: 'Erreur lors de la récupération des sessions' },
          { status: 500 }
        );
      }

      return NextResponse.json(result);
    } else {
      // Query by programme_key - return ALL active editions
      const { data: editions, error: editionsError } = await supabase
        .from('programme_editions')
        .select('*')
        .eq('programme_key', editionId)
        .eq('is_active', true)
        .order('start_date', { ascending: true });

      if (editionsError) {
        console.error('Editions error:', editionsError);
        return NextResponse.json(
          { error: 'Erreur lors de la récupération des éditions' },
          { status: 500 }
        );
      }

      if (!editions || editions.length === 0) {
        return NextResponse.json(
          { error: 'Aucune édition active trouvée' },
          { status: 404 }
        );
      }

      // Process all editions
      const processedEditions = await Promise.all(
        editions.map(edition => processEdition(edition, availability || null))
      );

      // Filter out any failed processing
      const validEditions = processedEditions.filter(e => e !== null);

      if (validEditions.length === 0) {
        return NextResponse.json(
          { error: 'Erreur lors de la récupération des sessions' },
          { status: 500 }
        );
      }

      // Return array of editions
      // Also include backward-compatible single edition fields for the first edition
      return NextResponse.json({
        // Multi-edition response
        editions: validEditions,
        // Backward compatible: first edition as main edition
        edition: validEditions[0].edition,
        sessions: validEditions[0].sessions,
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
