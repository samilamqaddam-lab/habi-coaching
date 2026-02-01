'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { TagBadgeList } from '@/components/ui/TagBadge';
import { useTranslation } from '@/hooks/useTranslation';
import type { Resource } from '@/lib/types';
import { extractYouTubeId, getYouTubeThumbnailUrl, formatDuration } from '@/lib/types';

interface VideoResourceCardProps {
  resource: Resource;
}

/**
 * Card component for displaying YouTube video resources
 * Features:
 * - Thumbnail with play button overlay
 * - Click to show embedded YouTube player
 * - Tags display
 * - Duration badge
 *
 * @example
 * <VideoResourceCard resource={videoResource} />
 */
export default function VideoResourceCard({ resource }: VideoResourceCardProps) {
  const [showPlayer, setShowPlayer] = useState(false);
  const { locale } = useTranslation();

  // Extract YouTube video ID from URL or use stored video_id
  const videoId = resource.video_id || extractYouTubeId(resource.url);

  if (!videoId) {
    console.error('Invalid YouTube URL:', resource.url);
    return null;
  }

  // Get thumbnail URL (custom or YouTube default)
  const thumbnailUrl = resource.thumbnail_url || getYouTubeThumbnailUrl(videoId);

  // Get title and description based on locale
  const title = locale === 'en' && resource.title_en ? resource.title_en : resource.title;
  const description =
    locale === 'en' && resource.description_en ? resource.description_en : resource.description;

  return (
    <Card padding="sm" className="!p-0 overflow-hidden group h-full flex flex-col">
      {/* Video Thumbnail or Embedded Player */}
      <div className="relative aspect-video bg-gray-100">
        {!showPlayer ? (
          <>
            {/* Thumbnail Image */}
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />

            {/* Play Button Overlay */}
            <button
              onClick={() => setShowPlayer(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors"
              aria-label={`Lire la vidéo: ${title}`}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 hover:bg-red-700 transition-colors flex items-center justify-center">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>

            {/* Duration Badge */}
            {resource.duration_minutes && (
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {formatDuration(resource.duration_minutes)}
              </div>
            )}
          </>
        ) : (
          /* Embedded YouTube Player */
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          />
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="font-heading text-xl font-bold text-deep-blue mb-2">
          {title}
        </h3>

        {/* Tags */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="mb-3">
            <TagBadgeList tags={resource.tags} limit={3} />
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="text-text-secondary text-sm mb-4 line-clamp-2 flex-1">
            {description}
          </p>
        )}

        {/* CTA Button */}
        <div className="mt-auto">
          <Button
            variant="outline"
            size="sm"
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            Voir sur YouTube
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </Button>
        </div>
      </div>
    </Card>
  );
}
