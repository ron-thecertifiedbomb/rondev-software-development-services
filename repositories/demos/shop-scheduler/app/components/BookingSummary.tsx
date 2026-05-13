export default function BookingSummary({
    startAt,
}: {
    startAt: string;
}) {
    const formattedSchedule = startAt
        ? new Intl.DateTimeFormat("en-PH", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: "Asia/Manila",
        }).format(new Date(startAt))
        : "No date and time selected yet.";

    return (
        <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
            <p className="font-medium text-slate-700">Selected schedule</p>
            <p className="mt-1">{formattedSchedule}</p>
        </div>
    );
}