'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { TagBadgeList } from '@/components/ui/TagBadge';
import ResourceModal from '@/components/resources/ResourceModal';
import { useTranslation } from '@/hooks/useTranslation';
import type { Resource } from '@/lib/types';
import { extractYouTubeId, getYouTubeThumbnailUrl, formatDuration } from '@/lib/types';

interface ResourceCardProps {
  resource: Resource;
}

/**
 * Card component for displaying all types of resources
 * Handles both external links (YouTube, etc.) and uploaded files
 */
export default function ResourceCard({ resource }: ResourceCardProps) {
  const [showPlayer, setShowPlayer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { locale } = useTranslation();

  const isUpload = resource.upload_type === 'upload';
  const isVideo = resource.resource_type === 'video';
  const isAudio = resource.resource_type === 'audio';
  const isPdf = resource.resource_type === 'pdf';

  // Get title and description based on locale
  const title = locale === 'en' && resource.title_en ? resource.title_en : resource.title;
  const description =
    locale === 'en' && resource.description_en ? resource.description_en : resource.description;

  // For YouTube videos (external links)
  const videoId = !isUpload && isVideo ? (resource.video_id || extractYouTubeId(resource.url)) : null;
  const thumbnailUrl = !isUpload && isVideo && videoId
    ? (resource.thumbnail_url || getYouTubeThumbnailUrl(videoId))
    : resource.thumbnail_url;

  // Icon based on resource type
  const getResourceIcon = () => {
    if (isVideo) return '🎥';
    if (isAudio) return '🎵';
    if (isPdf) return '📄';
    return '🔗';
  };

  const handleClick = () => {
    if (isUpload) {
      setShowModal(true);
    } else if (isVideo && videoId) {
      setShowPlayer(true);
    }
  };

  return (
    <>
      <Card padding="sm" className="!p-0 overflow-hidden group h-full flex flex-col">
        {/* Resource Preview */}
        <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200">
          {!isUpload && isVideo && videoId ? (
            /* YouTube Video */
            !showPlayer ? (
              <>
                <img
                  src={thumbnailUrl}
                  alt={title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <button
                  onClick={handleClick}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors"
                  aria-label={`Lire: ${title}`}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 hover:bg-red-700 transition-colors flex items-center justify-center">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
                {resource.duration_minutes && (
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(resource.duration_minutes)}
                  </div>
                )}
              </>
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={title}
              />
            )
          ) : thumbnailUrl ? (
            /* Thumbnail for uploaded files or other resources */
            <>
              <img
                src={thumbnailUrl}
                alt={title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              {isUpload && (
                <button
                  onClick={handleClick}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors"
                  aria-label={`Voir: ${title}`}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-deep-blue hover:bg-deep-blue/90 transition-colors flex items-center justify-center">
                    <span className="text-4xl">{getResourceIcon()}</span>
                  </div>
                </button>
              )}
            </>
          ) : (
            /* Icon fallback for resources without thumbnail */
            <button
              onClick={handleClick}
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-golden-orange/20 to-mystic-mauve/20 hover:from-golden-orange/30 hover:to-mystic-mauve/30 transition-colors"
            >
              <span className="text-6xl">{getResourceIcon()}</span>
            </button>
          )}

          {/* Upload badge */}
          {isUpload && (
            <div className="absolute top-2 left-2 bg-deep-blue text-white text-xs px-2 py-1 rounded font-medium">
              Hébergé sur le site
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="font-heading text-xl font-bold text-deep-blue mb-2">
            {title}
          </h3>

          {resource.tags && resource.tags.length > 0 && (
            <div className="mb-3">
              <TagBadgeList tags={resource.tags} limit={3} />
            </div>
          )}

          {description && (
            <p className="text-text-secondary text-sm mb-4 line-clamp-2 flex-1">
              {description}
            </p>
          )}

          {/* CTA Button */}
          <div className="mt-auto">
            {isUpload ? (
              <Button
                variant="primary"
                size="sm"
                onClick={handleClick}
                className="w-full"
              >
                {isVideo ? 'Regarder' : isAudio ? 'Écouter' : 'Ouvrir'}
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                Voir {isVideo ? 'sur YouTube' : 'le lien'}
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Modal for uploaded files */}
      {isUpload && (
        <ResourceModal
          resource={resource}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
