-- =====================================================
-- Migration: Create Yoga Events System
-- Project: Transcendence Work - Events & Workshops
-- Date: 2026-01-21
-- =====================================================

-- =====================================================
-- TABLE: yoga_events
-- Stores one-time events (introductions, reviews, workshops, etc.)
-- =====================================================
CREATE TABLE yoga_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  title_en TEXT,
  subtitle TEXT,
  subtitle_en TEXT,
  badge TEXT,                    -- "Structured by Sadhguru", "Review", "Workshop", etc.
  badge_en TEXT,
  description TEXT,
  description_en TEXT,
  date_time TIMESTAMPTZ NOT NULL,
  duration_minutes INT DEFAULT 90,
  location TEXT DEFAULT 'Shido Mind Yoga Studio',
  address TEXT DEFAULT '36B bd d''Anfa, Casablanca',
  price DECIMAL(10,2),
  max_capacity INT DEFAULT 15,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for yoga_events
CREATE INDEX idx_yoga_events_active ON yoga_events(is_active);
CREATE INDEX idx_yoga_events_date ON yoga_events(date_time);

-- =====================================================
-- TABLE: event_registrations
-- Stores registrations for yoga events
-- =====================================================
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES yoga_events(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  payment_requested_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for event_registrations
CREATE INDEX idx_event_registrations_event ON event_registrations(event_id);
CREATE INDEX idx_event_registrations_email ON event_registrations(email);
CREATE INDEX idx_event_registrations_status ON event_registrations(status);

-- =====================================================
-- VIEW: event_availability
-- Real-time availability count per event
-- =====================================================
CREATE OR REPLACE VIEW event_availability AS
SELECT
  e.id AS event_id,
  e.max_capacity,
  COALESCE(COUNT(er.id) FILTER (WHERE er.status != 'cancelled'), 0)::INT AS current_count,
  (e.max_capacity - COALESCE(COUNT(er.id) FILTER (WHERE er.status != 'cancelled'), 0))::INT AS remaining_spots,
  CASE
    WHEN COALESCE(COUNT(er.id) FILTER (WHERE er.status != 'cancelled'), 0) >= e.max_capacity
    THEN true
    ELSE false
  END AS is_full
FROM yoga_events e
LEFT JOIN event_registrations er ON e.id = er.event_id
GROUP BY e.id, e.max_capacity;

-- =====================================================
-- RLS (Row Level Security) Policies
-- =====================================================

-- Enable RLS on tables
ALTER TABLE yoga_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- Public read access for events
CREATE POLICY "Allow public read on yoga_events" ON yoga_events
  FOR SELECT USING (true);

-- Registrations are write-only for public (service role can read/write all)
CREATE POLICY "Allow public insert on event_registrations" ON event_registrations
  FOR INSERT WITH CHECK (true);

-- =====================================================
-- GRANT ACCESS
-- =====================================================
GRANT SELECT ON event_availability TO anon;
GRANT SELECT ON event_availability TO authenticated;

-- =====================================================
-- FIRST EVENT: Nadi Shuddhi - January 31, 2026
-- =====================================================
INSERT INTO yoga_events (
  title,
  title_en,
  subtitle,
  subtitle_en,
  badge,
  badge_en,
  description,
  description_en,
  date_time,
  duration_minutes,
  location,
  address,
  price,
  max_capacity,
  is_active
) VALUES (
  'Nadi Shuddhi',
  'Nadi Shuddhi',
  '& Introduction au Hatha Yoga Classique',
  '& Introduction to Classical Hatha Yoga',
  'Structured by Sadhguru',
  'Structured by Sadhguru',
  'Une pratique de respiration pour purifier et équilibrer les canaux énergétiques.',
  'A breathing practice to purify and balance the energy channels.',
  '2026-01-31 10:00:00+00',
  90,
  'Shido Mind Yoga Studio',
  '36B bd d''Anfa, Casablanca',
  200,
  15,
  true
);
