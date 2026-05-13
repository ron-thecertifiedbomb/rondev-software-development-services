-- Shop Scheduler MVP schema

create extension if not exists "uuid-ossp";

create table if not exists public.shops (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  timezone text not null default 'Asia/Manila',
  created_at timestamptz not null default now()
);

create type public.shop_role as enum ('owner','staff');

create table if not exists public.shop_members (
  shop_id uuid references public.shops(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role public.shop_role not null default 'staff',
  created_at timestamptz not null default now(),
  primary key (shop_id, user_id)
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references public.shops(id) on delete cascade,
  name text not null,
  duration_minutes int not null check (duration_minutes between 5 and 480),
  price_cents int,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.staff (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references public.shops(id) on delete cascade,
  name text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.business_hours (
  shop_id uuid not null references public.shops(id) on delete cascade,
  weekday int not null check (weekday between 0 and 6),
  open_time time,
  close_time time,
  is_closed boolean not null default false,
  primary key (shop_id, weekday)
);

create type public.booking_status as enum ('pending','confirmed','cancelled');

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references public.shops(id) on delete cascade,
  service_id uuid not null references public.services(id),
  staff_id uuid references public.staff(id),
  start_at timestamptz not null,
  end_at timestamptz not null,
  status public.booking_status not null default 'pending',
  customer_name text not null,
  customer_email text not null,
  customer_note text,
  created_at timestamptz not null default now(),
  constraint end_after_start check (end_at > start_at)
);

create index if not exists bookings_shop_start_idx on public.bookings (shop_id, start_at);
create index if not exists bookings_staff_start_idx on public.bookings (staff_id, start_at);

create or replace function public.prevent_overlapping_bookings()
returns trigger
language plpgsql
as $$
declare
  overlaps int;
begin
  if (new.status in ('pending','confirmed')) then
    select count(*) into overlaps
    from public.bookings b
    where b.shop_id = new.shop_id
      and (b.staff_id is not distinct from new.staff_id)
      and b.id <> coalesce(new.id, '00000000-0000-0000-0000-000000000000'::uuid)
      and b.status in ('pending','confirmed')
      and tstzrange(b.start_at, b.end_at, '[)') && tstzrange(new.start_at, new.end_at, '[)');
    if overlaps > 0 then
      raise exception 'Overlapping booking detected';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_prevent_overlaps on public.bookings;
create trigger trg_prevent_overlaps
before insert or update on public.bookings
for each row execute function public.prevent_overlapping_bookings();

-- RLS
alter table public.shops enable row level security;
alter table public.shop_members enable row level security;
alter table public.services enable row level security;
alter table public.staff enable row level security;
alter table public.business_hours enable row level security;
alter table public.bookings enable row level security;

create or replace function public.is_shop_member(_shop_id uuid)
returns boolean
language sql stable
as $$
  select exists (
    select 1
    from public.shop_members m
    where m.shop_id = _shop_id and m.user_id = auth.uid()
  );
$$;

create policy "shop read for members"
on public.shops for select
using (public.is_shop_member(id));

create policy "members read"
on public.shop_members for select
using (public.is_shop_member(shop_id));

create policy "owners manage members"
on public.shop_members for all
using (
  exists (
    select 1 from public.shop_members m
    where m.shop_id = shop_members.shop_id
      and m.user_id = auth.uid()
      and m.role = 'owner'
  )
);

create policy "services for members"
on public.services for all
using (public.is_shop_member(shop_id))
with check (public.is_shop_member(shop_id));

create policy "staff for members"
on public.staff for all
using (public.is_shop_member(shop_id))
with check (public.is_shop_member(shop_id));

create policy "hours for members"
on public.business_hours for all
using (public.is_shop_member(shop_id))
with check (public.is_shop_member(shop_id));

create policy "bookings read for members"
on public.bookings for select
using (public.is_shop_member(shop_id));

create policy "bookings manage for members"
on public.bookings for update
using (public.is_shop_member(shop_id))
with check (public.is_shop_member(shop_id));
