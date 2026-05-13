# Shop Scheduler (Next.js + Supabase) — MVP Repo

A minimal repository scaffold for **online scheduling for shops**.

## Features (MVP)
- Supabase Auth (SSR cookie-based) via `@supabase/ssr`
- Public booking API endpoint: `POST /api/public/book`
- SQL migration with RLS for multi-tenant shop data
- Admin route skeleton (`/admin`) protected by `supabase.auth.getUser()`

## Getting Started

### 1) Create a Supabase project
- Enable Email/Password Auth in Supabase dashboard.

### 2) Configure env vars
Copy `.env.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_SECRET_KEY=... # server only
```

### 3) Apply database migration
Run `supabase/migrations/0001_init.sql` in Supabase SQL Editor.

### 4) Run locally

```bash
npm install
npm run dev
```

Open:
- http://localhost:3000
- Admin: `/auth/sign-in`
- Demo booking: `/book/demo-shop`

## Notes
- The booking page is intentionally basic (manual Service ID + ISO datetime). Replace with a UI availability picker.
- Public bookings currently call Supabase using the server SSR client. For production, consider a server-only service client using `SUPABASE_SECRET_KEY` and strict validation.
