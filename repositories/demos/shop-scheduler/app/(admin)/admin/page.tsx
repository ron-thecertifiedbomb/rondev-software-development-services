import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-slate-600">Signed in as {userData.user?.email}</p>

      <div className="rounded-2xl border p-5">
        <p className="text-sm text-slate-700">
          Next steps: create a shop record, add services, configure business hours, then start accepting bookings.
        </p>
      </div>
    </section>
  );
}
