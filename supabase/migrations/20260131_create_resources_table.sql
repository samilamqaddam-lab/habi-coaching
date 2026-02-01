-- Create resources table for educational content (videos, PDFs, links)
-- Primary use case: YouTube videos with tagging and filtering

CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Type
  resource_type VARCHAR(20) NOT NULL CHECK (resource_type IN ('video', 'pdf', 'link', 'audio')),

  -- Content (bilingual)
  title TEXT NOT NULL,
  title_en TEXT,
  description TEXT,
  description_en TEXT,

  -- Media
  url TEXT NOT NULL,                   -- YouTube URL, PDF URL, or external link
  video_id TEXT,                       -- YouTube video ID (auto-extracted from URL)
  thumbnail_url TEXT,                  -- Custom thumbnail or auto-fetched from YouTube

  -- Metadata
  tags TEXT[] DEFAULT '{}',            -- Array of tag IDs from tags table
  duration_minutes INT,                -- Video/audio duration

  -- Relations
  related_programme_key TEXT,          -- Programme associé (optional)
  related_event_id UUID,               -- Événement associé (optional)

  -- Publication
  is_active BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_resources_type ON resources(resource_type);
CREATE INDEX idx_resources_tags ON resources USING GIN(tags);
CREATE INDEX idx_resources_active ON resources(is_active, created_at DESC) WHERE is_active = TRUE;
CREATE INDEX idx_resources_featured ON resources(featured, created_at DESC) WHERE featured = TRUE;
CREATE INDEX idx_resources_created ON resources(created_at DESC);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_resources_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER resources_updated_at
BEFORE UPDATE ON resources
FOR EACH ROW
EXECUTE FUNCTION update_resources_updated_at();

-- Comments for documentation
COMMENT ON TABLE resources IS 'Educational resources including YouTube videos, PDFs, and external links';
COMMENT ON COLUMN resources.video_id IS 'YouTube video ID extracted from URL for embed generation';
COMMENT ON COLUMN resources.tags IS 'Array of tag IDs from tags table for categorization and filtering';
COMMENT ON COLUMN resources.related_programme_key IS 'Optional link to a programme (upa-yoga, surya-kriya, etc.)';
COMMENT ON COLUMN resources.related_event_id IS 'Optional link to a yoga_events record';
