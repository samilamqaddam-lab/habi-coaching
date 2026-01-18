import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { PROGRAMMES_CONFIG } from '@/lib/programmes-config';
import { z } from 'zod';

// Helper to combine date and time into ISO datetime
function combineDateAndTime(date: string, time: string): string {
  if (!date || !time) return '';
  // date is YYYY-MM-DD, time is HH:mm
  return new Date(`${date}T${time}:00`).toISOString();
}

// Validation schema for creating an edition
const sessionDateOptionSchema = z.object({
  // New format: separate date, startTime, endTime
  date: z.string().optional(),        // YYYY-MM-DD
  startTime: z.string().optional(),   // HH:mm
  endTime: z.string().optional(),     // HH:mm
  // Legacy format for backward compatibility
  dateTime: z.string().optional(),
  location: z.string().default('Studio, Casablanca'),
  maxCapacity: z.number().int().positive().optional(),
}).refine(
  (data) => (data.date && data.startTime && data.endTime) || data.dateTime,
  { message: 'Vous devez fournir date/startTime/endTime ou dateTime' }
);

const sessionSchema = z.object({
  sessionNumber: z.number().int().positive(),
  title: z.string().min(1),
  titleEn: z.string().optional(),
  durationMinutes: z.number().int().positive().optional(),
  dateOptions: z.array(sessionDateOptionSchema).min(1),
});

const editionTypeSchema = z.enum(['collective', 'individual', 'event']).default('collective');

const createEditionSchema = z.object({
  programmeKey: z.string().refine(
    (key) => key in PROGRAMMES_CONFIG && PROGRAMMES_CONFIG[key].supportsEditions,
    { message: 'Programme invalide ou ne supporte pas les éditions' }
  ),
  editionType: editionTypeSchema,
  title: z.string().min(1),
  titleEn: z.string().optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  maxCapacity: z.number().int().positive().default(10),
  isActive: z.boolean().default(true),
  sessionsMandatory: z.boolean().default(true),
  sessions: z.array(sessionSchema).min(1),
});

