/*
  # Fix RLS policies for question attempts and leaderboard

  1. Changes
    - Update RLS policies for question_attempts table
    - Update RLS policies for leaderboard table
    - Ensure authenticated users can insert their own records
  
  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Update question_attempts policies
ALTER TABLE question_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert attempts" ON question_attempts;
CREATE POLICY "Users can insert attempts"
ON question_attempts
FOR INSERT
TO authenticated
WITH CHECK (
  player_name = current_user AND
  question_id > 0
);

DROP POLICY IF EXISTS "Users can view their own attempts" ON question_attempts;
CREATE POLICY "Users can view their own attempts"
ON question_attempts
FOR SELECT
TO authenticated
USING (player_name = current_user);

-- Update leaderboard policies
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can update their own scores" ON leaderboard;
CREATE POLICY "Users can update their own scores"
ON leaderboard
FOR INSERT
TO authenticated
WITH CHECK (player_name = current_user);

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
USING (player_name = current_user)
WITH CHECK (player_name = current_user);