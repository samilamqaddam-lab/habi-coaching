'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RichTextEditor from '@/components/admin/RichTextEditor';
import ImageUpload from '@/components/admin/ImageUpload';
import AdminTagSelector from '@/components/admin/AdminTagSelector';
import type { Article, ArticleFormData } from '@/lib/types';

interface ArticleFormProps {
  article?: Article; // For edit mode
  mode: 'create' | 'edit';
}

export default function ArticleForm({ article, mode }: ArticleFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<Partial<ArticleFormData>>({
    title: article?.title || '',
    slug: article?.slug || '',
    excerpt: article?.excerpt || '',
    content: article?.content || { type: 'html', html: '' },
    featured_image_url: article?.featured_image_url || '',
    thumbnail_url: article?.thumbnail_url || '',
    tags: article?.tags || [],
    author_name: article?.author_name || 'Hajar Habi',
    read_time_minutes: article?.read_time_minutes || undefined,
    related_event_id: article?.related_event_id || undefined,
    related_programme_key: article?.related_programme_key || undefined,
    is_published: article?.is_published || false,
    featured: article?.featured || false,
    published_at: article?.published_at || undefined,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update formData when article prop changes (for edit mode)
  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title || '',
        slug: article.slug || '',
        excerpt: article.excerpt || '',
        content: article.content || { type: 'html', html: '' },
        featured_image_url: article.featured_image_url || '',
        thumbnail_url: article.thumbnail_url || '',
        tags: article.tags || [],
        author_name: article.author_name || 'Hajar Habi',
        read_time_minutes: article.read_time_minutes || undefined,
        related_event_id: article.related_event_id || undefined,
        related_programme_key: article.related_programme_key || undefined,
        is_published: article.is_published || false,
        featured: article.featured || false,
        published_at: article.published_at || undefined,
      });
    }
  }, [article]);

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
  };

  // Auto-generate excerpt from HTML content (strip tags, take first 160 chars)
  const generateExcerpt = (htmlContent: string): string => {
    if (!htmlContent) return '';

    // Create a temporary div to parse HTML and extract text
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    // Get plain text without HTML tags
    const plainText = tempDiv.textContent || tempDiv.innerText || '';

    // Clean up extra whitespace
    const cleanedText = plainText
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();

    // Take first 160 characters and add ellipsis if needed
    return cleanedText.length > 160
      ? cleanedText.substring(0, 160).trim() + '...'
      : cleanedText;
  };

  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      // Auto-generate slug from title unless user has manually edited it
      ...(!isSlugManuallyEdited ? { slug: generateSlug(title) } : {}),
    }));
  };

  const handleSlugChange = (slug: string) => {
    setIsSlugManuallyEdited(true);
    setFormData((prev) => ({
      ...prev,
      slug: generateSlug(slug),
    }));
  };

  const handleContentChange = (htmlContent: string) => {
    setFormData((prev) => ({
      ...prev,
      content: {
        type: 'html',
        html: htmlContent,
      },
      excerpt: generateExcerpt(htmlContent), // Auto-generate excerpt
    }));
  };

  const handleToggleTag = (tagId: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.includes(tagId)
        ? prev.tags.filter((id) => id !== tagId)
        : [...(prev.tags || []), tagId],
    }));
  };

  const handleSetTags = (tags: string[]) => {
    setFormData((prev) => ({
      ...prev,
      tags,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const url = mode === 'create' ? '/api/admin/articles' : `/api/admin/articles/${article?.id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save article');
      }

      // Redirect to articles list
      router.push('/admin/articles');
    } catch (err) {
      console.error('Error saving article:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-900/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Titre *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
          placeholder="Le titre de l'article..."
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Slug (URL) *
        </label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => handleSlugChange(e.target.value)}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
          placeholder="mon-article-slug"
          required
        />
        <p className="text-xs text-slate-400 mt-1">
          💡 Le slug est généré automatiquement à partir du titre, mais vous pouvez le personnaliser
        </p>
        <p className="text-xs text-slate-400 mt-1">
          URL de l'article : /blog/{formData.slug || 'mon-article-slug'}
        </p>
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Contenu de l'article *
        </label>
        <RichTextEditor
          key={article?.id || 'new'}
          value={formData.content?.html || ''}
          onChange={handleContentChange}
          placeholder="Commencez à écrire le contenu de l'article..."
        />
      </div>

      {/* Excerpt (Auto-generated, read-only) */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Extrait (généré automatiquement)
        </label>
        <div className="w-full px-4 py-3 bg-slate-800 border border-slate-600 text-slate-300 rounded-lg text-sm">
          {formData.excerpt || <span className="text-slate-500 italic">L'extrait sera généré automatiquement à partir du contenu...</span>}
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Les 160 premiers caractères du contenu (texte brut sans balises HTML)
        </p>
      </div>

      {/* Image */}
      <div>
        <ImageUpload
          label="Image de l'article"
          value={formData.featured_image_url}
          onChange={(url) => setFormData({ ...formData, featured_image_url: url, thumbnail_url: url })}
          folder="articles"
        />
        <p className="text-xs text-slate-400 mt-2">
          💡 Cette image sera utilisée comme image en vedette et miniature
        </p>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-3">Tags</label>
        <AdminTagSelector
          selectedTags={formData.tags || []}
          onToggleTag={handleToggleTag}
          onSetTags={handleSetTags}
        />
      </div>

      {/* Metadata */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Auteur
          </label>
          <input
            type="text"
            value={formData.author_name}
            onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Temps de lecture (minutes)
          </label>
          <input
            type="number"
            value={formData.read_time_minutes || ''}
            onChange={(e) =>
              setFormData({ ...formData, read_time_minutes: parseInt(e.target.value) || undefined })
            }
            min="1"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Publication Options */}
      <div className="space-y-3 border-t border-slate-700 pt-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.is_published}
            onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-slate-200">Publier l'article</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-slate-200">Mettre en vedette (Homepage)</span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex gap-4 justify-end pt-4 border-t border-slate-700">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors"
          disabled={isSubmitting}
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Enregistrement...'
            : mode === 'create'
            ? 'Créer l\'article'
            : 'Mettre à jour'}
        </button>
      </div>
    </form>
  );
}
