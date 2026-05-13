export default function StatusBadge({ status }: { status: string }) {
    const s = status.toLowerCase();
    const map: Record<string, string> = {
        pending: "bg-warn/10 text-warn ring-warn/20",
        approved: "bg-success/10 text-success ring-success/20",
        rejected: "bg-danger/10 text-danger ring-danger/20",
    };

    const cls = map[s] ?? "bg-gray-100 text-gray-700 ring-gray-200";

    return (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${cls}`}>
            {status}
        </span>
    );
}
