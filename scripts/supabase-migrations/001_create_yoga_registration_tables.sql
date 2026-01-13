-- =====================================================
-- Migration: Create Yoga Registration System Tables
-- Project: Transcendence Work - Upa Yoga Multi-Sessions
-- Date: 2026-01-13
-- =====================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLE: programme_editions
-- Stores editions of programmes (e.g., "Upa Yoga - Janvier 2026")
-- =====================================================
CREATE TABLE programme_editions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  programme_key TEXT NOT NULL,  -- 'upa-yoga', 'surya-kriya', etc.
  title TEXT NOT NULL,          -- "Upa Yoga - Janvier 2026"
  title_en TEXT,                -- English title
  start_date DATE,
  max_capacity INT DEFAULT 10,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for quick lookups
CREATE INDEX idx_programme_editions_key ON programme_editions(programme_key);
CREATE INDEX idx_programme_editions_active ON programme_editions(is_active);

-- =====================================================
-- TABLE: edition_sessions
-- Stores sessions within an edition (e.g., "Session 1", "Session 2", etc.)
-- =====================================================
CREATE TABLE edition_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  edition_id UUID REFERENCES programme_editions(id) ON DELETE CASCADE,
  session_number INT NOT NULL,
  title TEXT,          -- "Session 1: Introduction au Upa Yoga"
  title_en TEXT,       -- English title
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(edition_id, session_number)
);

CREATE INDEX idx_edition_sessions_edition ON edition_sessions(edition_id);

-- =====================================================
-- TABLE: session_date_options
-- Stores date/time options for each session
-- =====================================================
CREATE TABLE session_date_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES edition_sessions(id) ON DELETE CASCADE,
  date_time TIMESTAMPTZ NOT NULL,
  location TEXT DEFAULT 'Studio, Casablanca',
  max_capacity INT DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_session_date_options_session ON session_date_options(session_id);

-- =====================================================
-- TABLE: registrations
-- Stores participant registrations
-- =====================================================
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  edition_id UUID REFERENCES programme_editions(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  consent BOOLEAN DEFAULT true,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_registrations_edition ON registrations(edition_id);
CREATE INDEX idx_registrations_email ON registrations(email);
CREATE INDEX idx_registrations_status ON registrations(status);

-- =====================================================
-- TABLE: registration_date_choices
-- Links registrations to their chosen date options
-- =====================================================
CREATE TABLE registration_date_choices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registration_id UUID REFERENCES registrations(id) ON DELETE CASCADE,
  date_option_id UUID REFERENCES session_date_options(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(registration_id, date_option_id)
);

CREATE INDEX idx_reg_date_choices_registration ON registration_date_choices(registration_id);
CREATE INDEX idx_reg_date_choices_date_option ON registration_date_choices(date_option_id);

-- =====================================================
-- VIEW: date_availability
-- Real-time availability count per date option
-- =====================================================
CREATE OR REPLACE VIEW date_availability AS
SELECT
  sdo.id AS date_option_id,
  sdo.session_id,
  sdo.date_time,
  sdo.max_capacity,
  COALESCE(COUNT(rdc.id) FILTER (WHERE r.status != 'cancelled'), 0)::INT AS current_count,
  (sdo.max_capacity - COALESCE(COUNT(rdc.id) FILTER (WHERE r.status != 'cancelled'), 0))::INT AS remaining_spots,
  CASE
    WHEN COALESCE(COUNT(rdc.id) FILTER (WHERE r.status != 'cancelled'), 0) >= sdo.max_capacity
    THEN true
    ELSE false
  END AS is_full
FROM session_date_options sdo
LEFT JOIN registration_date_choices rdc ON sdo.id = rdc.date_option_id
LEFT JOIN registrations r ON rdc.registration_id = r.id
GROUP BY sdo.id, sdo.session_id, sdo.date_time, sdo.max_capacity;

-- =====================================================
-- RLS (Row Level Security) Policies
-- =====================================================

-- Enable RLS on tables
ALTER TABLE programme_editions ENABLE ROW LEVEL SECURITY;
ALTER TABLE edition_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_date_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE registration_date_choices ENABLE ROW LEVEL SECURITY;

-- Public read access for programme info
CREATE POLICY "Allow public read on programme_editions" ON programme_editions
  FOR SELECT USING (true);

CREATE POLICY "Allow public read on edition_sessions" ON edition_sessions
  FOR SELECT USING (true);

CREATE POLICY "Allow public read on session_date_options" ON session_date_options
  FOR SELECT USING (true);

-- Registrations are write-only for public (service role can read/write all)
CREATE POLICY "Allow public insert on registrations" ON registrations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert on registration_date_choices" ON registration_date_choices
  FOR INSERT WITH CHECK (true);

-- =====================================================
-- SAMPLE DATA: Upa Yoga Edition - Janvier/Février 2026
-- =====================================================

-- Create the edition
INSERT INTO programme_editions (id, programme_key, title, title_en, start_date, max_capacity, is_active)
VALUES (
  'e1234567-89ab-cdef-0123-456789abcdef',
  'upa-yoga',
  'Upa Yoga - Édition Janvier 2026',
  'Upa Yoga - January 2026 Edition',
  '2026-01-25',
  10,
  true
);

-- Create 3 sessions
INSERT INTO edition_sessions (id, edition_id, session_number, title, title_en)
VALUES
  ('s1111111-1111-1111-1111-111111111111', 'e1234567-89ab-cdef-0123-456789abcdef', 1, 'Session 1: Introduction au Upa Yoga', 'Session 1: Introduction to Upa Yoga'),
  ('s2222222-2222-2222-2222-222222222222', 'e1234567-89ab-cdef-0123-456789abcdef', 2, 'Session 2: Pratiques approfondies', 'Session 2: Advanced Practices'),
  ('s3333333-3333-3333-3333-333333333333', 'e1234567-89ab-cdef-0123-456789abcdef', 3, 'Session 3: Intégration & Clôture', 'Session 3: Integration & Closing');

-- Create 2 date options per session
INSERT INTO session_date_options (session_id, date_time, location, max_capacity)
VALUES
  -- Session 1 options
  ('s1111111-1111-1111-1111-111111111111', '2026-01-25 10:00:00+00', 'Studio, Casablanca', 10),
  ('s1111111-1111-1111-1111-111111111111', '2026-01-26 10:00:00+00', 'Studio, Casablanca', 10),
  -- Session 2 options
  ('s2222222-2222-2222-2222-222222222222', '2026-02-01 10:00:00+00', 'Studio, Casablanca', 10),
  ('s2222222-2222-2222-2222-222222222222', '2026-02-02 10:00:00+00', 'Studio, Casablanca', 10),
  -- Session 3 options
  ('s3333333-3333-3333-3333-333333333333', '2026-02-08 10:00:00+00', 'Studio, Casablanca', 10),
  ('s3333333-3333-3333-3333-333333333333', '2026-02-09 10:00:00+00', 'Studio, Casablanca', 10);

-- =====================================================
-- GRANT ACCESS (for service role)
-- =====================================================
-- Note: Service role automatically has full access
-- These grants are for the anon/authenticated roles if needed

GRANT SELECT ON date_availability TO anon;
GRANT SELECT ON date_availability TO authenticated;
