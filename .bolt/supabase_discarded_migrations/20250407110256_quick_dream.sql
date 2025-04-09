/*
  # Fix RLS policies for question attempts

  1. Changes
    - Drop existing RLS policies for question_attempts table
    - Add new RLS policies that properly handle INSERT operations
    
  2. Security
    - Enable RLS on question_attempts table
    - Add policy for authenticated users to insert their own attempts
    - Add policy for authenticated users to view their own attempts
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert attempts" ON question_attempts;
DROP POLICY IF EXISTS "Users can view their own attempts" ON question_attempts;

-- Enable RLS
ALTER TABLE question_attempts ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Users can insert attempts"
ON question_attempts
FOR INSERT
TO authenticated
WITH CHECK (
  -- Ensure player_name matches the authenticated user's ID
  player_name = auth.uid()::text
);

CREATE POLICY "Users can view their own attempts"
ON question_attempts
FOR SELECT
TO authenticated
USING (
  -- Users can only view their own attempts
  player_name = auth.uid()::text
);