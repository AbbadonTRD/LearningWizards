/*
  # Fix RLS policies for question attempts

  1. Changes
    - Update RLS policies to use auth.uid() correctly
    - Fix player_name type casting and comparison
    - Add function to get current user ID as text
    
  2. Security
    - Maintain RLS on all tables
    - Ensure proper access control
*/

-- Create function to get current user ID as text
CREATE OR REPLACE FUNCTION uid() 
RETURNS text 
LANGUAGE sql STABLE
AS $$
  SELECT coalesce(nullif(current_setting('request.jwt.claim.sub', true), ''), (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub'))::text
$$;

-- Update question_attempts policies
ALTER TABLE question_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert attempts" ON question_attempts;
CREATE POLICY "Users can insert attempts"
ON question_attempts
FOR INSERT
TO authenticated
WITH CHECK (
  player_name = uid() AND
  question_id > 0
);

DROP POLICY IF EXISTS "Users can view their own attempts" ON question_attempts;
CREATE POLICY "Users can view their own attempts"
ON question_attempts
FOR SELECT
TO authenticated
USING (player_name = uid());

-- Update leaderboard policies
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert their scores" ON leaderboard;
CREATE POLICY "Users can insert their scores"
ON leaderboard
FOR INSERT
TO authenticated
WITH CHECK (player_name = uid());

DROP POLICY IF EXISTS "Leaderboard is publicly viewable" ON leaderboard;
CREATE POLICY "Leaderboard is publicly viewable"
ON leaderboard
FOR SELECT
TO public
USING (true);

DROP POLICY IF EXISTS "Users can update their own scores" ON leaderboard;
CREATE POLICY "Users can update their own scores"
ON leaderboard
FOR UPDATE
TO authenticated
USING (player_name = uid())
WITH CHECK (player_name = uid());

DROP POLICY IF EXISTS "Users can delete their own scores" ON leaderboard;
CREATE POLICY "Users can delete their own scores"
ON leaderboard
FOR DELETE
TO authenticated
USING (player_name = uid());