import { Employee } from "../../types/attendance";

export function StatusBadge({
    status,
    tone,
}: {
    status: Employee["status"];
    tone: Employee["tone"];
}) {
    const toneClass =
        {
            emerald: "bg-emerald-400/10 text-emerald-300 ring-emerald-300/20",
            amber: "bg-amber-400/10 text-amber-300 ring-amber-300/20",
            slate: "bg-slate-400/10 text-slate-300 ring-slate-300/20",
        }[tone];

    return (
        <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${toneClass}`}>
            {status}
        </span>
    );
}