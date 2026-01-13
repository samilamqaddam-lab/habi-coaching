import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

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
    // Get edition by ID or programme_key
    let editionQuery = supabase
      .from('programme_editions')
      .select('id')
      .eq('is_active', true);

    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(editionId);

    if (isUUID) {
      editionQuery = editionQuery.eq('id', editionId);
    } else {
      editionQuery = editionQuery.eq('programme_key', editionId);
    }

    const { data: edition, error: editionError } = await editionQuery.single();

    if (editionError || !edition) {
      return NextResponse.json(
        { error: 'Édition non trouvée' },
        { status: 404 }
      );
    }

    // Get all sessions for this edition
    const { data: sessions } = await supabase
      .from('edition_sessions')
      .select('id')
      .eq('edition_id', edition.id);

    const sessionIds = sessions?.map(s => s.id) || [];

    // Get all date options for these sessions
    const { data: dateOptions } = await supabase
      .from('session_date_options')
      .select('id')
      .in('session_id', sessionIds);

    const dateOptionIds = dateOptions?.map(d => d.id) || [];

    // Get availability for these date options
    const { data: availability, error: availError } = await supabase
      .from('date_availability')
      .select('*')
      .in('date_option_id', dateOptionIds);

    if (availError) {
      console.error('Availability error:', availError);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des disponibilités' },
        { status: 500 }
      );
    }

    // Format response as a map for easy lookup
    const availabilityMap: Record<string, {
      date_option_id: string;
      session_id: string;
      current_count: number;
      remaining_spots: number;
      is_full: boolean;
    }> = {};

    availability?.forEach(a => {
      availabilityMap[a.date_option_id] = {
        date_option_id: a.date_option_id,
        session_id: a.session_id,
        current_count: a.current_count,
        remaining_spots: a.remaining_spots,
        is_full: a.is_full,
      };
    });

    return NextResponse.json({
      edition_id: edition.id,
      availability: availabilityMap,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
