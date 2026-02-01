-- Create articles table for blog posts and news
-- Replaces Sanity CMS for article management

CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Content (bilingual)
  title TEXT NOT NULL,
  title_en TEXT,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  excerpt_en TEXT,
  content JSONB,              -- Rich text content (portable text format or simple JSON)
  content_en JSONB,

  -- Media
  featured_image_url TEXT,
  thumbnail_url TEXT,

  -- Metadata
  tags TEXT[] DEFAULT '{}',   -- Array of tag IDs ['yoga', 'qvt', 'event-recap']
  author_name TEXT DEFAULT 'Hajar Habi',
  read_time_minutes INT,

  -- Relations
  related_event_id UUID,      -- FK vers yoga_events (optional)
  related_programme_key TEXT, -- 'upa-yoga', 'surya-kriya', etc. (optional)

  -- Publication
  is_published BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_articles_tags ON articles USING GIN(tags);
CREATE INDEX idx_articles_published ON articles(is_published, published_at DESC) WHERE is_published = TRUE;
CREATE INDEX idx_articles_featured ON articles(featured, published_at DESC) WHERE featured = TRUE;
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_created ON articles(created_at DESC);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_articles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER articles_updated_at
BEFORE UPDATE ON articles
FOR EACH ROW
EXECUTE FUNCTION update_articles_updated_at();

-- Comments for documentation
COMMENT ON TABLE articles IS 'Blog articles and news posts with bilingual support and tagging';
COMMENT ON COLUMN articles.content IS 'Rich text content in JSON format (portable text or custom JSON structure)';
COMMENT ON COLUMN articles.tags IS 'Array of tag IDs from tags table for categorization and filtering';
COMMENT ON COLUMN articles.related_event_id IS 'Optional link to a yoga_events record for event recaps';
COMMENT ON COLUMN articles.related_programme_key IS 'Optional link to a programme (upa-yoga, surya-kriya, etc.)';