/**
 * GET /api/admin/editions
 * Liste toutes les éditions avec leurs sessions et stats
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
    const programmeKey = searchParams.get('programme');
    const showArchived = searchParams.get('archived') === 'true';

    // Build query
    let query = supabaseAdmin
      .from('programme_editions')
      .select(`
        *,
        edition_sessions (
          id,
          session_number,
          title,
          session_date_options (
            id,
            date_time,
            max_capacity
          )
        )
      `)
      .order('created_at', { ascending: false });

    // Filter by programme if specified
    if (programmeKey) {
      query = query.eq('programme_key', programmeKey);
    }

    // Filter active/archived
    if (!showArchived) {
      query = query.eq('is_active', true);
    }

    const { data: editions, error } = await query;

    if (error) {
      console.error('Error fetching editions:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des éditions' },
        { status: 500 }
      );
    }

    // Get registration counts for each edition
    const editionIds = editions?.map(e => e.id) || [];

    let registrationCounts: Record<string, number> = {};
    if (editionIds.length > 0) {
      const { data: counts } = await supabaseAdmin
        .from('registrations')
        .select('edition_id')
        .in('edition_id', editionIds)
        .neq('status', 'cancelled');

      if (counts) {
        registrationCounts = counts.reduce((acc, reg) => {
          acc[reg.edition_id] = (acc[reg.edition_id] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
      }
    }

    // Enhance editions with stats
    const editionsWithStats = editions?.map(edition => {
      const totalSessions = edition.edition_sessions?.length || 0;
      const totalDateOptions = edition.edition_sessions?.reduce(
        (acc: number, session: { session_date_options?: unknown[] }) =>
          acc + (session.session_date_options?.length || 0),
        0
      ) || 0;

      // Calculate max participants based on sessions_mandatory flag
      // If mandatory: min across sessions (bottleneck) - each participant must attend all sessions
      // If optional: sum across sessions - participants can attend any session independently
      const sessionCapacities = edition.edition_sessions?.map(
        (session: { session_date_options?: Array<{ max_capacity: number }> }) =>
          session.session_date_options?.reduce(
            (sum: number, opt: { max_capacity: number }) => sum + opt.max_capacity, 0
          ) || 0
      ) || [];

      let maxParticipants = edition.max_capacity || 0;
      if (sessionCapacities.length > 0) {
        if (edition.sessions_mandatory !== false) {
          // Mandatory: bottleneck calculation (min)
          maxParticipants = Math.min(...sessionCapacities);
        } else {
          // Optional: sum calculation (max of all sessions)
          maxParticipants = Math.max(...sessionCapacities);
        }
      }

      return {
        ...edition,
        stats: {
          totalSessions,
          totalDateOptions,
          maxParticipants,
          registrations: registrationCounts[edition.id] || 0,
        },
        programmeConfig: PROGRAMMES_CONFIG[edition.programme_key],
      };
    });

    return NextResponse.json({
      editions: editionsWithStats,
      total: editionsWithStats?.length || 0,
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
 * POST /api/admin/editions
 * Crée une nouvelle édition avec ses sessions et dates
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
    const validationResult = createEditionSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Calculate start_date from first session's first date option
    const firstDateOption = data.sessions[0]?.dateOptions[0];
    let startDate: string | null = null;
    if (firstDateOption) {
      if (firstDateOption.date) {
        // New format
        startDate = firstDateOption.date;
      } else if (firstDateOption.dateTime) {
        // Legacy format
        startDate = new Date(firstDateOption.dateTime).toISOString().split('T')[0];
      }
    }

    // 1. Create the edition
    const { data: edition, error: editionError } = await supabaseAdmin
      .from('programme_editions')
      .insert({
        programme_key: data.programmeKey,
        edition_type: data.editionType,
        title: data.title,
        title_en: data.titleEn,
        max_capacity: data.maxCapacity,
        is_active: data.isActive,
        sessions_mandatory: data.sessionsMandatory,
        start_date: startDate,
      })
      .select()
      .single();

    if (editionError || !edition) {
      console.error('Error creating edition:', editionError);
      return NextResponse.json(
        { error: 'Erreur lors de la création de l\'édition' },
        { status: 500 }
      );
    }

    // 2. Create sessions
    const sessionsToInsert = data.sessions.map(session => ({
      edition_id: edition.id,
      session_number: session.sessionNumber,
      title: session.title,
      title_en: session.titleEn,
      duration_minutes: session.durationMinutes,
    }));

    const { data: sessions, error: sessionsError } = await supabaseAdmin
      .from('edition_sessions')
      .insert(sessionsToInsert)
      .select();

    if (sessionsError || !sessions) {
      // Rollback: delete edition
      await supabaseAdmin.from('programme_editions').delete().eq('id', edition.id);
      console.error('Error creating sessions:', sessionsError);
      return NextResponse.json(
        { error: 'Erreur lors de la création des sessions' },
        { status: 500 }
      );
    }

    // 3. Create date options for each session
    const dateOptionsToInsert: Array<{
      session_id: string;
      date_time: string;
      end_time: string | null;
      location: string;
      max_capacity: number;
    }> = [];

    data.sessions.forEach((sessionData, index) => {
      const session = sessions[index];
      sessionData.dateOptions.forEach(dateOption => {
        // Handle new format (date + startTime + endTime) or legacy format (dateTime)
        let dateTime: string;
        let endTime: string | null = null;

        if (dateOption.date && dateOption.startTime && dateOption.endTime) {
          // New format
          dateTime = combineDateAndTime(dateOption.date, dateOption.startTime);
          endTime = combineDateAndTime(dateOption.date, dateOption.endTime);
        } else {
          // Legacy format
          dateTime = dateOption.dateTime || '';
        }

        dateOptionsToInsert.push({
          session_id: session.id,
          date_time: dateTime,
          end_time: endTime,
          location: dateOption.location,
          max_capacity: dateOption.maxCapacity || data.maxCapacity,
        });
      });
    });

    const { error: dateOptionsError } = await supabaseAdmin
      .from('session_date_options')
      .insert(dateOptionsToInsert);

    if (dateOptionsError) {
      // Rollback: delete sessions and edition
      await supabaseAdmin.from('edition_sessions').delete().eq('edition_id', edition.id);
      await supabaseAdmin.from('programme_editions').delete().eq('id', edition.id);
      console.error('Error creating date options:', dateOptionsError);
      return NextResponse.json(
        { error: 'Erreur lors de la création des options de dates' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      edition: {
        id: edition.id,
        programmeKey: edition.programme_key,
        title: edition.title,
        isActive: edition.is_active,
        sessionsCount: sessions.length,
      },
    }, { status: 201 });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
