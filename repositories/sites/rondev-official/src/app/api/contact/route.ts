import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ── Validation schema ─────────────────────────────────────────────────────────

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  service: z.string().optional().default("General"),
  message: z
    .string()
    .trim()
    .min(2, "Message must be at least 2 characters")
    .max(3000),
});

// ── POST /api/contact ─────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  // 1. Parse body safely
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // 2. Validate with Zod instead of manual checks
  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    console.error("[/api/contact] Validation error:", parsed.error.format());
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.issues },
      { status: 422 },
    );
  }

  const { name, email, service, message } = parsed.data;

  // 3. Guard: API key must exist
  if (!process.env.RESEND_API_KEY) {
    console.error("[/api/contact] RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 },
    );
  }

  // 4. Send via Resend
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `RonDev Inquiry <system@rondev.com.ph>`,
        to: "office@rondev.com.ph",
        reply_to: email,
        subject: `New Inquiry — ${name} (${service})`,
        text: [
          `Name:    ${name}`,
          `Email:   ${email}`,
          `Service: ${service}`,
          ``,
          `Message:`,
          message,
        ].join("\n"),
        // Bonus: HTML version looks great in your inbox
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <div style="background:#141414;padding:24px 32px;border-radius:12px 12px 0 0">
              <span style="font-size:22px;font-weight:900;color:#e8e4dc">RON</span>
              <span style="font-size:22px;font-weight:900;color:#c8f542">DEV</span>
            </div>
            <div style="background:#1a1d24;padding:32px;border-radius:0 0 12px 12px">
              <h2 style="color:#e8e4dc;margin:0 0 24px">New Inquiry Received</h2>
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="color:#64748b;padding:8px 0;width:90px">Name</td>
                    <td style="color:#e8e4dc;font-weight:600">${name}</td></tr>
                <tr><td style="color:#64748b;padding:8px 0">Email</td>
                    <td><a href="mailto:${email}" style="color:#c8f542">${email}</a></td></tr>
                <tr><td style="color:#64748b;padding:8px 0">Service</td>
                    <td style="color:#e8e4dc">${service}</td></tr>
              </table>
              <hr style="border:none;border-top:1px solid #2d3748;margin:24px 0"/>
              <p style="color:#64748b;margin:0 0 8px;font-size:13px">MESSAGE</p>
              <p style="color:#94a3b8;line-height:1.7;white-space:pre-wrap">${message}</p>
              <div style="margin-top:32px;padding-top:16px;border-top:1px solid #2d3748">
                <a href="mailto:${email}" 
                   style="background:#c8f542;color:#141414;padding:10px 20px;
                          border-radius:6px;text-decoration:none;font-weight:700;font-size:14px">
                  Reply to ${name} →
                </a>
              </div>
            </div>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(`Resend API error: ${errorData}`);
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: unknown) {
    const msg =
      error instanceof Error ? error.message : "Failed to send message";
    console.error("[/api/contact]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
