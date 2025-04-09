/*
  # Update RLS policies with proper type casting
  
  1. Changes
    - Fix type casting between UUID and text for auth.uid()
    - Update policies for question_attempts and leaderboard tables
    - Use proper syntax for policy creation
    
  2. Security
    - Maintain RLS on all tables
    - Ensure proper access control for authenticated users
    - Allow public read access to leaderboard
*/

-- Question Attempts policies
ALTER TABLE question_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert attempts" ON question_attempts;
CREATE POLICY "Users can insert attempts"
ON question_attempts
FOR INSERT
TO authenticated
WITH CHECK (
  player_name = (auth.uid())::text AND
  question_id > 0
);

DROP POLICY IF EXISTS "Users can view their own attempts" ON question_attempts;
CREATE POLICY "Users can view their own attempts"
ON question_attempts
FOR SELECT
TO authenticated
USING (player_name = (auth.uid())::text);

-- Leaderboard policies
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert their scores" ON leaderboard;
CREATE POLICY "Users can insert their scores"
ON leaderboard
FOR INSERT
TO authenticated
WITH CHECK (player_name = (auth.uid())::text);

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
USING (player_name = (auth.uid())::text)
WITH CHECK (player_name = (auth.uid())::text);

DROP POLICY IF EXISTS "Users can delete their own scores" ON leaderboard;
CREATE POLICY "Users can delete their own scores"
ON leaderboard
FOR DELETE
TO authenticated
USING (player_name = (auth.uid())::text);