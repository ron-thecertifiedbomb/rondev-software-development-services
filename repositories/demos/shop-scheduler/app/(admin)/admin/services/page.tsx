import { createClient } from "@/lib/supabase/server";

export default async function ServicesPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("services")
    .select("id,name,duration_minutes,is_active")
    .limit(50);

  if (error) {
    return (
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold">Services</h1>
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {error.message}
        </div>
      </section>
    );
  }

  const services = data ?? [];

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Services</h1>
        <p className="text-slate-600">
          List services for your shop.
        </p>
      </div>

      {services.length === 0 ? (
        <div className="rounded-2xl border p-5 text-sm text-slate-600">
          No services found.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-3">Service</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Status</th>
                <th className="p-3">ID</th>
              </tr>
            </thead>

            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-t">
                  <td className="p-3 font-medium">{service.name}</td>

                  <td className="p-3">
                    {service.duration_minutes} mins
                  </td>

                  <td className="p-3">
                    <span
                      className={[
                        "rounded-full border px-2 py-1 text-xs",
                        service.is_active
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 bg-slate-50 text-slate-500",
                      ].join(" ")}
                    >
                      {service.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="p-3 text-xs text-slate-400">
                    {service.id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}