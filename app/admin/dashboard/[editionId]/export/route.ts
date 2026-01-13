import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

interface RouteContext {
  params: Promise<{
    editionId: string;
  }>;
}

function formatDateForCSV(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function escapeCSV(value: string | null): string {
  if (!value) return '';
  // Escape quotes and wrap in quotes if contains comma, quote, or newline
  const escaped = value.replace(/"/g, '""');
  if (escaped.includes(',') || escaped.includes('"') || escaped.includes('\n')) {
    return `"${escaped}"`;
  }
  return escaped;
}

export async function GET(request: NextRequest, context: RouteContext) {
  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return new NextResponse('Service unavailable', { status: 503 });
  }

  try {
    const { editionId } = await context.params;

    // Get edition details
    const { data: edition, error: editionError } = await supabaseAdmin!
      .from('programme_editions')
      .select('title, programme_key')
      .eq('id', editionId)
      .single();

    if (editionError || !edition) {
      return new NextResponse('Edition not found', { status: 404 });
    }

    // Get all registrations
    const { data: registrations, error: registrationsError } = await supabaseAdmin!
      .from('registrations')
      .select(`
        id,
        first_name,
        last_name,
        email,
        phone,
        whatsapp,
        message,
        status,
        created_at
      `)
      .eq('edition_id', editionId)
      .order('created_at', { ascending: false });

    if (registrationsError) {
      return new NextResponse('Error fetching registrations', { status: 500 });
    }

    // For each registration, get selected dates
    const registrationsWithDates = await Promise.all(
      (registrations || []).map(async (registration) => {
        const { data: dateChoices } = await supabaseAdmin!
          .from('registration_date_choices')
          .select(`
            date_option_id,
            session_date_options (
              date_time,
              edition_sessions (
                session_number
              )
            )
          `)
          .eq('registration_id', registration.id);

        const formattedChoices = (dateChoices || [])
          .map((choice: any) => ({
            session_number: choice.session_date_options?.edition_sessions?.session_number || 0,
            date_time: choice.session_date_options?.date_time || '',
          }))
          .sort((a, b) => a.session_number - b.session_number);

        return {
          ...registration,
          date_choices: formattedChoices,
        };
      })
    );

    // Build CSV
    const headers = [
      'Prénom',
      'Nom',
      'Email',
      'Téléphone',
      'WhatsApp',
      'Statut',
      'Date Inscription',
      'Session 1',
      'Session 2',
      'Session 3',
      'Message',
    ];

    const rows = registrationsWithDates.map((reg) => {
      const session1 = reg.date_choices.find(c => c.session_number === 1);
      const session2 = reg.date_choices.find(c => c.session_number === 2);
      const session3 = reg.date_choices.find(c => c.session_number === 3);

      return [
        escapeCSV(reg.first_name),
        escapeCSV(reg.last_name),
        escapeCSV(reg.email),
        escapeCSV(reg.phone),
        escapeCSV(reg.whatsapp),
        escapeCSV(
          reg.status === 'confirmed'
            ? 'Confirmée'
            : reg.status === 'pending'
            ? 'En attente'
            : 'Annulée'
        ),
        escapeCSV(formatDateForCSV(reg.created_at)),
        escapeCSV(session1 ? formatDateForCSV(session1.date_time) : ''),
        escapeCSV(session2 ? formatDateForCSV(session2.date_time) : ''),
        escapeCSV(session3 ? formatDateForCSV(session3.date_time) : ''),
        escapeCSV(reg.message),
      ];
    });

    // Generate CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    // Add BOM for proper UTF-8 encoding in Excel
    const bom = '\uFEFF';
    const csvWithBom = bom + csvContent;

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `inscriptions-${edition.programme_key}-${timestamp}.csv`;

    return new NextResponse(csvWithBom, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    return new NextResponse('Export failed', { status: 500 });
  }
}
