'use client';

import { useEffect } from 'react';
import type { Resource } from '@/lib/types';

interface ResourceModalProps {
  resource: Resource;
  isOpen: boolean;
  onClose: () => void;
}

export default function ResourceModal({ resource, isOpen, onClose }: ResourceModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={onClose}>
      <div
        className="relative w-full max-w-4xl bg-warm-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-heading text-2xl font-bold text-deep-blue mb-4">
            {resource.title}
          </h3>

          {/* Video */}
          {resource.resource_type === 'video' && (
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <video
                controls
                autoPlay
                className="w-full h-full"
                src={resource.url}
              >
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            </div>
          )}

          {/* Audio */}
          {resource.resource_type === 'audio' && (
            <div className="bg-gradient-to-br from-mystic-mauve/10 to-golden-orange/10 rounded-lg p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 bg-mystic-mauve/20 rounded-full flex items-center justify-center">
                  <span className="text-5xl">🎵</span>
                </div>
              </div>
              <audio
                controls
                autoPlay
                className="w-full"
                src={resource.url}
              >
                Votre navigateur ne supporte pas la lecture audio.
              </audio>
            </div>
          )}

          {/* PDF */}
          {resource.resource_type === 'pdf' && (
            <div className="aspect-[8.5/11] bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                src={resource.url}
                className="w-full h-full"
                title={resource.title}
              />
            </div>
          )}

          {/* Description */}
          {resource.description && (
            <p className="text-text-secondary mt-4">
              {resource.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
