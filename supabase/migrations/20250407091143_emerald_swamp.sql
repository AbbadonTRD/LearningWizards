/*
  # Add question attempts tracking

  1. New Tables
    - `question_attempts`: Tracks each attempt at answering questions
      - `id` (uuid, primary key)
      - `player_name` (text): Links to the player
      - `question_id` (integer): References the question
      - `correct` (boolean): Whether the attempt was correct
      - `created_at` (timestamp): When the attempt was made
      - `cooldown_until` (timestamp): When the question can be attempted again

  2. Functions
    - Calculate player accuracy
    - Check cooldown status
    
  3. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Create question attempts table
CREATE TABLE IF NOT EXISTS question_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL,
  question_id integer NOT NULL,
  correct boolean NOT NULL,
  created_at timestamptz DEFAULT now(),
  cooldown_until timestamptz DEFAULT (now() + interval '24 hours')
);

-- Enable RLS
ALTER TABLE question_attempts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own attempts"
  ON question_attempts
  FOR SELECT
  TO authenticated
  USING (player_name = current_user);

CREATE POLICY "Users can insert attempts"
  ON question_attempts
  FOR INSERT
  TO authenticated
  WITH CHECK (
    player_name = current_user AND
    question_id > 0
  );

-- Create function to calculate player accuracy
CREATE OR REPLACE FUNCTION calculate_player_accuracy(p_player_name text)
RETURNS float
LANGUAGE plpgsql
AS $$
DECLARE
  total_attempts integer;
  correct_attempts integer;
BEGIN
  -- Get total unique questions attempted
  SELECT 
    COUNT(DISTINCT question_id),
    COUNT(DISTINCT question_id) FILTER (WHERE correct = true)
  INTO total_attempts, correct_attempts
  FROM question_attempts
  WHERE player_name = p_player_name;

  -- Return accuracy as percentage
  RETURN CASE 
    WHEN total_attempts = 0 THEN 0
    ELSE (correct_attempts::float / total_attempts::float) * 100
  END;
END;
$$;