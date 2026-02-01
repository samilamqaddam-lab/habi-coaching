/**
 * Shared TypeScript types for Supabase entities
 * Used across API routes, hooks, and components
 */

// ============================================================================
// TAGS (Hierarchical Tagging System)
// ============================================================================

export type TagCategory = 'main' | 'sub';

export interface Tag {
  id: string;                 // 'yoga', 'upa-yoga', 'qvt'
  label: string;              // 'Yoga', 'Upa Yoga', 'QVT'
  label_en: string;
  parent_id: string | null;   // NULL for main tags, parent ID for sub-tags
  category: TagCategory;
  color?: string;             // 'golden-orange', 'morocco-blue', etc.
  icon?: string;              // Icon identifier (optional)
  display_order: number;
  created_at: string;
}

// ============================================================================
// ARTICLES (Blog Posts & News)
// ============================================================================

export type ArticleStatus = 'pending' | 'published' | 'draft';

export interface Article {
  id: string;

  // Content (bilingual)
  title: string;
  title_en?: string;
  slug: string;
  excerpt?: string;
  excerpt_en?: string;
  content?: ArticleContent;   // Rich text in JSON format
  content_en?: ArticleContent;

  // Media
  featured_image_url?: string;
  thumbnail_url?: string;

  // Metadata
  tags: string[];             // Array of tag IDs
  author_name: string;
  read_time_minutes?: number;

  // Relations
  related_event_id?: string;      // FK to yoga_events
  related_programme_key?: string; // 'upa-yoga', 'surya-kriya', etc.

  // Publication
  is_published: boolean;
  featured: boolean;
  published_at?: string;

  // Timestamps
  created_at: string;
  updated_at: string;
}

// Rich text content structure (portable text or custom JSON)
export interface ArticleContent {
  type?: 'portable-text' | 'html' | 'markdown';
  blocks?: any[];  // Portable text blocks
  html?: string;   // HTML content
  markdown?: string; // Markdown content
}

// Create article DTO (Data Transfer Object)
export type CreateArticleDTO = Omit<Article, 'id' | 'created_at' | 'updated_at'>;

// Update article DTO
export type UpdateArticleDTO = Partial<CreateArticleDTO>;

// ============================================================================
// RESOURCES (Videos, PDFs, Links)
// ============================================================================

export type ResourceType = 'video' | 'pdf' | 'link' | 'audio';

export interface Resource {
  id: string;

  // Type
  resource_type: ResourceType;

  // Content (bilingual)
  title: string;
  title_en?: string;
  description?: string;
  description_en?: string;

  // Media
  url: string;                    // YouTube URL, PDF URL, external link, or uploaded file URL
  video_id?: string;              // YouTube video ID (auto-extracted)
  thumbnail_url?: string;         // Custom or auto-fetched from YouTube

  // Upload metadata (for uploaded files)
  upload_type: 'link' | 'upload'; // 'link' for external URLs, 'upload' for uploaded files
  file_size?: number;             // File size in bytes (for uploads)
  mime_type?: string;             // MIME type (for uploads)
  storage_path?: string;          // Storage path in Supabase (for uploads)

  // Metadata
  tags: string[];                 // Array of tag IDs
  duration_minutes?: number;      // Video/audio duration

  // Relations
  related_programme_key?: string; // Programme associé
  related_event_id?: string;      // Événement associé

  // Publication
  is_active: boolean;
  featured: boolean;

  // Timestamps
  created_at: string;
  updated_at: string;
}

// Create resource DTO
export type CreateResourceDTO = Omit<Resource, 'id' | 'created_at' | 'updated_at'>;

// Update resource DTO
export type UpdateResourceDTO = Partial<CreateResourceDTO>;

// ============================================================================
// YOGA EVENTS (Extended for Past Events)
// ============================================================================

export interface YogaEvent {
  id: string;
  title: string;
  title_en?: string;
  subtitle?: string;
  subtitle_en?: string;
  description?: string;
  description_en?: string;
  date_time: string;
  end_time?: string;
  location: string;
  max_capacity: number;
  price?: number;
  image_url?: string;
  is_active: boolean;
  created_at: string;

  // From event_availability view (optional)
  current_count?: number;
  remaining_spots?: number;
  is_full?: boolean;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

// Generic API response wrapper
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Paginated response
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Articles API response
export interface ArticlesResponse {
  articles: Article[];
  total?: number;
}

// Resources API response
export interface ResourcesResponse {
  resources: Resource[];
  total?: number;
}

// Tags API response
export interface TagsResponse {
  tags: Tag[];
}

// Events API response
export interface EventsResponse {
  events: YogaEvent[];
  total?: number;
}

// ============================================================================
// FILTER & QUERY TYPES
// ============================================================================

// Article filters
export interface ArticleFilters {
  tags?: string[];
  featured?: boolean;
  is_published?: boolean;
  limit?: number;
  offset?: number;
  search?: string;
}

// Resource filters
export interface ResourceFilters {
  type?: ResourceType;
  tags?: string[];
  featured?: boolean;
  is_active?: boolean;
  limit?: number;
  offset?: number;
}

// Tag filters
export interface TagFilters {
  parent?: string | null;  // Filter by parent_id
  category?: TagCategory;   // Filter by category
}

// Event filters
export interface EventFilters {
  includePast?: boolean;
  limit?: number;
  offset?: number;
}

// ============================================================================
// FORM TYPES
// ============================================================================

// Article form data
export interface ArticleFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: ArticleContent;
  featured_image_url: string;
  thumbnail_url: string;
  tags: string[];
  author_name: string;
  read_time_minutes: number;
  related_event_id?: string;
  related_programme_key?: string;
  is_published: boolean;
  featured: boolean;
  published_at?: string;
}

// Resource form data
export interface ResourceFormData {
  resource_type: ResourceType;
  title: string;
  title_en?: string;
  description: string;
  description_en?: string;
  url: string;
  thumbnail_url?: string;
  upload_type: 'link' | 'upload';
  file_size?: number;
  mime_type?: string;
  storage_path?: string;
  tags: string[];
  related_programme_key?: string;
  related_event_id?: string;
  featured: boolean;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

// Extract YouTube video ID from URL
export function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  return match ? match[1] : null;
}

// Get YouTube thumbnail URL
export function getYouTubeThumbnailUrl(videoId: string, quality: 'default' | 'hq' | 'mq' | 'sd' | 'maxres' = 'maxres'): string {
  const qualityMap = {
    default: 'default',
    hq: 'hqdefault',
    mq: 'mqdefault',
    sd: 'sddefault',
    maxres: 'maxresdefault',
  };
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

// Format duration (minutes to HH:MM or MM:SS)
export function formatDuration(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hrs > 0 ? `${hrs}:${mins.toString().padStart(2, '0')}` : `${mins}:00`;
}

// Calculate read time from content
export function calculateReadTime(content: string, wordsPerMinute: number = 200): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
