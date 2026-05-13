-- Run in Supabase SQL Editor
create extension if not exists pgcrypto;

create table if not exists requests (
  id uuid primary key default gen_random_uuid(),
  tracking_code uuid not null default gen_random_uuid(),
  full_name text not null,
  service_type text not null,
  purpose text,
  contact text,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_requests_tracking_code on requests(tracking_code);

create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_set_updated_at on requests;
create trigger trg_set_updated_at before update on requests
for each row execute function set_updated_at();
