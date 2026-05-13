export const dynamic = "force-dynamic";
export const revalidate = 0;

import { unstable_noStore as noStore } from "next/cache";
import Card from "@/components/ui/Card";
import CopyButton from "@/components/CopyButton";
import StatusBadge from "@/components/StatusBadge";
import { supabaseAdminless } from "@/lib/supabase";

export default async function BizAdminPage({
    searchParams,
}: {
    searchParams: { key?: string };
}) {
    noStore();

    const key = searchParams?.key;
    const expected = process.env.ADMIN_DEMO_KEY || "changeme";

    if (key !== expected) {
        return (
            <Card title="Admin (Demo Gate)">
                <p className="text-sm text-gray-600">
                    Add <code className="rounded bg-gray-100 px-1">?key={expected}</code> to the URL.
                </p>
            </Card>
        );
    }

    const supabase = supabaseAdminless();
    const { data, error } = await supabase
        .from("business_requests")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

    if (error) {
        return (
            <Card title="Admin">
                <p className="text-sm text-red-600">Error: {error.message}</p>
            </Card>
        );
    }

    const rows = data ?? [];

    return (
        <div className="space-y-4">
            <Card title={`Business Requests (${rows.length})`} subtitle="(demo)">
                <div className="md:hidden space-y-3">
                    {rows.map((r: any) => (
                        <div key={r.id} className="rounded-2xl border bg-white p-4 shadow-sm">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <div className="text-sm font-semibold">{r.full_name}</div>
                                    <div className="text-xs text-gray-500">{new Date(r.created_at).toLocaleString()}</div>
                                </div>
                                <StatusBadge status={r.status} />
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                                <code className="max-w-[180px] truncate rounded bg-gray-100 px-2 py-1 text-xs font-mono">
                                    {r.tracking_code}
                                </code>
                                <CopyButton value={r.tracking_code} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="hidden md:block overflow-auto">
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
                            {rows.map((r: any, idx: number) => (
                                <tr key={r.id} className={idx % 2 ? "bg-gray-50" : "bg-white"}>
                                    <td className="p-2 whitespace-nowrap">{new Date(r.created_at).toLocaleString()}</td>
                                    <td className="p-2">{r.full_name}</td>
                                    <td className="p-2">{r.service_type}</td>
                                    <td className="p-2"><StatusBadge status={r.status} /></td>
                                    <td className="p-2">
                                        <div className="flex items-center gap-2">
                                            <code className="rounded bg-gray-100 px-2 py-1 text-xs font-mono">
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
    );
}