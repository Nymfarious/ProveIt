-- =====================================================
-- PROVEIT DATABASE VERIFICATION & FIXES
-- Run this in Supabase SQL Editor
-- =====================================================

-- 1. VERIFY TABLES EXIST
-- If these return results, you're good!
SELECT 'proveit_profiles exists' as status, count(*) as rows FROM proveit_profiles;
SELECT 'proveit_reports exists' as status, count(*) as rows FROM proveit_reports;

-- =====================================================
-- 2. ADD MISSING INSERT POLICY FOR REPORTS (if missing)
-- This allows users to create their own reports
-- =====================================================

-- Check if policy exists first (run this to see current policies)
SELECT policyname FROM pg_policies WHERE tablename = 'proveit_reports';

-- If "Users can insert own reports" is missing, run this:
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'proveit_reports' 
    AND policyname = 'Users can insert own reports'
  ) THEN
    CREATE POLICY "Users can insert own reports" ON public.proveit_reports
      FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- =====================================================
-- 3. ADD EXPORT/IMPORT TRACKING TABLE (for v2.4.0 feature)
-- =====================================================

CREATE TABLE IF NOT EXISTS public.proveit_exports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  export_type TEXT CHECK (export_type IN ('manual', 'scheduled')),
  date_range_start DATE,
  date_range_end DATE,
  file_hash TEXT -- for deduplication on import
);

ALTER TABLE public.proveit_exports ENABLE ROW LEVEL SECURITY;

-- Users can only see their own exports
CREATE POLICY "Users can view own exports" ON public.proveit_exports
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exports" ON public.proveit_exports
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- 4. ADD SOURCE TRACKING TABLE (for news org drift analysis)
-- This tracks how sources' bias ratings change over time
-- =====================================================

CREATE TABLE IF NOT EXISTS public.proveit_source_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source_domain TEXT NOT NULL,
  recorded_at TIMESTAMPTZ DEFAULT NOW(),
  bias_rating TEXT,
  factuality_rating TEXT,
  mbfc_url TEXT,
  notes TEXT
);

-- This table is public read (reference data)
ALTER TABLE public.proveit_source_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read source history" ON public.proveit_source_history
  FOR SELECT USING (true);

-- Only admins can insert (you'll insert via SQL or edge function)
-- For now, let authenticated users contribute
CREATE POLICY "Authenticated can insert source history" ON public.proveit_source_history
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- =====================================================
-- 5. VERIFICATION QUERIES - Run these to confirm setup
-- =====================================================

-- Check all ProveIt tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'proveit_%';

-- Check all policies on ProveIt tables
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename LIKE 'proveit_%';

-- Check the trigger exists
SELECT trigger_name, event_manipulation, action_statement 
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';
