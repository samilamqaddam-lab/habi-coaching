import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdminNav from '@/components/admin/AdminNav';
import RegistrationCard from '@/components/admin/RegistrationCard';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

interface Registration {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  whatsapp: string | null;
  message: string | null;
  status: 'pending' | 'confirmed' | 'cancelled';
  payment_request_sent: boolean;
  created_at: string;
  date_choices: Array<{
    session_number: number;
    date_time: string;
  }>;
}

async function getEditionWithRegistrations(editionId: string) {
  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return null;
  }

  try {
    // Get edition details
    const { data: edition, error: editionError } = await supabaseAdmin!
      .from('programme_editions')
      .select('id, programme_key, title, title_en, start_date, is_active')
      .eq('id', editionId)
      .single();

    if (editionError || !edition) {
      return null;
    }

    // Get all registrations for this edition
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
        payment_request_sent,
        created_at
      `)
      .eq('edition_id', editionId)
      .order('created_at', { ascending: false });

    if (registrationsError) {
      console.error('Error fetching registrations:', registrationsError);
      return { edition, registrations: [] };
    }

    // For each registration, get the selected dates
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

        const formattedChoices = (dateChoices || []).map((choice: any) => ({
          session_number: choice.session_date_options?.edition_sessions?.session_number || 0,
          date_time: choice.session_date_options?.date_time || '',
        })).sort((a, b) => a.session_number - b.session_number);

        return {
          ...registration,
          date_choices: formattedChoices,
        };
      })
    );

    return {
      edition,
      registrations: registrationsWithDates,
    };
  } catch (error) {
    console.error('Error in getEditionWithRegistrations:', error);
    return null;
  }
}

export default async function EditionRegistrationsPage({
  params,
}: {
  params: Promise<{ editionId: string }>;
}) {
  const { editionId } = await params;
  const data = await getEditionWithRegistrations(editionId);

  if (!data) {
    notFound();
  }

  const { edition, registrations } = data;

  // Calculate stats
  const totalRegistrations = registrations.length;
  const confirmedCount = registrations.filter(r => r.status === 'confirmed').length;
  const pendingCount = registrations.filter(r => r.status === 'pending').length;
  const cancelledCount = registrations.filter(r => r.status === 'cancelled').length;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <AdminNav />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-300 transition-colors mb-4"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour à la gestion des participations
            </Link>

            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-100 mb-2">
                  {edition.title}
                </h1>
                <p className="text-slate-400">
                  Programme: {edition.programme_key}
                </p>
              </div>

              <Link
                href={`/admin/dashboard/${edition.id}/export`}
                className="bg-orange-400 hover:bg-orange-500 text-slate-900 font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Export CSV
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium">Total</span>
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-slate-100">{totalRegistrations}</p>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium">Confirmées</span>
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-slate-100">{confirmedCount}</p>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium">En Attente</span>
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-slate-100">{pendingCount}</p>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium">Annulées</span>
                <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-slate-100">{cancelledCount}</p>
            </div>
          </div>

          {/* Registrations List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-100 mb-4">Inscriptions</h2>

            {registrations.length === 0 ? (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-12 text-center">
                <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-slate-300 mb-2">Aucune inscription</h3>
                <p className="text-slate-500">Les inscriptions apparaîtront ici</p>
              </div>
            ) : (
              <div className="space-y-2">
                {registrations.map((registration) => (
                  <RegistrationCard key={registration.id} registration={registration} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
