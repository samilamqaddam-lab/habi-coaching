-- Migration: Admin Improvements
-- Date: 2026-01-19
-- Description:
--   1. Add 'contacted' boolean field to coaching_requests
--   2. Add 'payment_requested_at' timestamp to registrations (yoga)

-- =====================================================
-- PART 1: Coaching - Contacted Field
-- =====================================================

-- Add contacted boolean column
ALTER TABLE coaching_requests
ADD COLUMN IF NOT EXISTS contacted BOOLEAN DEFAULT false;

-- Migrate existing 'contacted' status to the new boolean field
UPDATE coaching_requests
SET contacted = true
WHERE status = 'contacted';

-- Convert 'contacted' status to 'pending' (keeping contacted = true)
UPDATE coaching_requests
SET status = 'pending'
WHERE status = 'contacted';

-- =====================================================
-- PART 2: Yoga - Payment Request Timestamp
-- =====================================================

-- Add payment_requested_at timestamp column to registrations
ALTER TABLE registrations
ADD COLUMN IF NOT EXISTS payment_requested_at TIMESTAMPTZ;

-- If payment_request_sent column exists and is true, set a timestamp
-- (This handles legacy data if the column was manually added)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'registrations'
        AND column_name = 'payment_request_sent'
    ) THEN
        UPDATE registrations
        SET payment_requested_at = NOW()
        WHERE payment_request_sent = true
        AND payment_requested_at IS NULL;
    END IF;
END $$;
