/*
# Create portfolio_images and contact_queries tables

## Overview
This migration creates two tables for the Flystone Interiors website:
1. `portfolio_images` — stores image metadata for the public portfolio gallery. Images are uploaded by admin and visible to all visitors.
2. `contact_queries` — stores contact form submissions from website visitors.

## New Tables

### portfolio_images
- `id` (uuid, primary key)
- `title` (text, not null) — display title for the image
- `category` (text, not null) — e.g. "Living Room", "Bedroom", "Kitchen", "Office"
- `description` (text, nullable) — optional description
- `image_url` (text, not null) — URL to the image (Supabase Storage public URL)
- `display_order` (int, default 0) — ordering for gallery display
- `is_featured` (boolean, default false) — featured images shown prominently
- `created_at` (timestamptz, default now())

### contact_queries
- `id` (uuid, primary key)
- `name` (text, not null) — customer name
- `email` (text, not null) — customer email
- `phone` (text, nullable) — customer phone
- `service_type` (text, nullable) — type of service interested in
- `message` (text, not null) — the query message
- `is_read` (boolean, default false) — admin tracking
- `created_at` (timestamptz, default now())

## Security
- RLS enabled on both tables.
- portfolio_images: public read (anon + authenticated), admin-only write (authenticated).
- contact_queries: public insert (anyone can submit), admin-only read/update/delete (authenticated).
- Note: This is a single-tenant app with admin auth. Public visitors can read portfolio and submit queries. Admin (authenticated) can manage everything.
*/

-- portfolio_images table
CREATE TABLE IF NOT EXISTS portfolio_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Living Room',
  description text,
  image_url text NOT NULL,
  display_order int NOT NULL DEFAULT 0,
  is_featured boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE portfolio_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_portfolio" ON portfolio_images;
CREATE POLICY "public_read_portfolio"
  ON portfolio_images FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "admin_insert_portfolio" ON portfolio_images;
CREATE POLICY "admin_insert_portfolio"
  ON portfolio_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_portfolio" ON portfolio_images;
CREATE POLICY "admin_update_portfolio"
  ON portfolio_images FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_portfolio" ON portfolio_images;
CREATE POLICY "admin_delete_portfolio"
  ON portfolio_images FOR DELETE
  TO authenticated
  USING (true);

-- contact_queries table
CREATE TABLE IF NOT EXISTS contact_queries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  service_type text,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_queries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_queries" ON contact_queries;
CREATE POLICY "public_insert_queries"
  ON contact_queries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "admin_read_queries" ON contact_queries;
CREATE POLICY "admin_read_queries"
  ON contact_queries FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "admin_update_queries" ON contact_queries;
CREATE POLICY "admin_update_queries"
  ON contact_queries FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_queries" ON contact_queries;
CREATE POLICY "admin_delete_queries"
  ON contact_queries FOR DELETE
  TO authenticated
  USING (true);

-- Index for common queries
CREATE INDEX IF NOT EXISTS idx_portfolio_category ON portfolio_images(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON portfolio_images(is_featured);
CREATE INDEX IF NOT EXISTS idx_queries_unread ON contact_queries(is_read);
CREATE INDEX IF NOT EXISTS idx_queries_created ON contact_queries(created_at DESC);
