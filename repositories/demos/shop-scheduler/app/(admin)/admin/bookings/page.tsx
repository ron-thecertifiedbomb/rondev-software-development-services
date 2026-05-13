import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import BookingCalendar from "@/app/components/BookingCalendar";

type CalendarItem = {
  id: string;
  booking_no: number | null;
  status: "pending" | "confirmed" | "cancelled";
  start_at: string;
  end_at: string;
  customer_name: string;
  customer_email: string;
};

function statusClass(status: CalendarItem["status"]) {
  if (status === "confirmed") {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }
}
  type Booking = CalendarItem;

  type PageProps = {
    searchParams?: Promise<{
      month?: string;
    }>;
  };

  function pad2(value: number) {
    return String(value).padStart(2, "0");
  }

  function parseMonth(monthParam?: string) {
    const now = new Date();

    if (!monthParam || !/^\d{4}-\d{2}$/.test(monthParam)) {
      return {
        year: now.getFullYear(),
        month: now.getMonth(),
      };
    }

    const [yearText, monthText] = monthParam.split("-");
    const year = Number(yearText);
    const month = Number(monthText) - 1;

    if (Number.isNaN(year) || Number.isNaN(month) || month < 0 || month > 11) {
      return {
        year: now.getFullYear(),
        month: now.getMonth(),
      };
    }

    return { year, month };
  }

  function monthParam(year: number, month: number) {
    return `${year}-${pad2(month + 1)}`;
  }

  function addMonths(year: number, month: number, amount: number) {
    const date = new Date(year, month + amount, 1);

    return {
      year: date.getFullYear(),
      month: date.getMonth(),
    };
  }

  function getManilaDateKey(dateValue: string) {
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Manila",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    return formatter.format(new Date(dateValue));
  }

  export default async function BookingsPage({ searchParams }: PageProps) {
    const params = searchParams ? await searchParams : {};
    const { year, month } = parseMonth(params?.month);

    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 1);

    const previous = addMonths(year, month, -1);
    const next = addMonths(year, month, 1);

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("bookings")
      .select(
        "id,booking_no,status,start_at,end_at,customer_name,customer_email"
      )
      .gte("start_at", monthStart.toISOString())
      .lt("start_at", monthEnd.toISOString())
      .order("start_at", { ascending: true });

    if (error) {
      return (
        <section className="space-y-3">
          <h1 className="text-2xl font-semibold">Bookings</h1>
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <p className="font-medium">Supabase query error</p>
            <pre className="mt-2 whitespace-pre-wrap">{error.message}</pre>
          </div>
        </section>
      );
    }

    const bookings = (data ?? []) as Booking[];

    const bookingsByDate = bookings.reduce<Record<string, Booking[]>>(
      (acc, booking) => {
        const key = getManilaDateKey(booking.start_at);
        acc[key] ??= [];
        acc[key].push(booking);
        return acc;
      },
      {}
    );

    return (
      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Bookings Calendar</h1>
            <p className="text-slate-600">
              Bookings visible to shop members through RLS.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/admin/bookings?month=${monthParam(previous.year, previous.month)}`}
              className="rounded-xl border px-4 py-2 text-sm hover:bg-slate-50"
            >
              Previous
            </Link>

            <Link
              href={`/admin/bookings?month=${monthParam(next.year, next.month)}`}
              className="rounded-xl border px-4 py-2 text-sm hover:bg-slate-50"
            >
              Next
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border p-4">
          <BookingCalendar
            year={year}
            month={month}
            bookingsByDate={bookingsByDate}
        
          />
        </div>
      </section>
    );
  }