'use client';

import { useState, useEffect } from 'react';
import type { Article, ArticleFilters } from '@/lib/types';

interface UseArticlesOptions extends ArticleFilters {}

interface UseArticlesReturn {
  articles: Article[];
  isLoading: boolean;
  error: Error | null;
  total: number;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch articles from API with optional filters
 *
 * @example
 * const { articles, isLoading } = useArticles({ tags: ['yoga'], featured: true, limit: 4 });
 */
export function useArticles(options: UseArticlesOptions = {}): UseArticlesReturn {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [total, setTotal] = useState(0);

  // Create stable dependency string from options
  const optionsKey = JSON.stringify(options);

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();

      // Build query params
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
      if (options.search) {
        params.set('search', options.search);
      }

      const response = await fetch(`/api/articles?${params}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch articles: ${response.statusText}`);
      }

      const data = await response.json();
      setArticles(data.articles || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Error in useArticles:', err);
      setError(err as Error);
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsKey]);

  return {
    articles,
    isLoading,
    error,
    total,
    refetch: fetchArticles,
  };
}
