'use client';

import { useState, useEffect } from 'react';
import type { YogaEvent } from '@/lib/types';

interface UsePastEventsReturn {
  events: YogaEvent[];
  isLoading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => void;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch past yoga events with pagination
 *
 * @example
 * const { events, isLoading, hasMore, loadMore } = usePastEvents(8);
 */
export function usePastEvents(initialLimit: number = 12): UsePastEventsReturn {
  const [events, setEvents] = useState<YogaEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [limit, setLimit] = useState(initialLimit);
  const [hasMore, setHasMore] = useState(false);

  const fetchPastEvents = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams({
        includePast: 'true',
        limit: limit.toString(),
      });

      const response = await fetch(`/api/events?${params}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch past events: ${response.statusText}`);
      }

      const data = await response.json();
      const fetchedEvents = data.events || [];

      setEvents(fetchedEvents);
      // If we got exactly the limit, there might be more
      setHasMore(fetchedEvents.length === limit);
    } catch (err) {
      console.error('Error in usePastEvents:', err);
      setError(err as Error);
      setEvents([]);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPastEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  const loadMore = () => {
    setLimit(prev => prev + initialLimit);
  };

  return {
    events,
    isLoading,
    error,
    hasMore,
    loadMore,
    refetch: fetchPastEvents,
  };
}
