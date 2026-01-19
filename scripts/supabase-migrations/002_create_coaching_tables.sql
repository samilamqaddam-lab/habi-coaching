-- =====================================================
-- Migration: Create Coaching Registration System Tables
-- Project: Transcendence Work - Individual Coaching
-- Date: 2026-01-19
-- =====================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLE: coaching_packages
-- Stores the different coaching packages available
-- =====================================================
CREATE TABLE coaching_packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,             -- "Séance Unique", "Initiation 60 min", etc.
  name_en TEXT,                   -- English name
  slug TEXT UNIQUE NOT NULL,      -- 'seance-unique', 'initiation-60', etc.
  session_count INT NOT NULL,     -- Number of sessions in the package
  session_duration INT NOT NULL,  -- Duration per session in minutes (60 or 90)
  price DECIMAL(10,2) NOT NULL,   -- Total price in DH
  price_per_session DECIMAL(10,2),-- Price per session in DH
  description TEXT,               -- French description
  description_en TEXT,            -- English description
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for quick lookups
CREATE INDEX idx_coaching_packages_slug ON coaching_packages(slug);
CREATE INDEX idx_coaching_packages_active ON coaching_packages(is_active);

-- =====================================================
-- TABLE: coaching_requests
-- Stores coaching registration requests
-- =====================================================
CREATE TABLE coaching_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  package_id UUID REFERENCES coaching_packages(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  preferred_format TEXT NOT NULL CHECK (preferred_format IN ('online', 'in_person', 'both')),
  message TEXT,
  consent BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'confirmed', 'cancelled')),
  notes TEXT,                     -- Admin notes for tracking exchanges
  payment_requested_at TIMESTAMPTZ, -- When payment request was sent
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for quick lookups
CREATE INDEX idx_coaching_requests_package ON coaching_requests(package_id);
CREATE INDEX idx_coaching_requests_email ON coaching_requests(email);
CREATE INDEX idx_coaching_requests_status ON coaching_requests(status);
CREATE INDEX idx_coaching_requests_created ON coaching_requests(created_at DESC);

-- =====================================================
-- FUNCTION: Update updated_at timestamp
-- =====================================================
CREATE OR REPLACE FUNCTION update_coaching_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER trigger_coaching_packages_updated_at
  BEFORE UPDATE ON coaching_packages
  FOR EACH ROW
  EXECUTE FUNCTION update_coaching_updated_at();

CREATE TRIGGER trigger_coaching_requests_updated_at
  BEFORE UPDATE ON coaching_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_coaching_updated_at();

-- =====================================================
-- RLS (Row Level Security) Policies
-- =====================================================

-- Enable RLS on tables
ALTER TABLE coaching_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaching_requests ENABLE ROW LEVEL SECURITY;

-- Public read access for packages
CREATE POLICY "Allow public read on coaching_packages" ON coaching_packages
  FOR SELECT USING (true);

-- Public insert for requests (service role can read/write all)
CREATE POLICY "Allow public insert on coaching_requests" ON coaching_requests
  FOR INSERT WITH CHECK (true);

-- =====================================================
-- INITIAL DATA: Coaching Packages
-- =====================================================

INSERT INTO coaching_packages (name, name_en, slug, session_count, session_duration, price, price_per_session, description, description_en, display_order)
VALUES
  (
    'Séance Unique',
    'Single Session',
    'seance-unique',
    1,
    90,
    750.00,
    750.00,
    'Une séance ponctuelle pour clarifier une situation, débloquer une prise de décision ou préparer un moment clé.',
    'A single session to clarify a situation, unblock a decision or prepare for a key moment.',
    1
  ),
  (
    'Initiation 60 min',
    'Initiation 60 min',
    'initiation-60',
    3,
    60,
    1350.00,
    450.00,
    'Pack de 3 séances de 60 minutes pour une première approche structurée du coaching.',
    'Pack of 3 x 60-minute sessions for a structured first approach to coaching.',
    2
  ),
  (
    'Initiation 90 min',
    'Initiation 90 min',
    'initiation-90',
    3,
    90,
    2025.00,
    675.00,
    'Pack de 3 séances de 90 minutes pour une première approche approfondie du coaching.',
    'Pack of 3 x 90-minute sessions for an in-depth first approach to coaching.',
    3
  ),
  (
    'Approfondissement',
    'Deep Dive',
    'approfondissement',
    6,
    90,
    3825.00,
    637.50,
    'Un accompagnement structuré sur 6 séances pour un travail de fond sur vos objectifs. Inclut la possibilité d''intégrer des pratiques méditatives.',
    'A structured 6-session program for deep work on your goals. Includes the option to integrate meditative practices.',
    4
  ),
  (
    'Transformation',
    'Transformation',
    'transformation',
    12,
    90,
    7650.00,
    637.50,
    'Un parcours complet de 12 séances pour une transformation en profondeur. Inclut l''intégration progressive de pratiques méditatives.',
    'A complete 12-session journey for deep transformation. Includes progressive integration of meditative practices.',
    5
  );

-- =====================================================
-- GRANT ACCESS (for service role)
-- =====================================================
-- Note: Service role automatically has full access
-- These grants are for the anon/authenticated roles if needed

GRANT SELECT ON coaching_packages TO anon;
GRANT SELECT ON coaching_packages TO authenticated;
