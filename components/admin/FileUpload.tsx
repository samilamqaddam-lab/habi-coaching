'use client';

import { useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface FileUploadProps {
  label: string;
  value?: string;
  onChange: (url: string, metadata?: { size: number; mimeType: string; storagePath: string }) => void;
  fileType: 'video' | 'audio' | 'pdf';
  folder?: string;
}

const FILE_CONFIGS = {
  video: {
    bucket: 'videos',
    accept: 'video/*',
    maxSize: 100 * 1024 * 1024, // 100MB
    label: 'Vidéo',
    icon: '🎥',
  },
  audio: {
    bucket: 'audio',
    accept: 'audio/*',
    maxSize: 50 * 1024 * 1024, // 50MB
    label: 'Audio',
    icon: '🎵',
  },
  pdf: {
    bucket: 'documents',
    accept: 'application/pdf',
    maxSize: 20 * 1024 * 1024, // 20MB
    label: 'PDF',
    icon: '📄',
  },
};

export default function FileUpload({ label, value, onChange, fileType, folder = 'resources' }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const config = FILE_CONFIGS[fileType];

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > config.maxSize) {
      setError(`Le fichier doit faire moins de ${formatFileSize(config.maxSize)}`);
      return;
    }

    setError(null);
    setUploading(true);
    setUploadProgress(0);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from(config.bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(config.bucket)
        .getPublicUrl(fileName);

      onChange(publicUrl, {
        size: file.size,
        mimeType: file.type,
        storagePath: fileName,
      });

      setUploadProgress(100);
    } catch (err) {
      console.error('Error uploading file:', err);
      setError(`Erreur lors de l'upload. Vérifiez que le bucket "${config.bucket}" existe dans Supabase Storage.`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    onChange('');
    setUploadProgress(0);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-200 mb-2">
        {label}
      </label>

      {value ? (
        <div className="space-y-3">
          {/* File Info */}
          <div className="relative bg-slate-700 rounded-lg border-2 border-slate-600 p-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{config.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-200 truncate">{config.label} uploadé</p>
                <p className="text-xs text-slate-400 truncate">{value}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              {config.icon} Changer le fichier
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              🗑️ Supprimer
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full px-4 py-8 border-2 border-dashed border-slate-600 rounded-lg hover:border-blue-500 hover:bg-slate-700/50 transition-colors text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="text-sm">Upload en cours... {uploadProgress}%</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="text-4xl">{config.icon}</div>
                <span className="text-sm font-medium">Cliquez pour uploader un {config.label.toLowerCase()}</span>
                <span className="text-xs text-slate-500">Max {formatFileSize(config.maxSize)}</span>
              </div>
            )}
          </button>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept={config.accept}
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-2 text-sm text-red-400 bg-red-900/20 border border-red-500 rounded px-3 py-2">
          {error}
        </div>
      )}

      {/* Help Text */}
      <p className="mt-2 text-xs text-slate-400">
        Le fichier sera uploadé vers Supabase Storage et accessible publiquement.
      </p>
    </div>
  );
}
