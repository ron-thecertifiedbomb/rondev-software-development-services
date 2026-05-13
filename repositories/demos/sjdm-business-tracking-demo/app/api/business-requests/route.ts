import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseAdminless } from "@/lib/supabase";

/**
 * Business demo schema:
 * Table: business_requests
 * Fields: full_name, service_type, details, contact, status, created_at
 */

const createSchema = z.object({
  full_name: z.string().min(2, "full_name is required"),
  service_type: z.string().min(2, "service_type is required"),
  details: z.string().optional().nullable(),
  contact: z.string().optional().nullable(),
});

export async function POST(req: Request) {
  try {
    const supabase = supabaseAdminless();
    const form = await req.formData();

    const payload = createSchema.parse({
      full_name: String(form.get("full_name") || ""),
      service_type: String(form.get("service_type") || ""),
      details: form.get("details") ? String(form.get("details")) : null,
      contact: form.get("contact") ? String(form.get("contact")) : null,
    });

    const { data, error } = await supabase
      .from("business_requests")
      .insert({
        full_name: payload.full_name,
        service_type: payload.service_type,
        details: payload.details,
        contact: payload.contact,
        // status auto default = 'pending'
      })
      .select("tracking_code")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { tracking_code: data.tracking_code },
      { status: 200 },
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Invalid request" },
      { status: 400 },
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tracking_code = searchParams.get("tracking_code");
  const full_name = searchParams.get("full_name");

  const supabase = supabaseAdminless();

  // ✅ Search by name (demo-safe list)
  if (full_name && full_name.trim().length > 0) {
    const { data, error } = await supabase
      .from("business_requests")
      .select("tracking_code, full_name, service_type, status, created_at")
      .ilike("full_name", `%${full_name.trim()}%`)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ results: data ?? [] }, { status: 200 });
  }

  // ✅ Track by code (single)
  if (tracking_code && tracking_code.trim().length > 0) {
    const { data, error } = await supabase
      .from("business_requests")
      .select("*")
      .eq("tracking_code", tracking_code.trim())
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  }

  return NextResponse.json(
    { error: "Provide tracking_code or full_name" },
    { status: 400 },
  );
}
