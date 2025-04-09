/*
  # Create backup of existing tables

  1. Backup Tables
    - Create backup of leaderboard table
    - Create backup of question_attempts table
    - Copy existing data to backup tables
    
  2. Security
    - Enable RLS on backup tables
    - Copy existing policies
*/

-- Create backup of leaderboard table
CREATE TABLE IF NOT EXISTS leaderboard_backup_20250409 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL,
  score integer NOT NULL DEFAULT 0,
  completed boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Copy data to leaderboard backup
INSERT INTO leaderboard_backup_20250409
SELECT * FROM leaderboard;

-- Create backup of question_attempts table
CREATE TABLE IF NOT EXISTS question_attempts_backup_20250409 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL,
  question_id integer NOT NULL,
  correct boolean NOT NULL,
  created_at timestamptz DEFAULT now(),
  cooldown_until timestamptz DEFAULT (now() + interval '24 hours')
);

-- Copy data to question_attempts backup
INSERT INTO question_attempts_backup_20250409
SELECT * FROM question_attempts;

-- Enable RLS on backup tables
ALTER TABLE leaderboard_backup_20250409 ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_attempts_backup_20250409 ENABLE ROW LEVEL SECURITY;

-- Create policies for backup tables
CREATE POLICY "Backup tables are viewable by authenticated users only"
ON leaderboard_backup_20250409
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Backup tables are viewable by authenticated users only"
ON question_attempts_backup_20250409
FOR SELECT
TO authenticated
USING (true);