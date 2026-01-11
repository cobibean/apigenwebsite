-- =====================================================
-- APIGEN SUPABASE MIGRATIONS
-- Run this in: https://supabase.com/dashboard/project/ckzfibtiqllgrjhfvrjd/sql/new
-- =====================================================

-- 1. Create the is_admin function for middleware auth check
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.app_users 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  );
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- =====================================================
-- 2. Content Blocks table for Copy CMS
-- =====================================================

CREATE TABLE IF NOT EXISTS public.content_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  content_type text NOT NULL DEFAULT 'text',
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.content_blocks ENABLE ROW LEVEL SECURITY;

-- Public read for content_blocks
CREATE POLICY "Public read content_blocks" ON public.content_blocks
  FOR SELECT USING (true);

-- Admins can manage content_blocks
CREATE POLICY "Admins manage content_blocks" ON public.content_blocks
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.app_users WHERE user_id = auth.uid() AND role = 'admin')
  );

-- Create index for slug lookups
CREATE INDEX IF NOT EXISTS idx_content_blocks_slug ON public.content_blocks(slug);

-- =====================================================
-- 3. Create trigger for updated_at
-- =====================================================

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  NEW.updated_by = auth.uid();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER content_blocks_updated_at
  BEFORE UPDATE ON public.content_blocks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- =====================================================
-- DONE! Now create an admin user:
-- 1. Go to Authentication → Users → Add User
-- 2. Create user with email/password
-- 3. Copy the user's UUID
-- 4. Run: INSERT INTO app_users (user_id, role) VALUES ('your-uuid-here', 'admin');
-- =====================================================
