/*
# Create storage policies for portfolio bucket

## Overview
Sets up RLS policies on the `portfolio` storage bucket so:
- Public users can read (view) images
- Authenticated admin users can upload, update, and delete images

## Security
- SELECT: public (anon + authenticated) — all visitors can view gallery images
- INSERT/UPDATE/DELETE: authenticated only — admin can manage images
*/

DROP POLICY IF EXISTS "public_read_portfolio_bucket" ON storage.objects;
CREATE POLICY "public_read_portfolio_bucket"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'portfolio');

DROP POLICY IF EXISTS "admin_insert_portfolio_bucket" ON storage.objects;
CREATE POLICY "admin_insert_portfolio_bucket"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'portfolio');

DROP POLICY IF EXISTS "admin_update_portfolio_bucket" ON storage.objects;
CREATE POLICY "admin_update_portfolio_bucket"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'portfolio') WITH CHECK (bucket_id = 'portfolio');

DROP POLICY IF EXISTS "admin_delete_portfolio_bucket" ON storage.objects;
CREATE POLICY "admin_delete_portfolio_bucket"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'portfolio');
