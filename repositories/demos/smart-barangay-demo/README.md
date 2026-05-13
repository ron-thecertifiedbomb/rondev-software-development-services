# RonDev Smart Barangay Portal (Demo)

A lightweight Next.js + Tailwind demo for the **Smart Barangay Portal**.

## Features (Demo Scope)
- Public landing page
- Online request form (no resident login)
- Tracking page (use tracking code)
- Announcements page (static demo)
- Simple admin request list (demo gate via query key)

## 1) Install
```bash
npm install
```

## 2) Configure Env
Copy the example file and fill Supabase values:
```bash
cp .env.local.example .env.local
```

Set:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 3) Create Database Table (Supabase)
Run this SQL in Supabase SQL editor:
```sql
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
```

> Note: For a real deployment, configure RLS policies. This demo keeps setup minimal.

## 4) Run
```bash
npm run dev
```

Open:
- http://localhost:3000
- http://localhost:3000/request
- http://localhost:3000/track
- http://localhost:3000/admin?key=changeme  (optional demo gate)

## Deployment
- Vercel works out-of-the-box for Next.js.
- Add the same environment variables in your hosting provider.
