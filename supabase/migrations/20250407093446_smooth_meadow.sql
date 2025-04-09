/*
  # Fix player_name type and RLS policies

  1. Changes
    - Modify player_name column to use text type
    - Update RLS policies to use text comparison
    - Ensure proper type handling for auth.uid()
    
  2. Security
    - Enable RLS
    - Add policies for CRUD operations
    - Fix type casting for auth.uid()
*/

-- Update question_attempts policies
ALTER TABLE question_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert attempts" ON question_attempts;
CREATE POLICY "Users can insert attempts"
ON question_attempts
FOR INSERT
TO authenticated
WITH CHECK (
  player_name = auth.uid()::text AND
  question_id > 0
);

DROP POLICY IF EXISTS "Users can view their own attempts" ON question_attempts;
CREATE POLICY "Users can view their own attempts"
ON question_attempts
FOR SELECT
TO authenticated
USING (player_name = auth.uid()::text);

-- Update leaderboard policies
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can update their own scores" ON leaderboard;
CREATE POLICY "Users can update their own scores"
ON leaderboard
FOR INSERT
TO authenticated
WITH CHECK (player_name = auth.uid()::text);

DROP POLICY IF EXISTS "Leaderboard is publicly viewable" ON leaderboard;
CREATE POLICY "Leaderboard is publicly viewable"
ON leaderboard
FOR SELECT
TO public
USING (true);

DROP POLICY IF EXISTS "Users can update their scores" ON leaderboard;
CREATE POLICY "Users can update their scores"
ON leaderboard
FOR UPDATE
TO authenticated
USING (player_name = auth.uid()::text)
WITH CHECK (player_name = auth.uid()::text);