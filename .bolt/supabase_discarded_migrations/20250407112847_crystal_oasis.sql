/*
  # Fix question_attempts RLS policies

  1. Changes
    - Drop existing RLS policies for question_attempts table
    - Create new RLS policies that properly handle authentication

  2. Security
    - Enable RLS on question_attempts table
    - Add policies for:
      - Authenticated users can insert their own attempts
      - Authenticated users can view their own attempts
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can insert attempts" ON question_attempts;
  DROP POLICY IF EXISTS "Users can view their own attempts" ON question_attempts;
END $$;

-- Ensure RLS is enabled
ALTER TABLE question_attempts ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Users can insert attempts"
  ON question_attempts
  FOR INSERT
  TO authenticated
  WITH CHECK (
    player_name = auth.uid()::text
  );

CREATE POLICY "Users can view their own attempts"
  ON question_attempts
  FOR SELECT
  TO authenticated
  USING (
    player_name = auth.uid()::text
  );