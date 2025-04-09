/*
  # Create leaderboard table

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

CREATE TABLE IF NOT EXISTS leaderboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL,
  score integer NOT NULL DEFAULT 0,
  completed boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Allow public read access to leaderboard
CREATE POLICY "Leaderboard is publicly viewable"
  ON leaderboard
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert scores
CREATE POLICY "Users can insert their scores"
  ON leaderboard
  FOR INSERT
  TO authenticated
  WITH CHECK (true);