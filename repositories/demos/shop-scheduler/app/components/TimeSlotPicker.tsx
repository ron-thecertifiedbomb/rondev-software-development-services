export default function TimeSlotPicker({
    selectedDate,
    selectedTime,
    timeSlots,
    bookedTimes,
    onSelect,
}: {
    selectedDate: string;
    selectedTime: string;
    timeSlots: string[];
    bookedTimes: Set<string>;
    onSelect: (time: string) => void;
}) {
    if (!selectedDate) {
        return <p className="text-sm text-slate-500">Select a date first.</p>;
    }

    return (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {timeSlots.map((time) => {
                const active = selectedTime === time;
                const isBooked = bookedTimes.has(time);

                return (
                    <button
                        key={time}
                        type="button"
                        disabled={isBooked}
                        onClick={() => {
                            if (isBooked) return;
                            onSelect(time);
                        }}
                        className={[
                            "rounded-xl border px-4 py-3 text-sm transition",
                            active
                                ? "border-slate-900 bg-slate-900 text-white"
                                : "border-slate-200 bg-white hover:bg-slate-50",
                            isBooked
                                ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 line-through hover:bg-slate-100"
                                : "",
                        ].join(" ")}
                    >
                        {time}
                    </button>
                );
            })}
        </div>
    );
}