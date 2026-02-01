'use client';

import { useState, useEffect } from 'react';
import type { Resource, ResourceFilters } from '@/lib/types';

interface UseResourcesOptions extends ResourceFilters {}

interface UseResourcesReturn {
  resources: Resource[];
  isLoading: boolean;
  error: Error | null;
  total: number;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch resources from API with optional filters
 *
 * @example
 * const { resources, isLoading } = useResources({ type: 'video', tags: ['upa-yoga'], limit: 12 });
 */
export function useResources(options: UseResourcesOptions = {}): UseResourcesReturn {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [total, setTotal] = useState(0);

  // Create stable dependency string from options
  const optionsKey = JSON.stringify(options);

  const fetchResources = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();

      // Build query params
      if (options.type) {
        params.set('type', options.type);
      }
      if (options.tags && options.tags.length > 0) {
        options.tags.forEach(tag => params.append('tags[]', tag));
      }
      if (options.featured !== undefined) {
        params.set('featured', options.featured.toString());
      }
      if (options.limit) {
        params.set('limit', options.limit.toString());
      }
      if (options.offset) {
        params.set('offset', options.offset.toString());
      }

      const response = await fetch(`/api/resources?${params}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch resources: ${response.statusText}`);
      }

      const data = await response.json();
      setResources(data.resources || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Error in useResources:', err);
      setError(err as Error);
      setResources([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsKey]);

  return {
    resources,
    isLoading,
    error,
    total,
    refetch: fetchResources,
  };
}
