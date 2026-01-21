'use client';

import { useState, useEffect } from 'react';

export interface YogaEvent {
  id: string;
  title: string;
  title_en: string | null;
  subtitle: string | null;
  subtitle_en: string | null;
  badge: string | null;
  badge_en: string | null;
  description: string | null;
  description_en: string | null;
  date_time: string;
  duration_minutes: number;
  location: string;
  address: string;
  price: number | null;
  max_capacity: number;
  is_active: boolean;
  created_at: string;
  // Availability data
  current_count: number;
  remaining_spots: number;
  is_full: boolean;
}

interface UseEventsDataReturn {
  events: YogaEvent[];
  isLoading: boolean;
  error: string | null;
  hasActiveEvents: boolean;
}

/**
 * Custom hook to fetch active yoga events with availability
 * @returns Events data, loading state, and error
 */
export function useEventsData(): UseEventsDataReturn {
  const [events, setEvents] = useState<YogaEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/events');

        if (!response.ok) {
          // 503 means service unavailable - this is expected if Supabase is not configured
          if (response.status === 503) {
            setEvents([]);
            setIsLoading(false);
            return;
          }
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        setEvents(data.events || []);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Erreur lors du chargement des événements');
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return {
    events,
    isLoading,
    error,
    hasActiveEvents: events.length > 0,
  };
}
