'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ProgrammeEdition, EditionSessionWithAvailability } from '@/lib/supabase';

// Extended edition type with sessions and calculated values
export interface EditionWithDetails {
  edition: ProgrammeEdition & {
    total_minutes: number;
    calculated_price: number | null;
  };
  sessions: EditionSessionWithAvailability[];
}

interface UseEditionDataReturn {
  // Multi-edition support
  editions: EditionWithDetails[];
  selectedEdition: EditionWithDetails | null;
  selectEdition: (editionId: string) => void;

  // Backward compatible single edition fields
  edition: ProgrammeEdition | null;
  sessions: EditionSessionWithAvailability[];
  totalMinutes: number;
  calculatedPrice: number | null;

  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook to fetch active edition data for a programme
 * @param programmeKey - The programme key (e.g., 'upa-yoga', 'surya-kriya')
 * @param initialEditionId - Optional edition ID to select initially (from URL query param)
 * @returns Edition data, sessions, loading state, and error
 */
export function useEditionData(
  programmeKey: string,
  initialEditionId?: string | null
): UseEditionDataReturn {
  const [editions, setEditions] = useState<EditionWithDetails[]>([]);
  const [selectedEditionId, setSelectedEditionId] = useState<string | null>(initialEditionId || null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEditions() {
      try {
        const response = await fetch(`/api/yoga/${programmeKey}`);

        if (!response.ok) {
          // 404 or 503 means no active edition - this is expected, not an error
          if (response.status === 404 || response.status === 503) {
            setEditions([]);
            setIsLoading(false);
            return;
          }
          throw new Error('Failed to fetch edition');
        }

        const data = await response.json();

        // Handle multi-edition response
        if (data.editions && Array.isArray(data.editions)) {
          setEditions(data.editions);
          // Set initial selection if not already set
          if (!selectedEditionId && data.editions.length > 0) {
            setSelectedEditionId(data.editions[0].edition.id);
          }
        } else if (data.edition) {
          // Backward compatible single edition response
          const singleEdition: EditionWithDetails = {
            edition: data.edition,
            sessions: data.sessions || [],
          };
          setEditions([singleEdition]);
          if (!selectedEditionId) {
            setSelectedEditionId(data.edition.id);
          }
        }
      } catch (err) {
        console.error('Error fetching edition:', err);
        setError('Loading error');
        setEditions([]);
      } finally {
        setIsLoading(false);
      }
    }

    if (programmeKey) {
      fetchEditions();
    }
  }, [programmeKey]);

  // Update selection when initialEditionId changes
  useEffect(() => {
    if (initialEditionId && editions.some(e => e.edition.id === initialEditionId)) {
      setSelectedEditionId(initialEditionId);
    }
  }, [initialEditionId, editions]);

  // Get selected edition
  const selectedEdition = editions.find(e => e.edition.id === selectedEditionId) || editions[0] || null;

  // Selection function
  const selectEdition = useCallback((editionId: string) => {
    setSelectedEditionId(editionId);
  }, []);

  // Backward compatible return values (using selected edition)
  const edition = selectedEdition?.edition || null;
  const sessions = selectedEdition?.sessions || [];
  const totalMinutes = edition?.total_minutes || 0;
  const calculatedPrice = edition?.calculated_price || null;

  return {
    // Multi-edition
    editions,
    selectedEdition,
    selectEdition,

    // Backward compatible
    edition,
    sessions,
    totalMinutes,
    calculatedPrice,
    isLoading,
    error
  };
}
