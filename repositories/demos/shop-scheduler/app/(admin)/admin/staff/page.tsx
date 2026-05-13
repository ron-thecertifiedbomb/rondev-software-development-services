import { createClient } from "@/lib/supabase/server";

export default async function StaffPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("staff")
    .select("id,name,is_active,created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return (
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold">Staff</h1>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-medium">Supabase query error</p>
          <pre className="mt-2 whitespace-pre-wrap">{error.message}</pre>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Staff</h1>
        <p className="text-slate-600">
          Optional in MVP — add staff to enable staff-specific bookings.
        </p>
      </div>

      {!data || data.length === 0 ? (
        <div className="rounded-2xl border p-5 text-sm text-slate-600">
          No staff found. Make sure you added staff records and that your signed-in
          user is a member of the shop in <code>shop_members</code>.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Active</th>
                <th className="p-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {data.map((staff) => (
                <tr key={staff.id} className="border-t">
                  <td className="p-3">{staff.name}</td>
                  <td className="p-3">{staff.is_active ? "Yes" : "No"}</td>
                  <td className="p-3">
                    {staff.created_at
                      ? new Date(staff.created_at).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <pre className="rounded-2xl bg-slate-950 p-4 text-xs text-slate-100 overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </section>
  );
}