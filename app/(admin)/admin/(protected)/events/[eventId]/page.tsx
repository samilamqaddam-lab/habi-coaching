import Link from 'next/link';
import AdminNav from '@/components/admin/AdminNav';
import EventRegistrationCard from '@/components/admin/EventRegistrationCard';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { notFound } from 'next/navigation';

interface EventRegistration {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  payment_requested_at: string | null;
  notes: string | null;
  created_at: string;
}

interface EventData {
  id: string;
  title: string;
  subtitle: string | null;
  badge: string | null;
  date_time: string;
  location: string;
  address: string;
  price: number | null;
  max_capacity: number;
  is_active: boolean;
  created_at: string;
}

interface PageData {
  event: EventData | null;
  registrations: EventRegistration[];
  stats: {
    total: number;
    confirmed: number;
    pending: number;
    cancelled: number;
    remaining: number;
  };
}

async function getEventData(eventId: string): Promise<PageData> {
  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return {
      event: null,
      registrations: [],
      stats: { total: 0, confirmed: 0, pending: 0, cancelled: 0, remaining: 0 },
    };
  }

  try {
    // Get event details
    const { data: event, error: eventError } = await supabaseAdmin
      .from('yoga_events')
      .select('*')
      .eq('id', eventId)
      .single();

    if (eventError || !event) {
      return {
        event: null,
        registrations: [],
        stats: { total: 0, confirmed: 0, pending: 0, cancelled: 0, remaining: 0 },
      };
    }

    // Get registrations for this event
    const { data: registrations, error: regError } = await supabaseAdmin
      .from('event_registrations')
      .select('*')
      .eq('event_id', eventId)
      .order('created_at', { ascending: false });

    if (regError) {
      console.error('Error fetching registrations:', regError);
    }

    const regs = registrations || [];
    const nonCancelled = regs.filter(r => r.status !== 'cancelled');

    const stats = {
      total: nonCancelled.length,
      confirmed: regs.filter(r => r.status === 'confirmed').length,
      pending: regs.filter(r => r.status === 'pending').length,
      cancelled: regs.filter(r => r.status === 'cancelled').length,
      remaining: Math.max(0, event.max_capacity - nonCancelled.length),
    };

    return {
      event,
      registrations: regs,
      stats,
    };
  } catch (error) {
    console.error('Error in getEventData:', error);
    return {
      event: null,
      registrations: [],
      stats: { total: 0, confirmed: 0, pending: 0, cancelled: 0, remaining: 0 },
    };
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  });
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const { event, registrations, stats } = await getEventData(eventId);

  if (!event) {
    notFound();
  }

  const isPast = new Date(event.date_time) < new Date();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <AdminNav />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Back Button */}
          <Link
            href="/admin/events"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-300 mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour aux événements
          </Link>

          {/* Event Header */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-slate-100">
                    {event.title} {event.subtitle || ''}
                  </h1>
                  {event.badge && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-400/20 text-orange-400">
                      {event.badge}
                    </span>
                  )}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isPast
                        ? 'bg-slate-700 text-slate-400'
                        : event.is_active
                        ? 'bg-green-400/10 text-green-400'
                        : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {isPast ? 'Passé' : event.is_active ? 'Actif' : 'Inactif'}
                  </span>
                </div>
                <p className="text-slate-400">
                  📅 {formatDate(event.date_time)}
                </p>
                <p className="text-slate-400">
                  📍 {event.location}, {event.address}
                </p>
                {event.price && (
                  <p className="text-slate-400">
                    💰 {event.price} MAD
                  </p>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t border-slate-700">
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-xs text-slate-500 mb-1">Inscrits (non annulés)</p>
                <p className="text-2xl font-bold text-slate-100">{stats.total}</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-xs text-slate-500 mb-1">Confirmés</p>
                <p className="text-2xl font-bold text-green-400">{stats.confirmed}</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-xs text-slate-500 mb-1">En attente</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-xs text-slate-500 mb-1">Annulés</p>
                <p className="text-2xl font-bold text-red-400">{stats.cancelled}</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <p className="text-xs text-slate-500 mb-1">Places restantes</p>
                <p className="text-2xl font-bold text-blue-400">{stats.remaining} / {event.max_capacity}</p>
              </div>
            </div>
          </div>

          {/* Registrations List */}
          <div>
            <h2 className="text-xl font-semibold text-slate-100 mb-4">
              Inscriptions ({registrations.length})
            </h2>

            {registrations.length === 0 ? (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-12 text-center">
                <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="text-lg font-medium text-slate-300 mb-2">Aucune inscription</h3>
                <p className="text-slate-500">Les inscriptions apparaîtront ici</p>
              </div>
            ) : (
              <div className="space-y-3">
                {registrations.map((registration) => (
                  <EventRegistrationCard
                    key={registration.id}
                    registration={registration}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
