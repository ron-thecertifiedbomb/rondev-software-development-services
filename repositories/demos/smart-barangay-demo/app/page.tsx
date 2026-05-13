import Link from "next/link";
import Card from "@/components/ui/Card";
import StatusBadge from "@/components/StatusBadge";
import { APP_CONFIG } from "@/app.config";

export default function Home() {
  const { brgy, branding, ui } = APP_CONFIG;

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary to-blue-700 p-10 text-white shadow">
        <div className="relative z-10">
          <p className="text-sm font-semibold text-white/90">
            {brgy.name} • {brgy.city}
          </p>

          <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
            {branding.productName}
          </h1>

          <p className="mt-3 max-w-2xl text-white/90">{brgy.tagline}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/request"
              className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-sm hover:brightness-95"
            >
              Request a Document
            </Link>

            <Link
              href="/track"
              className="rounded-xl bg-black/20 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/30 hover:bg-black/30"
            >
              Track a Request
            </Link>

            <Link
              href="/announcements"
              className="rounded-xl bg-black/10 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-black/20"
            >
              View Announcements
            </Link>
          </div>
        </div>

        {/* decorative blobs */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-black/10 blur-2xl" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Zero-contact requests" subtitle="Submit without long queues">
          <p className="text-sm text-gray-600">
            Residents can submit requests online (no login required for this demo).
          </p>
        </Card>

        <Card title="Tracking" subtitle="Know your request status">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600">
              Every submission returns a tracking code you can use anytime.
            </p>
            <StatusBadge status="pending" />
          </div>
        </Card>

        {ui.showAdminCard ? (
          <Card title="Admin view" subtitle="Simple processing dashboard">
            <p className="text-sm text-gray-600">
              A basic admin list page is included for demo purposes.
            </p>
          </Card>
        ) : (
          <Card title="Admin view" subtitle="Hidden in config">
            <p className="text-sm text-gray-600">
              Admin card is disabled via app.config.ts
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}