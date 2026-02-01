'use client';

import { useState, useEffect } from 'react';
import type { Tag, TagFilters } from '@/lib/types';

interface UseTagsOptions extends TagFilters {}

interface UseTagsReturn {
  tags: Tag[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  // Helper to get tag by ID
  getTag: (id: string) => Tag | undefined;
  // Helper to get children of a tag
  getChildren: (parentId: string) => Tag[];
}

/**
 * Hook to fetch tags from API with optional hierarchical filtering
 *
 * @example
 * // Get all main tags
 * const { tags } = useTags({ parent: '' });
 *
 * // Get all sub-tags of 'yoga'
 * const { tags } = useTags({ parent: 'yoga' });
 *
 * // Get all tags (no filter)
 * const { tags } = useTags();
 */
export function useTags(options: UseTagsOptions = {}): UseTagsReturn {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Create stable dependency string from options
  const optionsKey = JSON.stringify(options);

  const fetchTags = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();

      // Build query params
      if (options.parent !== undefined) {
        params.set('parent', options.parent || '');
      }
      if (options.category) {
        params.set('category', options.category);
      }

      const response = await fetch(`/api/tags?${params}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch tags: ${response.statusText}`);
      }

      const data = await response.json();
      setTags(data.tags || []);
    } catch (err) {
      console.error('Error in useTags:', err);
      setError(err as Error);
      setTags([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsKey]);

  // Helper functions
  const getTag = (id: string): Tag | undefined => {
    return tags.find(tag => tag.id === id);
  };

  const getChildren = (parentId: string): Tag[] => {
    return tags.filter(tag => tag.parent_id === parentId);
  };

  return {
    tags,
    isLoading,
    error,
    refetch: fetchTags,
    getTag,
    getChildren,
  };
}

/**
 * Hook to fetch ALL tags at once and organize them hierarchically
 * Useful for tag selectors and filters
 */
export function useAllTags() {
  const { tags, isLoading, error, refetch } = useTags();

  const mainTags = tags.filter(tag => tag.parent_id === null);
  const subTags = tags.filter(tag => tag.parent_id !== null);

  // Organize tags by parent
  const tagsByParent = subTags.reduce((acc, tag) => {
    if (!tag.parent_id) return acc;
    if (!acc[tag.parent_id]) {
      acc[tag.parent_id] = [];
    }
    acc[tag.parent_id].push(tag);
    return acc;
  }, {} as Record<string, Tag[]>);

  return {
    tags,
    mainTags,
    subTags,
    tagsByParent,
    isLoading,
    error,
    refetch,
  };
}
