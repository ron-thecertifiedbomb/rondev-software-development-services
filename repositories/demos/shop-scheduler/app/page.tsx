import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-semibold">Shop Scheduler (MVP)</h1>

      <p className="mt-3 text-slate-600">
        A minimal Next.js + Supabase repository for online scheduling.
      </p>

      <div className="mt-6 flex gap-3">
        <Link
          className="rounded-xl border px-4 py-2 hover:bg-slate-50"
          href="/auth/sign-in"
        >
          Admin Sign In
        </Link>

        <Link
          className="rounded-xl border px-4 py-2 hover:bg-slate-50"
          href="/book/demo-shop"
        >
          Demo Booking Page
        </Link>

        <Link
          className="rounded-xl border px-4 py-2 hover:bg-slate-50"
          href="/admin/bookings"
        >
          Bookings Calendar
        </Link>
      </div>

      <section className="mt-10 space-y-3 rounded-2xl border p-5">
        <h2 className="text-lg font-medium">What’s included</h2>

        <ul className="list-disc pl-5 text-slate-700">
          <li>Supabase SSR auth setup using App Router</li>
          <li>Public booking API endpoint with validation</li>
          <li>Service and staff dropdowns for booking</li>
          <li>Calendar-based booking page</li>
          <li>Admin bookings calendar</li>
          <li>SQL migration: shops, services, staff, hours, bookings + RLS</li>
        </ul>
      </section>
    </main>
  );
}