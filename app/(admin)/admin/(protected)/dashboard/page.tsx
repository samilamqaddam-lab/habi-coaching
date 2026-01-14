import Link from 'next/link';
import AdminNav from '@/components/admin/AdminNav';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

interface DashboardData {
  editions: Array<{
    id: string;
    programme_key: string;
    title: string;
    title_en: string | null;
    start_date: string;
    max_capacity: number;
    is_active: boolean;
    created_at: string;
    stats: {
      registrations: number;
      maxInscriptions: number;
      remaining: number;
      fillRate: number;
    };
  }>;
  globalStats: {
    totalRegistrations: number;
    activeEvents: number;
    pendingConfirmations: number;
    thisWeekRegistrations: number;
  };
}

async function getDashboardData(): Promise<DashboardData> {
  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return { editions: [], globalStats: { totalRegistrations: 0, activeEvents: 0, pendingConfirmations: 0, thisWeekRegistrations: 0 } };
  }

  try {
    // Get all editions
    const { data: editions, error } = await supabaseAdmin!
      .from('programme_editions')
      .select(`
        id,
        programme_key,
        title,
        title_en,
        start_date,
        max_capacity,
        is_active,
        created_at
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching editions:', error);
      return { editions: [], globalStats: { totalRegistrations: 0, activeEvents: 0, pendingConfirmations: 0, thisWeekRegistrations: 0 } };
    }

    // Get global stats
    const { count: totalRegistrations } = await supabaseAdmin!
      .from('registrations')
      .select('*', { count: 'exact', head: true })
      .neq('status', 'cancelled');

    const { count: pendingConfirmations } = await supabaseAdmin!
      .from('registrations')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    // Get registrations from last 7 days
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const { count: thisWeekRegistrations } = await supabaseAdmin!
      .from('registrations')
      .select('*', { count: 'exact', head: true })
      .neq('status', 'cancelled')
      .gte('created_at', oneWeekAgo.toISOString());

    const activeEvents = (editions || []).filter(e => e.is_active).length;

    // Get registration counts for each edition
    const editionsWithStats = await Promise.all(
      (editions || []).map(async (edition) => {
        const { count: registrationCount } = await supabaseAdmin!
          .from('registrations')
          .select('*', { count: 'exact', head: true })
          .eq('edition_id', edition.id)
          .neq('status', 'cancelled');

        const { data: sessions } = await supabaseAdmin!
          .from('edition_sessions')
          .select(`
            id,
            session_date_options (
              max_capacity
            )
          `)
          .eq('edition_id', edition.id);

        let maxInscriptions = edition.max_capacity || 20;
        if (sessions && sessions.length > 0) {
          let minDateCapacity = Infinity;
          sessions.forEach((session: any) => {
            if (session.session_date_options) {
              const dateOptions = Array.isArray(session.session_date_options)
                ? session.session_date_options
                : [session.session_date_options];
              dateOptions.forEach((option: any) => {
                minDateCapacity = Math.min(minDateCapacity, option.max_capacity || 10);
              });
            }
          });
          maxInscriptions = minDateCapacity !== Infinity ? minDateCapacity : 20;
        }

        const registrations = registrationCount || 0;
        const remaining = Math.max(0, maxInscriptions - registrations);
        const fillRate = maxInscriptions > 0 ? (registrations / maxInscriptions) * 100 : 0;

        return {
          ...edition,
          stats: {
            registrations,
            maxInscriptions,
            remaining,
            fillRate: Math.round(fillRate),
          },
        };
      })
    );

    return {
      editions: editionsWithStats,
      globalStats: {
        totalRegistrations: totalRegistrations || 0,
        activeEvents,
        pendingConfirmations: pendingConfirmations || 0,
        thisWeekRegistrations: thisWeekRegistrations || 0,
      },
    };
  } catch (error) {
    console.error('Error in getDashboardData:', error);
    return { editions: [], globalStats: { totalRegistrations: 0, activeEvents: 0, pendingConfirmations: 0, thisWeekRegistrations: 0 } };
  }
}

export default async function AdminDashboardPage() {
  const { editions, globalStats } = await getDashboardData();

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
            <h1 className="text-3xl font-bold text-slate-100 mb-2">
              Gestion des Participations
            </h1>
            <p className="text-slate-400">
              Suivez les inscriptions et gérez les participants de vos événements
            </p>
          </div>

          {/* Global Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium">Inscriptions totales</span>
                <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-slate-100">{globalStats.totalRegistrations}</p>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium">Événements actifs</span>
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-slate-100">{globalStats.activeEvents}</p>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium">À confirmer</span>
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-slate-100">{globalStats.pendingConfirmations}</p>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium">Cette semaine</span>
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-slate-100">{globalStats.thisWeekRegistrations}</p>
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-100 mb-4">Événements</h2>

            {editions.length === 0 ? (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-12 text-center">
                <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-medium text-slate-300 mb-2">Aucun événement</h3>
                <p className="text-slate-500">Les événements apparaîtront ici une fois créés dans Supabase</p>
              </div>
            ) : (
              editions.map((edition) => (
                <div
                  key={edition.id}
                  className="bg-slate-800 rounded-xl border border-slate-700 p-6 hover:border-slate-600 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-100">
                          {edition.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            edition.is_active
                              ? 'bg-green-400/10 text-green-400'
                              : 'bg-slate-700 text-slate-400'
                          }`}
                        >
                          {edition.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400">
                        Programme: {edition.programme_key}
                      </p>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Inscrits</p>
                      <p className="text-2xl font-bold text-slate-100">{edition.stats.registrations}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Max</p>
                      <p className="text-2xl font-bold text-slate-100">{edition.stats.maxInscriptions}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Restantes</p>
                      <p className="text-2xl font-bold text-slate-100">{edition.stats.remaining}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Taux</p>
                      <p className="text-2xl font-bold text-slate-100">{edition.stats.fillRate}%</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/dashboard/${edition.id}`}
                      className="flex-1 bg-orange-400 hover:bg-orange-500 text-slate-900 font-medium py-2 px-4 rounded-lg transition-colors text-center"
                    >
                      Voir Inscriptions
                    </Link>
                    <Link
                      href={`/admin/dashboard/${edition.id}/export`}
                      className="bg-slate-700 hover:bg-slate-600 text-slate-100 font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Export CSV
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
