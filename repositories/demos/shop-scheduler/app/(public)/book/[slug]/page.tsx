"use client";

import BookingSummary from "@/app/components/BookingSummary";
import CalendarPicker from "@/app/components/CalendarPicker";
import CustomerForm from "@/app/components/CustomerForm";
import { ErrorAlert, SuccessAlert } from "@/app/components/FormAlert";
import ServiceSelect from "@/app/components/ServiceSelect";
import StaffSelect from "@/app/components/StaffSelect";
import TimeSlotPicker from "@/app/components/TimeSlotPicker";
import { use, useEffect, useMemo, useState } from "react";

type Service = {
  id: string;
  name: string;
  duration_minutes: number;
  price_cents: number | null;
};

type Staff = {
  id: string;
  name: string;
};

type BookingErrorResponse = {
  error?: unknown;
  details?: {
    formErrors?: string[];
    fieldErrors?: Record<string, string[]>;
  };
  message?: unknown;
};

const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];

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

function toDateKey(year: number, month: number, day: number) {
  return `${year}-${pad2(month + 1)}-${pad2(day)}`;
}

/**
 * IMPORTANT:
 * Return a real ISO datetime.
 * This prevents Zod "Invalid datetime" errors.
 */
function toStartAt(dateKey: string, time: string) {
  return new Date(`${dateKey}T${time}:00+08:00`).toISOString();
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function formatPeso(priceCents: number | null) {
  if (priceCents === null || priceCents === undefined) return "";

  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(priceCents / 100);
}

function getBookingErrorMessage(data: unknown) {
  if (!data) return "Booking failed";

  if (typeof data === "string") return data;

  if (typeof data !== "object") return "Booking failed";

  const response = data as BookingErrorResponse;

  if (typeof response.error === "string") {
    if (response.details?.fieldErrors) {
      const fieldErrors = Object.entries(response.details.fieldErrors)
        .flatMap(([field, messages]) =>
          Array.isArray(messages)
            ? messages.map((message) => `${field}: ${message}`)
            : []
        )
        .join("\n");

      return fieldErrors || response.error;
    }

    return response.error;
  }

  if (
    response.error &&
    typeof response.error === "object" &&
    "fieldErrors" in response.error
  ) {
    const zodError = response.error as {
      formErrors?: string[];
      fieldErrors?: Record<string, string[]>;
    };

    const fieldErrors = Object.entries(zodError.fieldErrors ?? {})
      .flatMap(([field, messages]) =>
        Array.isArray(messages)
          ? messages.map((message) => `${field}: ${message}`)
          : []
      )
      .join("\n");

    const formErrors = (zodError.formErrors ?? []).join("\n");

    return fieldErrors || formErrors || "Invalid booking request";
  }

  if (typeof response.message === "string") {
    return response.message;
  }

  return JSON.stringify(data, null, 2);
}

export default function BookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const shopSlug = slug;

  const today = new Date();

  const [calendarMonth, setCalendarMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );


  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookingsError, setBookingsError] = useState<string | null>(null);

  const [services, setServices] = useState<Service[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [optionsError, setOptionsError] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [serviceId, setServiceId] = useState("");
  const [staffId, setStaffId] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [note, setNote] = useState("");

  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const startAt =
    selectedDate && selectedTime ? toStartAt(selectedDate, selectedTime) : "";

  useEffect(() => {
    async function loadOptions() {
      setOptionsLoading(true);
      setOptionsError(null);

      try {
        const res = await fetch(`/api/public/shop/${shopSlug}/options`);
        const data = await res.json();

        setOptionsLoading(false);

        if (!res.ok) {
          setOptionsError(
            typeof data?.error === "string"
              ? data.error
              : "Unable to load booking options"
          );
          return;
        }

        const loadedServices = data.services ?? [];
        const loadedStaff = data.staff ?? [];

        setServices(loadedServices);
        setStaff(loadedStaff);

        if (loadedServices.length > 0) {
          setServiceId(loadedServices[0].id);
        }
      } catch {
        setOptionsLoading(false);
        setOptionsError("Unable to load booking options");
      }
    }

    if (shopSlug) {
      loadOptions();
    }
  }, [shopSlug]);
  useEffect(() => {
    async function loadBookings() {
      setBookingsLoading(true);
      setBookingsError(null);

      try {
        const monthStart = new Date(
          calendarMonth.getFullYear(),
          calendarMonth.getMonth(),
          1
        );

        const monthEnd = new Date(
          calendarMonth.getFullYear(),
          calendarMonth.getMonth() + 1,
          1
        );

        const params = new URLSearchParams({
          start: monthStart.toISOString(),
          end: monthEnd.toISOString(),
        });

        const res = await fetch(
          `/api/public/shop/${shopSlug}/bookings?${params.toString()}`
        );

        const data = await res.json();

        if (!res.ok) {
          setBookingsError(
            typeof data?.error === "string"
              ? data.error
              : "Unable to load bookings"
          );
          return;
        }

        setBookings(data.bookings ?? []);
      } catch {
        setBookingsError("Unable to load bookings");
      } finally {
        setBookingsLoading(false);
      }
    }

    if (shopSlug) {
      loadBookings();
    }
  }, [shopSlug, calendarMonth]);
  const selectedService = services.find((service) => service.id === serviceId);

  const payload = useMemo(
    () => ({
      shopSlug,
      serviceId,
      staffId: staffId || null,
      startAt,
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      customerNote: note.trim() || undefined,
    }),
    [
      shopSlug,
      serviceId,
      staffId,
      startAt,
      customerName,
      customerEmail,
      note,
    ]
  );

  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();

  const monthTitle = new Intl.DateTimeFormat("en-PH", {
    month: "long",
    year: "numeric",
  }).format(calendarMonth);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOffset = new Date(year, month, 1).getDay();

  const calendarCells: Array<{
    key: string;
    day: number | null;
    dateKey: string | null;
    isPast: boolean;
  }> = [];

  for (let i = 0; i < firstDayOffset; i++) {
    calendarCells.push({
      key: `empty-start-${i}`,
      day: null,
      dateKey: null,
      isPast: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = toDateKey(year, month, day);
    const dateValue = new Date(year, month, day, 23, 59, 59);

    calendarCells.push({
      key: dateKey,
      day,
      dateKey,
      isPast: dateValue.getTime() < today.getTime(),
    });
  }

  while (calendarCells.length % 7 !== 0) {
    calendarCells.push({
      key: `empty-end-${calendarCells.length}`,
      day: null,
      dateKey: null,
      isPast: false,
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setResult(null);

    if (!serviceId) {
      setLoading(false);
      setError("Please select a service.");
      return;
    }

    if (!selectedDate || !selectedTime) {
      setLoading(false);
      setError("Please select a date and time.");
      return;
    }

    if (!customerName.trim()) {
      setLoading(false);
      setError("Please enter your name.");
      return;
    }

    if (!customerEmail.trim()) {
      setLoading(false);
      setError("Please enter your email.");
      return;
    }

    console.log("Booking payload:", payload);

    const res = await fetch("/api/public/book", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      console.error("Booking API error:", data);
      setError(getBookingErrorMessage(data));
      return;
    }

    setResult('Successfylly Booked!');
  }
  const bookedTimesForSelectedDate = useMemo(() => {
    if (!selectedDate) return new Set<string>();

    return new Set(
      bookings
        .filter((booking) => {
          const date = new Date(booking.start_at);

          const bookingDateKey = toDateKey(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
          );

          return bookingDateKey === selectedDate;
        })
        .map((booking) => {
          const date = new Date(booking.start_at);

          return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
        })
    );
  }, [bookings, selectedDate]);


  const bookedDateKeys = useMemo(() => {
    return new Set(
      bookings.map((booking) => {
        const date = new Date(booking.start_at);

        return toDateKey(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );
      })
    );
  }, [bookings]);

  return (
    <main className="mx-auto grid w-full max-w-5xl gap-5 p-6 md:p-8">
      <div className="grid gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">
          Book an Appointment
        </h1>

        <p className="text-sm text-slate-600">
          Shop: <span className="font-medium text-slate-900">{shopSlug}</span>
        </p>
      </div>

      {optionsError ? (
        <ErrorAlert message={optionsError} />
      ) : null}

      <form
        onSubmit={submit}
        className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]"
      >
        <section className="grid gap-5">


          <CalendarPicker
            monthTitle={monthTitle}
            calendarCells={calendarCells}
            selectedDate={selectedDate}
            bookings={bookings}
            bookingsLoading={bookingsLoading}
            onPrev={() => setCalendarMonth((current) => addMonths(current, -1))}
            onNext={() => setCalendarMonth((current) => addMonths(current, 1))}
            onSelectDate={(d) => {
              setSelectedDate(d);
              setSelectedTime("");
            }}
          />


          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-slate-900">
              Available Times
            </h2>

            <TimeSlotPicker
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              timeSlots={TIME_SLOTS}
              bookedTimes={bookedTimesForSelectedDate}
              onSelect={setSelectedTime}
            />


          </div>
        </section>

        <section className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-1">
            <h2 className="text-lg font-semibold text-slate-900">
              Booking Details
            </h2>

            <p className="text-sm text-slate-500">
              Select your service, preferred staff, and contact details.
            </p>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700">
              Service
            </label>

            <ServiceSelect
              services={services}
              value={serviceId}
              loading={optionsLoading}
              onChange={setServiceId}
              formatPeso={formatPeso}
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700">
              Staff <span className="font-normal text-slate-400">(optional)</span>
            </label>

            <StaffSelect
              staff={staff}
              value={staffId}
              onChange={setStaffId}
            />
          </div>

          {selectedService ? (
            <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-medium text-slate-800">Selected service</p>
              <p className="mt-1">{selectedService.name}</p>
              <p>{selectedService.duration_minutes} minutes</p>

              {selectedService.price_cents !== null ? (
                <p>{formatPeso(selectedService.price_cents)}</p>
              ) : null}
            </div>
          ) : null}

          <div className="grid gap-3 border-t border-slate-200 pt-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Customer Details
            </h2>

            <CustomerForm
              name={customerName}
              email={customerEmail}
              note={note}
              onName={setCustomerName}
              onEmail={setCustomerEmail}
              onNote={setNote}
            />
          </div>

          <BookingSummary startAt={startAt} />

          {error ? <ErrorAlert message={error} /> : null}
          {result ? <SuccessAlert message={result} /> : null}

          <button
            type="submit"
            disabled={loading || optionsLoading || services.length === 0}
            className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </section>
      </form>
    </main>
  );

}