'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminNav from '@/components/admin/AdminNav';
import { PROGRAMMES_CONFIG, type ProgrammeConfig } from '@/lib/programmes-config';

interface EditionStats {
  totalSessions: number;
  totalDateOptions: number;
  maxParticipants: number;
  registrations: number;
}

interface Edition {
  id: string;
  programme_key: string;
  title: string;
  title_en?: string;
  start_date: string;
  max_capacity: number;
  is_active: boolean;
  created_at: string;
  stats: EditionStats;
  programmeConfig?: ProgrammeConfig;
}

export default function EditionsListPage() {
  const [editions, setEditions] = useState<Edition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [programmeFilter, setProgrammeFilter] = useState<string>('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchEditions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (showArchived) params.set('archived', 'true');
      if (programmeFilter) params.set('programme', programmeFilter);

      const response = await fetch(`/api/admin/editions?${params.toString()}`);
      if (!response.ok) throw new Error('Erreur lors du chargement');

      const data = await response.json();
      setEditions(data.editions || []);
      setError(null);
    } catch (err) {
      setError('Impossible de charger les éditions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEditions();
  }, [showArchived, programmeFilter]);

  const handleArchive = async (editionId: string, isActive: boolean) => {
    if (!confirm(isActive ? 'Archiver cette édition ?' : 'Réactiver cette édition ?')) return;

    setActionLoading(editionId);
    try {
      const response = await fetch(`/api/admin/editions/${editionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive }),
      });

      if (!response.ok) throw new Error('Erreur lors de la mise à jour');

      await fetchEditions();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la mise à jour');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (editionId: string, registrationCount: number) => {
    let confirmMessage = 'Supprimer définitivement cette édition ? Cette action est irréversible.';

    if (registrationCount > 0) {
      confirmMessage = `⚠️ ATTENTION: Cette édition a ${registrationCount} inscription(s).\n\nSupprimer cette édition supprimera également TOUTES les inscriptions associées.\n\nÊtes-vous sûr de vouloir continuer ?`;
    }

    if (!confirm(confirmMessage)) return;

    setActionLoading(editionId);
    try {
      const response = await fetch(`/api/admin/editions/${editionId}?hard=true`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erreur lors de la suppression');

      await fetchEditions();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression');
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-100 mb-2">
                Gestion des Éditions
              </h1>
              <p className="text-slate-400">
                Créez et gérez les éditions de vos programmes
              </p>
            </div>
            <Link
              href="/admin/editions/new"
              className="flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-slate-900 font-medium py-3 px-6 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nouvelle Édition
            </Link>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <label className="text-sm text-slate-400">Programme:</label>
              <select
                value={programmeFilter}
                onChange={(e) => setProgrammeFilter(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-orange-400"
              >
                <option value="">Tous</option>
                {Object.entries(PROGRAMMES_CONFIG)
                  .filter(([, config]) => config.supportsEditions)
                  .map(([key, config]) => (
                    <option key={key} value={key}>
                      {config.icon} {config.name}
                    </option>
                  ))}
              </select>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showArchived}
                onChange={(e) => setShowArchived(e.target.checked)}
                className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-orange-400 focus:ring-orange-400"
              />
              <span className="text-sm text-slate-400">Afficher les archivées</span>
            </label>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400"></div>
            </div>
          ) : error ? (
            <div className="bg-red-400/10 border border-red-400/20 rounded-xl p-6 text-center">
              <p className="text-red-400">{error}</p>
              <button
                onClick={fetchEditions}
                className="mt-4 text-sm text-orange-400 hover:underline"
              >
                Réessayer
              </button>
            </div>
          ) : editions.length === 0 ? (
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-12 text-center">
              <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-medium text-slate-300 mb-2">Aucune édition</h3>
              <p className="text-slate-500 mb-6">
                {showArchived
                  ? 'Aucune édition archivée trouvée'
                  : 'Créez votre première édition pour commencer'}
              </p>
              {!showArchived && (
                <Link
                  href="/admin/editions/new"
                  className="inline-flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-slate-900 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Créer une édition
                </Link>
              )}
            </div>
          ) : (
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">
                      Programme
                    </th>
                    <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">
                      Titre
                    </th>
                    <th className="text-center text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">
                      Sessions
                    </th>
                    <th className="text-center text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">
                      Inscrits
                    </th>
                    <th className="text-center text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">
                      Statut
                    </th>
                    <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {editions.map((edition) => {
                    const config = edition.programmeConfig || PROGRAMMES_CONFIG[edition.programme_key];
                    return (
                      <tr key={edition.id} className="hover:bg-slate-700/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{config?.icon || '📅'}</span>
                            <span className="text-slate-100 font-medium">{config?.name || edition.programme_key}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-slate-100">{edition.title}</p>
                            <p className="text-xs text-slate-500">{formatDate(edition.start_date)}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-slate-100">{edition.stats.totalSessions}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-slate-100">
                            {edition.stats.registrations}
                            {edition.stats.maxParticipants > 0 && (
                              <span className="text-slate-500">/{edition.stats.maxParticipants}</span>
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                              edition.is_active
                                ? 'bg-green-400/10 text-green-400'
                                : 'bg-slate-700 text-slate-400'
                            }`}
                          >
                            {edition.is_active ? 'Active' : 'Archivée'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/editions/${edition.id}`}
                              className="p-2 text-slate-400 hover:text-orange-400 transition-colors"
                              title="Modifier"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </Link>
                            <Link
                              href={`/admin/dashboard/${edition.id}`}
                              className="p-2 text-slate-400 hover:text-blue-400 transition-colors"
                              title="Voir inscriptions"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            </Link>
                            <button
                              onClick={() => handleArchive(edition.id, edition.is_active)}
                              disabled={actionLoading === edition.id}
                              className="p-2 text-slate-400 hover:text-yellow-400 transition-colors disabled:opacity-50"
                              title={edition.is_active ? 'Archiver' : 'Réactiver'}
                            >
                              {edition.is_active ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                              )}
                            </button>
                            <button
                              onClick={() => handleDelete(edition.id, edition.stats.registrations)}
                              disabled={actionLoading === edition.id}
                              className="p-2 text-slate-400 hover:text-red-400 transition-colors disabled:opacity-50"
                              title="Supprimer"
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
