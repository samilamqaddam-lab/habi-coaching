'use client';

import { useState, useEffect } from 'react';
import type { ProgrammeEdition, EditionSessionWithAvailability } from '@/lib/supabase';

interface UseEditionDataReturn {
  edition: ProgrammeEdition | null;
  sessions: EditionSessionWithAvailability[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook to fetch active edition data for a programme
 * @param programmeKey - The programme key (e.g., 'upa-yoga', 'surya-kriya')
 * @returns Edition data, sessions, loading state, and error
 */
export function useEditionData(programmeKey: string): UseEditionDataReturn {
  const [edition, setEdition] = useState<ProgrammeEdition | null>(null);
  const [sessions, setSessions] = useState<EditionSessionWithAvailability[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEdition() {
      try {
        const response = await fetch(`/api/yoga/${programmeKey}`);

        if (!response.ok) {
          // 404 or 503 means no active edition - this is expected, not an error
          if (response.status === 404 || response.status === 503) {
            setEdition(null);
            setSessions([]);
            setIsLoading(false);
            return;
          }
          throw new Error('Failed to fetch edition');
        }

        const data = await response.json();
        setEdition(data.edition);
        setSessions(data.sessions || []);
      } catch (err) {
        console.error('Error fetching edition:', err);
        setError('Loading error');
        setEdition(null);
        setSessions([]);
      } finally {
        setIsLoading(false);
      }
    }

    if (programmeKey) {
      fetchEdition();
    }
  }, [programmeKey]);

  return { edition, sessions, isLoading, error };
}
