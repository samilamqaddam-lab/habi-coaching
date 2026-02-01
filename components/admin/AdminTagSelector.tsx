'use client';

import { useAllTags } from '@/hooks/useTags';

interface AdminTagSelectorProps {
  selectedTags: string[];
  onToggleTag: (tagId: string) => void;
  onSetTags?: (tags: string[]) => void; // Optional: for batch updates
}

/**
 * Tag selector for admin forms with visual hierarchy and colors
 * Shows main tags and their sub-tags with indentation
 */
export default function AdminTagSelector({ selectedTags, onToggleTag, onSetTags }: AdminTagSelectorProps) {
  const { tags: allTags, isLoading } = useAllTags();

  if (isLoading) {
    return <div className="text-sm text-slate-400">Chargement des tags...</div>;
  }

  // Separate main tags and sub-tags
  const mainTags = allTags.filter((tag) => tag.category === 'main');
  const subTags = allTags.filter((tag) => tag.category === 'sub');

  // Get color classes for a tag
  const getTagClasses = (tag: any, isSelected: boolean) => {
    if (isSelected) {
      // Selected state - solid vibrant color
      const selectedColorMap: Record<string, string> = {
        'golden-orange': 'bg-golden-orange text-warm-white border-golden-orange',
        'morocco-blue': 'bg-morocco-blue text-warm-white border-morocco-blue',
        'mystic-mauve': 'bg-mystic-mauve text-warm-white border-mystic-mauve',
        'sage': 'bg-sage text-warm-white border-sage',
        'terracotta': 'bg-terracotta text-warm-white border-terracotta',
      };
      return tag.color && selectedColorMap[tag.color]
        ? selectedColorMap[tag.color]
        : 'bg-blue-600 border-blue-500 text-white';
    } else {
      // Unselected state - all gray for better UX
      return 'bg-slate-700/50 border-slate-600 text-slate-400 hover:bg-slate-700 hover:text-slate-300';
    }
  };

  // Smart tag toggle with automatic parent/child handling
  const handleTagToggle = (tagId: string) => {
    const tag = allTags.find((t) => t.id === tagId);
    if (!tag) return;

    const isCurrentlySelected = selectedTags.includes(tagId);

    if (onSetTags) {
      // Use batch update if available
      let newTags = [...selectedTags];

      if (isCurrentlySelected) {
        // Deselecting
        if (tag.category === 'main' || !tag.parent_id) {
          // Deselecting a main tag - remove it and all its children
          const childIds = subTags
            .filter((st) => st.parent_id === tagId)
            .map((st) => st.id);
          newTags = newTags.filter((id) => id !== tagId && !childIds.includes(id));
        } else {
          // Deselecting a sub-tag - just remove it
          newTags = newTags.filter((id) => id !== tagId);
        }
      } else {
        // Selecting
        if (tag.parent_id && !selectedTags.includes(tag.parent_id)) {
          // Selecting a sub-tag - also select its parent
          newTags = [...newTags, tagId, tag.parent_id];
        } else {
          // Selecting a main tag or sub-tag whose parent is already selected
          newTags = [...newTags, tagId];
        }
      }

      onSetTags(newTags);
    } else {
      // Fallback to simple toggle (parent component will need to handle parent selection)
      onToggleTag(tagId);
    }
  };

  return (
    <div className="space-y-4">
      {mainTags.map((mainTag) => {
        const childTags = subTags.filter((tag) => tag.parent_id === mainTag.id);
        const isMainSelected = selectedTags.includes(mainTag.id);

        return (
          <div key={mainTag.id} className="space-y-2">
            {/* Main Tag */}
            <button
              type="button"
              onClick={() => handleTagToggle(mainTag.id)}
              className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-all hover:shadow-md ${getTagClasses(
                mainTag,
                isMainSelected
              )}`}
            >
              {mainTag.icon && <span className="mr-1.5">{mainTag.icon}</span>}
              {mainTag.label}
            </button>

            {/* Sub-tags (indented) */}
            {childTags.length > 0 && (
              <div className="ml-6 flex flex-wrap gap-2">
                {childTags.map((subTag) => {
                  const isSelected = selectedTags.includes(subTag.id);
                  return (
                    <button
                      key={subTag.id}
                      type="button"
                      onClick={() => handleTagToggle(subTag.id)}
                      className={`px-3 py-1 text-xs rounded-full border transition-all hover:shadow-md ${getTagClasses(
                        subTag,
                        isSelected
                      )}`}
                    >
                      {subTag.icon && <span className="mr-1">{subTag.icon}</span>}
                      {subTag.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Standalone tags (no parent) that aren't main tags */}
      {allTags
        .filter((tag) => !tag.parent_id && tag.category !== 'main')
        .map((tag) => {
          const isSelected = selectedTags.includes(tag.id);
          return (
            <button
              key={tag.id}
              type="button"
              onClick={() => handleTagToggle(tag.id)}
              className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-all hover:shadow-md ${getTagClasses(
                tag,
                isSelected
              )}`}
            >
              {tag.icon && <span className="mr-1.5">{tag.icon}</span>}
              {tag.label}
            </button>
          );
        })}
    </div>
  );
}
