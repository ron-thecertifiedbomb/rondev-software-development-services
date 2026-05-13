import { createAdminClient } from "@/supabase/admin";
import { NextResponse } from "next/server";
import { z } from "zod";

const BookingRequest = z.object({
  shopSlug: z
    .string()
    .trim()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9-]+$/),
  serviceId: z.string().uuid(),
  staffId: z.string().uuid().nullable().optional(),
  startAt: z.string().refine((value) => {
    return !Number.isNaN(new Date(value).getTime());
  }, "Invalid datetime"),
  customerName: z.string().trim().min(2).max(120),
  customerEmail: z.string().trim().email().max(255),
  customerNote: z.string().trim().max(1000).optional(),
});

function jsonError(message: string, status: number, details?: unknown) {
  return NextResponse.json({ error: message, details }, { status });
}

export async function POST(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const parsed = BookingRequest.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid booking request",
        details: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const {
    shopSlug,
    serviceId,
    staffId,
    startAt,
    customerName,
    customerEmail,
    customerNote,
  } = parsed.data;

  const start = new Date(startAt);

  if (Number.isNaN(start.getTime())) {
    return jsonError("Invalid startAt", 400);
  }

  if (start.getTime() < Date.now()) {
    return jsonError("Booking start time must be in the future", 400);
  }

  // IMPORTANT: this bypasses RLS because public customers are anonymous.
  const supabase = createAdminClient();

  const { data: shop, error: shopError } = await supabase
    .from("shops")
    .select("id, slug, name, timezone")
    .eq("slug", shopSlug)
    .single();

  if (shopError || !shop) {
    return jsonError("Shop not found", 404);
  }

  const { data: service, error: serviceError } = await supabase
    .from("services")
    .select("id, shop_id, name, duration_minutes, is_active")
    .eq("id", serviceId)
    .eq("shop_id", shop.id)
    .single();

  if (serviceError || !service || !service.is_active) {
    return jsonError("Service not found or inactive", 400);
  }

  if (staffId) {
    const { data: staff, error: staffError } = await supabase
      .from("staff")
      .select("id, shop_id, is_active")
      .eq("id", staffId)
      .eq("shop_id", shop.id)
      .single();

    if (staffError || !staff || !staff.is_active) {
      return jsonError("Staff not found or inactive", 400);
    }
  }

  const end = new Date(start.getTime() + service.duration_minutes * 60_000);

  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .insert({
      shop_id: shop.id,
      service_id: service.id,
      staff_id: staffId ?? null,
      start_at: start.toISOString(),
      end_at: end.toISOString(),
      status: "pending",
      customer_name: customerName,
      customer_email: customerEmail,
      customer_note: customerNote || null,
    })
    .select("id, status, start_at, end_at")
    .single();

  if (bookingError) {
    if (bookingError.message.includes("Overlapping booking detected")) {
      return jsonError("Selected time slot is no longer available", 409);
    }

    return jsonError("Unable to create booking", 500, bookingError.message);
  }

  return NextResponse.json(
    {
      bookingId: booking.id,
      status: booking.status,
      startAt: booking.start_at,
      endAt: booking.end_at,
    },
    { status: 201 },
  );
}
