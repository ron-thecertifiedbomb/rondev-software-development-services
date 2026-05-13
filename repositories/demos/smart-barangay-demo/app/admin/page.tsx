export const dynamic = "force-dynamic";
export const revalidate = 0;

import { unstable_noStore as noStore } from "next/cache";
import Card from "@/components/ui/Card";
import StatusBadge from "@/components/StatusBadge";
import CopyButton from "@/components/CopyButton";
import { supabaseAdminless } from "@/lib/supabase";
import type { RequestRow } from "@/types/request";

function serviceLabel(service_type: string) {
  const map: Record<string, string> = {
    barangay_clearance: "Barangay Clearance",
    certificate_of_indigency: "Certificate of Indigency",
    business_permit_assistance: "Business Permit Assistance",
  };
  return map[service_type] ?? service_type;
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { key?: string };
}) {
  noStore();

  const key = searchParams?.key;
  const expected = process.env.ADMIN_DEMO_KEY || "changeme";

  if (key !== expected) {
    return (
      <Card title="Admin (Demo Gate)" subtitle="Demo access only">
        <p className="text-sm text-gray-600">
          Add <code className="rounded bg-gray-100 px-1">?key={expected}</code> to the URL.
        </p>
      </Card>
    );
  }

  const supabase = supabaseAdminless();
  const { data, error } = await supabase
    .from("requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return (
      <Card title="Admin (Requests)">
        <p className="text-sm text-danger">Error: {error.message}</p>
      </Card>
    );
  }

  const rows = (data || []) as RequestRow[];

  // Mini dashboard stats
  const total = rows.length;
  const pending = rows.filter((r) => r.status === "pending").length;
  const approved = rows.filter((r) => r.status === "approved").length;
  const rejected = rows.filter((r) => r.status === "rejected").length;

  return (
    <div className="space-y-4">
      {/* ✅ Mini dashboard */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Total" subtitle="Latest 50">
          <div className="text-3xl font-extrabold">{total}</div>
          <p className="mt-1 text-xs text-gray-500">Requests loaded</p>
        </Card>

        <Card title="Pending" subtitle="Needs action">
          <div className="text-3xl font-extrabold text-warn">{pending}</div>
          <p className="mt-1 text-xs text-gray-500">Awaiting processing</p>
        </Card>

        <Card title="Approved" subtitle="Completed">
          <div className="text-3xl font-extrabold text-success">{approved}</div>
          <p className="mt-1 text-xs text-gray-500">Completed requests</p>
        </Card>

        <Card title="Rejected" subtitle="Declined">
          <div className="text-3xl font-extrabold text-danger">{rejected}</div>
          <p className="mt-1 text-xs text-gray-500">Declined requests</p>
        </Card>
      </div>

      {/* ✅ MOBILE: cards view */}
      <div className="md:hidden space-y-3">
        {rows.map((r) => (
          <div key={r.id} className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-gray-900">{r.full_name}</div>
                <div className="mt-1 text-xs text-gray-500">
                  {new Date(r.created_at).toLocaleString()}
                </div>
              </div>
              <StatusBadge status={r.status} />
            </div>

            <div className="mt-3 grid gap-2 text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="text-gray-600">Service</span>
                <span className="font-medium text-gray-900">{serviceLabel(r.service_type)}</span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-gray-600">Tracking</span>
                <div className="flex items-center gap-2">
                  <code className="rounded bg-gray-100 px-2 py-1 text-xs font-mono">
                    {r.tracking_code}
                  </code>
                  <CopyButton value={r.tracking_code} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ DESKTOP: table view */}
      <div className="hidden md:block">
        <Card title={`Requests (${rows.length})`} subtitle="Latest submissions">
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 bg-white">
                <tr className="border-b bg-gray-50 text-left">
                  <th className="p-2">Created</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Service</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Tracking</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((r, idx) => (
                  <tr key={r.id} className={idx % 2 ? "bg-gray-50" : "bg-white"}>
                    <td className="p-2 whitespace-nowrap">
                      {new Date(r.created_at).toLocaleString()}
                    </td>
                    <td className="p-2">{r.full_name}</td>
                    <td className="p-2">{serviceLabel(r.service_type)}</td>
                    <td className="p-2">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="p-2">
                      <div className="flex items-center gap-2">

                        <code className="max-w-[160px] truncate rounded bg-gray-100 px-2 py-1 text-xs font-mono">
                          {r.tracking_code}
                        </code>

                        <CopyButton value={r.tracking_code} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
``