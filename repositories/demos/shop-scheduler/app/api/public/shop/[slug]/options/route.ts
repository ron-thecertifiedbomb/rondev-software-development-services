import { createAdminClient } from "@/supabase/admin";
import { NextResponse } from "next/server";


export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const supabase = createAdminClient();

  const { data: shop, error: shopError } = await supabase
    .from("shops")
    .select("id, slug, name, timezone")
    .eq("slug", slug)
    .single();

  if (shopError || !shop) {
    return NextResponse.json({ error: "Shop not found" }, { status: 404 });
  }

  const { data: services, error: servicesError } = await supabase
    .from("services")
    .select("id, name, duration_minutes, price_cents")
    .eq("shop_id", shop.id)
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (servicesError) {
    return NextResponse.json(
      { error: "Unable to load services" },
      { status: 500 },
    );
  }

  const { data: staff, error: staffError } = await supabase
    .from("staff")
    .select("id, name")
    .eq("shop_id", shop.id)
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (staffError) {
    return NextResponse.json(
      { error: "Unable to load staff" },
      { status: 500 },
    );
  }

  return NextResponse.json({
    shop,
    services: services ?? [],
    staff: staff ?? [],
  });
}
