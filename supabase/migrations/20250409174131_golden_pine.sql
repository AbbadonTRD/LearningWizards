/*
  # Fix RLS policies for question attempts

  1. Changes
    - Update RLS policies to use auth.uid()
    - Add function to get current user ID
    - Fix type handling for auth.uid()
    
  2. Security
    - Enable RLS
    - Add policies for authenticated users
    - Ensure proper access control
*/

-- Create function to get current user ID
CREATE OR REPLACE FUNCTION auth_uid() 
RETURNS text 
LANGUAGE sql STABLE
AS $$
  SELECT auth.uid()::text;
$$;

-- Update question_attempts policies
ALTER TABLE question_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert attempts" ON question_attempts;
CREATE POLICY "Users can insert attempts"
ON question_attempts
FOR INSERT
TO authenticated
WITH CHECK (
  player_name = auth_uid() AND
  question_id > 0
);

DROP POLICY IF EXISTS "Users can view their own attempts" ON question_attempts;
CREATE POLICY "Users can view their own attempts"
ON question_attempts
FOR SELECT
TO authenticated
USING (player_name = auth_uid());