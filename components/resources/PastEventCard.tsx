'use client';

import Card from '@/components/ui/Card';
import { useTranslation } from '@/hooks/useTranslation';
import type { YogaEvent } from '@/lib/types';

interface PastEventCardProps {
  event: YogaEvent;
}

/**
 * Card component for displaying past yoga events
 * Shows event details with metadata (date, location, participants)
 *
 * @example
 * <PastEventCard event={pastEvent} />
 */
export default function PastEventCard({ event }: PastEventCardProps) {
  const { locale } = useTranslation();

  // Get title and subtitle based on locale
  const title = locale === 'en' && event.title_en ? event.title_en : event.title;
  const subtitle = locale === 'en' && event.subtitle_en ? event.subtitle_en : event.subtitle;
  const description =
    locale === 'en' && event.description_en ? event.description_en : event.description;

  // Format date in appropriate locale
  const eventDate = new Date(event.date_time).toLocaleDateString(
    locale === 'fr' ? 'fr-FR' : 'en-US',
    {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );

  // Format time
  const eventTime = new Date(event.date_time).toLocaleTimeString(
    locale === 'fr' ? 'fr-FR' : 'en-US',
    {
      hour: '2-digit',
      minute: '2-digit',
    }
  );

  return (
    <Card padding="lg" className="h-full flex flex-col">
      {/* Badge */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
          {locale === 'fr' ? 'Événement passé' : 'Past Event'}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-heading text-xl font-bold text-deep-blue mb-2">
        {title}
        {subtitle && (
          <span className="block text-base font-normal text-text-secondary mt-1">
            {subtitle}
          </span>
        )}
      </h3>

      {/* Metadata */}
      <div className="space-y-2 mb-4 flex-grow">
        {/* Date & Time */}
        <div className="flex items-start gap-2 text-sm text-text-secondary">
          <span className="flex-shrink-0" aria-hidden="true">
            📅
          </span>
          <div>
            <div>{eventDate}</div>
            <div className="text-xs">{eventTime}</div>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2 text-sm text-text-secondary">
          <span className="flex-shrink-0" aria-hidden="true">
            📍
          </span>
          <span>{event.location}</span>
        </div>

        {/* Participants Count */}
        {event.current_count !== undefined && event.current_count > 0 && (
          <div className="flex items-start gap-2 text-sm text-text-secondary">
            <span className="flex-shrink-0" aria-hidden="true">
              👥
            </span>
            <span>
              {event.current_count} {locale === 'fr' ? 'participants' : 'participants'}
            </span>
          </div>
        )}

      </div>

      {/* Description */}
      {description && (
        <p className="text-text-secondary text-sm line-clamp-3 mt-auto">
          {description}
        </p>
      )}

      {/* Optional: Link to recap article (if available) */}
      {/* This would require adding a related_article_slug field to events */}
      {/* {event.related_article_slug && (
        <div className="mt-4">
          <Button
            variant="outline"
            size="sm"
            href={`/blog/${event.related_article_slug}`}
            className="w-full"
          >
            Lire le récap
          </Button>
        </div>
      )} */}
    </Card>
  );
}
