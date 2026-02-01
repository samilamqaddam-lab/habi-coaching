'use client';

import { useState } from 'react';
import { useAllTags } from '@/hooks/useTags';
import TagBadge from '@/components/ui/TagBadge';
import { useTranslation } from '@/hooks/useTranslation';
import type { Tag } from '@/lib/types';

interface ResourceFiltersProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  className?: string;
}

/**
 * Hierarchical tag filter sidebar component
 * Features:
 * - Expandable main tags with sub-tag checkboxes
 * - Multi-select support
 * - Active filters display with remove buttons
 * - Clear all filters button
 *
 * @example
 * const [tags, setTags] = useState<string[]>([]);
 * <ResourceFilters selectedTags={tags} onTagsChange={setTags} />
 */
export default function ResourceFilters({
  selectedTags,
  onTagsChange,
  className = '',
}: ResourceFiltersProps) {
  const { mainTags, tagsByParent, isLoading } = useAllTags();
  const { t, locale } = useTranslation();
  const [expandedMain, setExpandedMain] = useState<string | null>(null);

  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      // Remove tag
      onTagsChange(selectedTags.filter((id) => id !== tagId));
    } else {
      // Add tag
      onTagsChange([...selectedTags, tagId]);
    }
  };

  const clearFilters = () => {
    onTagsChange([]);
    setExpandedMain(null);
  };

  if (isLoading) {
    return (
      <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading text-lg font-bold text-deep-blue">
          {locale === 'fr' ? 'Filtrer les ressources' : 'Filter Resources'}
        </h3>
        {selectedTags.length > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-terracotta hover:underline focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 rounded"
          >
            {locale === 'fr' ? 'Réinitialiser' : 'Reset'}
          </button>
        )}
      </div>

      {/* Main Tags with Sub-tags */}
      <div className="space-y-4">
        {mainTags.map((mainTag) => (
          <MainTagFilter
            key={mainTag.id}
            tag={mainTag}
            subTags={tagsByParent[mainTag.id] || []}
            isExpanded={expandedMain === mainTag.id}
            onToggleExpand={() =>
              setExpandedMain(expandedMain === mainTag.id ? null : mainTag.id)
            }
            selectedTags={selectedTags}
            onToggleTag={toggleTag}
            locale={locale}
          />
        ))}
      </div>

      {/* Active Filters Display */}
      {selectedTags.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-600 mb-3">
            {locale === 'fr' ? 'Filtres actifs :' : 'Active filters:'}
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tagId) => (
              <div key={tagId} className="relative group">
                <TagBadge tagId={tagId} />
                <button
                  onClick={() => toggleTag(tagId)}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                  aria-label={`Remove filter`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Sub-component: MainTagFilter
// ============================================================================

interface MainTagFilterProps {
  tag: Tag;
  subTags: Tag[];
  isExpanded: boolean;
  onToggleExpand: () => void;
  selectedTags: string[];
  onToggleTag: (tagId: string) => void;
  locale: string;
}

function MainTagFilter({
  tag,
  subTags,
  isExpanded,
  onToggleExpand,
  selectedTags,
  onToggleTag,
  locale,
}: MainTagFilterProps) {
  const label = locale === 'en' && tag.label_en ? tag.label_en : tag.label;
  const hasSubTags = subTags.length > 0;

  return (
    <div>
      {/* Main Tag Button - Only clickable if has sub-tags */}
      {hasSubTags ? (
        <button
          onClick={onToggleExpand}
          className="w-full flex items-start justify-between gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 text-left"
          aria-expanded={isExpanded}
        >
          <span className="font-medium text-deep-blue leading-snug">{label}</span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 mt-0.5 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      ) : (
        <div className="w-full flex items-start justify-between gap-3 p-3">
          <span className="font-medium text-deep-blue leading-snug">{label}</span>
        </div>
      )}

      {/* Sub-tags (Checkboxes) */}
      {isExpanded && hasSubTags && (
        <div className="ml-6 mt-2 space-y-2">
          {subTags.map((subTag) => {
            const subLabel =
              locale === 'en' && subTag.label_en ? subTag.label_en : subTag.label;
            const isChecked = selectedTags.includes(subTag.id);

            return (
              <label
                key={subTag.id}
                className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleTag(subTag.id)}
                  className="w-4 h-4 text-terracotta border-gray-300 rounded focus:ring-terracotta focus:ring-offset-0"
                />
                <span className="text-sm text-text-secondary hover:text-deep-blue transition-colors">
                  {subLabel}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
