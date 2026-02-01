-- Create tags table for hierarchical tagging system
-- Two levels: main tags (parent_id = NULL) and sub-tags (parent_id = main tag id)

CREATE TABLE IF NOT EXISTS tags (
  id VARCHAR(50) PRIMARY KEY,          -- 'yoga', 'upa-yoga', 'qvt'
  label TEXT NOT NULL,                 -- 'Yoga', 'Upa Yoga', 'QVT'
  label_en TEXT NOT NULL,
  parent_id VARCHAR(50),               -- NULL for main tags, parent ID for sub-tags
  category VARCHAR(10) NOT NULL CHECK (category IN ('main', 'sub')),
  color VARCHAR(20),                   -- 'golden-orange', 'morocco-blue', etc.
  icon VARCHAR(50),                    -- Icon identifier (optional)
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT fk_parent FOREIGN KEY (parent_id)
    REFERENCES tags(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_tags_parent ON tags(parent_id);
CREATE INDEX idx_tags_category ON tags(category);
CREATE INDEX idx_tags_order ON tags(display_order);

-- Seed initial tags
-- Main tags
INSERT INTO tags (id, label, label_en, parent_id, category, color, display_order) VALUES
  ('yoga', 'Yoga', 'Yoga', NULL, 'main', 'golden-orange', 1),
  ('coaching-organisations', 'Coaching des Organisations', 'Organizational Coaching', NULL, 'main', 'morocco-blue', 2),
  ('event-recap', 'Récap Événement', 'Event Recap', NULL, 'main', 'terracotta', 3),
  ('news', 'Actualités', 'News', NULL, 'main', 'sage', 4)
ON CONFLICT (id) DO NOTHING;

-- Sub-tags: Yoga programmes
INSERT INTO tags (id, label, label_en, parent_id, category, color, display_order) VALUES
  ('upa-yoga', 'Upa Yoga', 'Upa Yoga', 'yoga', 'sub', 'golden-orange', 1),
  ('surya-kriya', 'Surya Kriya', 'Surya Kriya', 'yoga', 'sub', 'golden-orange', 2),
  ('angamardana', 'Angamardana', 'Angamardana', 'yoga', 'sub', 'golden-orange', 3),
  ('yogasanas', 'Yogasanas', 'Yogasanas', 'yoga', 'sub', 'golden-orange', 4),
  ('surya-shakti', 'Surya Shakti', 'Surya Shakti', 'yoga', 'sub', 'golden-orange', 5),
  ('yoga-bien-etre', 'Yoga pour le Bien-être', 'Yoga for Well-being', 'yoga', 'sub', 'sage', 6),
  ('yoga-sante', 'Yoga pour la Santé', 'Yoga for Health', 'yoga', 'sub', 'sage', 7),
  ('evenements-ateliers-yoga', 'Événements & Ateliers Yoga', 'Yoga Events & Workshops', 'yoga', 'sub', 'terracotta', 8)
ON CONFLICT (id) DO NOTHING;

-- Sub-tags: Coaching Organisations
INSERT INTO tags (id, label, label_en, parent_id, category, color, display_order) VALUES
  ('qvt', 'Qualité de Vie au Travail', 'Quality of Work Life', 'coaching-organisations', 'sub', 'morocco-blue', 1),
  ('coaching-professionnel', 'Coaching Professionnel', 'Professional Coaching', 'coaching-organisations', 'sub', 'mystic-mauve', 2),
  ('corporate-yoga', 'Yoga Corporate', 'Corporate Yoga', 'coaching-organisations', 'sub', 'golden-orange', 3),
  ('transformation-organisationnelle', 'Transformation Organisationnelle', 'Organizational Transformation', 'coaching-organisations', 'sub', 'morocco-blue', 4)
ON CONFLICT (id) DO NOTHING;
