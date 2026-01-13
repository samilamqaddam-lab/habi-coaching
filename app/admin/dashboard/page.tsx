import Link from 'next/link';
import AdminNav from '@/components/admin/AdminNav';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

async function getEditionsWithStats() {
  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return [];
  }

  try {
    // Get all editions with their sessions and registration counts
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
      return [];
    }

    // Get registration counts for each edition
    const editionsWithStats = await Promise.all(
      (editions || []).map(async (edition) => {
        // Count total registrations (not cancelled)
        const { count: registrationCount } = await supabaseAdmin!
          .from('registrations')
          .select('*', { count: 'exact', head: true })
          .eq('edition_id', edition.id)
          .neq('status', 'cancelled');

        // Get total capacity (sum of all date options max_capacity)
        const { data: sessions } = await supabaseAdmin!
          .from('edition_sessions')
          .select(`
            id,
            session_date_options (
              max_capacity
            )
          `)
          .eq('edition_id', edition.id);

        // Calculate total capacity and remaining spots
        let totalCapacity = 0;
        if (sessions) {
          sessions.forEach((session: any) => {
            if (session.session_date_options) {
              const dateOptions = Array.isArray(session.session_date_options)
                ? session.session_date_options
                : [session.session_date_options];
              dateOptions.forEach((option: any) => {
                totalCapacity += option.max_capacity || 0;
              });
            }
          });
        }

        const registrations = registrationCount || 0;
        const remaining = Math.max(0, totalCapacity - registrations);
        const fillRate = totalCapacity > 0 ? (registrations / totalCapacity) * 100 : 0;

        return {
          ...edition,
          stats: {
            registrations,
            totalCapacity,
            remaining,
            fillRate: Math.round(fillRate),
          },
        };
      })
    );

    return editionsWithStats;
  } catch (error) {
    console.error('Error in getEditionsWithStats:', error);
    return [];
  }
}

export default async function AdminDashboardPage() {
  const editions = await getEditionsWithStats();

  // Calculate global stats
  const totalRegistrations = editions.reduce((sum, e) => sum + e.stats.registrations, 0);
  const totalCapacity = editions.reduce((sum, e) => sum + e.stats.totalCapacity, 0);
  const totalRemaining = editions.reduce((sum, e) => sum + e.stats.remaining, 0);
  const globalFillRate = totalCapacity > 0 ? Math.round((totalRegistrations / totalCapacity) * 100) : 0;

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
              Dashboard Événements
            </h1>
            <p className="text-slate-400">
              Gérez les inscriptions de vos cours collectifs
            </p>
          </div>

          {/* Global Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium">Inscriptions</span>
                <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-slate-100">{totalRegistrations}</p>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium">Capacité Totale</span>
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-slate-100">{totalCapacity}</p>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium">Places Restantes</span>
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-slate-100">{totalRemaining}</p>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium">Taux Remplissage</span>
                <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-slate-100">{globalFillRate}%</p>
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
                      <p className="text-xs text-slate-500 mb-1">Inscriptions</p>
                      <p className="text-2xl font-bold text-slate-100">{edition.stats.registrations}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Capacité</p>
                      <p className="text-2xl font-bold text-slate-100">{edition.stats.totalCapacity}</p>
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
