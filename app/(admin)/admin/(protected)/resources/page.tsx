'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { TagBadgeList } from '@/components/ui/TagBadge';
import type { Resource, ResourceType } from '@/lib/types';

const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  video: '🎥 Vidéo',
  pdf: '📄 PDF',
  link: '🔗 Lien',
  audio: '🎵 Audio',
};

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showInactive, setShowInactive] = useState(false);
  const [typeFilter, setTypeFilter] = useState<ResourceType | ''>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingResourceId, setDeletingResourceId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const fetchResources = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (showInactive) params.set('inactive', 'true');
      if (typeFilter) params.set('type', typeFilter);
      if (searchTerm) params.set('search', searchTerm);

      const response = await fetch(`/api/admin/resources?${params}`);
      if (!response.ok) throw new Error('Failed to fetch resources');

      const data = await response.json();
      setResources(data.resources || []);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setIsLoading(false);
    }
  }, [showInactive, typeFilter, searchTerm]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const handleDelete = async (resourceId: string) => {
    setDeletingResourceId(resourceId);
    try {
      const response = await fetch(`/api/admin/resources/${resourceId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete resource');

      await fetchResources();
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting resource:', error);
      alert('Erreur lors de la suppression de la ressource');
    } finally {
      setDeletingResourceId(null);
    }
  };

  const stats = {
    total: resources.length,
    videos: resources.filter(r => r.resource_type === 'video').length,
    pdfs: resources.filter(r => r.resource_type === 'pdf').length,
    featured: resources.filter(r => r.featured).length,
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Ressources</h1>
            <p className="text-slate-400 mt-1">Gérer les vidéos, PDFs et autres ressources éducatives</p>
          </div>
          <Link
            href="/admin/resources/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Nouvelle Ressource
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-400">Total</div>
              <span className="text-2xl">📊</span>
            </div>
            <div className="text-2xl font-bold text-slate-100">{stats.total}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-400">Vidéos</div>
              <span className="text-2xl">🎥</span>
            </div>
            <div className="text-2xl font-bold text-red-400">{stats.videos}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-400">PDFs</div>
              <span className="text-2xl">📄</span>
            </div>
            <div className="text-2xl font-bold text-orange-400">{stats.pdfs}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-400">En vedette</div>
              <span className="text-2xl">⭐</span>
            </div>
            <div className="text-2xl font-bold text-blue-400">{stats.featured}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
              <input
                type="text"
                placeholder="Rechercher une ressource..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 text-slate-100 placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as ResourceType | '')}
              className="px-4 py-2 bg-slate-700 border border-slate-600 text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">📦 Tous les types</option>
              <option value="video">🎥 Vidéos</option>
              <option value="pdf">📄 PDFs</option>
              <option value="link">🔗 Liens</option>
              <option value="audio">🎵 Audios</option>
            </select>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showInactive}
                onChange={(e) => setShowInactive(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-slate-300">Inactives</span>
            </label>
          </div>
        </div>

        {/* Resources Table */}
        {isLoading ? (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-slate-400 mt-4">Chargement des ressources...</p>
          </div>
        ) : resources.length === 0 ? (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
            <span className="text-5xl mb-4 block">📦</span>
            <p className="text-slate-400">Aucune ressource trouvée.</p>
            <Link
              href="/admin/resources/new"
              className="inline-block mt-4 text-blue-400 hover:underline"
            >
              Créer la première ressource
            </Link>
          </div>
        ) : (
          <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-slate-700">
              <thead className="bg-slate-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    📦 Ressource
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    🏷️ Tags
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-slate-800 divide-y divide-slate-700">
                {resources.map((resource) => (
                  <tr key={resource.id} className="hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {resource.thumbnail_url && (
                          <img
                            src={resource.thumbnail_url}
                            alt=""
                            className="h-10 w-16 object-cover rounded mr-3 border border-slate-600"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-slate-100">{resource.title}</div>
                          {resource.duration_minutes && (
                            <div className="text-xs text-slate-400">⏱️ {resource.duration_minutes} min</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-slate-300">
                        {RESOURCE_TYPE_LABELS[resource.resource_type]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {resource.tags && resource.tags.length > 0 ? (
                        <TagBadgeList tags={resource.tags} limit={2} size="sm" />
                      ) : (
                        <span className="text-sm text-slate-500">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            resource.is_active
                              ? 'bg-green-900/30 text-green-400 border border-green-700'
                              : 'bg-slate-700 text-slate-400 border border-slate-600'
                          }`}
                        >
                          {resource.is_active ? '✅ Active' : '⏸️ Inactive'}
                        </span>
                        {resource.featured && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-900/30 text-blue-400 border border-blue-700">
                            ⭐ Vedette
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-slate-300 transition-colors"
                        >
                          👁️ Voir
                        </a>
                        <Link
                          href={`/admin/resources/${resource.id}/edit`}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          ✏️ Modifier
                        </Link>
                        <button
                          onClick={() => setShowDeleteConfirm(resource.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                          disabled={deletingResourceId === resource.id}
                        >
                          🗑️ Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">⚠️</span>
                <h3 className="text-lg font-bold text-slate-100">Confirmer la suppression</h3>
              </div>
              <p className="text-slate-300 mb-6">
                Êtes-vous sûr de vouloir supprimer cette ressource ? Cette action est irréversible.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
                  disabled={deletingResourceId !== null}
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                  disabled={deletingResourceId !== null}
                >
                  {deletingResourceId === showDeleteConfirm ? '⏳ Suppression...' : '🗑️ Supprimer'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
