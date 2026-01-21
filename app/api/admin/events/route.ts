import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { z } from 'zod';

// Validation schema for creating an event
const createEventSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  subtitle: z.string().optional(),
  badge: z.string().optional(),
  description: z.string().optional(),
  dateTime: z.string().min(1, 'La date et heure sont requises'),
  durationMinutes: z.coerce.number().int().positive().default(90),
  location: z.string().min(1, 'Le lieu est requis'),
  address: z.string().min(1, "L'adresse est requise"),
  price: z.coerce.number().positive().optional().nullable(),
  maxCapacity: z.coerce.number().int().positive().default(15),
  isActive: z.boolean().default(true),
});

/**
 * GET /api/admin/events
 * Liste tous les événements avec leurs stats
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
    const showArchived = searchParams.get('archived') === 'true';

    // Build query
    let query = supabaseAdmin
      .from('yoga_events')
      .select('*')
      .order('date_time', { ascending: false });

    // Filter active/archived
    if (!showArchived) {
      query = query.eq('is_active', true);
    }

    const { data: events, error } = await query;

    if (error) {
      console.error('Error fetching events:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des événements' },
        { status: 500 }
      );
    }

    // Get registration counts for each event
    const eventIds = events?.map(e => e.id) || [];

    const registrationCounts: Record<string, { total: number; pending: number; confirmed: number }> = {};
    if (eventIds.length > 0) {
      const { data: registrations } = await supabaseAdmin
        .from('event_registrations')
        .select('event_id, status')
        .in('event_id', eventIds)
        .neq('status', 'cancelled');

      if (registrations) {
        registrations.forEach(reg => {
          if (!registrationCounts[reg.event_id]) {
            registrationCounts[reg.event_id] = { total: 0, pending: 0, confirmed: 0 };
          }
          registrationCounts[reg.event_id].total += 1;
          if (reg.status === 'pending') {
            registrationCounts[reg.event_id].pending += 1;
          } else if (reg.status === 'confirmed') {
            registrationCounts[reg.event_id].confirmed += 1;
          }
        });
      }
    }

    // Enhance events with stats
    const eventsWithStats = events?.map(event => {
      const counts = registrationCounts[event.id] || { total: 0, pending: 0, confirmed: 0 };
      const remaining = Math.max(0, event.max_capacity - counts.total);
      const fillRate = event.max_capacity > 0 ? (counts.total / event.max_capacity) * 100 : 0;
      const isPast = new Date(event.date_time) < new Date();

      return {
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
          registrations: counts.total,
          pending: counts.pending,
          confirmed: counts.confirmed,
          remaining,
          fillRate: Math.round(fillRate),
        },
      };
    });

    // Global stats
    const totalRegistrations = Object.values(registrationCounts).reduce((sum, c) => sum + c.total, 0);
    const pendingConfirmations = Object.values(registrationCounts).reduce((sum, c) => sum + c.pending, 0);
    const activeEvents = eventsWithStats?.filter(e => e.isActive && !e.isPast).length || 0;
    const upcomingEvents = eventsWithStats?.filter(e => e.isActive && !e.isPast).length || 0;

    return NextResponse.json({
      events: eventsWithStats,
      total: eventsWithStats?.length || 0,
      globalStats: {
        totalRegistrations,
        pendingConfirmations,
        activeEvents,
        upcomingEvents,
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
 * POST /api/admin/events
 * Crée un nouvel événement
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
    const validationResult = createEventSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Create the event
    const { data: event, error: eventError } = await supabaseAdmin
      .from('yoga_events')
      .insert({
        title: data.title,
        subtitle: data.subtitle || null,
        badge: data.badge || null,
        description: data.description || null,
        date_time: data.dateTime,
        duration_minutes: data.durationMinutes,
        location: data.location,
        address: data.address,
        price: data.price || null,
        max_capacity: data.maxCapacity,
        is_active: data.isActive,
      })
      .select()
      .single();

    if (eventError || !event) {
      console.error('Error creating event:', eventError);
      return NextResponse.json(
        { error: 'Erreur lors de la création de l\'événement' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      event: {
        id: event.id,
        title: event.title,
        dateTime: event.date_time,
        isActive: event.is_active,
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
