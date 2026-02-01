'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { TagBadgeList } from '@/components/ui/TagBadge';
import type { Article } from '@/lib/types';

interface ArticleWithStats extends Article {
  // Future: could add view counts, etc.
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<ArticleWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDrafts, setShowDrafts] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingArticleId, setDeletingArticleId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (!showDrafts) params.set('drafts', 'false');
      if (searchTerm) params.set('search', searchTerm);

      const response = await fetch(`/api/admin/articles?${params}`);
      if (!response.ok) throw new Error('Failed to fetch articles');

      const data = await response.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setIsLoading(false);
    }
  }, [showDrafts, searchTerm]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleDelete = async (articleId: string) => {
    setDeletingArticleId(articleId);
    try {
      const response = await fetch(`/api/admin/articles/${articleId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete article');

      // Refresh list
      await fetchArticles();
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Erreur lors de la suppression de l\'article');
    } finally {
      setDeletingArticleId(null);
    }
  };

  const stats = {
    total: articles.length,
    published: articles.filter(a => a.is_published).length,
    drafts: articles.filter(a => !a.is_published).length,
    featured: articles.filter(a => a.featured).length,
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Articles</h1>
            <p className="text-slate-400 mt-1">Gérer les articles et actualités du blog</p>
          </div>
          <Link
            href="/admin/articles/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Nouvel Article
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
              <div className="text-sm text-slate-400">Publiés</div>
              <span className="text-2xl">✅</span>
            </div>
            <div className="text-2xl font-bold text-green-400">{stats.published}</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-slate-400">Brouillons</div>
              <span className="text-2xl">📋</span>
            </div>
            <div className="text-2xl font-bold text-slate-300">{stats.drafts}</div>
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
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 text-slate-100 placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showDrafts}
                onChange={(e) => setShowDrafts(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-slate-300">Afficher les brouillons</span>
            </label>
          </div>
        </div>

        {/* Articles Table */}
        {isLoading ? (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-slate-400 mt-4">Chargement des articles...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
            <span className="text-5xl mb-4 block">📝</span>
            <p className="text-slate-400">Aucun article trouvé.</p>
            <Link
              href="/admin/articles/new"
              className="inline-block mt-4 text-blue-400 hover:underline"
            >
              Créer le premier article
            </Link>
          </div>
        ) : (
          <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-slate-700">
              <thead className="bg-slate-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    📝 Article
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    🏷️ Tags
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    📅 Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-slate-800 divide-y divide-slate-700">
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {article.featured_image_url && (
                          <img
                            src={article.featured_image_url}
                            alt=""
                            className="h-10 w-16 object-cover rounded mr-3 border border-slate-600"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-slate-100">{article.title}</div>
                          <div className="text-sm text-slate-400 font-mono">{article.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {article.tags && article.tags.length > 0 ? (
                        <TagBadgeList tags={article.tags} limit={2} size="sm" />
                      ) : (
                        <span className="text-sm text-slate-500">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            article.is_published
                              ? 'bg-green-900/30 text-green-400 border border-green-700'
                              : 'bg-slate-700 text-slate-300 border border-slate-600'
                          }`}
                        >
                          {article.is_published ? '✅ Publié' : '📋 Brouillon'}
                        </span>
                        {article.featured && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-900/30 text-blue-400 border border-blue-700">
                            ⭐ Vedette
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                      {article.published_at
                        ? formatDate(article.published_at)
                        : formatDate(article.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/articles/${article.id}/edit`}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          ✏️ Modifier
                        </Link>
                        <button
                          onClick={() => setShowDeleteConfirm(article.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                          disabled={deletingArticleId === article.id}
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
                Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
                  disabled={deletingArticleId !== null}
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                  disabled={deletingArticleId !== null}
                >
                  {deletingArticleId === showDeleteConfirm ? '⏳ Suppression...' : '🗑️ Supprimer'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
