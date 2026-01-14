'use client';

import { useState, useEffect, useMemo } from 'react';
import type { ProgrammeEdition, EditionSessionWithAvailability } from '@/lib/supabase';

interface EditionData {
  edition: ProgrammeEdition | null;
  sessions: EditionSessionWithAvailability[];
  isLoading: boolean;
  error: string | null;
}

type EditionsDataMap = Record<string, EditionData>;

/**
 * Custom hook to fetch active edition data for multiple programmes in parallel
 * @param programmeKeys - Array of programme keys (e.g., ['upa-yoga', 'surya-kriya'])
 * @returns Map of programme key to edition data
 */
export function useMultipleEditionsData(programmeKeys: string[]): EditionsDataMap {
  const [data, setData] = useState<EditionsDataMap>({});

  // Memoize the keys string to prevent unnecessary re-fetches
  const keysString = useMemo(() => programmeKeys.sort().join(','), [programmeKeys]);

  useEffect(() => {
    if (!programmeKeys.length) return;

    // Initialize loading state for all keys
    const initialState: EditionsDataMap = {};
    programmeKeys.forEach(key => {
      initialState[key] = {
        edition: null,
        sessions: [],
        isLoading: true,
        error: null
      };
    });
    setData(initialState);

    // Fetch all editions in parallel
    const fetchAll = async () => {
      const results: EditionsDataMap = {};

      await Promise.all(
        programmeKeys.map(async (key) => {
          try {
            const response = await fetch(`/api/programmes/${key}`);

            if (response.ok) {
              const json = await response.json();
              results[key] = {
                edition: json.edition,
                sessions: json.sessions || [],
                isLoading: false,
                error: null
              };
            } else {
              // 404 or 503 means no active edition - this is expected, not an error
              results[key] = {
                edition: null,
                sessions: [],
                isLoading: false,
                error: null
              };
            }
          } catch (err) {
            console.error(`Error fetching edition for ${key}:`, err);
            results[key] = {
              edition: null,
              sessions: [],
              isLoading: false,
              error: 'Loading error'
            };
          }
        })
      );

      setData(results);
    };

    fetchAll();
  }, [keysString]);

  return data;
}
