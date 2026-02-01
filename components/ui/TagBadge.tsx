'use client';

import { useTags } from '@/hooks/useTags';
import { useTranslation } from '@/hooks/useTranslation';

interface TagBadgeProps {
  tagId: string;
  size?: 'sm' | 'md';
  variant?: 'light' | 'dark'; // 'light' for light backgrounds, 'dark' for dark backgrounds
  className?: string;
}

/**
 * Colored badge component for displaying tags
 * Automatically fetches tag data and applies theme colors
 *
 * @example
 * <TagBadge tagId="yoga" size="md" />
 * <TagBadge tagId="upa-yoga" size="sm" variant="dark" />
 */
export default function TagBadge({ tagId, size = 'sm', variant = 'light', className = '' }: TagBadgeProps) {
  const { getTag } = useTags();
  const { locale } = useTranslation();
  const tag = getTag(tagId);

  if (!tag) {
    // Tag not found - render nothing or placeholder
    return null;
  }

  // Color mapping for light backgrounds (default)
  const lightColorMap: Record<string, string> = {
    'golden-orange': 'bg-golden-orange/20 text-golden-orange border-golden-orange/40',
    'morocco-blue': 'bg-morocco-blue/20 text-morocco-blue border-morocco-blue/40',
    'mystic-mauve': 'bg-mystic-mauve/20 text-mystic-mauve border-mystic-mauve/40',
    'sage': 'bg-sage/20 text-sage border-sage/40',
    'terracotta': 'bg-terracotta/20 text-terracotta border-terracotta/40',
  };

  // Color mapping for dark backgrounds - solid colors with better contrast
  const darkColorMap: Record<string, string> = {
    'golden-orange': 'bg-golden-orange text-warm-white border-golden-orange',
    'morocco-blue': 'bg-morocco-blue text-warm-white border-morocco-blue',
    'mystic-mauve': 'bg-mystic-mauve text-warm-white border-mystic-mauve',
    'sage': 'bg-sage text-warm-white border-sage',
    'terracotta': 'bg-terracotta text-warm-white border-terracotta',
  };

  const colorMap = variant === 'dark' ? darkColorMap : lightColorMap;
  const colorClass = tag.color ? colorMap[tag.color] : variant === 'dark' ? 'bg-warm-white text-deep-blue border-warm-white' : 'bg-warm-white/90 text-deep-blue border-warm-white';
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1.5';

  // Get label based on locale
  const label = locale === 'en' && tag.label_en ? tag.label_en : tag.label;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium border ${colorClass} ${sizeClass} ${className}`}
    >
      {tag.icon && <span aria-hidden="true">{tag.icon}</span>}
      <span>{label}</span>
    </span>
  );
}

/**
 * Multiple tags display component
 * @example
 * <TagBadgeList tags={['yoga', 'upa-yoga']} limit={3} />
 * <TagBadgeList tags={['yoga', 'upa-yoga']} variant="dark" />
 */
export function TagBadgeList({
  tags,
  limit = 3,
  size = 'sm',
  variant = 'light',
  className = '',
}: {
  tags: string[];
  limit?: number;
  size?: 'sm' | 'md';
  variant?: 'light' | 'dark';
  className?: string;
}) {
  const displayTags = limit > 0 ? tags.slice(0, limit) : tags;
  const remainingCount = tags.length - displayTags.length;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {displayTags.map((tagId) => (
        <TagBadge key={tagId} tagId={tagId} size={size} variant={variant} />
      ))}
      {remainingCount > 0 && (
        <span className={`text-xs self-center ${variant === 'dark' ? 'text-warm-white/60' : 'text-text-secondary'}`}>
          +{remainingCount}
        </span>
      )}
    </div>
  );
}
