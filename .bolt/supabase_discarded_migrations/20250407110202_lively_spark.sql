/*
  # Fix RLS policies for question_attempts table

  1. Changes
    - Drop existing insert policy that uses incorrect uid() function
    - Create new insert policy using correct auth.uid() function with proper text casting
    
  2. Security
    - Maintains RLS enabled on question_attempts table
    - Updates policy to properly handle text comparison for player_name
*/

-- Drop the existing insert policy that uses incorrect uid() function
DROP POLICY IF EXISTS "Users can insert attempts" ON question_attempts;

-- Create new insert policy with correct auth.uid() function and text casting
CREATE POLICY "Users can insert attempts"
ON question_attempts
FOR INSERT
TO authenticated
WITH CHECK (
  (player_name = auth.uid()::text) AND 
  (question_id > 0)
);