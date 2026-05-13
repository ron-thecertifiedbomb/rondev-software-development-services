import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const { searchParams } = new URL(req.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  if (!start || !end) {
    return NextResponse.json(
      { error: "Missing start or end parameter" },
      { status: 400 },
    );
  }

  const supabase = await createClient();

  const { data: shop, error: shopError } = await supabase
    .from("shops")
    .select("id")
    .eq("slug", slug)
    .single();

  if (shopError || !shop) {
    return NextResponse.json({ error: "Shop not found" }, { status: 404 });
  }

  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, booking_no, status, start_at, end_at, customer_name, customer_email",
    )
    .eq("shop_id", shop.id)
    .gte("start_at", start)
    .lt("start_at", end)
    .order("start_at", { ascending: true });

  if (error) {
    return NextResponse.json(
      {
        error: "Supabase query error",
        message: error.message,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    bookings: data ?? [],
  });
}
