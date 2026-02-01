'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/admin/ImageUpload';
import FileUpload from '@/components/admin/FileUpload';
import AdminTagSelector from '@/components/admin/AdminTagSelector';
import type { Resource, ResourceFormData, ResourceType } from '@/lib/types';

interface ResourceFormProps {
  resource?: Resource;
  mode: 'create' | 'edit';
}

const RESOURCE_TYPES: { value: ResourceType; label: string; icon: string }[] = [
  { value: 'video', label: 'Vidéo YouTube', icon: '🎥' },
  { value: 'pdf', label: 'PDF Document', icon: '📄' },
  { value: 'link', label: 'Lien externe', icon: '🔗' },
  { value: 'audio', label: 'Audio / Podcast', icon: '🎵' },
];

export default function ResourceForm({ resource, mode }: ResourceFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<Partial<ResourceFormData>>({
    resource_type: resource?.resource_type || 'video',
    title: resource?.title || '',
    description: resource?.description || '',
    url: resource?.url || '',
    thumbnail_url: resource?.thumbnail_url || '',
    upload_type: resource?.upload_type || 'link',
    tags: resource?.tags || [],
    related_programme_key: resource?.related_programme_key || undefined,
    related_event_id: resource?.related_event_id || undefined,
    featured: resource?.featured || false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update formData when resource prop changes (for edit mode)
  useEffect(() => {
    if (resource) {
      setFormData({
        resource_type: resource.resource_type || 'video',
        title: resource.title || '',
        description: resource.description || '',
        url: resource.url || '',
        thumbnail_url: resource.thumbnail_url || '',
        upload_type: resource.upload_type || 'link',
        file_size: resource.file_size,
        mime_type: resource.mime_type,
        storage_path: resource.storage_path,
        tags: resource.tags || [],
        related_programme_key: resource.related_programme_key || undefined,
        related_event_id: resource.related_event_id || undefined,
        featured: resource.featured || false,
      });
    }
  }, [resource]);

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
      const url = mode === 'create' ? '/api/admin/resources' : `/api/admin/resources/${resource?.id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save resource');
      }

      router.push('/admin/resources');
    } catch (err) {
      console.error('Error saving resource:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isVideoType = formData.resource_type === 'video';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-900/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Resource Type */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Type de ressource *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {RESOURCE_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setFormData({
                ...formData,
                resource_type: type.value,
                // Force 'link' type for YouTube videos
                upload_type: type.value === 'video' ? 'link' : formData.upload_type,
                // Clear thumbnail for videos (will use YouTube thumbnail)
                thumbnail_url: type.value === 'video' ? '' : formData.thumbnail_url,
              })}
              className={`p-4 border-2 rounded-lg transition-colors ${
                formData.resource_type === type.value
                  ? 'border-blue-500 bg-blue-600/20 text-slate-100'
                  : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'
              }`}
            >
              <div className="text-2xl mb-2">{type.icon}</div>
              <div className="text-sm font-medium">{type.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Upload Type Selection - Not shown for YouTube videos */}
      {!isVideoType && (
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Source de la ressource *
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, upload_type: 'link', url: '' })}
              className={`p-4 border-2 rounded-lg transition-colors ${
                formData.upload_type === 'link'
                  ? 'border-blue-500 bg-blue-600/20 text-slate-100'
                  : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'
              }`}
            >
              <div className="text-2xl mb-2">🔗</div>
              <div className="text-sm font-medium">Lien externe</div>
              <div className="text-xs text-slate-400 mt-1">URL externe</div>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, upload_type: 'upload', url: '' })}
              className={`p-4 border-2 rounded-lg transition-colors ${
                formData.upload_type === 'upload'
                  ? 'border-blue-500 bg-blue-600/20 text-slate-100'
                  : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'
              }`}
            >
              <div className="text-2xl mb-2">⬆️</div>
              <div className="text-sm font-medium">Upload fichier</div>
              <div className="text-xs text-slate-400 mt-1">Hébergé sur le site</div>
            </button>
          </div>
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
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
          placeholder="Le titre de la ressource..."
        />
      </div>

      {/* URL or File Upload */}
      {isVideoType || formData.upload_type === 'link' ? (
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            {isVideoType ? 'URL YouTube *' : 'URL *'}
          </label>
          <input
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            placeholder={
              isVideoType
                ? 'https://www.youtube.com/watch?v=...'
                : 'https://...'
            }
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          {isVideoType && (
            <p className="text-xs text-slate-400 mt-1">
              L'ID vidéo et la miniature seront extraits automatiquement de YouTube
            </p>
          )}
        </div>
      ) : (
        <FileUpload
          label={`Fichier ${
            formData.resource_type === 'audio' ? 'audio' : 'PDF'
          } *`}
          value={formData.url}
          onChange={(url, metadata) => {
            setFormData({
              ...formData,
              url,
              file_size: metadata?.size,
              mime_type: metadata?.mimeType,
              storage_path: metadata?.storagePath,
            });
          }}
          fileType={formData.resource_type === 'pdf' ? 'pdf' : formData.resource_type as 'audio'}
          folder="resources"
        />
      )}

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Description de la ressource..."
        />
      </div>

      {/* Thumbnail - Not shown for YouTube videos (uses YouTube thumbnail automatically) */}
      {!isVideoType && (
        <div>
          <ImageUpload
            label="Miniature"
            value={formData.thumbnail_url}
            onChange={(url) => setFormData({ ...formData, thumbnail_url: url })}
            folder="resources"
          />
        </div>
      )}

      {/* Info for YouTube videos */}
      {isVideoType && (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
          <p className="text-sm text-slate-300">
            🎥 <strong>Vidéo YouTube</strong> — La miniature sera récupérée automatiquement depuis YouTube.
          </p>
        </div>
      )}

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-3">Tags</label>
        <AdminTagSelector
          selectedTags={formData.tags || []}
          onToggleTag={handleToggleTag}
          onSetTags={handleSetTags}
        />
      </div>

      {/* Publication Options */}
      <div className="space-y-3 border-t border-slate-700 pt-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-slate-200">Mettre en vedette</span>
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
            ? 'Créer la ressource'
            : 'Mettre à jour'}
        </button>
      </div>
    </form>
  );
}
