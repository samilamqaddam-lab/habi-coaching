import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin as supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ editionId: string }> }
) {
  const { editionId } = await params;

  // Debug logging
  console.log('[API] Checking Supabase configuration...');
  console.log('[API] isSupabaseConfigured:', isSupabaseConfigured());
  console.log('[API] supabaseAdmin exists:', !!supabase);
  console.log('[API] Querying for editionId:', editionId);

  // Check if Supabase is configured
  if (!isSupabaseConfigured() || !supabase) {
    console.log('[API] Supabase not configured properly');
    return NextResponse.json(
      { error: 'Service non disponible' },
      { status: 503 }
    );
  }

  try {
    // Get edition by ID or by programme_key
    let query = supabase
      .from('programme_editions')
      .select('*')
      .eq('is_active', true);

    // Check if editionId is a UUID or a programme_key
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(editionId);

    if (isUUID) {
      query = query.eq('id', editionId);
    } else {
      query = query.eq('programme_key', editionId);
    }

    const { data: edition, error: editionError } = await query.single();

    console.log('[API] Query result:', { edition, editionError });

    if (editionError || !edition) {
      console.log('[API] Edition not found. Error:', editionError);
      return NextResponse.json(
        { error: 'Édition non trouvée' },
        { status: 404 }
      );
    }

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
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des sessions' },
        { status: 500 }
      );
    }

    // Get availability for all date options
    const { data: availability, error: availError } = await supabase
      .from('date_availability')
      .select('*');

    if (availError) {
      console.error('Availability error:', availError);
    }

    // Map availability to date options
    const sessionsWithAvailability = sessions?.map(session => ({
      id: session.id,
      edition_id: session.edition_id,
      session_number: session.session_number,
      title: session.title,
      title_en: session.title_en,
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

    return NextResponse.json({
      edition: {
        id: edition.id,
        programme_key: edition.programme_key,
        title: edition.title,
        title_en: edition.title_en,
        start_date: edition.start_date,
        max_capacity: edition.max_capacity,
      },
      sessions: sessionsWithAvailability,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
