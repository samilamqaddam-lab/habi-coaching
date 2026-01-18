'use client';

import { useState, useEffect, useMemo } from 'react';
import type { ProgrammeEdition, EditionSessionWithAvailability } from '@/lib/supabase';
import type { EditionWithDetails } from './useEditionData';

interface EditionData {
  // Multi-edition support
  editions: EditionWithDetails[];

  // Backward compatible single edition fields (first edition)
  edition: ProgrammeEdition | null;
  sessions: EditionSessionWithAvailability[];
  totalMinutes: number;
  calculatedPrice: number | null;

  isLoading: boolean;
  error: string | null;
}

type EditionsDataMap = Record<string, EditionData>;

/**
 * Custom hook to fetch active edition data for multiple programmes in parallel
 * @param programmeKeys - Array of programme keys (e.g., ['upa-yoga', 'surya-kriya'])
 * @returns Map of programme key to edition data (with all editions per programme)
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
        editions: [],
        edition: null,
        sessions: [],
        totalMinutes: 0,
        calculatedPrice: null,
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
            const response = await fetch(`/api/yoga/${key}`);

            if (response.ok) {
              const json = await response.json();

              // Handle multi-edition response
              let editions: EditionWithDetails[] = [];
              if (json.editions && Array.isArray(json.editions)) {
                editions = json.editions;
              } else if (json.edition) {
                // Single edition response
                editions = [{
                  edition: json.edition,
                  sessions: json.sessions || [],
                }];
              }

              // First edition for backward compatibility
              const firstEdition = editions[0] || null;

              results[key] = {
                editions,
                edition: firstEdition?.edition || null,
                sessions: firstEdition?.sessions || [],
                totalMinutes: firstEdition?.edition?.total_minutes || 0,
                calculatedPrice: firstEdition?.edition?.calculated_price || null,
                isLoading: false,
                error: null
              };
            } else {
              // 404 or 503 means no active edition - this is expected, not an error
              results[key] = {
                editions: [],
                edition: null,
                sessions: [],
                totalMinutes: 0,
                calculatedPrice: null,
                isLoading: false,
                error: null
              };
            }
          } catch (err) {
            console.error(`Error fetching edition for ${key}:`, err);
            results[key] = {
              editions: [],
              edition: null,
              sessions: [],
              totalMinutes: 0,
              calculatedPrice: null,
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
