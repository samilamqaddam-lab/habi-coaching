import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { PROGRAMMES_CONFIG } from '@/lib/programmes-config';
import { z } from 'zod';

// Validation schema for updating an edition
const sessionDateOptionSchema = z.object({
  id: z.string().optional(), // Optional for new date options
  dateTime: z.string().min(1), // Accept any non-empty string
  location: z.string().default('Studio, Casablanca'),
  maxCapacity: z.coerce.number().int().positive().optional(),
});

const sessionSchema = z.object({
  id: z.string().optional(), // Optional for new sessions
  sessionNumber: z.coerce.number().int().positive(),
  title: z.string().min(1),
  titleEn: z.string().optional().nullable(),
  duration: z.string().optional().nullable(),
  dateOptions: z.array(sessionDateOptionSchema).min(1),
});

const updateEditionSchema = z.object({
  programmeKey: z.string().optional(),
  title: z.string().min(1).optional(),
  titleEn: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  price: z.coerce.number().positive().optional().nullable(),
  maxCapacity: z.coerce.number().int().positive().optional(),
  isActive: z.boolean().optional(),
  sessionsMandatory: z.boolean().optional(),
  sessions: z.array(sessionSchema).optional(),
});

/**
 * GET /api/admin/editions/[id]
 * Récupère une édition complète avec ses sessions, dates et disponibilités
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
    // Get edition with sessions and date options
    const { data: edition, error: editionError } = await supabaseAdmin
      .from('programme_editions')
      .select(`
        *,
        edition_sessions (
          id,
          session_number,
          title,
          title_en,
          session_date_options (
            id,
            date_time,
            location,
            max_capacity
          )
        )
      `)
      .eq('id', id)
      .single();

    if (editionError || !edition) {
      return NextResponse.json(
        { error: 'Édition non trouvée' },
        { status: 404 }
      );
    }

    // Get availability for all date options
    const dateOptionIds = edition.edition_sessions?.flatMap(
      (session: { session_date_options?: Array<{ id: string }> }) =>
        session.session_date_options?.map((opt: { id: string }) => opt.id) || []
    ) || [];

    let availabilityMap: Record<string, { current_count: number; remaining_spots: number; is_full: boolean }> = {};
    if (dateOptionIds.length > 0) {
      const { data: availability } = await supabaseAdmin
        .from('date_availability')
        .select('*')
        .in('date_option_id', dateOptionIds);

      if (availability) {
        availabilityMap = availability.reduce((acc, avail) => {
          acc[avail.date_option_id] = {
            current_count: avail.current_count,
            remaining_spots: avail.remaining_spots,
            is_full: avail.is_full,
          };
          return acc;
        }, {} as Record<string, { current_count: number; remaining_spots: number; is_full: boolean }>);
      }
    }

    // Get registration count
    const { count: registrationCount } = await supabaseAdmin
      .from('registrations')
      .select('*', { count: 'exact', head: true })
      .eq('edition_id', id)
      .neq('status', 'cancelled');

    // Enhance date options with availability
    const enhancedSessions = edition.edition_sessions?.map((session: {
      id: string;
      session_number: number;
      title: string;
      title_en?: string;
      session_date_options?: Array<{
        id: string;
        date_time: string;
        location: string;
        max_capacity: number;
      }>;
    }) => ({
      ...session,
      dateOptions: session.session_date_options?.map((opt: {
        id: string;
        date_time: string;
        location: string;
        max_capacity: number;
      }) => ({
        id: opt.id,
        dateTime: opt.date_time,
        location: opt.location,
        maxCapacity: opt.max_capacity,
        availability: availabilityMap[opt.id] || {
          current_count: 0,
          remaining_spots: opt.max_capacity,
          is_full: false,
        },
      })) || [],
    })).sort((a: { session_number: number }, b: { session_number: number }) => a.session_number - b.session_number);

    return NextResponse.json({
      edition: {
        id: edition.id,
        programmeKey: edition.programme_key,
        title: edition.title,
        titleEn: edition.title_en,
        startDate: edition.start_date,
        maxCapacity: edition.max_capacity,
        isActive: edition.is_active,
        sessionsMandatory: edition.sessions_mandatory ?? true,
        createdAt: edition.created_at,
        sessions: enhancedSessions,
        stats: {
          registrations: registrationCount || 0,
        },
        programmeConfig: PROGRAMMES_CONFIG[edition.programme_key],
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
 * PUT /api/admin/editions/[id]
 * Met à jour une édition (avec remplacement complet des sessions si fournies)
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
    const validationResult = updateEditionSchema.safeParse(body);
    if (!validationResult.success) {
      console.error('Validation errors:', JSON.stringify(validationResult.error.issues, null, 2));
      return NextResponse.json(
        { error: 'Données invalides', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Check if edition exists
    const { data: existingEdition, error: findError } = await supabaseAdmin
      .from('programme_editions')
      .select('id')
      .eq('id', id)
      .single();

    if (findError || !existingEdition) {
      return NextResponse.json(
        { error: 'Édition non trouvée' },
        { status: 404 }
      );
    }

    // 1. Update edition basic info
    const editionUpdate: Record<string, unknown> = {};
    if (data.programmeKey) editionUpdate.programme_key = data.programmeKey;
    if (data.title) editionUpdate.title = data.title;
    if (data.titleEn !== undefined) editionUpdate.title_en = data.titleEn;
    if (data.maxCapacity) editionUpdate.max_capacity = data.maxCapacity;
    if (data.isActive !== undefined) editionUpdate.is_active = data.isActive;
    if (data.sessionsMandatory !== undefined) editionUpdate.sessions_mandatory = data.sessionsMandatory;

    if (Object.keys(editionUpdate).length > 0) {
      const { error: updateError } = await supabaseAdmin
        .from('programme_editions')
        .update(editionUpdate)
        .eq('id', id);

      if (updateError) {
        console.error('Error updating edition:', updateError);
        return NextResponse.json(
          { error: 'Erreur lors de la mise à jour de l\'édition' },
          { status: 500 }
        );
      }
    }

    // 2. Update sessions if provided (full replacement strategy)
    if (data.sessions) {
      // Get existing sessions to delete orphaned ones
      const { data: existingSessions } = await supabaseAdmin
        .from('edition_sessions')
        .select('id')
        .eq('edition_id', id);

      const existingSessionIds = existingSessions?.map(s => s.id) || [];
      const updatedSessionIds = data.sessions.filter(s => s.id).map(s => s.id) as string[];
      const sessionsToDelete = existingSessionIds.filter(sid => !updatedSessionIds.includes(sid));

      // Delete sessions that are no longer in the update (cascades to date_options via FK)
      if (sessionsToDelete.length > 0) {
        // First delete date options for these sessions
        await supabaseAdmin
          .from('session_date_options')
          .delete()
          .in('session_id', sessionsToDelete);

        // Then delete the sessions
        await supabaseAdmin
          .from('edition_sessions')
          .delete()
          .in('id', sessionsToDelete);
      }

      // Process each session
      for (const sessionData of data.sessions) {
        let sessionId = sessionData.id;

        if (sessionId) {
          // Update existing session
          await supabaseAdmin
            .from('edition_sessions')
            .update({
              session_number: sessionData.sessionNumber,
              title: sessionData.title,
              title_en: sessionData.titleEn,
            })
            .eq('id', sessionId);
        } else {
          // Create new session
          const { data: newSession } = await supabaseAdmin
            .from('edition_sessions')
            .insert({
              edition_id: id,
              session_number: sessionData.sessionNumber,
              title: sessionData.title,
              title_en: sessionData.titleEn,
            })
            .select()
            .single();

          sessionId = newSession?.id;
        }

        if (!sessionId) continue;

        // Handle date options for this session
        const { data: existingDateOptions } = await supabaseAdmin
          .from('session_date_options')
          .select('id')
          .eq('session_id', sessionId);

        const existingDateOptionIds = existingDateOptions?.map(d => d.id) || [];
        const updatedDateOptionIds = sessionData.dateOptions.filter(d => d.id).map(d => d.id) as string[];
        const dateOptionsToDelete = existingDateOptionIds.filter(did => !updatedDateOptionIds.includes(did));

        // Delete removed date options
        if (dateOptionsToDelete.length > 0) {
          await supabaseAdmin
            .from('session_date_options')
            .delete()
            .in('id', dateOptionsToDelete);
        }

        // Update or create date options
        for (const dateOption of sessionData.dateOptions) {
          if (dateOption.id) {
            // Update existing
            await supabaseAdmin
              .from('session_date_options')
              .update({
                date_time: dateOption.dateTime,
                location: dateOption.location,
                max_capacity: dateOption.maxCapacity || data.maxCapacity || 10,
              })
              .eq('id', dateOption.id);
          } else {
            // Create new
            await supabaseAdmin
              .from('session_date_options')
              .insert({
                session_id: sessionId,
                date_time: dateOption.dateTime,
                location: dateOption.location,
                max_capacity: dateOption.maxCapacity || data.maxCapacity || 10,
              });
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Édition mise à jour avec succès',
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
 * DELETE /api/admin/editions/[id]
 * Archive ou supprime une édition
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

    // Check if edition exists
    const { data: edition, error: findError } = await supabaseAdmin
      .from('programme_editions')
      .select('id, is_active')
      .eq('id', id)
      .single();

    if (findError || !edition) {
      return NextResponse.json(
        { error: 'Édition non trouvée' },
        { status: 404 }
      );
    }

    if (hardDelete) {
      // Get sessions to find date options
      const { data: sessions } = await supabaseAdmin
        .from('edition_sessions')
        .select('id')
        .eq('edition_id', id);

      const sessionIds = sessions?.map(s => s.id) || [];

      // Get all date option IDs for this edition
      let dateOptionIds: string[] = [];
      if (sessionIds.length > 0) {
        const { data: dateOptions } = await supabaseAdmin
          .from('session_date_options')
          .select('id')
          .in('session_id', sessionIds);
        dateOptionIds = dateOptions?.map(d => d.id) || [];
      }

      // 1. Delete registration_date_choices (references date_options)
      if (dateOptionIds.length > 0) {
        await supabaseAdmin
          .from('registration_date_choices')
          .delete()
          .in('date_option_id', dateOptionIds);
      }

      // 2. Delete registrations for this edition
      await supabaseAdmin
        .from('registrations')
        .delete()
        .eq('edition_id', id);

      // 3. Delete date options
      if (sessionIds.length > 0) {
        await supabaseAdmin
          .from('session_date_options')
          .delete()
          .in('session_id', sessionIds);
      }

      // 4. Delete sessions
      await supabaseAdmin
        .from('edition_sessions')
        .delete()
        .eq('edition_id', id);

      // 5. Delete edition
      const { error: deleteError } = await supabaseAdmin
        .from('programme_editions')
        .delete()
        .eq('id', id);

      if (deleteError) {
        console.error('Error deleting edition:', deleteError);
        return NextResponse.json(
          { error: 'Erreur lors de la suppression' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Édition supprimée définitivement',
      });

    } else {
      // Soft delete: archive (set is_active to false)
      const { error: archiveError } = await supabaseAdmin
        .from('programme_editions')
        .update({ is_active: false })
        .eq('id', id);

      if (archiveError) {
        console.error('Error archiving edition:', archiveError);
        return NextResponse.json(
          { error: 'Erreur lors de l\'archivage' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Édition archivée',
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
