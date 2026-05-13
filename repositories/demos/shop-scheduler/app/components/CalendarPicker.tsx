"use client";

type CalendarCell = {
    key: string;
    day: number | null;
    dateKey: string | null;
    isPast: boolean;
};

type Booking = {
    id: string;
    booking_no: string | null;
    status: string;
    start_at: string;
    end_at: string | null;
    customer_name: string;
    customer_email: string;
};

function pad2(value: number) {
    return String(value).padStart(2, "0");
}

function toDateKey(date: Date) {
    return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(
        date.getDate()
    )}`;
}

function toTimeLabel(value: string) {
    const date = new Date(value);

    return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
}

export default function CalendarPicker({
    monthTitle,
    calendarCells,
    selectedDate,
    bookings,
    bookingsLoading,
    onPrev,
    onNext,
    onSelectDate,
}: {
    monthTitle: string;
    calendarCells: CalendarCell[];
    selectedDate: string;
    bookings: Booking[];
    bookingsLoading?: boolean;
    onPrev: () => void;
    onNext: () => void;
    onSelectDate: (dateKey: string) => void;
}) {
    const bookingsByDate = bookings.reduce<Record<string, Booking[]>>(
        (acc, booking) => {
            const date = new Date(booking.start_at);
            const dateKey = toDateKey(date);

            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }

            acc[dateKey].push(booking);

            return acc;
        },
        {}
    );

    return (
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
                <button
                    onClick={onPrev}
                    type="button"
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                    Previous
                </button>

                <div className="text-center">
                    <h2 className="text-lg font-semibold text-slate-900">
                        {monthTitle}
                    </h2>

                    {bookingsLoading ? (
                        <p className="text-xs text-slate-500">Loading bookings...</p>
                    ) : null}
                </div>

                <button
                    onClick={onNext}
                    type="button"
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                    Next
                </button>
            </div>

            <div className="grid grid-cols-7 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div
                        key={day}
                        className="bg-slate-50 p-3 text-center text-xs font-medium text-slate-500"
                    >
                        {day}
                    </div>
                ))}

                {calendarCells.map((cell) => {
                    const dateKey = cell.dateKey;
                    const isSelected = dateKey === selectedDate;
                    const isEmpty = !dateKey;
                    const dayBookings = dateKey ? bookingsByDate[dateKey] ?? [] : [];
                    const hasBookings = dayBookings.length > 0;

                    return (
                        <button
                            key={cell.key}
                            disabled={isEmpty || cell.isPast}
                            onClick={() => {
                                if (!dateKey || cell.isPast) return;
                                onSelectDate(dateKey);
                            }}
                            type="button"
                            className={[
                                "min-h-28 p-2 text-left text-sm transition",
                                "relative flex flex-col gap-1",

                                isEmpty ? "cursor-default bg-slate-50" : "",

                                cell.isPast
                                    ? "cursor-not-allowed bg-slate-100 text-slate-300 opacity-80"
                                    : "",

                                !isEmpty && !cell.isPast && !isSelected
                                    ? "bg-white text-slate-900 hover:bg-slate-50"
                                    : "",

                                isSelected
                                    ? "bg-slate-900 text-white hover:bg-slate-900"
                                    : "",
                            ].join(" ")}
                        >
                            {cell.day ? (
                                <div className="flex items-center justify-between gap-2">
                                    <span className="font-semibold">{cell.day}</span>

                                    {hasBookings ? (
                                        <span
                                            className={[
                                                "rounded-full px-2 py-0.5 text-[10px] font-medium",
                                                isSelected
                                                    ? "bg-white/20 text-white"
                                                    : "bg-amber-100 text-amber-700",
                                            ].join(" ")}
                                        >
                                            {dayBookings.length}
                                        </span>
                                    ) : null}
                                </div>
                            ) : null}

                            {hasBookings ? (
                                <div className="mt-1 grid gap-1 overflow-hidden">
                                    {dayBookings.slice(0, 3).map((booking) => (
                                        <div
                                            key={booking.id}
                                            className={[
                                                "truncate rounded-md px-2 py-1 text-[11px] leading-tight",
                                                isSelected
                                                    ? "bg-white/15 text-white"
                                                    : "bg-amber-50 text-amber-800",
                                            ].join(" ")}
                                            title={`${toTimeLabel(booking.start_at)} - ${booking.customer_name
                                                }`}
                                        >
                                            <span className="font-semibold">
                                                {toTimeLabel(booking.start_at)}
                                            </span>{" "}
                                            {booking.customer_name}
                                        </div>
                                    ))}

                                    {dayBookings.length > 3 ? (
                                        <div
                                            className={[
                                                "text-[11px] font-medium",
                                                isSelected ? "text-white/80" : "text-slate-500",
                                            ].join(" ")}
                                        >
                                            +{dayBookings.length - 3} more
                                        </div>
                                    ) : null}
                                </div>
                            ) : null}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}