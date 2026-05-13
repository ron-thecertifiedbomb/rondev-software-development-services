type CalendarItem = {
  id: string;
  booking_no: number | null;
  status: "pending" | "confirmed" | "cancelled";
  start_at: string;
  end_at: string;
  customer_name: string;
  customer_email: string;
};

type BookingCalendarProps = {
  year: number;
  month: number; // 0-based month
  bookingsByDate: Record<string, CalendarItem[]>;
};

function pad2(value: number) {
  return String(value).padStart(2, "0");
}

function formatDateKey(year: number, month: number, day: number) {
  return `${year}-${pad2(month + 1)}-${pad2(day)}`;
}

function formatTime(dateValue: string) {
  return new Intl.DateTimeFormat("en-PH", {
    timeZone: "Asia/Manila",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(dateValue));
}

function statusClass(status: CalendarItem["status"]) {
  if (status === "confirmed") {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }

  if (status === "cancelled") {
    return "bg-red-50 text-red-700 border-red-200";
  }

  return "bg-amber-50 text-amber-700 border-amber-200";
}

export default function BookingCalendar({
  year,
  month,
  bookingsByDate,
}: BookingCalendarProps) {
  const monthStart = new Date(year, month, 1);

  const monthTitle = new Intl.DateTimeFormat("en-PH", {
    month: "long",
    year: "numeric",
  }).format(monthStart);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOffset = new Date(year, month, 1).getDay();

  const calendarCells: Array<{
    key: string;
    day: number | null;
    dateKey: string | null;
  }> = [];

  for (let i = 0; i < firstDayOffset; i++) {
    calendarCells.push({
      key: `empty-start-${i}`,
      day: null,
      dateKey: null,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push({
      key: `day-${day}`,
      day,
      dateKey: formatDateKey(year, month, day),
    });
  }

  while (calendarCells.length % 7 !== 0) {
    calendarCells.push({
      key: `empty-end-${calendarCells.length}`,
      day: null,
      dateKey: null,
    });
  }

  return (
    <div className="rounded-2xl border p-4">
      <h2 className="text-lg font-semibold">{monthTitle}</h2>

      <div className="mt-4 grid grid-cols-7 gap-px overflow-hidden rounded-xl border bg-slate-200">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="bg-slate-50 p-3 text-center text-xs font-medium text-slate-600"
          >
            {day}
          </div>
        ))}

        {calendarCells.map((cell) => {
          const dayBookings = cell.dateKey
            ? bookingsByDate[cell.dateKey] ?? []
            : [];

          return (
            <div key={cell.key} className="min-h-36 bg-white p-3 align-top">
              {cell.day ? (
                <>
                  <div className="mb-2 text-sm font-medium text-slate-700">
                    {cell.day}
                  </div>

                  <div className="space-y-2">
                    {dayBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="rounded-xl border bg-white p-2 text-xs shadow-sm"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold">
                            #{booking.booking_no ?? "—"}
                          </span>

                          <span
                            className={[
                              "rounded-full border px-2 py-0.5 text-[10px]",
                              statusClass(booking.status),
                            ].join(" ")}
                          >
                            {booking.status}
                          </span>
                        </div>

                        <div className="mt-1 font-medium">
                          {formatTime(booking.start_at)} -{" "}
                          {formatTime(booking.end_at)}
                        </div>

                        <div className="mt-1 truncate text-slate-600">
                          {booking.customer_name}
                        </div>

                        <div className="truncate text-slate-400">
                          {booking.customer_email}
                        </div>

                        <div className="mt-1 truncate text-[10px] text-slate-400">
                          UUID: {booking.id}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}