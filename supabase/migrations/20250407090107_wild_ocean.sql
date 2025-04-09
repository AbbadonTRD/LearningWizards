/*
  # Create leaderboard table and policies

  1. New Tables
    - `leaderboard`
      - `id` (uuid, primary key)
      - `player_name` (text)
      - `score` (integer)
      - `completed` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `leaderboard` table
    - Add policy for public read access
    - Add policy for authenticated users to insert their own scores
*/

-- Create the table if it doesn't exist
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS leaderboard (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    player_name text NOT NULL,
    score integer NOT NULL DEFAULT 0,
    completed boolean NOT NULL DEFAULT false,
    created_at timestamptz DEFAULT now()
  );
EXCEPTION
  WHEN duplicate_table THEN
    NULL;
END $$;

-- Enable RLS
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and create new ones
DO $$ BEGIN
  DROP POLICY IF EXISTS "Leaderboard is publicly viewable" ON leaderboard;
  DROP POLICY IF EXISTS "Users can insert their scores" ON leaderboard;
EXCEPTION
  WHEN undefined_object THEN
    NULL;
END $$;

-- Create policies
CREATE POLICY "Leaderboard is publicly viewable"
  ON leaderboard
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert their scores"
  ON leaderboard
  FOR INSERT
  TO authenticated
  WITH CHECK (true);