-- ==========================================
-- WALL OF LOVE — SUPABASE SETUP SQL
-- Run this script in your Supabase SQL Editor
-- ==========================================

-- 1. Create the feedback table
create table if not exists feedback (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,               -- e.g., "Recruiter", "Client", "Software Engineer"
  message text not null,
  emoji text default '💜', -- Quick reaction emoji
  created_at timestamptz default now(),
  approved boolean default true  -- Instant approval by default
);

-- 2. Enable Row Level Security (RLS)
alter table feedback enable row level security;

-- 3. Policy: Public Read (Anyone can read approved feedback)
drop policy if exists "Public read approved feedback" on feedback;
create policy "Public read approved feedback"
on feedback for select
using (approved = true);

-- 4. Policy: Public Insert (Anyone can submit feedback through RLS check)
drop policy if exists "Public insert feedback" on feedback;
create policy "Public insert feedback"
on feedback for insert
with check (
  length(trim(name)) > 0 
  and length(trim(message)) > 0 
  and length(name) <= 40 
  and length(message) <= 220
);

-- 5. Enable Realtime Replication for the feedback table
alter publication supabase_realtime add table feedback;
