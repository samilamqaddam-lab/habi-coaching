import AdminNav from '@/components/admin/AdminNav';
import IndividualYogaRequestsList from '@/components/admin/IndividualYogaRequestsList';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

interface YogaStats {
  total: number;
  pending: number;
  confirmed: number;
  cancelled: number;
  thisWeek: number;
}

async function getYogaStats(): Promise<YogaStats> {
  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return { total: 0, pending: 0, confirmed: 0, cancelled: 0, thisWeek: 0 };
  }

  try {
    const { data: requests, error } = await supabaseAdmin
      .from('individual_yoga_requests')
      .select('status, created_at');

    if (error) {
      console.error('Error fetching stats:', error);
      return { total: 0, pending: 0, confirmed: 0, cancelled: 0, thisWeek: 0 };
    }

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const stats = {
      total: requests?.length || 0,
      pending: requests?.filter(r => r.status === 'pending').length || 0,
      confirmed: requests?.filter(r => r.status === 'confirmed').length || 0,
      cancelled: requests?.filter(r => r.status === 'cancelled').length || 0,
      thisWeek: requests?.filter(r => new Date(r.created_at) >= oneWeekAgo).length || 0,
    };

    return stats;
  } catch (error) {
    console.error('Error in getYogaStats:', error);
    return { total: 0, pending: 0, confirmed: 0, cancelled: 0, thisWeek: 0 };
  }
}

export default async function YogaIndividuelAdminPage() {
  const stats = await getYogaStats();

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
              Yoga Individuel
            </h1>
            <p className="text-slate-400">
              Gérez les demandes de cours individuels de yoga
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium">Total</span>
                <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-slate-100">{stats.total}</p>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium">En attente</span>
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-slate-100">{stats.pending}</p>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium">Confirmés</span>
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-slate-100">{stats.confirmed}</p>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium">Annulés</span>
                <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-slate-100">{stats.cancelled}</p>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium">Cette semaine</span>
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-slate-100">{stats.thisWeek}</p>
            </div>
          </div>

          {/* Requests List */}
          <IndividualYogaRequestsList />
        </div>
      </div>
    </div>
  );
}
