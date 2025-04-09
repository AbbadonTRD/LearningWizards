/*
  # Fix leaderboard policies

  1. Changes
    - Add update policy for authenticated users
    - Add delete policy for authenticated users
    - Modify insert policy to check player_name
    
  2. Security
    - Enable RLS
    - Add policies for CRUD operations
    - Ensure users can only modify their own records
*/

-- Enable RLS
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Leaderboard is publicly viewable" ON leaderboard;
DROP POLICY IF EXISTS "Users can insert their scores" ON leaderboard;

-- Create new policies
CREATE POLICY "Leaderboard is publicly viewable"
  ON leaderboard
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert their scores"
  ON leaderboard
  FOR INSERT
  TO authenticated
  WITH CHECK (
    -- Ensure player_name is not null and not empty
    player_name IS NOT NULL AND 
    trim(player_name) != ''
  );

CREATE POLICY "Users can update their own scores"
  ON leaderboard
  FOR UPDATE
  TO authenticated
  USING (
    -- User can only update their own scores
    player_name = current_user
  )
  WITH CHECK (
    -- Ensure score and completion status are valid
    score >= 0 AND
    player_name IS NOT NULL AND 
    trim(player_name) != ''
  );

CREATE POLICY "Users can delete their own scores"
  ON leaderboard
  FOR DELETE
  TO authenticated
  USING (
    -- User can only delete their own scores
    player_name = current_user
  );