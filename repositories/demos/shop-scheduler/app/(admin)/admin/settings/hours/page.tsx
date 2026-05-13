import { createClient } from "@/lib/supabase/server";

export default async function HoursPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("business_hours").select("shop_id,weekday,open_time,close_time,is_closed").limit(50);

  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-semibold">Business Hours</h1>
      <p className="text-slate-600">Weekly opening hours per shop.</p>
      <pre className="rounded-2xl bg-slate-950 p-4 text-xs text-slate-100 overflow-auto">{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
